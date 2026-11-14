import { createClient } from '@supabase/supabase-js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
    if (import.meta.env.PROD)
        throw new Error('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
    console.warn('Supabase env missing; using local defaults');
}
export const supabase = createClient(url || 'http://localhost:54321', key || 'anon');
