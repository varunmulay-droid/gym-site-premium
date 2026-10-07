import { useEffect, useState, type ComponentType } from "react";
import { Toaster } from "sonner";
import { LenisRoot } from "@/components/gym/lenis-root";
import { LiquidCursor } from "@/components/gym/cursor";
import { Nav } from "@/components/gym/nav";
import { Overlays } from "@/components/gym/overlays";
import { JoinDialog } from "@/components/gym/join-dialog";

export function HomePage({ videos }: { videos: string[] }) {
  return (
    <LenisRoot>
      <div className="relative min-h-svh bg-background text-foreground">
        <CanvasGate videos={videos} />
        <Nav />
        <Overlays />
        <JoinDialog />
        <LiquidCursor />
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </LenisRoot>
  );
}

function CanvasGate({ videos }: { videos: string[] }) {
  const [Stage, setStage] = useState<ComponentType<{ videos: string[] }> | null>(
    null,
  );

  useEffect(() => {
    let live = true;
    import("@/components/gym/stage")
      .then((mod) => {
        if (live) setStage(() => mod.GymStage);
      })
      .catch((err) => {
        console.error("3D stage failed to load", err);
      });
    return () => {
      live = false;
    };
  }, []);

  if (!Stage) {
    return (
      <div
        className="fixed inset-0 z-0 bg-background"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 62% 48%, #1a1a14 0%, #0a0a0a 70%)",
        }}
        aria-hidden
      />
    );
  }

  return <Stage videos={videos} />;
}
