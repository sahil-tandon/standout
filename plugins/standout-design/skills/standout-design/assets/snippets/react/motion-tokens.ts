/**
 * motion-tokens
 * -------------
 * Centralised motion design tokens: durations (ms), easing curves (as
 * cubic-bezier strings), and spring presets. One source of truth shared across
 * CSS, the Web Animations API, and Motion / Framer Motion.
 *
 * Usage with CSS variables:
 *   import { cssMotionVars } from "./motion-tokens";
 *   // Spread into a :root style tag or a styled-components GlobalStyle:
 *   //   --duration-base: 240ms; --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1); ...
 *   // Then in CSS: transition: transform var(--duration-base) var(--ease-out-expo);
 *
 * Usage with Motion / Framer Motion:
 *   import { motion } from "motion/react"; // or "framer-motion"
 *   import { duration, easing, spring } from "./motion-tokens";
 *
 *   // Tween (easing arrays map 1:1 to a cubic-bezier):
 *   <motion.div
 *     animate={{ y: 0 }}
 *     transition={{ duration: duration.base / 1000, ease: easing.outExpo }}
 *   />
 *
 *   // Spring preset:
 *   <motion.div animate={{ scale: 1 }} transition={spring.snappy} />
 *
 * Dependencies: none for the tokens themselves. The Motion examples assume
 * `motion` >= 11 (`motion/react`) or `framer-motion` >= 11. TypeScript.
 */

/** Durations in milliseconds. Divide by 1000 for Motion's seconds-based API. */
export const duration = {
  instant: 80,
  fast: 160,
  base: 240,
  slow: 360,
  slower: 520,
  slowest: 720,
} as const;

/**
 * Easing curves as cubic-bezier control points `[x1, y1, x2, y2]`.
 * Motion accepts this 4-tuple directly as `ease`. For CSS, use the
 * `cubicBezier` strings below.
 */
export const easing = {
  // Standard "ease-in-out" replacement, slightly snappier.
  standard: [0.4, 0, 0.2, 1],
  // Decelerate: things entering the screen.
  out: [0, 0, 0.2, 1],
  // Accelerate: things leaving the screen.
  in: [0.4, 0, 1, 1],
  // Expressive deceleration, great for hero/reveal motion.
  outExpo: [0.16, 1, 0.3, 1],
  // Overshoot/anticipation (back-out). Use sparingly for playful UI.
  outBack: [0.34, 1.56, 0.64, 1],
  // Gentle, almost-linear for ambient/background loops.
  gentle: [0.25, 0.1, 0.25, 1],
} as const;

/** Same curves as ready-to-use CSS `cubic-bezier(...)` strings. */
export const cubicBezier = {
  standard: bez(easing.standard),
  out: bez(easing.out),
  in: bez(easing.in),
  outExpo: bez(easing.outExpo),
  outBack: bez(easing.outBack),
  gentle: bez(easing.gentle),
} as const;

/**
 * Physics-based spring presets, shaped for Motion's `type: "spring"` transition.
 * Tune `stiffness`/`damping`/`mass` rather than `duration` for springs.
 */
export const spring = {
  // Tight, responsive UI feedback (buttons, toggles).
  snappy: { type: "spring", stiffness: 520, damping: 32, mass: 1 },
  // Default workhorse for most layout transitions.
  smooth: { type: "spring", stiffness: 280, damping: 30, mass: 1 },
  // Soft, drifty motion for cards/sheets.
  gentle: { type: "spring", stiffness: 140, damping: 24, mass: 1.1 },
  // Visible bounce for playful affordances.
  bouncy: { type: "spring", stiffness: 360, damping: 14, mass: 1 },
} as const;

// ---- Types -----------------------------------------------------------------

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;
export type SpringToken = keyof typeof spring;
/** A cubic-bezier control-point tuple. */
export type Bezier = readonly [number, number, number, number];

// ---- Helpers ---------------------------------------------------------------

/** Format a bezier tuple as a CSS `cubic-bezier(...)` string. */
function bez(c: Bezier): string {
  return `cubic-bezier(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`;
}

/**
 * Typed accessor returning a ready-to-use CSS `transition` shorthand value.
 *   motionTransition("transform", "base", "outExpo")
 *     -> "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)"
 */
export function motionTransition(
  property: string,
  d: DurationToken = "base",
  e: EasingToken = "standard",
): string {
  return `${property} ${duration[d]}ms ${cubicBezier[e]}`;
}

/**
 * Flatten every token into a `--`-prefixed CSS custom-property map suitable for
 * spreading into a React `style` object or serialising into a `:root` block.
 */
export function cssMotionVars(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(duration)) {
    vars[`--duration-${name}`] = `${value}ms`;
  }
  for (const [name, value] of Object.entries(cubicBezier)) {
    // camelCase -> kebab-case (outExpo -> out-expo)
    const kebab = name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    vars[`--ease-${kebab}`] = value;
  }
  return vars;
}

export default { duration, easing, cubicBezier, spring, motionTransition, cssMotionVars };
