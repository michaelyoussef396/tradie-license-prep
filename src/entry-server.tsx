// Build-time render entry, used only by scripts/prerender.ts (never shipped to the browser).
import { renderToString } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App, { PRERENDER_ROUTES, preloadRoute } from "./App";

export const routes = Object.keys(PRERENDER_ROUTES);

// scripts/prerender.ts installs happy-dom globals, so react-helmet-async detects a
// `window` at import time and skips collecting server state. Force server mode.
(HelmetProvider as unknown as { canUseDOM: boolean }).canUseDOM = false;

export async function render(url: string) {
  await preloadRoute(url);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App url={url} />
    </HelmetProvider>,
  );
  const h = helmetContext.helmet;
  const head = h
    ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("")
    : "";
  return { html, head };
}
