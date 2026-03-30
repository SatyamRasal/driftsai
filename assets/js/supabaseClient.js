import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { CONFIG } from "./config.js";

const placeholder = (value) => !value || String(value).includes("PASTE_") || String(value).includes("example.com");

if (placeholder(CONFIG.supabaseUrl) || placeholder(CONFIG.supabaseAnonKey)) {
  console.warn("Supabase config is not set yet. Edit assets/js/config.js.");
}

export const supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});
