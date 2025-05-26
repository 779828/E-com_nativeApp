import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

supabaseUrl = "https://gngqdgiucmobnjzmoamx.supabase.co";
supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImduZ3FkZ2l1Y21vYm5qem1vYW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDUzNTEsImV4cCI6MjA2Mjg4MTM1MX0.Nbt-YLwaj8pg45P5oaG6MGUBtsXp_7DhdCEyHLz-UdU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
