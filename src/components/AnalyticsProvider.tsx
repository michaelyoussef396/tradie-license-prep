import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/analytics";

/**
 * Site-wide custom analytics events.
 *
 * GA4, Google Ads and Clarity are loaded once, by the snippet in index.html, and
 * GA4 records page views itself (the first one on load, later ones from
 * client-side route changes via enhanced measurement). Sending page_view from
 * here as well double-counted every page — so this only adds the global click
 * listener for tel: links (phone_click event). trackEvent() skips internal routes.
 */
const AnalyticsProvider = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="tel:"]');
      if (target) trackPhoneClick();
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
};

export default AnalyticsProvider;
