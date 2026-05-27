// config/supabase.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("⚠️ CRITICAL WARNING: Supabase Environmental Configuration Strings Missing.");
}

// Instantiate the cloud supervisor instance
export const supabase = createClient(supabaseUrl, supabaseKey);