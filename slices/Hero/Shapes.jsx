"use client";

import { ContactShadows, Environment, Float } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0 h-full">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), // Gem
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
    },
    {
      position: [-1.4, 2, -4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1.5), // Soccer ball
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
    },
    {
      position: [1.6, 1.6, -4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1.5), // Diamond
    },
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({
      color: 0x27ae60,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xe67e22,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2980b9,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x8e44ad,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x95a5a6,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xe74c3c,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xd35400,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xf39c12,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x7f8c8d,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1abc9c,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x3498db,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xecf0f1,
      roughness: 0,
      metalness: 0.5,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xc0392b,
      roughness: 0,
      metalness: 0.5,
    }),
  ];

  const soundEffects = [
    new Audio("/sounds/1.ogg"),
    new Audio("/sounds/2.ogg"),
    new Audio("/sounds/3.ogg"),
    new Audio("/sounds/4.ogg"),
    new Audio("/sounds/5.ogg"),
    new Audio("/sounds/6.ogg"),
    new Audio("/sounds/7.ogg"),
    new Audio("/sounds/8.ogg"),
    new Audio("/sounds/9.ogg"),
    new Audio("/sounds/10.ogg"),
    new Audio("/sounds/11.ogg"),
  ];

  return geometries.map(({ position, r, geometry }, i) => (
    <Geometry
      key={i}
      r={r}
      position={position.map((p) => p * 2)}
      geometry={geometry}
      materials={materials}
      soundEffects={soundEffects}
    />
  ));
}

function Geometry({ r, position, geometry, materials, soundEffects }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.inOut(1, 0.3)",
      yoyo: true,
    });

    mesh.material = getRandomMaterial();
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });

      return () => ctx.revert();
    });
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}