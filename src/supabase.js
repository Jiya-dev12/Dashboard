import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjigvllpljworoixygbj.supabase.co';
const supabaseKey = 'sb_publishable_3_41f1X6J3WtNho5ykIM-A_10fZxfmn';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);