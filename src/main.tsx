import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App, { preloadRoute } from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Marketing pages ship prerendered HTML (scripts/prerender.ts). Load that
// page's code first, then hydrate over the existing markup instead of
// replacing it, so there's no blank/skeleton flash. Everything else (admin,
// dashboards, 404) arrives as the empty SPA shell and renders normally.
if (container.hasChildNodes()) {
  Promise.resolve(preloadRoute(window.location.pathname)).finally(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
