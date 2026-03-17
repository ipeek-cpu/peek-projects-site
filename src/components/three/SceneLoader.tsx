"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas"),
  { ssr: false }
);

export function SceneLoader() {
  return <SceneCanvas />;
}
