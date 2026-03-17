"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollRef } from "@/lib/scroll-context";
import { smoothstep, lerp } from "@/lib/utils";

interface Props {
  isMobile: boolean;
}

export function IcosahedronMesh({ isMobile }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const satelliteRef = useRef<THREE.Points>(null);
  const scrollRef = useScrollRef();
  const timeRef = useRef(0);

  // Create icosahedron geometry and extract edge/vertex data
  const { edgesGeo, vertexPositions, satellitePositions, originalPositions } =
    useMemo(() => {
      const ico = new THREE.IcosahedronGeometry(1, 1);
      const edges = new THREE.EdgesGeometry(ico);

      // Extract unique vertex positions from the icosahedron
      const posAttr = ico.getAttribute("position");
      const uniqueVerts: THREE.Vector3[] = [];
      for (let i = 0; i < posAttr.count; i++) {
        const v = new THREE.Vector3(
          posAttr.getX(i),
          posAttr.getY(i),
          posAttr.getZ(i)
        );
        const exists = uniqueVerts.some((u) => u.distanceTo(v) < 0.01);
        if (!exists) uniqueVerts.push(v);
      }

      // Vertex points for glowing nodes
      const vPositions = new Float32Array(uniqueVerts.length * 3);
      uniqueVerts.forEach((v, i) => {
        vPositions[i * 3] = v.x;
        vPositions[i * 3 + 1] = v.y;
        vPositions[i * 3 + 2] = v.z;
      });

      // Satellite nodes (20 points at further radii)
      const satCount = isMobile ? 8 : 20;
      const sPositions = new Float32Array(satCount * 3);
      const seed = 42;
      let rng = seed;
      const rand = () => {
        rng = (rng * 16807) % 2147483647;
        return (rng - 1) / 2147483646;
      };
      for (let i = 0; i < satCount; i++) {
        const base = uniqueVerts[Math.floor(rand() * uniqueVerts.length)];
        const spread = 1.8 + rand() * 1.5;
        sPositions[i * 3] = base.x * spread + (rand() - 0.5) * 0.8;
        sPositions[i * 3 + 1] = base.y * spread + (rand() - 0.5) * 0.8;
        sPositions[i * 3 + 2] = base.z * spread + (rand() - 0.5) * 0.8;
      }

      ico.dispose();

      return {
        edgesGeo: edges,
        vertexPositions: vPositions,
        satellitePositions: sPositions,
        originalPositions: new Float32Array(vPositions),
      };
    }, [isMobile]);

  // Materials
  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#4af0c0",
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const pointMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#b4ffe6",
        size: 0.06,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  const satelliteMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#4af0c0",
        size: 0.04,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const scroll = scrollRef.current?.progress ?? 0;
    timeRef.current += delta;

    // Scroll phase calculations
    const caseFade = smoothstep(0.12, 0.28, scroll);
    const disperseFade = smoothstep(0.28, 0.52, scroll);
    const distantFade = smoothstep(0.65, 0.85, scroll);

    // Rotation — continuous slow spin
    groupRef.current.rotation.y += 0.002;
    groupRef.current.rotation.x =
      Math.sin(timeRef.current * 0.3) * 0.1 + 0.3;

    // Scale based on scroll phase
    let targetScale = lerp(1, 1.5, caseFade);
    targetScale = lerp(targetScale, 1.2, disperseFade);
    targetScale = lerp(targetScale, 0.4, distantFade);
    const s = groupRef.current.scale.x;
    const newScale = s + (targetScale - s) * 0.05;
    groupRef.current.scale.setScalar(newScale);

    // Position offset — drift right during case study
    let tx = lerp(0, 1.5, caseFade);
    tx = lerp(tx, 0, disperseFade);
    tx = lerp(tx, 2, distantFade);
    let ty = lerp(0, 0.3, caseFade);
    ty = lerp(ty, 0, disperseFade);
    ty = lerp(ty, 1.5, distantFade);
    groupRef.current.position.x += (tx - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (ty - groupRef.current.position.y) * 0.05;

    // Opacity — fade during case study, partial during dispersal, very dim at contact
    let opacity = lerp(1, 0.15, caseFade);
    opacity = lerp(opacity, 0.4, disperseFade);
    opacity = lerp(opacity, 0.08, distantFade);
    edgeMaterial.opacity = opacity;
    pointMaterial.opacity = opacity;

    // Satellite opacity — appear during dispersal
    const satOpacity =
      disperseFade > 0.1 ? Math.min(1, (disperseFade - 0.1) * 2) * 0.5 : 0;
    satelliteMaterial.opacity = satOpacity * (1 - distantFade);

    // Disperse vertices outward during tech/services phase
    if (pointsRef.current && disperseFade > 0) {
      const posAttr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const dispersionAmount = 1 + disperseFade * 0.4;
        posAttr.setXYZ(
          i,
          ox * dispersionAmount,
          oy * dispersionAmount,
          oz * dispersionAmount
        );
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe edges */}
      <lineSegments ref={edgesRef} geometry={edgesGeo} material={edgeMaterial} />

      {/* Vertex glow points */}
      <points ref={pointsRef} material={pointMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[vertexPositions, 3]}
          />
        </bufferGeometry>
      </points>

      {/* Satellite nodes — visible during dispersal */}
      <points ref={satelliteRef} material={satelliteMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[satellitePositions, 3]}
          />
        </bufferGeometry>
      </points>
    </group>
  );
}
