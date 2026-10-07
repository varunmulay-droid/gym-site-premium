import { create } from "zustand";

export type PlanId = "day" | "resident" | "black";

type ScrollTo = (
  target: string | number | HTMLElement,
  options?: Record<string, unknown>,
) => void;

type GymState = {
  progress: number;
  mouse: { x: number; y: number };
  velocity: { x: number; y: number };
  hovering: string | null;
  joinOpen: boolean;
  joinPlan: PlanId;
  menuOpen: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  enableVideo: boolean;
  enableFx: boolean;
  scrollTo: ScrollTo | null;
  setProgress: (n: number) => void;
  setMouse: (x: number, y: number, vx: number, vy: number) => void;
  setHovering: (label: string | null) => void;
  setJoinOpen: (open: boolean, plan?: PlanId) => void;
  setMenuOpen: (open: boolean) => void;
  setFlags: (
    flags: Partial<
      Pick<
        GymState,
        "reducedMotion" | "isMobile" | "enableVideo" | "enableFx"
      >
    >,
  ) => void;
  setScrollTo: (fn: ScrollTo | null) => void;
};

export const useGym = create<GymState>((set) => ({
  progress: 0,
  mouse: { x: 0.5, y: 0.5 },
  velocity: { x: 0, y: 0 },
  hovering: null,
  joinOpen: false,
  joinPlan: "resident",
  menuOpen: false,
  reducedMotion: false,
  isMobile: false,
  enableVideo: true,
  enableFx: true,
  scrollTo: null,
  setProgress: (progress) => set({ progress }),
  setMouse: (x, y, vx, vy) =>
    set({ mouse: { x, y }, velocity: { x: vx, y: vy } }),
  setHovering: (hovering) => set({ hovering }),
  setJoinOpen: (joinOpen, plan) =>
    set(plan ? { joinOpen, joinPlan: plan } : { joinOpen }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setFlags: (flags) => set(flags),
  setScrollTo: (scrollTo) => set({ scrollTo }),
}));
