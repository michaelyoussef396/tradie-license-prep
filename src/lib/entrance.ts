/**
 * Entrance animations that never hide prerendered content.
 *
 * Marketing pages ship prerendered HTML (scripts/prerender.ts). A framer-motion
 * element with `initial={{ opacity: 0 }}` is rendered into that HTML at opacity 0,
 * so the text stays invisible until the JavaScript has downloaded, hydrated and
 * animated it in — seconds on a phone, which is exactly when ad visitors leave.
 *
 * Wrap mount-time `initial` values with `entrance()`:
 *
 *   <motion.h1 initial={entrance({ opacity: 0, y: 20 })} animate={{ opacity: 1, y: 0 }}>
 *
 * Until the app's first commit in the browser (and always while prerendering),
 * `entrance()` returns `false`, which tells framer-motion to start in the
 * `animate` state: the HTML is visible immediately and hydration matches it.
 * After that, client-side navigations get the normal entrance animation.
 *
 * Scroll-triggered `whileInView` animations don't need this.
 */
let appHasPainted = false;

/** Called once from App after its first commit in the browser. */
export function markAppPainted() {
  appHasPainted = true;
}

export function entrance<T>(initial: T): T | false {
  return appHasPainted ? initial : false;
}
