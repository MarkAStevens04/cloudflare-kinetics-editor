import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Offline when creds are absent, or when explicitly forced.
export const isOffline = import.meta.env.VITE_OFFLINE === 'true' || !url || !key;

export const supabase: SupabaseClient | null = isOffline ? null : createClient(url, key);