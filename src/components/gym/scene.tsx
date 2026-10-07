import { Suspense, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Grid, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { useGym } from "@/lib/gym-store";
import {
  ConceptDumbbell,
  DustField,
  FloorProps,
  HeroDumbbell,
} from "@/components/gym/models";
import { LiquidBackground } from "@/components/gym/liquid-bg";
import { VideoWall } from "@/components/gym/video-wall";

const POS_KEYS = [
  { t: 0, p: [0.55, 0.22, 4.7] as const },
  { t: 0.18, p: [-0.85, 0.42, 2.85] as const },
  { t: 0.4, p: [0.15, 0.38, 8.4] as const },
  { t: 0.58, p: [0.05, 0.32, 7.1] as const },
  { t: 0.82, p: [0.25, 0.18, 5.1] as const },
  { t: 1, p: [0, 1.45, 7.8] as const },
];

const LOOK_KEYS = [
  { t: 0, p: [0, 0.08, 0] as const },
  { t: 0.18, p: [0, 0.12, 0] as const },
  { t: 0.4, p: [0, 0.2, -1.6] as const },
  { t: 0.58, p: [0, 0.15, -1] as const },
  { t: 0.82, p: [0, 0.05, 0] as const },
  { t: 1, p: [0, 0.5, 0] as const },
];

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const CA_OFFSET = new THREE.Vector2(0.0011, 0.0011);

function sample(
  t: number,
  keys: { t: number; p: readonly [number, number, number] }[],
  out: THREE.Vector3,
) {
  const u = THREE.MathUtils.clamp(t, 0, 1);
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].t < u) i += 1;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const span = b.t - a.t || 1;
  const k = THREE.MathUtils.clamp((u - a.t) / span, 0, 1);
  const s = k * k * (3 - 2 * k);
  out.set(
    a.p[0] + (b.p[0] - a.p[0]) * s,
    a.p[1] + (b.p[1] - a.p[1]) * s,
    a.p[2] + (b.p[2] - a.p[2]) * s,
  );
}

function CameraRig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.08, 0));

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const { progress, reducedMotion, mouse } = useGym.getState();
    sample(progress, POS_KEYS, _pos);
    sample(progress, LOOK_KEYS, _look);
    if (!reducedMotion) {
      _pos.x += (mouse.x - 0.5) * 0.22;
      _pos.y += (mouse.y - 0.5) * 0.12;
    }
    const k = reducedMotion ? 1 : 1 - Math.exp(-3.2 * d);
    camera.position.lerp(_pos, k);
    look.current.lerp(_look, k);
    camera.lookAt(look.current);
  });

  return null;
}

function PostFX() {
  const enable = useGym((s) => s.enableFx);
  if (!enable) return null;
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={0.62}
        luminanceThreshold={0.78}
        luminanceSmoothing={0.28}
        mipmapBlur
      />
      <ChromaticAberration offset={CA_OFFSET} />
      <Vignette offset={0.28} darkness={0.72} />
    </EffectComposer>
  );
}

export function Scene({ videos }: { videos: string[] }) {
  const enableVideo = useGym((s) => s.enableVideo);
  const bgVideo = enableVideo ? videos[0] : undefined;
  const wallVideos = enableVideo ? videos.slice(1, 4) : [];

  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 9, 24]} />
      <ambientLight intensity={0.28} />
      <spotLight
        position={[4.5, 6.2, 4]}
        intensity={48}
        angle={0.42}
        penumbra={0.85}
        color="#fff4e0"
      />
      <spotLight
        position={[-5, 3.2, 2.2]}
        intensity={8}
        angle={0.5}
        penumbra={0.9}
        color="#ccff00"
      />
      <directionalLight position={[2, 3, -4]} intensity={1.4} color="#9aa3ad" />
      <pointLight
        position={[0, -0.4, 2.8]}
        intensity={5}
        color="#ccff00"
        distance={7}
      />

      <Suspense fallback={null}>
        <Environment resolution={256} environmentIntensity={0.7}>
          <Lightformer
            form="rect"
            intensity={5.5}
            position={[0, 5, 1]}
            scale={[8, 1.6, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.6}
            position={[5, 0.4, 2]}
            scale={[2, 8, 1]}
            color="#f3f3f0"
          />
          <Lightformer
            form="rect"
            intensity={0.85}
            position={[-4.2, 1, 2]}
            scale={[2, 6, 1]}
            color="#ccff00"
          />
          <Lightformer
            form="ring"
            intensity={1.3}
            position={[0, 0, -5]}
            scale={7}
            color="#7f8b99"
          />
        </Environment>
      </Suspense>

      <Suspense fallback={<LiquidBackground />}>
        <LiquidBackground videoUrl={bgVideo} />
      </Suspense>

      <Suspense fallback={null}>
        {wallVideos.length ? <VideoWall urls={wallVideos} /> : null}
      </Suspense>

      <Suspense fallback={null}>
        <HeroDumbbell />
        <ConceptDumbbell />
      </Suspense>

      <FloorProps />
      <DustField />
      <Grid
        position={[0, -1.28, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.55}
        cellColor="#1b1b1b"
        sectionSize={2}
        sectionThickness={1.05}
        sectionColor="#2c2d22"
        fadeDistance={16}
        fadeStrength={1.1}
        infiniteGrid
      />
      <CameraRig />
      <PostFX />
    </>
  );
}
