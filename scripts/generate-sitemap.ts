// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.

import { writeFileSync } from "fs"
import { resolve } from "path"

const BASE_URL = "https://www.qualifypro.com.au"

interface SitemapEntry {
  path: string
  lastmod?: string
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority?: string
}

const entries: SitemapEntry[] = [
  // lastmod = the date each page was last meaningfully updated (not build time).
  // /thank-you is intentionally excluded (noindex).
  { path: "/", lastmod: "2026-08-14", changefreq: "weekly", priority: "1.0" },
  { path: "/bpc-exam-changes", lastmod: "2026-08-14", changefreq: "weekly", priority: "0.9" },
  { path: "/builder-registration-course-melbourne", lastmod: "2026-08-14", changefreq: "weekly", priority: "0.9" },
  { path: "/builders-licence-melbourne", lastmod: "2026-07-31", changefreq: "weekly", priority: "0.9" },
  { path: "/courses", lastmod: "2026-07-31", changefreq: "monthly", priority: "0.9" },
  { path: "/about", lastmod: "2026-07-31", changefreq: "monthly", priority: "0.7" },
  { path: "/success-stories", lastmod: "2026-07-31", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", lastmod: "2026-07-31", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", lastmod: "2026-07-31", changefreq: "monthly", priority: "0.8" },
]

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n")
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries))
console.log(`sitemap.xml written (${entries.length} entries)`)
