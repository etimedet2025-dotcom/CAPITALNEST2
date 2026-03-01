import { createClient } from '@supabase/supabase-js';

// Using the credentials you provided
const supabaseUrl = "https://glnfrqgndektagvcjvxj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsbmZycWduZGVrdGFndmNqdnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNDM1NzIsImV4cCI6MjA4NzgxOTU3Mn0.UflJd-gJNuYWFhinenWhTEvILFnWYgF4ayo7kkBEbOQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
