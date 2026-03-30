

# Add GA4 and Microsoft Clarity Tracking

## Context
The project already has a dynamic analytics system (`src/lib/analytics.ts` + `AnalyticsProvider.tsx`) that loads GA4/Clarity via environment variables and excludes admin routes. However, the user wants the GA4 tag hardcoded directly in `index.html` for simplicity and reliability.

## Plan

### Step 1: Add GA4 script to index.html
Insert the Google tag snippet right after the opening `<head>` tag (line 3), before the charset meta tag. This ensures it loads as early as possible.

### Step 2: Set the environment variable for GA4
Set `VITE_GA4_MEASUREMENT_ID=G-PDWZPMEMZB` so the existing dynamic analytics system also has the ID available for route-change tracking and custom events (contact_form_submit, cta_click, phone_click etc.). The hardcoded snippet handles the initial page load; the AnalyticsProvider handles SPA navigation events.

### Step 3: Clarity — next steps
After GA4 is added, I'll ask you for your Microsoft Clarity Project ID so we can add that the same way (hardcoded in `<head>`). You can find it at clarity.microsoft.com → Settings → Overview → Project ID.

## Files to modify
- `index.html` — add GA4 script block in `<head>`
- `.env` — add `VITE_GA4_MEASUREMENT_ID`

No existing code or styling will be changed.

