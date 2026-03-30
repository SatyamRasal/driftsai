const { requireEnv } = require('./env');

function baseHeaders() {
  const supabaseUrl = requireEnv('SUPABASE_URL');
  const serviceKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  return {
    supabaseUrl,
    serviceKey,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json'
    }
  };
}

async function verifyUserFromToken(token) {
  const { supabaseUrl, headers } = baseHeaders();
  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) return null;
  return await res.json();
}

function adminEmails() {
  return String(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

async function assertAdmin(req) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) {
    const err = new Error('Missing Authorization header');
    err.statusCode = 401;
    throw err;
  }
  const user = await verifyUserFromToken(token);
  if (!user?.email) {
    const err = new Error('Invalid session');
    err.statusCode = 401;
    throw err;
  }
  const allowed = adminEmails();
  if (allowed.length && !allowed.includes(String(user.email).toLowerCase())) {
    const err = new Error('Admin access denied');
    err.statusCode = 403;
    throw err;
  }
  return { user, token };
}

async function dbFetch(path, options = {}) {
  const { supabaseUrl, headers } = baseHeaders();
  const res = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });
  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!res.ok) {
    const error = new Error(data.message || data.error || 'Database request failed');
    error.statusCode = res.status;
    error.details = data;
    throw error;
  }
  return data;
}

module.exports = { assertAdmin, dbFetch, requireEnv };
