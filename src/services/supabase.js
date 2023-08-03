import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wzlkbnddnhfrjuvmpizh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6bGtibmRkbmhmcmp1dm1waXpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4OTQxMjksImV4cCI6MjAwNjQ3MDEyOX0.jQsMCXJZ0jiG_OMq0xvLlqaJD7CpirR-dQV1HyYpITM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
