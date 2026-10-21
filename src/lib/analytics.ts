// Custom analytics events and the Google Ads lead conversion.
//
// GA4, Google Ads and Microsoft Clarity are loaded by the snippet in index.html —
// the only place they load — and GA4 records page views itself. Never send an
// untargeted page_view (it reaches GA4 too and double-counts every page); the
// only page_view sent from here is the Ads-only one in trackAdsPageView().

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/**
 * Paths that must never reach GA4 or Clarity.
 *
 * `/admin` covers the login, the dashboard and the email templates page. The
 * legacy `/email-templates` URL is listed too: it only redirects, but the
 * redirect happens in an effect, so without this the brief render before it
 * would still be tracked.
 *
 * index.html applies the same rule before loading any tag (it can't import this
 * module) — keep its pattern in step with this list.
 */
const INTERNAL_PATH_PREFIXES = ['/admin', '/email-templates'];

export const isInternalRoute = (pathname: string = window.location.pathname) =>
  INTERNAL_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!window.gtag || isInternalRoute()) return;
  window.gtag('event', name, params);
}

// ── Convenience helpers ──

export function trackContactFormStart() {
  trackEvent('contact_form_start');
}

export function trackContactFormSubmit(props: {
  license_type: string;
  years_experience: string;
  source: string;
}) {
  trackEvent('contact_form_submit', props);
}

export function trackPhoneClick() {
  trackEvent('phone_click');
}

export function trackCtaClick(buttonText: string, page: string) {
  trackEvent('cta_click', { button_text: buttonText, page });
}

// ── Google Ads conversion ──

export const GOOGLE_ADS_ID = 'AW-18192612568';
export const GOOGLE_ADS_CONVERSION_ID = `${GOOGLE_ADS_ID}/qBXuCL2_jcccENj59OJD`;

/**
 * Google Ads-only page view for a client-side route change. GA4 records route
 * changes itself (enhanced measurement), but that event only reaches GA4, so
 * without this the Ads tag would see document loads only and URL-based
 * audiences (e.g. "reached /thank-you") would stop filling. `send_to` keeps it
 * out of GA4's counts.
 */
export function trackAdsPageView() {
  if (!window.gtag || isInternalRoute()) return;
  window.gtag('event', 'page_view', { send_to: GOOGLE_ADS_ID });
}

// Guards against double-firing within a single page session/submission.
let conversionFired = false;

export function trackLeadConversion() {
  if (conversionFired) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  conversionFired = true;
  window.gtag('event', 'conversion', {
    send_to: GOOGLE_ADS_CONVERSION_ID,
  });
}
