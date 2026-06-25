/**
 * flow-field.js
 * -------------
 * A canvas flow-field background. A grid of simplex-noise samples is turned into
 * an angle field; thousands of particles are advected along it, leaving fading
 * trails. The whole thing is seeded (mulberry32) so a given seed always renders
 * the same field. A slow time drift makes the field evolve.
 *
 * Self-contained: includes a compact 2D simplex-noise implementation (Gustavson
 * / Ashima, public domain) so there is no external dependency.
 *
 * Usage:
 *   import { FlowField } from "./flow-field.js";
 *   const field = new FlowField(canvasEl, {
 *     seed: 1337,
 *     particleCount: 2000,
 *     palette: ["#0ea5e9", "#a855f7", "#f43f5e"],
 *   });
 *   field.start();
 *   // later: field.destroy();
 *
 * REDUCED MOTION: if `prefers-reduced-motion: reduce` (or you pass
 * `reducedMotion: true`), the loop never starts. Instead a single static frame
 * is composed by advancing every particle a fixed number of steps once, drawing
 * the resulting streaks, then stopping.
 *
 * No build step required; this is plain ESM. Works in any modern browser.
 */

// ---- seeded PRNG: mulberry32 ----------------------------------------------
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- 2D simplex noise (seedable permutation table) -------------------------
function makeSimplex(rand) {
  const grad3 = [
    [1, 1], [-1, 1], [1, -1], [-1, -1],
    [1, 0], [-1, 0], [1, 0], [-1, 0],
    [0, 1], [0, -1], [0, 1], [0, -1],
  ];
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle with the seeded RNG.
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  const perm = new Uint8Array(512);
  const permMod12 = new Uint8Array(512);
  for (let i = 0; i < 512; i++) {
    perm[i] = p[i & 255];
    permMod12[i] = perm[i] % 12;
  }

  const F2 = 0.5 * (Math.sqrt(3) - 1);
  const G2 = (3 - Math.sqrt(3)) / 6;

  return function noise2D(xin, yin) {
    let n0 = 0, n1 = 0, n2 = 0;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    let i1, j1;
    if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      const gi0 = permMod12[ii + perm[jj]];
      t0 *= t0;
      n0 = t0 * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0);
    }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      const gi1 = permMod12[ii + i1 + perm[jj + j1]];
      t1 *= t1;
      n1 = t1 * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1);
    }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      const gi2 = permMod12[ii + 1 + perm[jj + 1]];
      t2 *= t2;
      n2 = t2 * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2);
    }
    return 70 * (n0 + n1 + n2); // ~[-1, 1]
  };
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const DEFAULTS = {
  seed: 1,
  particleCount: 2000,
  noiseScale: 0.0016, // spatial frequency of the field
  stepLength: 1.6, // px advanced per frame
  fieldStrength: Math.PI * 2, // angle range scaling
  timeDrift: 0.00006, // how fast the field evolves
  fade: 0.06, // trail fade per frame (0 = permanent trails)
  lineWidth: 1.1,
  palette: ["#38bdf8", "#818cf8", "#f472b6"],
  background: "#0b0b12",
  reducedMotion: undefined, // auto-detect when undefined
  staticSteps: 220, // streak length for the static frame
};

export class FlowField {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.opts = { ...DEFAULTS, ...options };
    this.raf = 0;
    this.time = 0;
    this.running = false;

    const rand = mulberry32(this.opts.seed);
    this.rand = rand;
    this.noise = makeSimplex(mulberry32(this.opts.seed ^ 0x9e3779b9));

    this._resize();
    this._spawnParticles();
    this._onResize = () => {
      this._resize();
      this._spawnParticles();
    };
    window.addEventListener("resize", this._onResize);
  }

  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.w = w;
    this.h = h;
    this._paintBackground();
  }

  _paintBackground() {
    this.ctx.fillStyle = this.opts.background;
    this.ctx.fillRect(0, 0, this.w, this.h);
  }

  _spawnParticles() {
    const { particleCount, palette } = this.opts;
    this.particles = new Array(particleCount).fill(0).map(() => ({
      x: this.rand() * this.w,
      y: this.rand() * this.h,
      color: palette[Math.floor(this.rand() * palette.length)],
      life: 0,
      maxLife: 80 + this.rand() * 220,
    }));
  }

  _angle(x, y) {
    const { noiseScale, timeDrift, fieldStrength } = this.opts;
    const n = this.noise(x * noiseScale, y * noiseScale + this.time * timeDrift);
    return n * fieldStrength;
  }

  _step(p) {
    const a = this._angle(p.x, p.y);
    const nx = p.x + Math.cos(a) * this.opts.stepLength;
    const ny = p.y + Math.sin(a) * this.opts.stepLength;
    this.ctx.strokeStyle = p.color;
    this.ctx.lineWidth = this.opts.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(p.x, p.y);
    this.ctx.lineTo(nx, ny);
    this.ctx.stroke();
    p.x = nx;
    p.y = ny;
    p.life++;

    // Respawn when off-screen or expired.
    if (p.x < 0 || p.x > this.w || p.y < 0 || p.y > this.h || p.life > p.maxLife) {
      p.x = this.rand() * this.w;
      p.y = this.rand() * this.h;
      p.life = 0;
    }
  }

  _frame() {
    // Fade previous frame slightly to create trails.
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = this._fadeColor();
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.globalCompositeOperation = "lighter";

    for (const p of this.particles) this._step(p);

    this.time += 16.7;
    this.raf = requestAnimationFrame(() => this._frame());
  }

  _fadeColor() {
    // Background colour with low alpha -> progressive trail fade.
    const a = this.opts.fade;
    const bg = this.opts.background;
    // Accept #rgb / #rrggbb.
    const h = bg.replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const int = parseInt(full, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  /** Compose one static, non-animated frame (used under reduced motion). */
  renderStaticFrame() {
    this._paintBackground();
    this.ctx.globalCompositeOperation = "lighter";
    const steps = this.opts.staticSteps;
    for (const p of this.particles) {
      for (let s = 0; s < steps; s++) {
        const a = this._angle(p.x, p.y);
        const nx = p.x + Math.cos(a) * this.opts.stepLength;
        const ny = p.y + Math.sin(a) * this.opts.stepLength;
        this.ctx.strokeStyle = p.color;
        this.ctx.lineWidth = this.opts.lineWidth;
        this.ctx.globalAlpha = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(nx, ny);
        this.ctx.stroke();
        p.x = nx;
        p.y = ny;
        if (p.x < 0 || p.x > this.w || p.y < 0 || p.y > this.h) break;
      }
    }
    this.ctx.globalAlpha = 1;
  }

  start() {
    const reduced =
      this.opts.reducedMotion === undefined
        ? prefersReducedMotion()
        : this.opts.reducedMotion;

    if (reduced) {
      this.renderStaticFrame();
      return;
    }
    if (this.running) return;
    this.running = true;
    this._paintBackground();
    this.raf = requestAnimationFrame(() => this._frame());
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy() {
    this.stop();
    window.removeEventListener("resize", this._onResize);
  }
}

export default FlowField;
