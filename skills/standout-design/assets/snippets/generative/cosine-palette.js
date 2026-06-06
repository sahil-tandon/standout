/**
 * cosine-palette.js
 * -----------------
 * Inigo Quilez's cosine-based palette generator. A palette is defined by four
 * RGB vectors (a, b, c, d) and a parameter t in [0, 1]:
 *
 *     color(t) = a + b * cos( 2*PI * (c * t + d) )
 *
 *   a = base/offset, b = amplitude, c = frequency, d = phase (per channel).
 * Tiny, smooth, and infinitely sampleable, ideal for gradients, data viz ramps,
 * generative art, and shader uniforms (the same formula drops straight into
 * GLSL).
 *
 * Reference: https://iquilezles.org/articles/palettes/
 *
 * Usage:
 *   import { cosinePalette, PALETTES, sampleRamp } from "./cosine-palette.js";
 *   const rgb = cosinePalette(PALETTES.sunset, 0.3); // -> [r,g,b] in 0..1
 *   const css = rgbToCss(rgb);                        // -> "rgb(...)"
 *   const stops = sampleRamp(PALETTES.aurora, 8);     // 8 evenly spaced colours
 *
 * OKLCH ALTERNATIVE: cosine palettes interpolate in (gamma) RGB, which is fast
 * and GPU-friendly but not perceptually uniform: equal steps in `t` are not
 * equal steps in perceived lightness/chroma. For UI ramps where perceptual
 * evenness matters (charts, sequential scales), prefer interpolating in OKLCH
 * via the browser:
 *     `linear-gradient(in oklch, #a, #b)` in CSS, or `culori`'s
 *     `interpolate([...], 'oklch')` in JS. Use cosine palettes for art/texture
 *     and ambient gradients where smoothness beats perceptual rigor.
 *
 * No dependencies. Plain ESM, works in any modern browser / Node.
 */

const TAU = Math.PI * 2;

/**
 * Evaluate a cosine palette at parameter t.
 * @param {{a:number[],b:number[],c:number[],d:number[]}} palette
 * @param {number} t  position in [0, 1] (values outside wrap/extrapolate fine)
 * @returns {[number, number, number]} rgb in 0..1
 */
export function cosinePalette(palette, t) {
  const { a, b, c, d } = palette;
  const out = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    out[i] = a[i] + b[i] * Math.cos(TAU * (c[i] * t + d[i]));
    // Clamp; cos can push slightly out of [0,1] depending on a/b.
    out[i] = Math.min(1, Math.max(0, out[i]));
  }
  return out;
}

/** Sample `n` evenly spaced colours across the palette. */
export function sampleRamp(palette, n) {
  const ramp = [];
  for (let i = 0; i < n; i++) {
    ramp.push(cosinePalette(palette, n === 1 ? 0 : i / (n - 1)));
  }
  return ramp;
}

/** [r,g,b] (0..1) -> "rgb(r, g, b)" (0..255). */
export function rgbToCss([r, g, b]) {
  const to255 = (v) => Math.round(v * 255);
  return `rgb(${to255(r)}, ${to255(g)}, ${to255(b)})`;
}

/** [r,g,b] (0..1) -> "#rrggbb". */
export function rgbToHex([r, g, b]) {
  const to = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/**
 * Ready-made, tasteful presets. Each is {a, b, c, d}.
 * Tweak `d` (phase) to rotate hues, `b` (amplitude) for contrast.
 */
export const PALETTES = {
  // IQ's classic rainbow (the canonical example).
  rainbow: {
    a: [0.5, 0.5, 0.5],
    b: [0.5, 0.5, 0.5],
    c: [1.0, 1.0, 1.0],
    d: [0.0, 0.33, 0.67],
  },
  // Warm dusk: magenta -> amber -> teal.
  sunset: {
    a: [0.5, 0.5, 0.5],
    b: [0.5, 0.5, 0.5],
    c: [1.0, 1.0, 1.0],
    d: [0.0, 0.1, 0.2],
  },
  // Cool greens/blues, gentle shifts (good for ambient backgrounds).
  aurora: {
    a: [0.5, 0.5, 0.5],
    b: [0.45, 0.45, 0.45],
    c: [1.0, 1.0, 0.5],
    d: [0.8, 0.9, 0.3],
  },
  // Deep purples into hot pink, high chroma (vaporwave-ish).
  neon: {
    a: [0.6, 0.4, 0.6],
    b: [0.4, 0.3, 0.5],
    c: [1.0, 1.0, 1.0],
    d: [0.0, 0.15, 0.55],
  },
  // Low-contrast slate / mono ramp for restrained UI gradients.
  slate: {
    a: [0.45, 0.48, 0.55],
    b: [0.18, 0.18, 0.2],
    c: [1.0, 1.0, 1.0],
    d: [0.5, 0.55, 0.6],
  },
};

export default cosinePalette;
