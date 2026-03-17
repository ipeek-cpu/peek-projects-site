"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRef } from "@/lib/scroll-context";
import { smoothstep } from "@/lib/utils";

interface Props {
  count: number;
}

export function ParticleField({ count }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const scrollRef = useScrollRef();
  const timeRef = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#4af0c0",
        size: 0.03,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const scroll = scrollRef.current?.progress ?? 0;
    timeRef.current += delta;

    // Particles only visible in hero phase
    const heroAlpha = 1 - smoothstep(0, 0.14, scroll);
    material.opacity = heroAlpha * 0.5;

    if (heroAlpha < 0.01) return;

    const posAttr = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i) + velocities[i * 3];
      let y = posAttr.getY(i) + velocities[i * 3 + 1];
      let z = posAttr.getZ(i) + velocities[i * 3 + 2];

      // Wrap around boundaries
      if (x > 6) x = -6;
      if (x < -6) x = 6;
      if (y > 4) y = -4;
      if (y < -4) y = 4;
      if (z > 3) z = -3;
      if (z < -3) z = 3;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
    </points>
  );
}
