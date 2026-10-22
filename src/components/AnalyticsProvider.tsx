import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackAdsPageView, trackPhoneClick } from "@/lib/analytics";

/**
 * Site-wide analytics hooks.
 *
 * GA4, Google Ads and Clarity are loaded once, by the snippet in index.html, and
 * GA4 records page views itself (the first one on load, later ones from
 * client-side route changes via enhanced measurement). Sending an untargeted
 * page_view from here as well double-counted every page, so this only:
 *  - sends a Google Ads-only page view on client-side route changes (the Ads
 *    tag otherwise sees document loads only), and
 *  - adds the global click listener for tel: links (phone_click event).
 * Both skip internal routes.
 */
const AnalyticsProvider = () => {
  const { pathname } = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    // The document load itself is covered by the AW config in index.html.
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    trackAdsPageView();
  }, [pathname]);

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
