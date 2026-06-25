/*
 * velocity-marquee.js
 * ------------------------------------------------------------------
 * An infinite, seamless horizontal marquee whose base speed is
 * modulated by SCROLL VELOCITY, with a subtle skew that reacts to how
 * fast (and which direction) the user is scrolling. Built on GSAP:
 *   - A looping x-tween moves the track left forever.
 *   - We duplicate the content so the loop is seamless (wrap via
 *     gsap.utils.wrap / modulo on the x value).
 *   - On scroll we read velocity, nudge the tween's timeScale, and
 *     apply a transient skewX that eases back to 0.
 *
 * HOW TO USE
 *   <div class="marquee"><div class="marquee__track">
 *     <span>Design</span><span>Craft</span><span>Motion</span> ...
 *   </div></div>
 *   import { initVelocityMarquee } from './velocity-marquee.js';
 *   initVelocityMarquee('.marquee', { speed: 60 });   // px/sec
 *   // CSS: .marquee { overflow: clip; } .marquee__track { display: inline-flex; }
 *
 * OPTIONS
 *   speed        base px/sec drift.                              (50)
 *   velFactor    how strongly scroll velocity boosts timeScale. (0.0006)
 *   maxScale     clamp on the velocity-driven timeScale.          (6)
 *   skewFactor   px/sec -> degrees of skew.                    (0.012)
 *   maxSkew      clamp on skew degrees.                          (12)
 *
 * REDUCED MOTION
 *   Under prefers-reduced-motion we render the content STATIC (no
 *   loop, no skew, no scroll reactivity) and return a no-op disposer.
 *
 * DEPENDENCIES
 *   gsap (>= 3.11). Free as of 2025. No ScrollTrigger required (we use
 *   a passive scroll listener + velocity from delta/time).
 * ------------------------------------------------------------------
 */

import gsap from 'gsap';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initVelocityMarquee(selector = '.marquee', options = {}) {
  const root = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!root) return () => {};
  const track = root.querySelector('.marquee__track') || root.firstElementChild;
  if (!track) return () => {};

  // Reduced motion: leave it static.
  if (REDUCED.matches) return () => {};

  const {
    speed = 50,
    velFactor = 0.0006,
    maxScale = 6,
    skewFactor = 0.012,
    maxSkew = 12,
    direction = -1, // -1 drifts left, 1 drifts right
  } = options;

  // Duplicate content so we can wrap seamlessly: we need >= 2x the
  // visible width of content laid end-to-end.
  const original = track.innerHTML;
  track.innerHTML = original + original;

  // Measure one "half" (the original content width) for the wrap point.
  let half = track.scrollWidth / 2;
  const recompute = () => { half = track.scrollWidth / 2; };
  window.addEventListener('resize', recompute);

  // wrap keeps x within [-half, 0) so the duplicate seamlessly covers.
  const wrap = gsap.utils.wrap(-half, 0);
  let xPos = 0;

  // The continuous drift driven by GSAP's ticker for frame-rate safety.
  let baseScale = 1;
  let velScale = 0;
  let skew = 0;

  const tick = (time, deltaMs) => {
    const dt = deltaMs / 1000;
    const effectiveScale = baseScale + velScale;
    xPos += direction * speed * effectiveScale * dt;
    gsap.set(track, { x: wrap(xPos), skewX: skew });
    // Ease velocity contributions back to rest each frame.
    velScale = gsap.utils.interpolate(velScale, 0, 0.06);
    skew = gsap.utils.interpolate(skew, 0, 0.08);
  };
  gsap.ticker.add(tick);

  // --- Scroll velocity -> speed boost + skew ----------------------
  let lastY = window.scrollY;
  let lastT = performance.now();
  function onScroll() {
    const now = performance.now();
    const dy = window.scrollY - lastY;
    const dtMs = Math.max(now - lastT, 1);
    const velocity = dy / dtMs * 1000; // px/sec, signed
    lastY = window.scrollY;
    lastT = now;

    const boost = Math.min(Math.abs(velocity) * velFactor, maxScale);
    velScale = boost;
    skew = gsap.utils.clamp(-maxSkew, maxSkew, velocity * skewFactor * direction);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', recompute);
    track.innerHTML = original;
    gsap.set(track, { clearProps: 'transform' });
  };
}
