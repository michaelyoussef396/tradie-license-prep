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
