'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Ultra-lightweight, 0-Lag 3D Component
function GalaxyCrystal() {
  const crystalRef = useRef<THREE.Mesh>(null);
  const galaxyRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // 1. Smoothly rotate the crystal
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.2;
      crystalRef.current.rotation.x += delta * 0.1;
      crystalRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    // 2. Slowly counter-rotate the galaxy background
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <>
      {/* Deep Space Galaxy Particles */}
      <group ref={galaxyRef}>
        <Stars radius={50} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      </group>
      
      {/* The Lithos Crystal - Cyberpunk Wireframe (Zero Lag) */}
      <mesh ref={crystalRef} frustumCulled={false}>
        <octahedronGeometry args={[2, 0]} />
        <meshBasicMaterial color="#22c55e" wireframe={true} transparent opacity={0.4} />
      </mesh>
      
      {/* Inner Black Hole Core to hide background stars overlapping inside */}
      <mesh frustumCulled={false}>
        <octahedronGeometry args={[1.9, 0]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      
      {/* Performant Canvas setup */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 7], fov: 45 }}
          dpr={[1, 1.5]} // Caps resolution to prevent Mac lagging
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <GalaxyCrystal />
        </Canvas>
      </div>

      <div className="z-10 text-center max-w-3xl px-6 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Lithos.eth
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-green-500 font-mono tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,197,94,0.4)]"
        >
          Architect of the Future Internet
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex justify-center gap-6 pointer-events-auto"
        >
          <button onClick={() => scrollTo('architecture')} className="px-8 py-4 border border-green-500/30 text-green-500 hover:bg-green-500 hover:text-black transition-all font-mono text-[10px] tracking-[0.3em] uppercase backdrop-blur-sm">
            View Architecture
          </button>
          <button onClick={() => scrollTo('contact-portal')} className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all font-mono text-[10px] tracking-[0.3em] uppercase">
            Initialize Contact
          </button>
        </motion.div>
      </div>
    </section>
  );
}