/*
 * lenis-gsap-sync.js
 * ------------------------------------------------------------------
 * The canonical Lenis + GSAP ScrollTrigger integration: a SINGLE
 * requestAnimationFrame loop drives both Lenis smooth scrolling and
 * GSAP's ticker, so there's exactly one rAF and ScrollTrigger stays
 * perfectly in sync with the smoothed scroll position.
 *
 * THE PATTERN (the important bits)
 *   - Create Lenis with `autoRaf: false` so Lenis does NOT start its
 *     own rAF loop.
 *   - Drive `lenis.raf(time)` from GSAP's ticker. GSAP ticker time is
 *     in SECONDS, so multiply by 1000 (Lenis wants ms).
 *   - `gsap.ticker.lagSmoothing(0)` keeps motion deterministic.
 *   - On every Lenis scroll, call `ScrollTrigger.update()` so triggers
 *     read the smoothed position, not the native one.
 *
 * HOW TO USE
 *   import { initLenisGsap } from './lenis-gsap-sync.js';
 *   const { lenis } = initLenisGsap();
 *   // ...then build ScrollTriggers as usual.
 *
 * REDUCED MOTION
 *   Smooth scroll is itself motion. Under prefers-reduced-motion we do
 *   NOT instantiate Lenis (native scrolling stays), but we still wire
 *   ScrollTrigger normally so scroll-linked pinning/animations work.
 *   (Pair with reduced-motion guards in the animations themselves.)
 *
 * DEPENDENCIES
 *   gsap (>= 3.12) + ScrollTrigger, and lenis (>= 1.1).
 *   import gsap from 'gsap';
 *   import { ScrollTrigger } from 'gsap/ScrollTrigger';
 *   import Lenis from 'lenis';   // styles: import 'lenis/dist/lenis.css'
 * ------------------------------------------------------------------
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initLenisGsap(lenisOptions = {}) {
  // Reduced motion: skip smooth scroll, but keep ScrollTrigger live.
  if (REDUCED.matches) {
    ScrollTrigger.refresh();
    return { lenis: null, destroy: () => {} };
  }

  const lenis = new Lenis({
    autoRaf: false, // critical: we own the rAF loop, not Lenis
    lerp: 0.1,
    smoothWheel: true,
    ...lenisOptions,
  });

  // Keep ScrollTrigger reading the smoothed scroll position.
  lenis.on('scroll', ScrollTrigger.update);

  // Single rAF: drive Lenis from GSAP's ticker (seconds -> ms).
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);

  // Deterministic timing; avoids GSAP's catch-up jumps after stalls.
  gsap.ticker.lagSmoothing(0);

  function destroy() {
    gsap.ticker.remove(tick);
    lenis.off('scroll', ScrollTrigger.update);
    lenis.destroy();
  }

  return { lenis, destroy };
}
