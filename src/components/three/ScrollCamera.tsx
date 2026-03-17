"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScrollRef } from "@/lib/scroll-context";
import { smoothstep, lerp } from "@/lib/utils";

export function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useScrollRef();

  useFrame(() => {
    const scroll = scrollRef.current?.progress ?? 0;

    // Scroll phase transitions (matching Figma reference phases)
    const heroFade = smoothstep(0, 0.14, scroll);
    const caseFade = smoothstep(0.12, 0.28, scroll);
    const disperseFade = smoothstep(0.28, 0.52, scroll);
    const distantFade = smoothstep(0.65, 0.85, scroll);

    // Camera X: center → right → center → right(distant)
    let cx = lerp(0, 2.5, caseFade);
    cx = lerp(cx, 0, disperseFade);
    cx = lerp(cx, 3, distantFade);

    // Camera Y: center → slight up → center → up(distant)
    let cy = lerp(0, 0.5, caseFade);
    cy = lerp(cy, -0.5, disperseFade);
    cy = lerp(cy, 2, distantFade);

    // Camera Z: close → closer → medium → far
    let cz = lerp(6, 5, caseFade);
    cz = lerp(cz, 7, disperseFade);
    cz = lerp(cz, 14, distantFade);

    // Smooth lerp toward target (avoid jitter)
    camera.position.x += (cx - camera.position.x) * 0.08;
    camera.position.y += (cy - camera.position.y) * 0.08;
    camera.position.z += (cz - camera.position.z) * 0.08;

    // Always look at the geometry center (which also moves)
    camera.lookAt(0, 0, 0);
  });

  return null;
}
