import { isInternalRoute } from "./analytics";

/**
 * Every public page's <title>, by path — the one place they're written.
 *
 * `<Seo>` takes its title from here by `path`, and main.tsx calls
 * `setTitleBeforeNavigation()` so the next page's title is in place before an in-app
 * navigation changes the URL. GA4 records in-app page views from browser-history changes
 * and reads document.title at that moment, while react-helmet-async only sets the new
 * title once the next page has rendered — so until this, every in-app page view carried
 * the previous page's title. scripts/prerender.ts fails the build if a prerendered page's
 * <title> differs from this table.
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
  "/thank-you": "Thank You | Qualify Pro",
};

export const NOT_FOUND_TITLE = "Page Not Found | Qualify Pro";

/**
 * The title the page at `pathname` will have. Unknown paths render the 404 page.
 * Internal routes (admin, student dashboard) return undefined: they set their own
 * titles and are never tracked.
 */
export function titleForPath(pathname: string): string | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (Object.prototype.hasOwnProperty.call(PAGE_TITLES, path)) return PAGE_TITLES[path];
  return isInternalRoute(path) ? undefined : NOT_FOUND_TITLE;
}

/**
 * Wraps history.pushState / replaceState so the destination page's title is set just
 * before the URL changes. Whichever order this and GA4's own history hook are installed
 * in, GA4 reads the title after the new one is in place.
 */
export function setTitleBeforeNavigation(): void {
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method];
    window.history[method] = function (this: History, data: unknown, unused: string, url?: string | URL | null) {
      if (url != null) {
        const title = titleForPath(new URL(String(url), window.location.href).pathname);
        if (title) document.title = title;
      }
      return original.call(this, data, unused, url);
    };
  }
}
