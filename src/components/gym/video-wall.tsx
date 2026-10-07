import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGym } from "@/lib/gym-store";
import { smooth } from "@/components/gym/models";

export function VideoWall({ urls }: { urls: string[] }) {
  const group = useRef<THREE.Group>(null);
  const clips = urls.slice(0, 3);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    const t = useGym.getState().progress;
    const show = smooth(t, 0.34, 0.48) * (1 - smooth(t, 0.72, 0.88));
    g.visible = show > 0.03;
    g.position.z = THREE.MathUtils.damp(g.position.z, -1.1, 3, d);
    g.rotation.y = Math.sin(t * 2.2) * 0.08;
    g.scale.setScalar(0.92 + show * 0.08);
  });

  if (!clips.length) return null;

  return (
    <group ref={group} position={[0, 0.35, -1.1]} visible={false}>
      {clips.map((url, i) => {
        const count = clips.length;
        const a = ((i + 0.5) / count - 0.5) * 1.05;
        const r = 5.4;
        return (
          <group
            key={url}
            position={[Math.sin(a) * r, 0, Math.cos(a) * r - r + 0.4]}
            rotation={[0, -a, 0]}
          >
            <VideoPanel url={url} featured={i === 1} />
          </group>
        );
      })}
    </group>
  );
}

function VideoPanel({ url, featured }: { url: string; featured: boolean }) {
  const texture = useVideoTexture(url, {
    unsuspend: "canplay",
    start: true,
    muted: true,
    loop: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });
  const enableFx = useGym((s) => s.enableFx);

  const frame = useMemo(
    () => new THREE.Color("#161616"),
    [],
  );

  return (
    <group>
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[2.62, 1.54]} />
        <meshStandardMaterial
          color={frame}
          metalness={0.86}
          roughness={0.28}
        />
      </mesh>
      <mesh>
        <planeGeometry args={[2.4, 1.35]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {featured && enableFx ? (
        <mesh position={[0, -0.35, 0.1]}>
          <planeGeometry args={[1.15, 0.42]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={128}
            thickness={0.25}
            chromaticAberration={0.03}
            anisotropy={0.08}
            distortion={0.08}
            distortionScale={0.12}
            temporalDistortion={0.04}
            roughness={0.18}
            color="#d6f26a"
            transmission={0.92}
            ior={1.4}
          />
        </mesh>
      ) : null}
    </group>
  );
}
