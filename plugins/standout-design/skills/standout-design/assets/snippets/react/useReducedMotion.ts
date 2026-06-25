/**
 * useReducedMotion
 * -----------------
 * Returns the user's current `prefers-reduced-motion` setting as a boolean
 * (`true` = the user wants reduced motion). Updates live when the OS setting
 * changes, via a `matchMedia` change listener. SSR-safe: returns `false` on the
 * server and during the first client render, then syncs in `useEffect` to avoid
 * hydration mismatches.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   return reduced ? <StaticPoster /> : <AnimatedThing />;
 *
 * Dependencies: React 19 (no other deps). TypeScript.
 */

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getInitialState(): boolean {
  // Guard for SSR / non-browser environments.
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  // Start `false` to match the server-rendered HTML, then reconcile in effect.
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mql = window.matchMedia(QUERY);

    // Sync immediately in case the OS value differs from the SSR default.
    setReduced(mql.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    // `addEventListener` is supported in all evergreen browsers. The older
    // `addListener` fallback is kept for Safari < 14.
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  return reduced;
}

/**
 * Synchronous read for non-React contexts (e.g. imperative canvas/WebGL setup).
 * Prefer the hook inside components so you get live updates.
 */
export function prefersReducedMotion(): boolean {
  return getInitialState();
}

export default useReducedMotion;
