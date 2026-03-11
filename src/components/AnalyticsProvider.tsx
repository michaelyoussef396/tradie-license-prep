import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGA4, initClarity, trackPageView, trackPhoneClick } from "@/lib/analytics";

/**
 * Initialises GA4 + Clarity on mount (non-admin routes only).
 * Tracks page_view on every route change.
 * Adds a global click listener for tel: links (phone_click event).
 */
const AnalyticsProvider = () => {
  const location = useLocation();
  const initialised = useRef(false);

  // Init scripts once
  useEffect(() => {
    if (initialised.current) return;
    if (location.pathname.startsWith("/admin")) return;
    initGA4();
    initClarity();
    initialised.current = true;
  }, [location.pathname]);

  // Track page views
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Global phone click listener
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
