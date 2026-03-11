CREATE POLICY "Authenticated can delete leads" ON public.leads FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete students" ON public.students FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete referral_codes" ON public.referral_codes FOR DELETE TO authenticated USING (true);