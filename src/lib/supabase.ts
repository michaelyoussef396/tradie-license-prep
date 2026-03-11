import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dpceyonfjfjaogwkyrhp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwY2V5b25mamZqYW9nd2t5cmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTIzOTAsImV4cCI6MjA4ODc4ODM5MH0.kwKuzt1HTvDJOo2Apq5vJ_30CKiJVPob3JIS33d-KaM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
