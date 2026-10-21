// Runs after `vite build` + the SSR build (see the "build" script in package.json).
//
// Renders every public marketing route to static HTML so Google and AI crawlers
// (which mostly don't run JavaScript) see the real page content, titles, meta and
// JSON-LD. The browser then hydrates over this HTML (src/main.tsx).
//
// Output:
//   dist/index.html            -> prerendered home page
//   dist/<route>.html          -> prerendered page, served at /<route> via vercel.json cleanUrls
//   dist/404.html              -> prerendered "page not found"; Vercel serves it with a real
//                                 404 status for every path that matches no file or rewrite
//   dist/spa.html              -> the untouched empty shell, used by the vercel.json
//                                 rewrites for the client-only routes (thank-you, admin, dashboard)

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

const { render, routes, notFoundPath } = (await import(
  pathToFileURL(resolve("dist-ssr/entry-server.js")).href
)) as {
  render: (url: string) => Promise<{ html: string; head: string }>;
  routes: string[];
  notFoundPath: string;
};

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

// Every page's <h1> must be visible in the static HTML itself. An inline
// opacity of 0 on it or on an ancestor means a framer-motion `initial` that isn't
// wrapped in entrance() (src/lib/entrance.ts): the heading would stay invisible
// until the JavaScript has loaded, which on a phone is seconds.
const hasZeroOpacity = (style: string) =>
  style.split(";").some((declaration) => {
    const [property, value] = declaration.split(":");
    return property?.trim().toLowerCase() === "opacity" && parseFloat(value) === 0;
  });

function assertHeadingVisible(html: string) {
  const root = document.createElement("div");
  root.innerHTML = html;
  const headings = [...root.querySelectorAll("h1")];
  if (!headings.length) throw new Error("no <h1> in the rendered page");
  for (const h1 of headings) {
    for (let el: Element | null = h1; el && el !== root; el = el.parentElement) {
      if (hasZeroOpacity(el.getAttribute("style") || "")) {
        const text = (h1.textContent || "").trim().slice(0, 50);
        throw new Error(
          `<h1> "${text}" ships hidden (opacity:0 on <${el.tagName.toLowerCase()}>): wrap that framer-motion initial in entrance()`,
        );
      }
    }
  }
}

// Each marketing route, then the "page not found" page.
const targets = [
  ...routes.map((route) => ({ route, file: route === "/" ? "index.html" : `${route.slice(1)}.html` })),
  { route: notFoundPath, file: "404.html" },
];

let failures = 0;
for (const { route, file } of targets) {
  try {
    (globalThis as { happyDOM?: { setURL?: (url: string) => void } }).happyDOM?.setURL?.(SITE + route);
    const { html, head } = await render(route);
    if (!html.trim()) throw new Error("rendered empty HTML");
    assertHeadingVisible(html);

    let page = shell;
    if (head.includes("<title")) for (const re of OVERRIDDEN) page = page.replace(re, "");
    page = page.replace("</head>", `${head}\n  </head>`);
    if (!page.includes('<div id="root"></div>')) throw new Error("root div not found in shell");
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

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
