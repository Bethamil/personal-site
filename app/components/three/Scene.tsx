"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// Floating particles around the scene
function Particles({ count = 100 }: { count?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { theme } = useTheme();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.001 + Math.random() / 200;
      const xFactor = -40 + Math.random() * 80;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const color = theme === "dark" ? "#22d3ee" : "#0d6e6e";

  useFrame(() => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.5 + 1;
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s * 0.15);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  );
}

// Main gradient blob that responds to mouse
function GradientBlob() {
  const mesh = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const { viewport, pointer } = useThree();
  
  const color = theme === "dark" ? "#0891b2" : "#0a8585";

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.15;
    
    // Subtle follow mouse
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      pointer.x * viewport.width * 0.1,
      0.05
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      pointer.y * viewport.height * 0.1,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[2.5, 64, 64]} position={[0, 0, -5]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.15}
        />
      </Sphere>
    </Float>
  );
}

// Secondary floating shapes
function FloatingShapes() {
  const { theme } = useTheme();
  
  const color = theme === "dark" ? "#67e8f9" : "#085454";

  return (
    <>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2} position={[-8, 4, -10]}>
        <Icosahedron args={[1, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
        </Icosahedron>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} position={[10, -3, -8]}>
        <Icosahedron args={[0.8, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.25} wireframe />
        </Icosahedron>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1} floatIntensity={2} position={[6, 6, -12]}>
        <Icosahedron args={[1.2, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.2} wireframe />
        </Icosahedron>
      </Float>

      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={1.2} position={[-6, -5, -6]}>
        <Icosahedron args={[0.6, 0]}>
          <meshStandardMaterial color={color} transparent opacity={0.35} wireframe />
        </Icosahedron>
      </Float>
    </>
  );
}

// Grid lines for depth
function GridLines() {
  const { theme } = useTheme();
  
  const color = theme === "dark" ? "#1e293b" : "#d6d3cc";

  return (
    <gridHelper
      args={[100, 50, color, color]}
      position={[0, -15, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22d3ee" />
      
      <Particles count={80} />
      <GradientBlob />
      <FloatingShapes />
      <GridLines />
    </>
  );
}

export default function Scene() {
  const { theme, mounted } = useTheme();
  
  const bgColor = theme === "dark" ? "#030712" : "#f5f3ef";

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 20, 60]} />
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
