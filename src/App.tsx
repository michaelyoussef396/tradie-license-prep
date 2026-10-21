import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, StaticRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, Suspense, type ReactNode } from "react";
import { lazyWithPreload } from "./lib/lazyWithPreload";
import ScrollToTopButton from "./components/ScrollToTop";
import PageSkeleton from "./components/PageSkeleton";
import AnalyticsProvider from "./components/AnalyticsProvider";
import CallBar from "./components/CallBar";
import RequireAdmin from "./components/RequireAdmin";

// Lazy load pages for better performance
const Index = lazyWithPreload(() => import("./pages/Index"));
const Courses = lazyWithPreload(() => import("./pages/Courses"));
const About = lazyWithPreload(() => import("./pages/About"));
const SuccessStoriesPage = lazyWithPreload(() => import("./pages/SuccessStoriesPage"));
const Contact = lazyWithPreload(() => import("./pages/Contact"));
const ThankYou = lazyWithPreload(() => import("./pages/ThankYou"));
const BuildersLicenceMelbourne = lazyWithPreload(() => import("./pages/BuildersLicenceMelbourne"));
const BuilderRegistrationCourseMelbourne = lazyWithPreload(() => import("./pages/BuilderRegistrationCourseMelbourne"));
const BpcExamChanges = lazyWithPreload(() => import("./pages/BpcExamChanges"));
const FAQ = lazyWithPreload(() => import("./pages/FAQ"));
const EmailTemplates = lazyWithPreload(() => import("./pages/EmailTemplates"));
const AdminLogin = lazyWithPreload(() => import("./pages/AdminLogin"));
const AdminDashboard = lazyWithPreload(() => import("./pages/AdminDashboard"));
const StudentDashboard = lazyWithPreload(() => import("./pages/StudentDashboard"));
const NotFound = lazyWithPreload(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Public marketing routes rendered to static HTML at build time
// (scripts/prerender.ts) so Google and AI crawlers see the real content.
// Keep in step with scripts/generate-sitemap.ts.
export const PRERENDER_ROUTES: Record<string, { preload: () => Promise<void> }> = {
  "/": Index,
  "/courses": Courses,
  "/about": About,
  "/success-stories": SuccessStoriesPage,
  "/faq": FAQ,
  "/contact": Contact,
  "/builders-licence-melbourne": BuildersLicenceMelbourne,
  "/builder-registration-course-melbourne": BuilderRegistrationCourseMelbourne,
  "/bpc-exam-changes": BpcExamChanges,
};

/**
 * Path the build renders to dist/404.html. Vercel serves that file, with a real
 * 404 status, for any path that is neither a static file nor one of the SPA
 * rewrites in vercel.json.
 */
export const NOT_FOUND_PRERENDER_PATH = "/404";

/**
 * Load the page component for a prerendered page before rendering/hydrating it.
 * Only called when the HTML was prerendered, so any path that isn't a marketing
 * route is the 404 page.
 */
export const preloadRoute = (pathname: string) => {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return (PRERENDER_ROUTES[path] ?? NotFound).preload();
};

/** BrowserRouter in the browser; StaticRouter when prerendering a given URL. */
const Router = ({ url, children }: { url?: string; children: ReactNode }) =>
  url ? <StaticRouter location={url}>{children}</StaticRouter> : <BrowserRouter>{children}</BrowserRouter>;

// Scroll to top on route change
function ScrollToTopOnNavigate() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  
  return null;
}

const App = ({ url }: { url?: string }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router url={url}>
        <ScrollToTopOnNavigate />
        <AnalyticsProvider />
        <ScrollToTopButton />
        <CallBar />
        <div className="pt-12">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/success-stories" element={<SuccessStoriesPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/builders-licence-melbourne" element={<BuildersLicenceMelbourne />} />
            <Route path="/builder-registration-course-melbourne" element={<BuilderRegistrationCourseMelbourne />} />
            <Route path="/bpc-exam-changes" element={<BpcExamChanges />} />
            <Route path="/email-templates" element={<Navigate to="/admin/email-templates" replace />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
            <Route path="/admin/email-templates" element={<RequireAdmin><EmailTemplates /></RequireAdmin>} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </div>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
