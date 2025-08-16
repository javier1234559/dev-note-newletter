import { createClient } from '@supabase/supabase-js';
import { Database } from './type';
import globalConfig from '@/config';

const SUPABASE_URL = globalConfig.supabase.url;
const SUPABASE_PUBLISHABLE_KEY = globalConfig.supabase.key;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);