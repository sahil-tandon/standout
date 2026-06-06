/**
 * FluidGlass
 * ----------
 * A React Three Fiber "liquid glass" lens that refracts whatever is behind it,
 * using drei's `MeshTransmissionMaterial`. The mesh follows the cursor and
 * drifts with scroll. An `Environment` provides the imagery that gets refracted
 * (transmission samples the env map, so without one the glass looks flat).
 *
 * Usage:
 *   import { FluidGlassCanvas } from "./FluidGlass";
 *   <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
 *     <FluidGlassCanvas />
 *   </div>
 *   // Render your real DOM content above it. For glass that refracts the *page*
 *   // (not just the 3D env), composite this over an HTML->texture pass or place
 *   // 3D content behind the lens inside the same Canvas.
 *
 * Dependencies (peer):
 *   react@^19, react-dom@^19
 *   three@^0.169
 *   @react-three/fiber@^9
 *   @react-three/drei@^9.114
 *
 * PERFORMANCE / REDUCED MOTION:
 *   - `MeshTransmissionMaterial` renders the scene to an offscreen buffer every
 *     frame (`samples` × work). Keep `resolution` <= 256 and `samples` <= 6 for
 *     60fps on mid-tier GPUs. Drop `samples` to 2-4 on mobile.
 *   - Under `prefers-reduced-motion` we freeze the lens (no cursor/scroll
 *     follow, no rotation) and lower `samples` to a single static frame.
 *
 * CSS-ONLY FALLBACK (no WebGL / low-power / SSR):
 *   A pure-CSS approximation for non-critical decoration:
 *     .glass {
 *       background: rgba(255, 255, 255, 0.08);
 *       backdrop-filter: blur(16px) saturate(180%);
 *       -webkit-backdrop-filter: blur(16px) saturate(180%);
 *       border: 1px solid rgba(255, 255, 255, 0.18);
 *       border-radius: 24px;
 *       box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 32px rgba(0,0,0,0.25);
 *     }
 *   It does not refract, but it is cheap and works everywhere.
 */

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "./useReducedMotion";

export interface FluidGlassProps {
  /** Offscreen render-target resolution for transmission. Higher = sharper, slower. */
  resolution?: number;
  /** Blur/refraction sampling passes. Higher = smoother, slower. */
  samples?: number;
  /** RGB split at the edges. Subtle is best (0.01 - 0.04). */
  chromaticAberration?: number;
  /** Index of refraction. ~1.2 reads as light/airy glass; 1.5 = heavier. */
  ior?: number;
  /** Apparent glass thickness; drives how much the background bends. */
  thickness?: number;
  /** Also render the back faces (true = solid lens look, costs a second pass). */
  backside?: boolean;
  /** How strongly the lens tracks the cursor (0 = locked). */
  pointerStrength?: number;
}

const DEFAULTS: Required<FluidGlassProps> = {
  resolution: 256,
  samples: 6,
  chromaticAberration: 0.02,
  ior: 1.2,
  thickness: 0.2,
  backside: true,
  pointerStrength: 1,
};

function GlassLens(props: FluidGlassProps) {
  const cfg = { ...DEFAULTS, ...props };
  const reduced = useReducedMotion();
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Smoothed targets so the lens eases toward the cursor instead of snapping.
  const target = useRef(new THREE.Vector3());

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (reduced) {
      // Static frame: centred, no rotation, no follow.
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      return;
    }

    const { pointer, clock } = state;
    // Map normalised pointer (-1..1) into viewport space.
    target.current.set(
      pointer.x * (viewport.width / 2) * 0.6 * cfg.pointerStrength,
      pointer.y * (viewport.height / 2) * 0.6 * cfg.pointerStrength +
        // Slow scroll drift via the page scroll position.
        (typeof window !== "undefined" ? -window.scrollY * 0.0015 : 0),
      0,
    );
    mesh.position.lerp(target.current, 0.08);

    // Gentle idle rotation gives the surface life under highlights.
    const t = clock.getElapsedTime();
    mesh.rotation.x = Math.sin(t * 0.3) * 0.12;
    mesh.rotation.y = Math.cos(t * 0.25) * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.9, 0.32, 160, 32]} />
      <MeshTransmissionMaterial
        // Reduced motion -> a single sample (cheap, static refraction).
        samples={reduced ? 1 : cfg.samples}
        resolution={cfg.resolution}
        transmission={1}
        roughness={0.05}
        thickness={cfg.thickness}
        ior={cfg.ior}
        chromaticAberration={cfg.chromaticAberration}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={reduced ? 0 : 0.2}
        backside={cfg.backside}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

/** Minimal Canvas wrapper with lighting + an Environment to refract. */
export function FluidGlassCanvas(props: FluidGlassProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      {/* The env map is what the glass refracts. "city" reads as soft studio. */}
      <Environment preset="city" />
      <GlassLens {...props} />
    </Canvas>
  );
}

export default FluidGlassCanvas;
