/*
 * magnetic-button.js
 * ------------------------------------------------------------------
 * Makes element(s) "magnetic": as the cursor moves over (and near) the
 * button, the button (and optionally its inner label) is pulled toward
 * the pointer by an offset proportional to distance from center, then
 * springs back with an elastic ease on leave. Built on GSAP's
 * `gsap.quickTo` for buttery, allocation-free per-frame updates.
 *
 * HOW TO USE
 *   <button class="magnetic"><span class="magnetic__label">Hi</span></button>
 *   import { initMagnetic } from './magnetic-button.js';
 *   initMagnetic('.magnetic', { strength: 0.4, padding: 24 });
 *
 * OPTIONS
 *   strength  pull factor (0..1). 0.3-0.5 feels good.            (0.35)
 *   labelStrength  extra parallax for the inner label.          (0.6)
 *   padding   px of "magnetic field" beyond the button bounds.  (32)
 *   labelSelector  inner element to parallax separately.  ('.magnetic__label')
 *
 * REDUCED MOTION
 *   If the user prefers reduced motion, we skip all wiring and the
 *   button behaves as a normal static button.
 *
 * DEPENDENCIES
 *   gsap (>= 3.11 for quickTo). GSAP core is free as of 2025.
 *   <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
 *   or `import gsap from 'gsap'`.
 * ------------------------------------------------------------------
 */

import gsap from 'gsap';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initMagnetic(selector = '.magnetic', options = {}) {
  if (REDUCED.matches) return () => {};

  const {
    strength = 0.35,
    labelStrength = 0.6,
    padding = 32,
    labelSelector = '.magnetic__label',
  } = options;

  const els = Array.from(document.querySelectorAll(selector));
  const teardowns = els.map((el) => wire(el, { strength, labelStrength, padding, labelSelector }));

  // Return a disposer that detaches every listener/animation.
  return () => teardowns.forEach((fn) => fn());
}

function wire(el, { strength, labelStrength, padding, labelSelector }) {
  const label = el.querySelector(labelSelector);

  // quickTo gives us a reusable setter that tweens toward a value.
  const toX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
  const toY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
  const lToX = label && gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' });
  const lToY = label && gsap.quickTo(label, 'y', { duration: 0.5, ease: 'power3.out' });

  let rect = null;
  const cacheRect = () => { rect = el.getBoundingClientRect(); };

  function onMove(e) {
    if (!rect) cacheRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Activate only within the padded "field".
    if (
      e.clientX < rect.left - padding || e.clientX > rect.right + padding ||
      e.clientY < rect.top - padding || e.clientY > rect.bottom + padding
    ) {
      return reset();
    }

    toX(dx * strength);
    toY(dy * strength);
    if (lToX) { lToX(dx * strength * labelStrength); lToY(dy * strength * labelStrength); }
  }

  function reset() {
    // Elastic spring back to origin.
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' });
    if (label) gsap.to(label, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.3)' });
  }

  // We listen on the element + a small padded zone via mousemove on it,
  // but to catch the field we attach enter/leave plus a window move while active.
  let active = false;
  function onEnter() { active = true; cacheRect(); window.addEventListener('mousemove', onMove); }
  function onLeave() { active = false; window.removeEventListener('mousemove', onMove); reset(); }

  el.addEventListener('mouseenter', onEnter);
  el.addEventListener('mouseleave', onLeave);
  window.addEventListener('resize', () => { if (active) cacheRect(); });
  window.addEventListener('scroll', () => { if (active) cacheRect(); }, { passive: true });

  return () => {
    el.removeEventListener('mouseenter', onEnter);
    el.removeEventListener('mouseleave', onLeave);
    window.removeEventListener('mousemove', onMove);
    gsap.set([el, label].filter(Boolean), { clearProps: 'transform' });
  };
}
