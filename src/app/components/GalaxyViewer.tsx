// GalaxyViewer.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface Coffee {
  id: string;
  type: string;
  mood: string;
  logged_at: string;
}

interface GalaxyViewerProps {
  coffees: Coffee[];
  onStarDelete?: (id: string) => void;
}

function ExplosionParticle({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const velocity = useMemo(
    () => [
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 0.2,
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 0.2,
      // eslint-disable-next-line react-hooks/purity
      (Math.random() - 0.5) * 0.2,
    ],
    []
  );

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += velocity[0];
      meshRef.current.position.y += velocity[1];
      meshRef.current.position.z += velocity[2];
      meshRef.current.scale.multiplyScalar(0.95);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function GalaxyViewer({
  coffees,
  onStarDelete,
}: GalaxyViewerProps) {
  const [explodingStar, setExplodingStar] = useState<string | null>(null);
  const [particles, setParticles] = useState<
    Array<{ id: number; position: [number, number, number]; color: string }>
  >([]);

  const starRefs = useRef<(THREE.Mesh | null)[]>([]);

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

  useEffect(() => {
    if (starRefs.current.length > 0) {
      starRefs.current.forEach((star, index) => {
        if (star) {
          gsap.from(star.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });
        }
      });
    }
  }, [coffees]);

  const handleStarClick = (coffee: Coffee) => {
    if (onStarDelete) {
      setExplodingStar(coffee.id);

      const starIndex = coffees.findIndex((c) => c.id === coffee.id);
      const starPosition = getStarPosition(starIndex);
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        position: starPosition,
        color: getColor(coffee.type),
      }));
      setParticles(newParticles);

      setTimeout(() => {
        setParticles([]);
        setExplodingStar(null);
        onStarDelete(coffee.id);
      }, 1000);
    }
  };

  const getStarPosition = (index: number): [number, number, number] => {
    const angle = (index / Math.max(coffees.length, 1)) * Math.PI * 2;
    const radius = 3 + (index % 3);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return [x, y, 0];
  };

  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <OrbitControls enableZoom={false} />
      <Stars radius={100} depth={50} count={5000} factor={4} />

      {particles.map((particle) => (
        <ExplosionParticle
          key={particle.id}
          position={particle.position}
          color={particle.color}
        />
      ))}

      {coffees
        .filter((c) => c.id !== explodingStar)
        .slice(0, 20)
        .map((coffee, i) => {
          const position = getStarPosition(i);

          return (
            <mesh
              key={coffee.id}
              position={position}
              ref={(el) => (starRefs.current[i] = el)}
              onClick={() => handleStarClick(coffee)}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={getColor(coffee.type)}
                emissive={getColor(coffee.type)}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
    </Canvas>
  );
}
