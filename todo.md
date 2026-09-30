## Google Ads conversion fix (waiting on Vryan's Ads handover)
- [ ] Verify conversion label in Google Ads (BPC Form Submit → Tag setup, copy/paste, don't read by eye). Code has `qBXuCL2_jcccENj59OJD` (capital O); Vryan's log had `...590JD` (zero). If the code is wrong, no conversions are recording.
- [ ] Merge branch `fix/ads-conversion-value` (removes value 1400 + currency AUD from trackLeadConversion in src/lib/analytics.ts)
- [ ] Tag Assistant re-test after deploy on /builder-registration-course-melbourne, /builders-licence-melbourne, /bpc-exam-changes: conversion fires once, after submit only
- [ ] Mark TEST leads (first name TEST) as tests in the leads table
- Note: no enhanced conversions code on the site. The "User provided data" hit comes from Google Ads automatic setup.
