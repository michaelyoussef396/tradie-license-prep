ALTER TABLE public.leads
  ADD CONSTRAINT leads_name_length CHECK (char_length(name) <= 100),
  ADD CONSTRAINT leads_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT leads_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  ADD CONSTRAINT leads_phone_length CHECK (phone IS NULL OR char_length(phone) <= 30),
  ADD CONSTRAINT leads_message_length CHECK (message IS NULL OR char_length(message) <= 2000),
  ADD CONSTRAINT leads_source_length CHECK (source IS NULL OR char_length(source) <= 100),
  ADD CONSTRAINT leads_license_type_length CHECK (license_type IS NULL OR char_length(license_type) <= 200),
  ADD CONSTRAINT leads_years_experience_length CHECK (years_experience IS NULL OR char_length(years_experience) <= 50),
  ADD CONSTRAINT leads_used_referral_code_length CHECK (used_referral_code IS NULL OR char_length(used_referral_code) <= 20),
  ADD CONSTRAINT leads_notes_length CHECK (notes IS NULL OR char_length(notes) <= 5000);