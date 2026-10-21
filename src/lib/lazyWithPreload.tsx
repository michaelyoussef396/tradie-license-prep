import { lazy, type ComponentType } from "react";

/**
 * React.lazy with an explicit `preload()`.
 *
 * Once preloaded, the component renders synchronously instead of suspending.
 * That lets the build-time prerender (src/entry-server.tsx) render real page
 * HTML, and lets main.tsx hydrate a prerendered page without flashing the
 * Suspense fallback.
 */
export type PreloadableComponent<P> = ComponentType<P> & { preload: () => Promise<void> };

export function lazyWithPreload<P extends object>(
  factory: () => Promise<{ default: ComponentType<P> }>,
): PreloadableComponent<P> {
  let Loaded: ComponentType<P> | null = null;
  let pending: Promise<void> | null = null;
  // The lazy wrapper renders exactly P; widen its inferred props type back to P.
  const Lazy = lazy(factory) as unknown as ComponentType<P>;

  const Component = ((props: P) =>
    Loaded ? <Loaded {...props} /> : <Lazy {...props} />) as PreloadableComponent<P>;

  Component.preload = () => {
    if (!pending) {
      pending = factory().then((m) => {
        Loaded = m.default;
      });
    }
    return pending;
  };

  return Component;
}
