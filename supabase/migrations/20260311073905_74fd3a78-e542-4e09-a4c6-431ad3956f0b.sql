
SELECT cron.schedule(
  'follow-up-emails-daily',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url := 'https://dpceyonfjfjaogwkyrhp.supabase.co/functions/v1/follow-up-emails',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwY2V5b25mamZqYW9nd2t5cmhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyMTIzOTAsImV4cCI6MjA4ODc4ODM5MH0.kwKuzt1HTvDJOo2Apq5vJ_30CKiJVPob3JIS33d-KaM"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
