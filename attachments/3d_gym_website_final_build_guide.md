# $1,000 Viral 3D Gym Website: Complete Final Build Guide

This document provides the step-by-step architectural guide, setup instructions, and React Three Fiber (R3F) code implementation for building an interactive 3D Gym landing page.

---

## 1. Environment Setup & Installation

Run the following terminal commands to install all required dependencies:

```bash
# Create React Project with Vite
npm create vite@latest 3d-gym-site -- --template react
cd 3d-gym-site

# Install R3F, Drei, Post-Processing, GSAP, and Lenis
npm install @react-three/fiber @react-three/drei @react-three/postprocessing three
npm install gsap @studio-freight/lenis lucide-react clsx tailwindmerge

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 2. Complete R3F Application Implementation

Here is the single-file production template combining **Lenis Smooth Scroll**, **Interactive R3F Canvas**, **Post-Processing**, and **Pexels API Video Textures**:

```jsx
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  ContactShadows, 
  MeshTransmissionMaterial, 
  useVideoTexture, 
  Text,
  PerspectiveCamera 
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

// --- PEXELS VIDEO TEXTURE MESH ---
function DynamicPexelsVideoMesh({ videoUrl }) {
  const texture = useVideoTexture(videoUrl, {
    unsuspended: true,
    muted: true,
    loop: true,
    start: true,
  });

  return (
    <mesh position={[0, 0, -2]} scale={[12, 6.75, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// --- 3D INTERACTIVE GYM EQUIPMENT (FALLBACK DUMBBELL MESH) ---
function InteractiveDumbbell(props) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t / 2) * 0.2;
    groupRef.current.rotation.y = Math.cos(t / 2) * 0.3;
  });

  return (
    <group ref={groupRef} {...props}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Handle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.12, 2.4, 32]} />
          <meshStandardMaterial metalness={0.9} roughness={0.1} color="#e5e5e5" />
        </mesh>
        {/* Left Weights */}
        <mesh position={[-1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
          <meshStandardMaterial metalness={0.8} roughness={0.2} color="#171717" />
        </mesh>
        {/* Right Weights */}
        <mesh position={[1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
          <meshStandardMaterial metalness={0.8} roughness={0.2} color="#171717" />
        </mesh>
      </Float>
    </group>
  );
}

// --- GLASSMORPHISM HUD OVERLAY ---
function GlassHUD() {
  return (
    <mesh position={[0, -0.5, 1]} scale={[3, 1.2, 0.1]}>
      <boxGeometry />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        chromaticAberration={0.05}
        anisotropy={0.1}
        distortion={0.1}
        color="#ccff00"
      />
    </mesh>
  );
}

// --- MAIN 3D SCENE ---
function Scene({ pexelsVideoUrl }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#ccff00" />

      <Suspense fallback={null}>
        {pexelsVideoUrl && <DynamicPexelsVideoMesh videoUrl={pexelsVideoUrl} />}
      </Suspense>

      <InteractiveDumbbell position={[0, 0, 0]} />
      <GlassHUD />

      <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2} far={4} color="#000000" />

      {/* Cinematic Post Processing */}
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.2} mipmapBlur />
        <ChromaticAberration offset={[0.002, 0.002]} />
        <Vignette offset={0.3} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [pexelsVideo, setPexelsVideo] = useState('');

  // Fetch 4K Video from Pexels API
  useEffect(() => {
    const fetchPexelsVideo = async () => {
      try {
        const response = await fetch(
          'https://api.pexels.com/videos/search?query=gym%20workout&per_page=1',
          {
            headers: {
              Authorization: 'wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt',
            },
          }
        );
        const data = await response.json();
        if (data.videos && data.videos[0]?.video_files[0]?.link) {
          setPexelsVideo(data.videos[0].video_files[0].link);
        }
      } catch (err) {
        console.error('Failed to fetch Pexels media:', err);
      }
    };

    fetchPexelsVideo();
  }, []);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg="#0a0a0a" text-white font-sans overflow-x-hidden">
      {/* 3D WebGL Canvas Layer */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Canvas dpr={[1, 2]}>
          <Scene pexelsVideoUrl={pexelsVideo} />
        </Canvas>
      </div>

      {/* HTML Overlay Content */}
      <main className="relative z-10">
        <section className="h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#ccff00]">
            FORGED IN STEEL
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-400 max-w-xl">
            Next-Gen Performance Gear Engine & Gym Experience
          </p>
          <button className="mt-8 px-8 py-4 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-none hover:bg-white transition-all transform hover:scale-105">
            Explore Equipment
          </button>
        </section>

        <section className="h-screen flex items-center justify-start px-12 md:px-24">
          <div className="max-w-lg bg-black/60 backdrop-blur-md p-8 border border-white/10">
            <h2 className="text-4xl font-bold text-[#ccff00]">PRECISION ENGINEERING</h2>
            <p className="mt-4 text-gray-300">
              360-degree biometric balance, medical-grade stainless steel coating, and ultra-ergonomic diamond knurling pattern.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
```

---

## 3. Checklist for Final Delivery ($1,000 Client Hand-off)

1. **Local GLB Models:** Replace `<InteractiveDumbbell />` with `useGLTF('/path/to/your_model.glb')`.
2. **Pexels Query Optimization:** Customize your search queries in the Pexels fetch link (e.g., `query=crossfit`, `query=heavy-lifting`).
3. **Deployment:** Build with `npm run build` and deploy to Vercel, Netlify, or AWS CloudFront for instant high-speed 60FPS WebGL performance.