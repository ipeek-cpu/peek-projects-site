"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { IcosahedronMesh } from "./IcosahedronMesh";
import { ParticleField } from "./ParticleField";
import { ScrollCamera } from "./ScrollCamera";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function SceneCanvas() {
  const isMobile = useIsMobile();

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ScrollCamera />
          <IcosahedronMesh isMobile={isMobile} />
          <ParticleField count={isMobile ? 15 : 60} />
        </Suspense>
      </Canvas>
    </div>
  );
}
