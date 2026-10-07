import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGym } from "@/lib/gym-store";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export function LenisRoot({ children }: { children: ReactNode }) {
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");

    const applyFlags = () => {
      const isMobile = mobile.matches;
      const reducedMotion = reduced.matches;
      useGym.getState().setFlags({
        isMobile,
        reducedMotion,
        enableVideo: !isMobile && !reducedMotion,
        enableFx: !isMobile && !reducedMotion,
      });
    };
    applyFlags();
    mobile.addEventListener("change", applyFlags);
    reduced.addEventListener("change", applyFlags);
    coarse.addEventListener("change", applyFlags);

    const lenis = new Lenis({
      duration: reduced.matches ? 0 : 1.15,
      smoothWheel: !reduced.matches,
      touchMultiplier: 1.1,
    });

    useGym.getState().setScrollTo((target, options) => {
      lenis.scrollTo(target, options);
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", ({ progress }) => {
      useGym.getState().setProgress(progress);
    });
    useGym.getState().setProgress(
      lenis.limit ? lenis.scroll / lenis.limit : 0,
    );

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      useGym.getState().setScrollTo(null);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      mobile.removeEventListener("change", applyFlags);
      reduced.removeEventListener("change", applyFlags);
      coarse.removeEventListener("change", applyFlags);
    };
  }, []);

  return <>{children}</>;
}
