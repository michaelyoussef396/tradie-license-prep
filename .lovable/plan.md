

## Redesign Email Templates Page

Replace the current over-designed email templates page with the simpler, cleaner design from the provided HTML. The new version has 5 templates (down from 7), plain-text style emails, and a more professional/minimalist look.

### Key Changes

**Structure**: Keep the same `EmailTemplates` component with Navigation, Footer, and PageTransition wrappers.

**Content changes**:
- **5 templates** instead of 7 (drop Referral Program and Referral Welcome)
- Simpler flow diagram with numbered steps and descriptions
- Plain email previews with basic To/From/Subject headers and text body
- "Why this matters" notes kept but simplified
- Remove fancy colored email chrome (gradients, colored headers, star ratings, referral codes)
- Use the provided copy exactly (e.g., "Hey Jordan" tone, simpler bullet points)

**Design approach**:
- White card-based layout on gray background
- Colored top label per template (blue, green, orange, purple)
- Simple email header rows (To/From/Subject)
- Plain text email body with standard typography
- Signature block simplified
- Responsive — stack flow steps vertically on mobile

**Templates to implement**:
1. Lead Notification (blue) — sent to Adrian
2. Auto-Reply to Lead (green) — sent to enquirer
3. Follow-Up Day 3 (orange) — automatic
4. Final Follow-Up Day 7 (purple) — last touchpoint
5. Review Request (green) — manual send after student passes

**File**: Only `src/pages/EmailTemplates.tsx` needs to be rewritten.

