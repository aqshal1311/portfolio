import { createClient } from '@supabase/supabase-js';

// DEBUG: cek apakah env terbaca
console.log("ENV URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("ENV KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

// Ambil ENV
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi
if (!supabaseUrl) {
  throw new Error("❌ VITE_SUPABASE_URL tidak ditemukan! Pastikan ada di file .env dan restart npm run dev");
}

if (!supabaseKey) {
  throw new Error("❌ VITE_SUPABASE_ANON_KEY tidak ditemukan! Pastikan ada di file .env dan restart npm run dev");
}

// Buat client
export const supabase = createClient(supabaseUrl, supabaseKey);
