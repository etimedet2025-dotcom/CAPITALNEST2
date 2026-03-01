import { createClient } from "@supabase/supabase-js";

// PASTE YOUR SUPABASE URL BELOW
const SUPABASE_URL = "https://glnfrqgndektagvcjvxj.supabase.co";

// PASTE YOUR SUPABASE PUBLIC KEY (ANON KEY) BELOW
const SUPABASE_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsbmZycWduZGVrdGFndmNqdnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNDM1NzIsImV4cCI6MjA4NzgxOTU3Mn0.UflJd-gJNuYWFhinenWhTEvILFnWYgF4ayo7kkBEbOQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
