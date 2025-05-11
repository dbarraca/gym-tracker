import { createClient } from '@supabase/supabase-js'
import {Database} from './src/schema';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables.');
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;