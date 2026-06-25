/*
 * custom-cursor.js
 * ------------------------------------------------------------------
 * A two-part custom cursor: a small instant "dot" that tracks the
 * pointer 1:1, and a larger "follower" ring that lags behind via a
 * longer GSAP quickTo duration (the duration delta creates the trail).
 * Supports hover-context: elements marked `data-cursor="..."` swap the
 * follower into a labeled / scaled state. Hides on touch devices and
 * fully disables under prefers-reduced-motion. The native cursor is
 * NEVER removed (accessibility): we keep it visible so keyboard and
 * assistive users are unaffected; the custom layer is purely additive.
 *
 * HOW TO USE
 *   import { initCursor } from './custom-cursor.js';
 *   initCursor();
 *   // Mark interactive zones:
 *   <a data-cursor="view" href="...">Project</a>
 *   <button data-cursor-scale="2.4">Play</button>
 *
 * DATA ATTRIBUTES
 *   data-cursor="Label"     show this text inside the follower on hover
 *   data-cursor-scale="N"   scale the follower by N on hover (default 2)
 *
 * REDUCED MOTION / TOUCH
 *   - prefers-reduced-motion: reduce  -> no custom cursor at all.
 *   - Coarse pointer (touch)          -> no custom cursor.
 *
 * DEPENDENCIES
 *   gsap (>= 3.11 for quickTo). Free as of 2025.
 *   Pairs with the optional CSS below (inject or add to your stylesheet).
 *
 * COMPANION CSS (minimal):
 *   .cursor-dot, .cursor-follower {
 *     position: fixed; top: 0; left: 0; pointer-events: none;
 *     z-index: 99999; border-radius: 50%; translate: -50% -50%;
 *   }
 *   .cursor-dot { width: 8px; height: 8px; background: currentColor; }
 *   .cursor-follower {
 *     width: 40px; height: 40px; border: 1px solid currentColor;
 *     display: grid; place-items: center; font-size: 11px;
 *     text-transform: uppercase; letter-spacing: .06em;
 *   }
 * ------------------------------------------------------------------
 */

import gsap from 'gsap';

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');
const COARSE = window.matchMedia('(pointer: coarse)');

export function initCursor(options = {}) {
  // Bail on touch or reduced-motion: native cursor stays as-is.
  if (REDUCED.matches || COARSE.matches) return () => {};

  const {
    dotClass = 'cursor-dot',
    followerClass = 'cursor-follower',
    hoverScale = 2,
  } = options;

  const dot = document.createElement('div');
  dot.className = dotClass;
  const follower = document.createElement('div');
  follower.className = followerClass;
  const label = document.createElement('span');
  follower.appendChild(label);
  document.body.append(dot, follower);

  // Dot tracks fast & tight; follower uses a longer duration -> it lags.
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
  const folX = gsap.quickTo(follower, 'x', { duration: 0.45, ease: 'power3.out' });
  const folY = gsap.quickTo(follower, 'y', { duration: 0.45, ease: 'power3.out' });

  function onMove(e) {
    dotX(e.clientX); dotY(e.clientY);
    folX(e.clientX); folY(e.clientY);
  }

  // Hover context: delegate so dynamically added nodes work too.
  function onOver(e) {
    const target = e.target.closest('[data-cursor], [data-cursor-scale]');
    if (!target) return;
    const text = target.getAttribute('data-cursor') || '';
    const scale = parseFloat(target.getAttribute('data-cursor-scale')) || hoverScale;
    label.textContent = text;
    gsap.to(follower, { scale, duration: 0.3, ease: 'power3.out' });
  }
  function onOut(e) {
    const target = e.target.closest('[data-cursor], [data-cursor-scale]');
    if (!target) return;
    label.textContent = '';
    gsap.to(follower, { scale: 1, duration: 0.3, ease: 'power3.out' });
  }

  window.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', onOver);
  document.addEventListener('mouseout', onOut);

  // Hide when the pointer leaves the window; show on return.
  const hide = () => gsap.to([dot, follower], { autoAlpha: 0, duration: 0.2 });
  const show = () => gsap.to([dot, follower], { autoAlpha: 1, duration: 0.2 });
  document.addEventListener('mouseleave', hide);
  document.addEventListener('mouseenter', show);

  return () => {
    window.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseover', onOver);
    document.removeEventListener('mouseout', onOut);
    document.removeEventListener('mouseleave', hide);
    document.removeEventListener('mouseenter', show);
    dot.remove();
    follower.remove();
  };
}
