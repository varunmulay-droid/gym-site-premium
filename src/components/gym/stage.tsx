import { Component, type ReactNode, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/gym/scene";
import { useGym } from "@/lib/gym-store";

class WebGLGuard extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function BootLoader({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-background">
      <p className="font-display text-4xl tracking-kicker text-foreground">FORGE</p>
      <div className="mt-6 h-px w-40 overflow-hidden bg-border">
        <div className="h-px w-full origin-left bg-accent" />
      </div>
    </div>
  );
}

export function GymStage({ videos }: { videos: string[] }) {
  const isMobile = useGym((s) => s.isMobile);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const kill = window.setTimeout(() => setBooted(true), 1800);
    return () => window.clearTimeout(kill);
  }, []);

  return (
    <>
      <BootLoader visible={!booted} />
      <div className="pointer-events-none fixed inset-0 z-0">
        <WebGLGuard>
          <Canvas
            dpr={isMobile ? [1, 1.25] : [1, 1.75]}
            gl={{
              antialias: !isMobile,
              alpha: false,
              powerPreference: "high-performance",
            }}
            camera={{ position: [0.55, 0.22, 4.7], fov: 42, near: 0.1, far: 70 }}
            onCreated={({ gl }) => {
              gl.setClearColor("#0a0a0a");
              requestAnimationFrame(() => setBooted(true));
            }}
          >
            <Scene videos={videos} />
          </Canvas>
        </WebGLGuard>
      </div>
    </>
  );
}
