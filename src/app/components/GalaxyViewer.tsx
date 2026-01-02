"use client";

import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

function CoffeeStar({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useGSAP(() => {
    gsap.from(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      delay: Math.random() * 0.5,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalaxyViewer({ coffees }: { coffees: any[] }) {
  const getColor = (type: string) => {
    switch (type) {
      case "espresso":
        return "#ff6b6b";
      case "latte":
        return "#4ecdc4";
      case "cold_brew":
        return "#6c5ce7";
      default:
        return "#ffd93d";
    }
  };

  return (
    <div className="h-screen w-full bg-black">
      <Canvas camera={{ position: [0, 0, 15] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <Stars radius={100} depth={50} count={5000} factor={4} />

        {coffees.slice(0, 20).map((coffee, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 5 + (i % 3);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <CoffeeStar
              key={coffee.id}
              position={[x, y, 0]}
              color={getColor(coffee.type)}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
