// Runs after `vite build` + the SSR build (see the "build" script in package.json).
//
// Renders every public marketing route to static HTML so Google and AI crawlers
// (which mostly don't run JavaScript) see the real page content, titles, meta and
// JSON-LD. The browser then hydrates over this HTML (src/main.tsx).
//
// Output:
//   dist/index.html            -> prerendered home page
//   dist/<route>.html          -> prerendered page, served at /<route> via vercel.json cleanUrls
//   dist/spa.html              -> the untouched empty shell, used by the vercel.json
//                                 rewrite for every non-prerendered path (admin, dashboards, 404)

import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { pathToFileURL } from "url";

const SITE = "https://www.qualifypro.com.au";
const dist = resolve("dist");

// Page modules touch browser globals at import time (e.g. the generated Supabase
// client reads localStorage), so give them a DOM before loading the SSR bundle.
GlobalRegistrator.register({ url: SITE + "/", width: 1280, height: 800 });

// Radix/framer use useLayoutEffect; React warns about it once per component on the
// server. Harmless for static output — keep the build log readable.
const consoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("useLayoutEffect does nothing on the server")) return;
  consoleError(...args);
};

const { render, routes } = (await import(
  pathToFileURL(resolve("dist-ssr/entry-server.js")).href
)) as { render: (url: string) => Promise<{ html: string; head: string }>; routes: string[] };

// Use the pristine shell. If spa.html exists this dist was already prerendered
// (re-run without a fresh vite build), and index.html is no longer the shell.
const shellPath = existsSync(resolve(dist, "spa.html")) ? "spa.html" : "index.html";
const shell = readFileSync(resolve(dist, shellPath), "utf8");
writeFileSync(resolve(dist, "spa.html"), shell);

// Default head tags in index.html that each page's <Seo> (react-helmet) replaces.
const OVERRIDDEN = [
  /<title>[\s\S]*?<\/title>\s*/,
  /<meta name="description"[^>]*>\s*/,
  /<meta property="og:url"[^>]*>\s*/,
  /<meta property="og:title"[^>]*>\s*/,
  /<meta property="og:description"[^>]*>\s*/,
  /<meta name="twitter:title"[^>]*>\s*/,
  /<meta name="twitter:description"[^>]*>\s*/,
];

let failures = 0;
for (const route of routes) {
  try {
    (globalThis as { happyDOM?: { setURL?: (url: string) => void } }).happyDOM?.setURL?.(SITE + route);
    const { html, head } = await render(route);
    if (!html.trim()) throw new Error("rendered empty HTML");

    let page = shell;
    if (head.includes("<title")) for (const re of OVERRIDDEN) page = page.replace(re, "");
    page = page.replace("</head>", `${head}\n  </head>`);
    if (!page.includes('<div id="root"></div>')) throw new Error("root div not found in shell");
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    writeFileSync(resolve(dist, file), page);
    console.log(`prerendered ${route} -> dist/${file} (${Math.round(page.length / 1024)} KB)`);
  } catch (err) {
    failures++;
    console.error(`prerender FAILED for ${route}:`, err);
  }
}

if (failures) {
  console.error(`${failures} route(s) failed to prerender`);
  process.exit(1);
}
// Exit explicitly: page modules leave timers/sockets open (e.g. the Supabase
// client's token refresh), which would otherwise keep the build hanging.
process.exit(0);
