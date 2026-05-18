-- Restore RLS policies on public.leads.
-- Live DB had RLS enabled but ZERO policies attached — every write was denied,
-- which surfaced as the contact form returning 401 (Postgres 42501 mapped to
-- HTTP 401 by the Supabase gateway). The admin full-access policy was also
-- missing. Both policies are recreated here to match migrations 20260319005807
-- and 20260330035002.

DROP POLICY IF EXISTS "Allow inserts from website" ON public.leads;
CREATE POLICY "Allow inserts from website" ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    status = 'new'
    AND notes IS NULL
  );

DROP POLICY IF EXISTS "Admins full access leads" ON public.leads;
CREATE POLICY "Admins full access leads" ON public.leads
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Normalize the status default so the anon INSERT policy passes even if a
-- client forgets to send it. Original CREATE TABLE for public.leads predates
-- this migration folder, so the prior default is unknown.
ALTER TABLE public.leads ALTER COLUMN status SET DEFAULT 'new';
