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
bun test                     # bun's built-in runner; no `test` script exists
bun test src/components/RequireAdmin.test.tsx   # a single file
```

Tests use bun's built-in runner with `happy-dom` for the DOM; there is no vitest/jest config
and no `test` npm script. Suites sit next to the code they test (`*.test.ts` / `*.test.tsx`):
pure-logic suites for `src/data` and `src/lib`, and component suites such as
`src/components/RequireAdmin.test.tsx`, which mock `@/integrations/supabase/client` and
`react-router-dom` via `mock.module` and drive React with `React.act` + `createRoot`. Note the role
query RequireAdmin's suite mocks can be held open (`deferRoleQuery`) so the in-flight
re-verification window is observable; without that, React batches the state updates and the
assertions pass vacuously. `bun test` runs every file in one process, so `mock.module` and the
happy-dom registration are shared: register only when `GlobalRegistrator.isRegistered` is false.

`predev`/`prebuild` run `scripts/generate-sitemap.ts`, which **overwrites `public/sitemap.xml`** from a hand-maintained array. Adding a public route means adding it to that array; `sitemap.xml` itself is generated output.

Edge functions in `supabase/functions/` ship through the Supabase CLI, separately from the frontend build — nothing in `bun run build` touches them. Every Supabase CLI call from an agent session must carry an explicit `--project-ref`, since the default target is production.

## Architecture

Vite + React 18 SPA with build-time prerendering (no runtime SSR). Supabase is the entire backend — there is no API server.

### Prerendering, rewrites and 404s
`bun run build` runs `vite build`, an SSR build of `src/entry-server.tsx`, then `scripts/prerender.ts`, which renders every route in `PRERENDER_ROUTES` (`src/App.tsx`) to `dist/<route>.html` (home → `index.html`), renders the not-found page to `dist/404.html`, and keeps the empty shell as `dist/spa.html`. `src/main.tsx` hydrates prerendered HTML and client-renders the empty shell.

`vercel.json` (`cleanUrls`, `trailingSlash: false`) serves those files directly and rewrites **only** the client-rendered routes — `/thank-you`, `/dashboard`, `/admin`, `/admin/*` — to `/spa`. Every other path that matches no file gets `404.html` with a real 404 status. So a new route must be either added to `PRERENDER_ROUTES` (public pages; also add it to `scripts/generate-sitemap.ts`) or given its own rewrite in `vercel.json` — otherwise it 404s in production while working in `bun run dev`.

### Routing and global chrome
All routes live in `src/App.tsx`, each page loaded with `lazyWithPreload()` (so the prerender and hydration can load a page's chunk before rendering) behind a `<Suspense>` with `PageSkeleton`. Routes are `caseSensitive`, matching how production serves files. Providers and persistent chrome (`CallBar`, `AnalyticsProvider`, `ScrollToTopButton`, scroll-reset-on-navigate) are mounted once there; the `pt-12` wrapper offsets the fixed `CallBar`. New pages go in `src/pages/`, are imported with `lazyWithPreload()`, and must be added **above** the `*` catch-all.

### Supabase client
`src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts` are **generated — never hand-edit**. The URL and anon key are hardcoded there (not env vars). `Database` types come from `types.ts`, so `supabase.from(...)` is fully typed.

### Lead capture flow
Three surfaces submit leads (`HeroEnquiryForm`, `Contact`, `FinalCTA`). Each lead's `source` says which form it came from — the page's name for a page's own forms, `hero-eligibility-form` and `homepage-cta` for the home page's two — and the form's GA4 event carries the same value. A new page's form needs a source of its own, and a component that fixes its own source (`Hero`, `FinalCTA`) belongs on one page only; `src/components/lead-sources.test.tsx` checks both. All three follow the same two-step shape:

1. **Anonymous insert straight into `public.leads`.** The anon RLS policy only permits rows with `status = 'new'` and `notes IS NULL`, so the client must always send `status: "new"`.
2. **Fire-and-forget `supabase.functions.invoke("send-lead-emails")`**, deliberately not awaited — a failed email must not block the redirect to `/thank-you`.

`send-lead-emails` re-reads the DB with the service-role key and refuses to send unless a matching `leads` row (same email + name) was created in the last 60 minutes — this is what keeps the public, JWT-less function from being an open email relay. It also creates the `referrals` row server-side via the `validate_referral_code` RPC; the client never writes to `referrals`.

### Auth and RLS
One Supabase auth pool for both audiences, separated by the `app_role` enum (`admin` | `student`) in `public.user_roles`.

- Policies call **`private.has_role()` / `private.get_my_student_id()`**, not the `public.*` versions. The `SECURITY DEFINER` helpers were deliberately moved into a `private` schema with execute revoked from `anon`; the remaining `public` wrappers are `SECURITY INVOKER`. New policies should follow the same pattern.
- Students are tied to auth users through **`student_auth_links`**, populated by an `AFTER INSERT OR UPDATE OF email` trigger on `students` that links only on an unambiguous single email match. Do not reintroduce direct `students.email = auth.users.email` comparisons in policies.
- `AdminDashboard` and `StudentDashboard` guard themselves client-side (session check + `user_roles` lookup + `onAuthStateChange`). That is UX only — **RLS is the actual boundary**.

### Lead pipeline
Status values are plain text: `new`, `thinking_about_it`, `followed_up_3`, `followed_up_7`, `qualified`, `enrolled`, `completed`, `review_requested`, `dead`. The Pipeline board's columns and the lead sheet's status list come from `src/components/admin/pipeline-columns.ts`; the three lead forms still insert the literal `new` and `NewLeadsTab` filters on it. A lead whose status has no column shows in an "Other Status" column rather than disappearing. `send-followup-emails` sweeps by status + age (day 3, day 7, day 10 → `dead`) and writes the next status, so status strings are shared between the admin UI and the edge function — change both together. `pipeline-columns.test.ts` checks every status the function writes as a double-quoted literal (its `.eq`/`.in` filters, `status:` updates and `sendFollowup`'s next status) against the board's columns; a status built any other way — a variable, single quotes — gets past it.

The sweep runs from cron job 3 (`send-followup-emails-daily`, `0 22,23 * * *` UTC), which calls it once a day at 9am Melbourne (the job checks the Melbourne hour, so one of its two daily runs does nothing) with an `x-cron-secret` header read from Vault; the function compares it with its `CRON_SECRET` secret. The job was created in the SQL editor — `supabase/migrations/` only schedules and later unschedules an older job. To check it ran, read `net._http_response` (pg_net keeps rows about 6 hours, so before ~3pm Melbourne) or the function's logs: `cron.job_run_details` says "succeeded" once the request is queued, even if the call failed.

`leads.is_test` marks seed/QA rows: the admin tabs filter them out unless "show test" is toggled, and the follow-up sweep skips them.

### Edge functions
All three in `supabase/functions/` (`send-lead-emails`, `send-student-welcome`, `send-followup-emails`) are Deno, run with **`verify_jwt = false`** (`supabase/config.toml`), and are therefore publicly callable — each must validate its own input. Email goes through Resend (`RESEND_API_KEY`); HTML is hand-built inline with table layouts and every interpolated value passed through the local `esc()`.

### Analytics
GA4 (`G-PDWZPMEMZB`), Google Ads (`AW-18192612568`) and Clarity load **only** from the snippet in `index.html`. GA4 records page views itself — the first on load, later ones from client-side route changes via enhanced measurement's browser-history page views (this depends on the GA4 web stream setting "Page changes based on browser history events" staying on) — so **never send an untargeted `page_view` from the app**; doing so double-counted every page until Oct 2026. The one exception is `trackAdsPageView()`, which `AnalyticsProvider` sends on client-side route changes with `send_to` set to the Ads tag only, so the Ads tag still sees `/thank-you` and other in-app navigations without touching GA4's counts. Otherwise `src/lib/analytics.ts` + `AnalyticsProvider` handle custom events (`phone_click`, `generate_lead`, CTA/form events) and the Ads lead conversion. `trackLeadConversion()` fires the Google Ads conversion at most once per page session.

**Analytics is suppressed on documents loaded at an internal route** (`/admin*`, the student `/dashboard`, and the legacy `/email-templates` redirect): the `index.html` snippet checks the path once, before loading any tag, and `isInternalRoute()` in `src/lib/analytics.ts` guards events and the Ads page view — keep the two prefix lists in step. Because the snippet only runs on a full document load, any in-app link or redirect from a public page **into** an internal route must be a full page load (`window.location.assign`), never `navigate()` or `<Link>`; otherwise GA4 and Clarity keep running on pages that show lead and student names. `StudentDashboard` also enters `/admin` with a full page load.

### SEO
Per-page `<Seo>` (react-helmet-async) sets title/description/canonical/OG against `https://www.qualifypro.com.au`; `/thank-you` is `noindex` and excluded from the sitemap. Site-wide `LocalBusiness` JSON-LD lives in `index.html`.

### Content
`src/data/courses.ts` is the single source of truth for course names, prices, durations and inclusions; `src/data/eligibility.ts` is the same for BPC experience minimums; `src/data/referral.ts` is the same for the referral offer, whose two figures are also repeated as literals in `send-lead-emails` and `send-student-welcome` (edge functions can't import from `src/`). Both headers document their conventions. Prices are authored ex-GST only — the GST-inclusive total is derived and is always the headline figure, with `exGstNote` ("($7,995 + GST)") beside it. Never repeat a course or eligibility detail as a literal elsewhere, including in JSON-LD.

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
- **Branches**: GitHub doesn't delete head branches on merge here. A PR opened against another PR's branch keeps that branch as its base; GitHub only retargets it to `main` when the first PR's branch is deleted. If that branch is left in place after the first PR merges, the second PR merges into the stale branch, not `main` — #8 and #11 did exactly that and needed #13 to land. Base PRs on `main`, or merge the base PR and delete its branch before merging the next. `growth-agent` is an orphan branch holding the scheduled growth agent's log (`growth/log.md`, `growth/strategy.md`) plus a `vercel.json` that turns off Vercel deployments for it: never merge it or branch from it.
- **Animations on prerendered pages**: framer-motion renders an element's `initial` into the prerendered HTML, so `initial={{ opacity: 0 }}` ships it invisible until the JS has loaded and hydrated. Mount-time `initial`s (paired with `animate`) must use `entrance()` from `src/lib/entrance.ts`, and so must `whileInView` elements that can be on the first screen (`entranceIf()` for list items where only the first few can). They render visible on first load and animate only on client-side navigations; content further down keeps a plain `initial` and animates in on scroll. `entrance()` reads module state set after the app's first commit, so content that first mounts *after* that commit on the first page (a nested `<Suspense>`/lazy section, a subtree swapped on a media query, client-only content) must not have a hidden `initial`, or it flashes visible → hidden → visible. `scripts/prerender.ts` fails the build if any page's `<h1>` ships at `opacity:0`.
