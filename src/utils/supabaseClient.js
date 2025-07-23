const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://bezgprlgwpyrphlyqkjp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlemdwcmxnd3B5cnBobHlxa2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDU3MzEsImV4cCI6MjA2ODc4MTczMX0.g5WH-vhuvPt_SMyYXW-kNYJ48t65lwD8tCTvazeuS8Q";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase; 