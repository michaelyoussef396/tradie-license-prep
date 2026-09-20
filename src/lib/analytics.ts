// Google Analytics 4 + Microsoft Clarity tracking utilities
// Scripts only load if env vars are set and the route is not internal.

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Paths that must never reach GA4 or Clarity.
 *
 * `/admin` covers the login, the dashboard and the email templates page. The
 * legacy `/email-templates` URL is listed too: it only redirects, but the
 * redirect happens in an effect, so without this the brief render before it
 * would still be tracked.
 */
const INTERNAL_PATH_PREFIXES = ['/admin', '/email-templates'];

export const isInternalRoute = (pathname: string = window.location.pathname) =>
  INTERNAL_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

// ── GA4 ──

export function initGA4() {
  const id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!id || isInternalRoute()) return;

  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  // Init dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false }); // we fire page_view manually
}

export function trackPageView(path: string) {
  if (!window.gtag || isInternalRoute()) return;
  window.gtag('event', 'page_view', { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, any>) {
  if (!window.gtag || isInternalRoute()) return;
  window.gtag('event', name, params);
}

// ── Microsoft Clarity ──

export function initClarity() {
  const id = import.meta.env.VITE_CLARITY_PROJECT_ID;
  if (!id || isInternalRoute()) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${id}");
  `;
  document.head.appendChild(script);
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
    value: 1400.0,
    currency: 'AUD',
  });
}
