import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

import { SUPABASE_URL, SUPABASE_KEY } from "@env";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
