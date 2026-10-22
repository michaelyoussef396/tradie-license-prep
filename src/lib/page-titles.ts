import { isInternalRoute } from "./analytics";

/**
 * Every public page's <title>, by path — the one place they're written.
 *
 * `<Seo>` takes its title from here by `path`. GA4 records in-app page views from
 * browser-history changes and reads document.title at that moment, while
 * react-helmet-async only sets the new title once the next page has rendered — so every
 * in-app page view used to carry the previous page's title. The history hook at the top
 * of index.html now sets the new page's title as soon as the URL changes, using
 * titleForPath (main.tsx hands it over through provideTitlesToHistoryHook()).
 *
 * A new public route needs an entry here: <Seo> throws without one in development and in
 * the prerender, and scripts/prerender.ts fails the build if a prerendered page has no
 * entry or a different <title>.
 */
export const PAGE_TITLES: Record<string, string> = {
  "/": "Qualify Pro | Melbourne BPC Registration Experts",
  "/courses": "BPC Training Programs & Pricing | Qualify Pro",
  "/about": "About Adrian Nicolazzo | Registered Builder & Mentor",
  "/success-stories": "Student Success Stories | Qualify Pro Melbourne",
  "/faq": "BPC Registration FAQs | Qualify Pro Melbourne",
  "/contact": "Contact Qualify Pro | Book a Free Consultation",
  "/builders-licence-melbourne": "Get Your Builder's Licence in Melbourne | Qualify Pro",
  "/builder-registration-course-melbourne": "Builder Registration Course Melbourne | Face-to-Face Mentorship",
  "/bpc-exam-changes": "BPC Exam 2026: Format, Rules & What's Changed | Qualify Pro",
  // The two class pages arrive with their own PR; their titles live here already so that PR
  // doesn't have to change this file (no merge conflict whichever order the two are merged in).
  "/domestic-builder-registration/unlimited": "Domestic Builder (Unlimited) Registration in Victoria | Qualify Pro",
  "/domestic-builder-registration/limited": "Domestic Builder (Limited) & Carpentry Registration in Victoria | Qualify Pro",
  "/thank-you": "Thank You | Qualify Pro",
};

export const NOT_FOUND_TITLE = "Page Not Found | Qualify Pro";

const hasEntry = (path: string) => Object.prototype.hasOwnProperty.call(PAGE_TITLES, path);

/**
 * The title the page at `pathname` will have. Unknown paths render the 404 page.
 * Internal routes (admin, student dashboard) return undefined: they aren't tracked, so
 * their title is left as it is.
 */
export function titleForPath(pathname: string): string | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (hasEntry(path)) return PAGE_TITLES[path];
  return isInternalRoute(path) ? undefined : NOT_FOUND_TITLE;
}

/** The title for a public page's own `path`, or undefined if PAGE_TITLES has no entry. */
export function pageTitle(path: string): string | undefined {
  return hasEntry(path) ? PAGE_TITLES[path] : undefined;
}

declare global {
  interface Window {
    /** Read by the history hook in index.html. */
    __qpTitleForPath?: (pathname: string) => string | undefined;
  }
}

/** Gives the history hook in index.html the title table. Call once, before rendering. */
export function provideTitlesToHistoryHook(): void {
  window.__qpTitleForPath = titleForPath;
}
