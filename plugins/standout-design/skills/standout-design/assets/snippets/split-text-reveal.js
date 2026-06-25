/*
 * split-text-reveal.js
 * ------------------------------------------------------------------
 * A staggered hero headline reveal: GSAP SplitText breaks the heading
 * into lines (with masking), then a single timeline slides each line
 * up from behind its mask with an expo.out ease and a slight stagger.
 *
 * HOW TO USE
 *   <h1 class="hero-title">Designs that move with intent</h1>
 *   import { revealSplitText } from './split-text-reveal.js';
 *   revealSplitText('.hero-title');
 *
 * THE MASK TRICK
 *   SplitText's `mask: "lines"` (GSAP 3.13+) wraps each line in an
 *   overflow:clip container, so translating the inner line down 100%
 *   and animating to 0 produces a clean "rise from below" reveal with
 *   no visible overflow. We run it all on ONE timeline for a single,
 *   coordinated motion you can pause/scrub/reverse.
 *
 * REDUCED MOTION
 *   If the user prefers reduced motion, we DON'T split or animate:
 *   the heading is shown instantly in its natural state.
 *
 * FREE ALTERNATIVE
 *   SplitText is part of GSAP, which is fully free as of 2025
 *   (including the former "Club" plugins). If you'd rather avoid GSAP
 *   plugins entirely, Splitting.js (https://splitting.js.org, MIT) can
 *   produce the line/word/char wrappers; you'd then animate the
 *   resulting `.word` / `.char` elements with CSS or GSAP core.
 *
 * DEPENDENCIES
 *   gsap (>= 3.13) and its SplitText plugin (now free).
 *   import gsap from 'gsap';
 *   import { SplitText } from 'gsap/SplitText';
 *   gsap.registerPlugin(SplitText);
 * ------------------------------------------------------------------
 */

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)');

export function revealSplitText(selector = '.hero-title', options = {}) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  if (!el) return null;

  // Reduced motion: ensure it's simply visible, do nothing fancy.
  if (REDUCED.matches) {
    gsap.set(el, { autoAlpha: 1 });
    return null;
  }

  const {
    duration = 1,
    stagger = 0.12,
    ease = 'expo.out',
    y = '110%',
    delay = 0.1,
  } = options;

  // SplitText needs fonts ready to measure line breaks correctly.
  let timeline;
  const run = () => {
    const split = new SplitText(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
    gsap.set(el, { autoAlpha: 1 });

    timeline = gsap.timeline({ delay });
    timeline.from(split.lines, {
      yPercent: parseFloat(y),
      duration,
      ease,
      stagger,
    });

    // Optional: revert split DOM once done to restore clean markup.
    timeline.eventCallback('onComplete', () => split.revert());
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(run);
  } else {
    run();
  }

  return () => timeline && timeline.kill();
}
