import { useRef, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Instances, Instance, Float } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// -----------------------------------------------------------------------------
// NEURAL NETWORK - "The AI Core"
// Glowing nodes and fast data pulses
// -----------------------------------------------------------------------------

function NeuralNetwork() {
  const { theme } = useTheme();
  
  // Adjusted colors for visibility
  const nodeColor = theme === "dark" ? "#22d3ee" : "#0d6e6e"; // Dark teal for light mode
  const synapseColor = theme === "dark" ? "#0891b2" : "#0891b2"; // Keep same or darker
  
  const nodeCount = 30; 
  const connectionDistance = 16;
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodeCount; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20
        ),
        phase: Math.random() * Math.PI * 2
      });
    }
    return temp;
  }, []);

  const connections = useMemo(() => {
    const pairs = [];
    
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < connectionDistance) {
          pairs.push({
             start: nodes[i].position, 
             end: nodes[j].position,
             dist
          });
        }
      }
    }
    return { pairs };
  }, [nodes]);

  return (
    <group>
      {/* 1. GLOWING NODES */}
      <Instances range={nodeCount}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial 
            color={nodeColor} 
            toneMapped={false} 
            transparent 
            opacity={theme === "dark" ? 0.9 : 1.0} 
            blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending} 
        />
        {nodes.map((node, i) => (
          <NodeInstance key={i} position={node.position} phase={node.phase} />
        ))}
      </Instances>

      {/* 2. SYNAPSES */}
      <group>
        {connections.pairs.map((pair, i) => (
           <Line
             key={i}
             points={[pair.start, pair.end]}
             color={synapseColor}
             transparent
             opacity={theme === "dark" ? 0.15 : 0.3} // Higher opacity for light mode
             lineWidth={1}
             blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
           />
        ))}
      </group>

      {/* 3. PULSES */}
      <DataPulses pairs={connections.pairs} color={theme === "dark" ? "#ffffff" : "#059669"} />
    </group>
  );
}

function NodeInstance({ position, phase }: { position: THREE.Vector3, phase: number }) {
  const ref = useRef<THREE.Group>(null!);
  const { theme } = useTheme();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phase;
    const scale = 1 + Math.sin(t * 1.5) * 0.2;
    ref.current.scale.setScalar(scale);
  });

  return (
    <group position={position}>
        <Instance ref={ref} />
        {/* Outer Glow Halo - Only relevant in Dark Mode mostly, but subtle color in Light */}
        <mesh scale={[2.5, 2.5, 2.5]}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial 
                color={position.y > 0 ? (theme === "dark" ? "#22d3ee" : "#0d6e6e") : (theme === "dark" ? "#0891b2" : "#0891b2")} 
                transparent 
                opacity={theme === "dark" ? 0.15 : 0.05} 
                blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
                depthWrite={false}
            />
        </mesh>
    </group>
  );
}

interface ConnectionPair {
  start: THREE.Vector3;
  end: THREE.Vector3;
  dist: number;
}

function DataPulses({ pairs, color }: { pairs: ConnectionPair[], color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = pairs.length;
  const { theme } = useTheme();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const pulses = useMemo(() => {
    return pairs.map(() => ({
      progress: Math.random(),
      speed: 0.05 + Math.random() * 0.05, // Much slower: 0.05 to 0.1
      shouldRender: Math.random() > 0.5 // Only render 50% of the pulses
    }));
  }, [pairs]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    pulses.forEach((pulse, i) => {
      // Skip updates for non-rendered pulses
      if (!pulse.shouldRender) {
         dummy.scale.set(0, 0, 0);
         dummy.updateMatrix();
         meshRef.current!.setMatrixAt(i, dummy.matrix);
         return;
      }

      pulse.progress += pulse.speed * delta;
      
      // Loop continuously
      if (pulse.progress > 1) {
        pulse.progress = 0;
      }

      const { start, end } = pairs[i];
      dummy.position.lerpVectors(start, end, pulse.progress);
      
      // Simple fade in/out at ends of the line
      const fade = Math.sin(pulse.progress * Math.PI);
      dummy.scale.setScalar(0.2 * fade); 
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial 
          color={color} 
          toneMapped={false} 
          transparent 
          opacity={theme === "dark" ? 1 : 0.8} 
          blending={theme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending} 
      />
    </instancedMesh>
  );
}

// -----------------------------------------------------------------------------
// CAMERA RIG - Parallax Effect
// -----------------------------------------------------------------------------

function CameraRig({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number, y: number }> }) {
  useFrame((state) => {
    // Subtle parallax based on mouse
    state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x, 
        mouseRef.current.x * 2, 
        0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y, 
        mouseRef.current.y * 2, 
        0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}


// -----------------------------------------------------------------------------
// MAIN SCENE
// -----------------------------------------------------------------------------

function SceneContent({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number, y: number }> }) {
  return (
    <>
      <CameraRig mouseRef={mouseRef} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <NeuralNetwork />
      </Float>
    </>
  );
}

export default function Scene() {
  const { theme, mounted } = useTheme();
  
  const bgColor = theme === "dark" ? "#030712" : "#f5f3ef";
  
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-background" />;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 25], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[bgColor, 10, 60]} />
        
        <Suspense fallback={null}>
          <SceneContent mouseRef={mouseRef} />
        </Suspense>
      </Canvas>
      
      {/* 
        SMART OVERLAY FOR READABILITY + IMPRESSIVENESS 
      */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, rgba(3, 7, 18, 0.2) 0%, rgba(3, 7, 18, 0.6) 50%, rgba(3, 7, 18, 0.95) 100%)'
            : 'radial-gradient(circle at 50% 50%, rgba(245, 243, 239, 0.2) 0%, rgba(245, 243, 239, 0.5) 50%, rgba(245, 243, 239, 0.9) 100%)'
        }}
      />
    </div>
  );
}
