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
 * Scroll-triggered `whileInView` elements that can be on the first screen (top
 * within ~1,100px of the page on phone, tablet or desktop) need it too; with
 * `initial={false}` their whileInView is a no-op on first load. In a list where
 * only the first few items can be on the first screen, use `entranceIf()`.
 * Elements further down keep a plain `initial` and animate in as they're
 * scrolled to.
 *
 * Caveat: this reads module state set after the app's first commit. Anything
 * that first mounts *after* that commit on the first page (a nested Suspense or
 * lazy section, a subtree swapped on a media query, client-only content) gets
 * the hidden `initial` even though the server HTML showed it, so it would flash
 * visible → hidden → visible. Give such content no hidden `initial`.
 */
let appHasPainted = false;

/** Called once from App after its first commit in the browser. */
export function markAppPainted() {
  appHasPainted = true;
}

export function entrance<T>(initial: T): T | false {
  return appHasPainted ? initial : false;
}

/**
 * `entrance()` for list items where only some can be on the first screen: those
 * render visible on first load, the rest keep their scroll-in animation.
 *
 *   initial={entranceIf(index < 2, { opacity: 0, y: 30 })}
 */
export function entranceIf<T>(onFirstScreen: boolean, initial: T): T | false {
  return onFirstScreen ? entrance(initial) : initial;
}
