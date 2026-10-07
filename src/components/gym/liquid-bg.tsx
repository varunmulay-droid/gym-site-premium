import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { useGym } from "@/lib/gym-store";

const VERT = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uVelocity;
void main() {
  vUv = uv;
  vec3 p = position;
  float dist = distance(uv, uMouse);
  float vel = clamp(length(uVelocity) * 10.0, 0.0, 1.4);
  p.z -= p.x * p.x * 0.018;
  p.z += sin(dist * 30.0 - uTime * 4.8) * exp(-dist * 7.5) * (0.18 + vel * 0.4);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uVelocity;
uniform sampler2D uMap;
uniform float uHasVideo;
void main() {
  vec2 uv = vUv;
  vec2 toMouse = uv - uMouse;
  float dist = length(toMouse);
  float vel = clamp(length(uVelocity) * 12.0, 0.0, 1.5);
  vec2 dir = dist > 0.0001 ? toMouse / dist : vec2(0.0);
  float ripple = sin(dist * 36.0 - uTime * 4.5) * exp(-dist * 7.0);
  uv += dir * ripple * (0.01 + vel * 0.035);
  uv += uVelocity * 0.07 * exp(-dist * 4.0);

  vec3 base = vec3(0.03, 0.03, 0.028);
  if (uHasVideo > 0.5) {
    vec3 vid = texture2D(uMap, uv).rgb;
    float luma = dot(vid, vec3(0.299, 0.587, 0.114));
    vid = mix(vec3(luma), vid, 0.22);
    vid *= vec3(0.7, 0.78, 0.5);
    base = vid * 0.11;
  }

  float gx = smoothstep(0.045, 0.0, abs(fract(uv.x * 16.0) - 0.5));
  float gy = smoothstep(0.045, 0.0, abs(fract(uv.y * 16.0) - 0.5));
  base += vec3(0.08, 0.09, 0.04) * max(gx, gy) * 0.14;

  float glow = exp(-dist * 5.5) * (0.06 + vel * 0.22);
  base += vec3(0.8, 1.0, 0.05) * glow;
  base += sin((uv.y + uTime * 0.04) * 780.0) * 0.01;

  float vig = smoothstep(1.05, 0.2, length(uv - 0.5) * 1.35);
  base *= vig;
  gl_FragColor = vec4(base, 1.0);
}
`;

const _mouse = new THREE.Vector2(0.5, 0.5);
const _vel = new THREE.Vector2();

export function LiquidBackground({ videoUrl }: { videoUrl?: string }) {
  if (videoUrl) return <VideoLiquid url={videoUrl} />;
  return <ShaderPlane map={null} />;
}

function VideoLiquid({ url }: { url: string }) {
  const texture = useVideoTexture(url, {
    unsuspend: "canplay",
    start: true,
    muted: true,
    loop: true,
    playsInline: true,
    crossOrigin: "anonymous",
  });
  return <ShaderPlane map={texture} />;
}

function ShaderPlane({ map }: { map: THREE.Texture | null }) {
  const dummy = useMemo(() => {
    const t = new THREE.DataTexture(new Uint8Array([8, 8, 8, 255]), 1, 1);
    t.needsUpdate = true;
    return t;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelocity: { value: new THREE.Vector2() },
      uMap: { value: map ?? dummy },
      uHasVideo: { value: map ? 1 : 0 },
    }),
    [dummy, map],
  );

  const mat = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    const m = mat.current;
    if (!m) return;
    const d = Math.min(delta, 0.1);
    const { mouse, velocity, reducedMotion } = useGym.getState();
    m.uniforms.uTime.value += reducedMotion ? 0 : d;
    _mouse.set(mouse.x, mouse.y);
    _vel.set(velocity.x, velocity.y);
    m.uniforms.uMouse.value.lerp(_mouse, 1 - Math.exp(-8 * d));
    m.uniforms.uVelocity.value.lerp(_vel, 1 - Math.exp(-6 * d));
    m.uniforms.uMap.value = map ?? dummy;
    m.uniforms.uHasVideo.value = map ? 1 : 0;
  });

  return (
    <mesh position={[0, 0.6, -6.2]} frustumCulled={false}>
      <planeGeometry args={[16, 9, 48, 28]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        toneMapped={false}
      />
    </mesh>
  );
}
