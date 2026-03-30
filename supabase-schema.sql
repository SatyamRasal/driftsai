-- Drifts AI schema for Supabase
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text,
  status text not null default 'Live',
  short_description text,
  description text,
  price_inr numeric(12,2) not null default 0,
  price_usd numeric(12,2),
  demo_url text,
  hero_image text,
  screenshots text[] not null default '{}',
  features text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  request_type text not null check (request_type in ('feedback', 'complaint', 'requirement')),
  full_name text not null,
  email text not null,
  phone text,
  message text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text,
  email text not null,
  phone text,
  budget numeric(14,2),
  currency text not null default 'INR',
  requirement text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id text not null,
  payment_id text not null unique,
  signature text not null,
  product_id uuid,
  product_name text,
  amount numeric(14,2) not null default 0,
  currency text not null default 'INR',
  customer_name text,
  customer_email text,
  status text not null default 'verified',
  created_at timestamptz not null default now()
);

create index if not exists idx_products_active on public.products(is_active);
create index if not exists idx_support_created_at on public.support_requests(created_at desc);
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);
create index if not exists idx_payments_created_at on public.payments(created_at desc);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.support_requests enable row level security;
alter table public.inquiries enable row level security;
alter table public.payments enable row level security;

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
on public.profiles for select
using (auth.uid() = id);

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles admin read all" on public.profiles;
create policy "profiles admin read all"
on public.profiles for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "products public read" on public.products;
create policy "products public read"
on public.products for select
using (is_active = true);

drop policy if exists "products admin insert" on public.products;
create policy "products admin insert"
on public.products for insert
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "products admin update" on public.products;
create policy "products admin update"
on public.products for update
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "products admin delete" on public.products;
create policy "products admin delete"
on public.products for delete
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "support public insert" on public.support_requests;
create policy "support public insert"
on public.support_requests for insert
with check (true);

drop policy if exists "support admin read" on public.support_requests;
create policy "support admin read"
on public.support_requests for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "support admin update" on public.support_requests;
create policy "support admin update"
on public.support_requests for update
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "inquiries public insert" on public.inquiries;
create policy "inquiries public insert"
on public.inquiries for insert
with check (true);

drop policy if exists "inquiries admin read" on public.inquiries;
create policy "inquiries admin read"
on public.inquiries for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "inquiries admin update" on public.inquiries;
create policy "inquiries admin update"
on public.inquiries for update
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
)
with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

drop policy if exists "payments admin read" on public.payments;
create policy "payments admin read"
on public.payments for select
using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- Optional: create public bucket named product-images for manual image uploads.
