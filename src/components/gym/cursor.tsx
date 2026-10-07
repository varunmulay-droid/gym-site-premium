import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGym } from "@/lib/gym-store";
import { cn } from "@/lib/utils";

export function LiquidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const hovering = useGym((s) => s.hovering);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    if (coarse.matches) return;

    const dot = dotRef.current;
    const trail = trailRef.current;
    if (!dot || !trail) return;

    document.body.classList.add("has-custom-cursor");
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(trail, { xPercent: -50, yPercent: -50 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xTrail = gsap.quickTo(trail, "x", {
      duration: 0.38,
      ease: "power3.out",
    });
    const yTrail = gsap.quickTo(trail, "y", {
      duration: 0.38,
      ease: "power3.out",
    });

    let lastX = window.innerWidth * 0.5;
    let lastY = window.innerHeight * 0.5;
    let lastT = performance.now();

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastT) / 1000, 1 / 120);
      const vx = (e.clientX - lastX) / window.innerWidth / dt;
      const vy = (lastY - e.clientY) / window.innerHeight / dt;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;

      xDot(e.clientX);
      yDot(e.clientY);
      xTrail(e.clientX);
      yTrail(e.clientY);

      useGym.getState().setMouse(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
        vx * 0.04,
        vy * 0.04,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      aria-hidden
    >
      <div
        ref={trailRef}
        className={cn(
          "absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-accent/70",
          "transition-[width,height,opacity,background-color] duration-200 ease-out",
          hovering ? "size-24 border-accent bg-accent/10" : "opacity-70",
        )}
      >
        {hovering ? (
          <span className="font-mono text-kicker tracking-kicker text-accent">
            {hovering}
          </span>
        ) : null}
      </div>
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-2 rounded-full bg-accent"
      />
    </div>
  );
}
