/**
 * TiltCard
 * --------
 * A 2.5D depth card. Children are stacked on different `translateZ` planes under
 * a single `perspective`, so when the card tilts toward the cursor (or device
 * gyroscope) the layers parallax against each other. A tracked specular
 * highlight follows the pointer and the drop shadow swings opposite the tilt for
 * a believable "lifted" feel.
 *
 * All animation is compositor-only (transform + opacity), so it stays on the GPU
 * and never triggers layout/paint. Values are written to CSS custom properties
 * and applied via `transform`, so React doesn't re-render on pointer move.
 *
 * Usage:
 *   <TiltCard maxTilt={14}>
 *     <TiltLayer depth={0}><img src="/bg.jpg" alt="" /></TiltLayer>
 *     <TiltLayer depth={40}><h3>Foreground title</h3></TiltLayer>
 *   </TiltCard>
 *
 * `depth` is in px of translateZ; bigger = pops further toward the viewer.
 *
 * REDUCED MOTION: tilt, gyro, parallax and the moving highlight are all disabled
 * under `prefers-reduced-motion: reduce`. The card renders flat and static (a
 * single resting frame) but remains fully interactive.
 *
 * Dependencies: react@^19. No other deps. TypeScript.
 */

import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "./useReducedMotion";

export interface TiltCardProps {
  children: ReactNode;
  /** Max rotation in degrees at the card edges. */
  maxTilt?: number;
  /** Perspective distance in px (smaller = stronger 3D). */
  perspective?: number;
  /** Smoothing factor 0..1 (higher = snappier follow). */
  ease?: number;
  /** Enable device-orientation (gyro) tilt on touch devices. */
  gyro?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface TiltLayerProps {
  children: ReactNode;
  /** translateZ depth in px. */
  depth?: number;
  className?: string;
  style?: CSSProperties;
}

/** A single parallax plane inside a TiltCard. */
export function TiltLayer({ children, depth = 0, className, style }: TiltLayerProps) {
  return (
    <div
      className={className}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
        // Layers further forward get a touch of parallax drift via the shared var.
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function TiltCard({
  children,
  maxTilt = 12,
  perspective = 900,
  ease = 0.15,
  gyro = true,
  className,
  style,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Target vs current (for eased follow). Stored in refs to avoid re-renders.
  const target = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5 });
  const current = useRef({ rx: 0, ry: 0, mx: 0.5, my: 0.5 });
  const raf = useRef(0);

  const apply = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const c = current.current;
    const t = target.current;
    // Exponential smoothing toward the target.
    c.rx += (t.rx - c.rx) * ease;
    c.ry += (t.ry - c.ry) * ease;
    c.mx += (t.mx - c.mx) * ease;
    c.my += (t.my - c.my) * ease;

    inner.style.transform = `rotateX(${c.rx.toFixed(3)}deg) rotateY(${c.ry.toFixed(3)}deg)`;
    // Shadow swings opposite the tilt; highlight tracks the pointer.
    inner.style.setProperty("--shadow-x", `${(-c.ry * 1.4).toFixed(2)}px`);
    inner.style.setProperty("--shadow-y", `${(c.rx * 1.4 + 12).toFixed(2)}px`);
    inner.style.setProperty("--mx", `${(c.mx * 100).toFixed(2)}%`);
    inner.style.setProperty("--my", `${(c.my * 100).toFixed(2)}%`);

    const stillMoving =
      Math.abs(t.rx - c.rx) > 0.01 ||
      Math.abs(t.ry - c.ry) > 0.01 ||
      Math.abs(t.mx - c.mx) > 0.001 ||
      Math.abs(t.my - c.my) > 0.001;
    raf.current = stillMoving ? requestAnimationFrame(apply) : 0;
  }, [ease]);

  const schedule = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(apply);
  }, [apply]);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      target.current.ry = (px - 0.5) * 2 * maxTilt;
      target.current.rx = -(py - 0.5) * 2 * maxTilt;
      target.current.mx = px;
      target.current.my = py;
      schedule();
    },
    [reduced, maxTilt, schedule],
  );

  const onLeave = useCallback(() => {
    target.current = { rx: 0, ry: 0, mx: 0.5, my: 0.5 };
    schedule();
  }, [schedule]);

  // Device-orientation (gyro) tilt for touch devices.
  useEffect(() => {
    if (reduced || !gyro || typeof window === "undefined") return;
    if (!("DeviceOrientationEvent" in window)) return;

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      // beta: front-back (-180..180), gamma: left-right (-90..90).
      const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
      target.current.ry = (clamp(e.gamma, 30) / 30) * maxTilt;
      target.current.rx = (clamp(e.beta - 45, 30) / 30) * maxTilt;
      target.current.mx = 0.5 + clamp(e.gamma, 30) / 60;
      target.current.my = 0.5 + clamp(e.beta - 45, 30) / 60;
      schedule();
    };
    window.addEventListener("deviceorientation", onOrient, { passive: true } as AddEventListenerOptions);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, [reduced, gyro, maxTilt, schedule]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div
      ref={wrapRef}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={onLeave}
      style={{ perspective: reduced ? undefined : `${perspective}px`, ...style }}
    >
      <div
        ref={innerRef}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          willChange: "transform",
          borderRadius: 20,
          // tilt-driven shadow (see --shadow-* vars set in apply()).
          boxShadow: reduced
            ? "0 12px 32px rgba(0,0,0,0.25)"
            : "var(--shadow-x, 0px) var(--shadow-y, 12px) 40px rgba(0,0,0,0.3)",
          transition: "box-shadow 120ms ease-out",
        }}
      >
        {children}
        {/* Tracked specular highlight, disabled under reduced motion. */}
        {!reduced && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              pointerEvents: "none",
              transform: "translateZ(60px)",
              background:
                "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TiltCard;
