import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { ContactShadows, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGym } from "@/lib/gym-store";

useGLTF.preload("/models/dumbbell.glb");
useGLTF.preload("/models/sci-fi-dumbbell.glb");

type GroupProps = ThreeElements["group"];

function enhance(root: THREE.Object3D) {
  root.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    const apply = (material: THREE.Material) => {
      if (
        material instanceof THREE.MeshStandardMaterial ||
        material instanceof THREE.MeshPhysicalMaterial
      ) {
        material.metalness = Math.max(material.metalness, 0.7);
        material.roughness = Math.min(material.roughness, 0.38);
        material.envMapIntensity = 1.45;
      }
    };
    if (Array.isArray(mesh.material)) mesh.material.forEach(apply);
    else if (mesh.material) apply(mesh.material);
  });
}

function FittedGltf({
  url,
  target = 2.15,
  ...props
}: { url: string; target?: number } & GroupProps) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  const cloned = useMemo(() => {
    const copy = scene.clone(true);
    enhance(copy);
    return copy;
  }, [scene]);

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    const scale = target / Math.max(size.x, size.y, size.z, 0.001);
    if (group.current) group.current.scale.setScalar(scale);
  }, [cloned, target]);

  return (
    <group ref={group} {...props}>
      <primitive object={cloned} />
    </group>
  );
}

const _offset = new THREE.Vector3();

export function HeroDumbbell() {
  const group = useRef<THREE.Group>(null);
  const reduced = useGym((s) => s.reducedMotion);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    const t = useGym.getState().progress;
    const spin = t * Math.PI * 2.15;
    const inspect = smooth(t, 0.08, 0.28);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, spin + inspect * 0.4, 4, d);
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      Math.sin(t * Math.PI) * 0.22,
      4,
      d,
    );
    _offset.set(
      THREE.MathUtils.lerp(0, -1.85, smooth(t, 0.32, 0.48)),
      THREE.MathUtils.lerp(0.15, 0.05, inspect),
      THREE.MathUtils.lerp(0, 0.4, smooth(t, 0.32, 0.5)),
    );
    g.position.lerp(_offset, 1 - Math.exp(-5 * d));
    const hide = Math.max(1 - smooth(t, 0.78, 0.92), 0.001);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x || 1, hide, 6, d));
  });

  return (
    <group ref={group}>
      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : 0.45}
      >
        <FittedGltf url="/models/dumbbell.glb" target={2.55} />
      </Float>
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.55}
        scale={10}
        blur={2.4}
        far={3.5}
        color="#000000"
      />
    </group>
  );
}

export function ConceptDumbbell() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);
    const t = useGym.getState().progress;
    const show = smooth(t, 0.42, 0.55) * (1 - smooth(t, 0.78, 0.9));
    g.visible = show > 0.02;
    g.position.set(2.1, 0.1, 0.2);
    g.rotation.y += d * 0.35;
    g.scale.setScalar(0.85 * Math.max(show, 0.001));
  });

  return (
    <group ref={group} visible={false}>
      <FittedGltf url="/models/sci-fi-dumbbell.glb" target={1.7} />
    </group>
  );
}

export function FloorProps() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = useGym.getState().progress;
    const show = smooth(t, 0.38, 0.52) * (1 - smooth(t, 0.74, 0.88));
    g.visible = show > 0.04;
    const d = Math.min(delta, 0.1);
    g.position.y = THREE.MathUtils.damp(g.position.y, show * 0.05 - 0.9, 4, d);
  });

  return (
    <group ref={group} visible={false} position={[0, -0.9, -0.4]}>
      <ProteinTub position={[-3.2, 0.4, 1.1]} accent="#ccff00" />
      <ProteinTub position={[3.4, 0.4, 0.6]} accent="#d9d9d9" />
      <WeightStack position={[-3.6, 0, -1.4]} />
      <WeightStack position={[3.8, 0, -1.1]} />
    </group>
  );
}

function ProteinTub({
  accent,
  ...props
}: { accent: string } & GroupProps) {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[0.32, 0.36, 0.72, 28]} />
        <meshStandardMaterial
          color="#161616"
          metalness={0.35}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 28]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.06, 0.345]}>
        <planeGeometry args={[0.42, 0.32]} />
        <meshStandardMaterial
          color={accent}
          metalness={0.1}
          roughness={0.35}
          emissive={accent}
          emissiveIntensity={0.18}
        />
      </mesh>
    </group>
  );
}

function WeightStack(props: GroupProps) {
  const plates = [0.55, 0.5, 0.44, 0.38, 0.32];
  return (
    <group {...props}>
      {plates.map((r, i) => (
        <mesh
          key={r}
          position={[0, 0.07 + i * 0.12, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[r, r, 0.1, 28]} />
          <meshStandardMaterial
            color={i % 2 ? "#1a1a1a" : "#111111"}
            metalness={0.82}
            roughness={0.28}
          />
        </mesh>
      ))}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.95, 12]} />
        <meshStandardMaterial color="#c5c5c5" metalness={0.9} roughness={0.18} />
      </mesh>
    </group>
  );
}

export function DustField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = Math.random() * 4 - 0.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const d = Math.min(delta, 0.1);
    pts.rotation.y += d * 0.015;
    pts.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#ccff00"
        transparent
        opacity={0.28}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function smooth(t: number, a: number, b: number) {
  const u = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
}
