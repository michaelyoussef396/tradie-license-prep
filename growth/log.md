# Qualify Pro growth agent — run log

## 2026-10-22 13:31 AEDT · MIDDAY (first logged run; 08:30 morning run on 22 Oct was skipped — computer not connected)
- Leads: NOT CHECKED. Supabase connector → permission denied (still MRC org only). Chrome fallback blocked: 2 Chrome browsers connected (macOS "Browser 1", Linux "Browser 2"), none selected for the session; tool requires a user pick, so no Supabase SQL editor / Google Ads access.
- Ads pulse: NOT CHECKED (same Chrome block).
- Follow-up cron (net._http_response): NOT CHECKED.
- Fix for Michael: select the macOS Chrome as default for this routine (or disconnect the Linux one).
- Baseline still = 21 Oct research lap (Project doc claude/qualify-pro-research-lap2.html). All recommendations from that lap still untracked/open.

## 2026-10-22 17:19 AEDT · EVENING (manual re-run, Michael picked macOS Chrome = deviceId e280fa94… — it's labelled "Browser 2" now, names swap)
- Leads: NOT CHECKED — Chrome (macOS) is signed out of Supabase (dashboard → sign-in page). Connector still permission-denied. Cron check also not done.
- Ads today (22 Oct, partial): A$8.61 · 2 clicks · 54 impr · 0 conv (Registration only; Carpentry 0 impr today).
- Ads yesterday (21 Oct): A$18.69 · 3 clicks · 35 impr · 0 conv (Registration 5 impr/3 clk/A$18.69; Carpentry 30 impr/0 clk).
- Since campaigns started 1 Oct (Ads shows start Oct 1, not 15 Oct): ~A$137 (A$128.75 to 21 Oct + today) · ~22 clicks · 0 Ads conversions. Avg CPC A$6.44.
- Settings unchanged vs 21 Oct: both campaigns still Google search + Search partners; Victoria; 6am–9pm; Registration A$15 Max clicks, Carpentry A$2 Target IS; both "Eligible (Learning)". Old campaign paused. Opt score 92.2% / 97.3%. Google showing "limited by budget" rec.
- Recommendations from 21 Oct: Search partners OFF — NOT done. Others not checked this run.
- Left Ads campaigns view date range on Last 30 days.

## 2026-10-22 17:34 AEDT · EVENING (scheduled run; selected macOS Chrome e280fa94 per Michael's earlier pick — Chrome still asks each session)
- Leads: NOT CHECKED — Supabase connector permission-denied; macOS Chrome still on Supabase sign-in page. Cron job 3 check not done either.
- Ads today (22 Oct, partial): A$8.61 · 2 clicks · 61 impr · 0 conv (Registration 60 impr/2 clk; Carpentry 1 impr). Unchanged spend since 17:19 run. Calls column not read.
- To date since 1 Oct: ~A$137.36 · 22 clicks · 0 Ads conv. Both campaigns Eligible (Learning); old campaign paused.
- Day wrap: A$8.61 / 2 clicks / leads unknown. Overnight: nothing (ads off 9pm–6am).
- Open: Michael to sign Supabase back in on macOS Chrome so lead checks work; Search partners OFF still not done.

## 2026-10-23 15:03 AEDT · EVENING (fired late — 08:30 & 12:30 runs today skipped, computer not connected)
- Leads: NOT CHECKED in Supabase — connector still permission-denied; Chrome extension unreachable (computer asleep/Chrome closed). Cron job 3 + net._http_response not checked.
- GA4 proxy (API via desktop bridge, works): 22 Oct sessions 19 (cpc 4, organic 2, direct 11); 23 Oct so far 3 (cpc 2, organic 1). No generate_lead either day. 1 phone_click 23 Oct 9am on / from google organic (possible call to Adrian — unconfirmed).
- Ads: NOT CHECKED (Chrome unreachable).
- Production smoke test: NOT DONE — sandbox can't reach qualifypro.com.au; device shell has no folder connected.
- Open PRs: #14–#23 all still unmerged.
- Suggestions: none new. Still open from 21 Oct: Search partners off, Presence, negatives, keyword pauses.

## 2026-10-23 17:33 AEDT · EVENING (scheduled)
- Leads: NOT CHECKED — Supabase connector still permission-denied; Chrome extension unreachable again. Cron job 3 not checked.
- GA4 proxy 23 Oct (full day so far): 5 sessions (cpc 3 / 2 engaged, organic 2 / 1 engaged). No generate_lead. 1 form_start on /builders-licence-melbourne ~9am (no submit) + the 9am phone_click on / already noted at 15:03.
- Ads: NOT CHECKED (Chrome unreachable).
- Day wrap: spend unknown · 3 paid sessions · 0 GA4 leads. Nothing overnight (ads 6am–9pm).
- Blocker for Michael: leave the Mac awake with Chrome open + signed in to Supabase, or grant the Supabase connector access to the Qualify Pro org — 3rd day with no direct lead check.

## 2026-10-24 08:34 AEDT · MORNING (Sat — competitor watch)
- Leads: NOT CHECKED in Supabase — connector still permission-denied; Chrome extension unreachable (Mac awake, bridge up, Chrome not reachable). Cron job 3 not checked. 4th day without a direct lead check.
- GA4 proxy: 23 Oct final = 7 sessions (cpc 5 / 3 engaged, organic 2 / 1 engaged). No generate_lead 22–24 Oct. Only events: 23 Oct 9am form_start on /builders-licence-melbourne (cpc, no submit) + phone_click on / (organic). 24 Oct: nothing yet.
- Paid sessions 15–23 Oct (GA4 cpc): 30 total. Ads numbers NOT CHECKED (Chrome).
- Search Console: /builder-registration-course-melbourne and /faq now "Submitted and indexed" (crawled 22 Oct 02:58 UTC) — 22 Oct indexing request worked. Site-wide GSC 20–25 impr/day since 11 Oct, pos ~6–8 (the page filter in the gsc tool didn't apply — numbers are site-wide).
- Production smoke test: NOT DONE — sandbox egress blocks qualifypro.com.au; Chrome unreachable.
- Open PRs: #14–#23 still unmerged.
- Competitor watch (web search only, no SERP/auction data): MBV launched "Builder Registration – Online Exam Study Bundle" (practice CBT quizzes + standards access; A$1,273 members / A$2,376 non-members, self-study). BRIQ (briq.com.au, Melbourne app, 500+ practice Qs, free trial) is publishing 2026 BPC exam content ("DB-U registration Victoria 2026", "how to study for BPC online builder exam"). TIV 6-wk course and MBV DB-U hybrid also rank. Angle to counter: live coaching vs self-study quizzes/app.
- Suggested: ad copy test headlines "Live Coaching, Not An App" / "Weekly Live Classes + Zoom 1:1" (no new claims). Still open since 21 Oct (unverified): Search partners off, Presence, negatives, keyword pauses/adds.

## 2026-10-25 01:23 AEDT · MORNING (Sun — manual run by Michael, covers last 48h; 24 Oct MIDDAY + EVENING runs were skipped, computer not connected)
- Leads: NOT CHECKED in Supabase — connector permission-denied; Mac Chrome reachable but signed out of Supabase. Cron job 3 not checked. 5th day without a direct lead check.
- GA4 proxy 23–25 Oct: 0 generate_lead. Paid form_start ×2 with no submit (23 Oct 9am /builders-licence-melbourne; 24 Oct 1pm /builder-registration-course-melbourne). cta_click ×2 (/builders-licence-melbourne). phone_click ×1 (23 Oct 9am, / organic).
- Sessions: 23 Oct 7 (paid 5/3 engaged, organic 2); 24 Oct 8 (paid 3/2, organic 3/2, direct 1, unassigned 1).
- Ads (Chrome OK): Fri 23 A$14.28 · 5 clk · 45 impr · 0 conv | Sat 24 A$14.09 · 3 clk · 42 impr · 0 conv | Oct 1–24 A$171.37 · 32 clk · 418 impr · CTR 7.66% · CPC A$5.36 · 0 conv. Ads clicks 23–24 (8) = GA4 paid sessions (8) ✔.
- Calls: call asset 0411 626 398 now Eligible (account + both campaigns); 30 days: 11 phone impr, 0 calls.
- Impression share 13.93% (Sep 25–Oct 24) vs 13.7% baseline — flat. Auction: buildersacademy 24.4%, builderregistration 21.0%, onsitecoaching 19.1%, parkerbrent 17.5%, licencetobuild 14.7%, makbuilderregistration 14.1%, us 13.9%. No new competitors; tiv.vic.edu.au dropped out.
- Settings: both campaigns still Google search + Search partners, Victoria, 6am–9pm, budgets unchanged. No disapproved ads.
- DONE (newly verified): shared list "QP core negatives" (107 kws) applied to both campaigns — includes check, search, lookup, complaint, insurance, owner builder, cert iv, tafe, jobs, salary, nsw, qld, sa, wa, canberra; no "act". Negatives rec CLOSED.
- Still open: Search partners off; Presence (not verified — not in settings table); keyword pause/add list not verified.
- Search terms (30d): only 10 of 32 clicks visible, all on-intent; 22 clicks (A$112.54) in "Other search terms". No keyword near 15 clicks (top: "builder registration victoria" 4 clk A$25.70).
- Landing pages (GA4 paid since 15 Oct): /builder-registration-course-melbourne 19 sess, 15 engaged, avg 145 s; /builders-licence-melbourne 9 sess, 8 engaged, avg 7 s. Under 30 each — keep watching.
- Production watch: all pass (/this-should-404 404, /Courses 404, /admin 200, /courses/ → /courses, 3 landing pages 200 with own title + H1 + "Send My Enquiry", no opacity:0 H1, gtag present, internal click adds exactly one Ads-only page_view). Sitemap 9 URLs (no class pages — #19 unmerged).
- Open PRs #14–#23 still unmerged.
- Suggested: sign Supabase back in; Search partners off + Presence; Adrian review ask (Sunday trust task).

## 2026-10-25 13:54 AEDT · MIDDAY (Sun, scheduled; fired ~80 min late)
- Leads: NOT CHECKED in Supabase — connector permission-denied; Mac Chrome (e280fa94) still on Supabase sign-in. Cron job 3 + net._http_response not checked. 6th day without a direct lead check.
- GA4 proxy: no generate_lead 24–25 Oct. 25 Oct so far: 2 sessions (paid 1 → /builder-registration-course-melbourne, direct 1).
- Ads today (25 Oct, partial): A$2.91 · 1 clk · 25 impr · 0 conv (Registration only; Carpentry 0 impr). Ads clicks = GA4 paid sessions ✔.
- To date Oct 1–25: ~A$174.28 · 33 clk · 0 conv. Both campaigns Eligible (Learning), budgets unchanged, old campaign paused. Calls not read.
- Suggestions: none new. Still open: sign Supabase back in on Mac Chrome; Search partners off; Presence.

## 2026-10-26 01:02 AEDT · EVENING wrap for Sun 25 Oct (scheduled 17:33, fired ~7.5 h late; ran as EVENING, not MORNING — the 08:30 Mon run does the deep work)
- Leads: NOT CHECKED in Supabase — connector permission-denied; Mac Chrome still signed out of Supabase. Cron job 3 not checked. 7th day without a direct lead check.
- GA4 proxy 25 Oct: 7 sessions (paid 3, organic 2, direct 1, referral 1). 0 generate_lead / form_start / phone_click.
- Ads Sun 25 Oct (from today-vs-yesterday deltas): A$11.64 · 4 clk · 42 impr · 0 conv. Ads 4 clicks vs GA4 3 paid sessions (fine).
- To date Oct 1–25: ~A$183 · ~36 clk · 0 conv. Both campaigns Eligible (Learning), budgets A$15 / A$2, old campaign paused. Opt score 96.4% / 95.6%.
- Day wrap: A$11.64 / 4 clicks / 0 leads (GA4). Nothing overnight.
- Suggestions: none new. Still open: sign Supabase back in on Mac Chrome; Search partners off; Presence.

## 2026-10-26 08:34 AEDT · MORNING (Mon — rankings / Search Console)
- Leads: NOT CHECKED in Supabase — connector permission-denied; Mac Chrome (e280fa94) still on Supabase sign-in. Cron job 3 not checked. 8th day without a direct lead check.
- GA4 proxy 25–26 Oct: 0 generate_lead / form_start / phone_click. 25 Oct paid sessions 3 (all /builder-registration-course-melbourne).
- Ads today (26 Oct, 08:30): 5 impr · 0 clk · A$0. Sun 25: A$11.64 · 4 clk · 0 conv. Push 2 to date (new campaigns, all time): A$183.01 · 36 clk (Registration 34 / A$177.05, Carpentry 2 / A$5.96) · 0 conv.
- Settings unchanged: both still Google search + Search partners, Victoria, 6am–9pm, A$15 / A$2, Eligible (Learning). Old campaign paused.
- Keywords: "bpc exam" + "domestic builder unlimited" phrase are PRESENT → rec DONE. "building licence victoria" (53 impr, 1.89% CTR, 1 clk) + [builder registration] still enabled → pause rec still open. No keyword near 15 clicks (top 4 clk).
- Search terms (all time, new campaigns): only 10 visible, all on-intent. No new negatives.
- Paid landing pages since 15 Oct (GA4): /builder-registration-course-melbourne 22 sess / 17 engaged / avg 130 s; /builders-licence-melbourne 9 / 8 / 7 s. Still under 30 each.
- Production watch: all pass (404s, /admin 200 + no gtag, /courses/ → /courses, 3 landing pages 200 with own title + H1 + form, no opacity:0 H1, gtag on public, internal click = one Ads-only page_view). Sitemap 9.
- GSC (27 Sep–24 Oct vs prior 28d): 12 clk / 363 impr / pos 8.6 vs 15 / 769 — impressions −53% (the mid-Sep /bpc-exam-changes drop is still in the window). /bpc-exam-changes recovering hard: 40–41 impr/day on 23–24 Oct (vs ~14/day 11–21 Oct), 4 clicks those 2 days, pos ~9. "bpc exam" pos 8.5 (page 1, bottom). "dbu exam" pos ~11. /cgi-bin/ = Soft 404 in GSC (crawled 20 Oct, before real 404s shipped) — will drop out, no action.
- Open PRs #14–#23 still unmerged.
- Suggested: Supabase sign-in; Search partners off + pause 2 weak keywords; merge #16/#22/#23.

## 2026-10-26 12:33 AEDT · MIDDAY (Mon, scheduled)
- Leads: NOT CHECKED in Supabase — connector permission-denied; Mac Chrome (e280fa94) still on Supabase sign-in. Cron job 3 + net._http_response (only visible until ~3pm) not checked. 8th day without a direct lead check.
- GA4 proxy (property 530441384): 26 Oct so far 1 session (direct). 0 generate_lead / form_start / phone_click 25–26 Oct.
- Ads: all-time totals for new campaigns unchanged since 08:30 (A$183.01 · 36 clk · 0 conv) → today so far ~0 clicks / A$0 (reporting lag possible). Both Eligible (Learning), budgets A$15 / A$2, old campaign paused.
- No notification sent (nothing new since the 08:30 report). Suggestions: none new. Still open: Supabase sign-in; Search partners off; pause 2 weak keywords; Presence.
