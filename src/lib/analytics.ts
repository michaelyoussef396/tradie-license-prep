// Custom analytics events and the Google Ads lead conversion.
//
// GA4, Google Ads and Microsoft Clarity are loaded by the snippet in index.html —
// the only place they load — and GA4 records page views itself. Nothing here sends
// page_view: doing so double-counted every page.

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

export const GOOGLE_ADS_CONVERSION_ID = 'AW-18192612568/qBXuCL2_jcccENj59OJD';

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
