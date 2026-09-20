# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **bun** (`bun.lock`; the `predev`/`prebuild` hooks call `bunx tsx`). The README says npm — ignore it.

```sh
bun install
bun run dev                  # Vite dev server on port 8080 (host "::")
bun run build                # production build (build:dev for a development-mode build)
bun run preview
bun run lint                 # eslint .
bunx tsc -b --noEmit         # typecheck (no `typecheck` script exists)
```

No test runner is configured — there are no tests in the repo.

`predev`/`prebuild` run `scripts/generate-sitemap.ts`, which **overwrites `public/sitemap.xml`** from a hand-maintained array. Adding a public route means adding it to that array; `sitemap.xml` itself is generated output.

Edge functions in `supabase/functions/` ship through the Supabase CLI, separately from the frontend build — nothing in `bun run build` touches them. Every Supabase CLI call from an agent session must carry an explicit `--project-ref`, since the default target is production.

## Architecture

Vite + React 18 SPA (no SSR). Supabase is the entire backend — there is no API server. `vercel.json` rewrites every path to `index.html`.

### Routing and global chrome
All routes live in `src/App.tsx`, each page `lazy()`-loaded behind a `<Suspense>` with `PageSkeleton`. Providers and persistent chrome (`CallBar`, `AnalyticsProvider`, `ScrollToTopButton`, scroll-reset-on-navigate) are mounted once there; the `pt-12` wrapper offsets the fixed `CallBar`. New pages go in `src/pages/`, are lazy-imported, and must be added **above** the `*` catch-all.

### Supabase client
`src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts` are **generated — never hand-edit**. The URL and anon key are hardcoded there (not env vars). `Database` types come from `types.ts`, so `supabase.from(...)` is fully typed.

### Lead capture flow
Three surfaces submit leads (`HeroEnquiryForm`, `Contact`, `FinalCTA`) and all follow the same two-step shape:

1. **Anonymous insert straight into `public.leads`.** The anon RLS policy only permits rows with `status = 'new'` and `notes IS NULL`, so the client must always send `status: "new"`.
2. **Fire-and-forget `supabase.functions.invoke("send-lead-emails")`**, deliberately not awaited — a failed email must not block the redirect to `/thank-you`.

`send-lead-emails` re-reads the DB with the service-role key and refuses to send unless a matching `leads` row (same email + name) was created in the last 60 minutes — this is what keeps the public, JWT-less function from being an open email relay. It also creates the `referrals` row server-side via the `validate_referral_code` RPC; the client never writes to `referrals`.

### Auth and RLS
One Supabase auth pool for both audiences, separated by the `app_role` enum (`admin` | `student`) in `public.user_roles`.

- Policies call **`private.has_role()` / `private.get_my_student_id()`**, not the `public.*` versions. The `SECURITY DEFINER` helpers were deliberately moved into a `private` schema with execute revoked from `anon`; the remaining `public` wrappers are `SECURITY INVOKER`. New policies should follow the same pattern.
- Students are tied to auth users through **`student_auth_links`**, populated by an `AFTER INSERT OR UPDATE OF email` trigger on `students` that links only on an unambiguous single email match. Do not reintroduce direct `students.email = auth.users.email` comparisons in policies.
- `AdminDashboard` and `StudentDashboard` guard themselves client-side (session check + `user_roles` lookup + `onAuthStateChange`). That is UX only — **RLS is the actual boundary**.

### Lead pipeline
Status values are plain text, defined in `src/components/admin/PipelineTab.tsx`: `new` → `thinking_about_it` → `qualified` → `enrolled` → `completed`, plus `followed_up_3`, `followed_up_7`, `review_requested`, `dead`. `send-followup-emails` sweeps by status + age (day 3, day 7, day 10 → `dead`) and writes the next status, so status strings are shared between the admin UI and the edge function — change both together. It is built to be driven by a `pg_cron` + `pg_net` job; the original schedule was unscheduled in a later migration, so it is currently invoked manually.

`leads.is_test` marks seed/QA rows: the admin tabs filter them out unless "show test" is toggled, and the follow-up sweep skips them.

### Edge functions
All five in `supabase/functions/` are Deno, run with **`verify_jwt = false`** (`supabase/config.toml`), and are therefore publicly callable — each must validate its own input. Email goes through Resend (`RESEND_API_KEY`); HTML is hand-built inline with table layouts and every interpolated value passed through the local `esc()`.

### Analytics
Two deliberate layers: hardcoded gtag/Clarity snippets in `index.html` for first paint, and `src/lib/analytics.ts` + `AnalyticsProvider` for SPA route changes and custom events. **Everything is suppressed on internal routes** — `isInternalRoute()` in `src/lib/analytics.ts` is the single guard, covering `/admin*` plus the legacy `/email-templates` redirect. `AnalyticsProvider` imports it rather than re-testing the prefix; keep that guard in any new tracking. `trackLeadConversion()` fires the Google Ads conversion at most once per page session.

### SEO
Per-page `<Seo>` (react-helmet-async) sets title/description/canonical/OG against `https://www.qualifypro.com.au`; `/thank-you` is `noindex` and excluded from the sitemap. Site-wide `LocalBusiness` JSON-LD lives in `index.html`.

### Content
`src/data/courses.ts` is the single source of truth for course names, prices, durations and inclusions; `src/data/eligibility.ts` is the same for BPC experience minimums. Both headers document their conventions. Prices are authored ex-GST only — the GST-inclusive total is derived and is always the headline figure, with `exGstNote` ("($7,995 + GST)") beside it. Never repeat a course or eligibility detail as a literal elsewhere, including in JSON-LD.

## Public claims

Every number, price, requirement, quote and student detail on the public site must trace to something Adrian has confirmed **in writing**. Anything unconfirmed goes in the HOLD list in `.ai/HANDOFF.md` — never onto the site.

- Don't invent, extrapolate or round a figure to fill a layout. If a field has no confirmed value, omit it and let the component not render it.
- A claim is only as scoped as its evidence. BPC minimums differ by registration class, so no single figure may be presented as "the" requirement for everyone.
- Testimonials and student details are claims too. Quotes must be attributable; case-study detail is limited to what Adrian supplied.
- Changing a confirmed fact means changing it in its source module, not at a call site.
- When a fact is in flux, remove it from every surface at once and record the prior wording in `.ai/HANDOFF.md` so it can be restored in a single commit.

## Conventions and gotchas

- **Styling**: Tailwind with HSL design tokens in `src/index.css`; all colors must be HSL. `src/components/ui/*` is shadcn/ui CLI output — add components via the CLI rather than hand-writing them. Note the admin dashboard deviates and uses hardcoded hex (`#0f172a`, `#1B4FD8`); match the surrounding file.
- **TypeScript is intentionally loose**: `strict: false`, `strictNullChecks: false`, `noImplicitAny: false`, and `@typescript-eslint/no-unused-vars` is off. Don't rely on the compiler to catch null handling.
- **`supabase/migrations/` is not a complete schema.** The `leads` table predates the folder (see the comment in `20260518130500_restore_leads_anon_insert.sql`), and migrations were largely generated by Lovable. Treat `types.ts` and the live database as authoritative when reasoning about columns.
- Form validation uses zod schemas defined inline in the component; react-hook-form is installed but the lead forms don't use it.
