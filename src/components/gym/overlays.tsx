import type { ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGym, type PlanId } from "@/lib/gym-store";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "24", label: "Lifting bays" },
  { value: "05:00", label: "Doors open" },
  { value: "0", label: "Chrome machines" },
  { value: "100%", label: "Calibrated steel" },
];

const PROGRAMS: {
  id: PlanId;
  index: string;
  name: string;
  price: string;
  cadence: string;
  points: string[];
}[] = [
  {
    id: "day",
    index: "01",
    name: "Day pass",
    price: "$45",
    cadence: "single session",
    points: ["Full floor access", "Open programming", "Cold plunge add-on"],
  },
  {
    id: "resident",
    index: "02",
    name: "Resident",
    price: "$190",
    cadence: "per month",
    points: ["Unlimited bays", "Strength tracks", "Guest pass / month"],
  },
  {
    id: "black",
    index: "03",
    name: "Forge Black",
    price: "$340",
    cadence: "per month",
    points: ["1:1 coaching", "Recovery suite", "Priority 5am slots"],
  },
];

function Mag({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (!href.startsWith("#")) return;
        e.preventDefault();
        useGym.getState().scrollTo?.(href);
      }}
    >
      {children}
    </a>
  );
}

export function Overlays() {
  const progress = useGym((s) => s.progress);
  const inspect = progress > 0.12 && progress < 0.38;
  const floor = progress > 0.4 && progress < 0.68;

  return (
    <main className="relative z-10">
      <section
        id="hero"
        className="relative flex min-h-svh flex-col justify-end px-5 pb-16 md:justify-center md:px-12 lg:px-16"
      >
        <div className="max-w-xl pt-24 md:pt-0">
          <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
            Est. 2019 — Members only
          </p>
          <h1 className="mt-4 font-display text-display leading-display tracking-display text-foreground uppercase">
            Forged
            <br />
            in steel
          </h1>
          <p className="mt-6 max-w-md text-lead text-muted">
            A performance gym built around calibrated iron, turf, and coaches who
            still lift. No smoothie bar. No chrome.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => useGym.getState().setJoinOpen(true, "resident")}
              onMouseEnter={() => useGym.getState().setHovering("JOIN")}
              onMouseLeave={() => useGym.getState().setHovering(null)}
            >
              Claim a bay
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => useGym.getState().scrollTo?.("#floor")}
              onMouseEnter={() => useGym.getState().setHovering("TOUR")}
              onMouseLeave={() => useGym.getState().setHovering(null)}
            >
              Tour the floor
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex",
            "transition-opacity duration-500",
            progress > 0.08 ? "opacity-0" : "opacity-100",
          )}
        >
          <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
            Scroll
          </span>
          <ArrowDown className="size-4 text-accent" />
        </div>
      </section>

      <section
        id="method"
        className="relative flex min-h-svh items-center px-5 py-24 md:px-12 lg:px-16"
      >
        <div
          className={cn(
            "max-w-lg rounded-lg border border-border bg-background/70 p-6 md:p-8",
            "transition-opacity duration-500",
            inspect ? "opacity-100" : "opacity-90",
          )}
        >
          <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
            02 — Method
          </p>
          <h2 className="mt-3 font-display text-section tracking-section uppercase">
            Precision engineering
          </h2>
          <p className="mt-4 text-lead text-muted">
            Diamond knurl. Stainless sleeves. Plates that actually weigh what
            they say. The bar in the hero is the same steel on the floor —
            nothing for the camera, everything for the work.
          </p>
        </div>

        <HudChip
          className="top-1/4 right-8 hidden lg:flex"
          kicker="Grip"
          title="Diamond knurl"
          show={inspect}
        />
        <HudChip
          className="top-1/2 right-16 hidden lg:flex"
          kicker="Load"
          title="Calibrated 2.5kg"
          show={inspect}
        />
      </section>

      <section className="px-5 py-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-background px-5 py-8 md:px-8">
              <p className="font-display text-4xl tracking-display text-foreground tabular-nums md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-kicker tracking-kicker text-muted uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="floor"
        className="relative flex min-h-svh items-center px-5 py-24 md:px-12 lg:px-16"
      >
        <div
          className={cn(
            "max-w-md rounded-lg border border-border bg-background/70 p-6 md:p-8",
            "transition-opacity duration-500",
            floor ? "opacity-100" : "opacity-80",
          )}
        >
          <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
            03 — Floor
          </p>
          <h2 className="mt-3 font-display text-section tracking-section uppercase">
            Eight bays. Turf. Sled.
          </h2>
          <p className="mt-4 text-lead text-muted">
            Live training films mapped onto the cylinder behind you. The floor is
            loud on purpose: plates, chains, and a cold plunge that does not care
            how you feel at 5:12am.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-kicker tracking-kicker text-steel uppercase">
            <li>Competition bars — 20kg</li>
            <li>Calibrated plates to 25kg</li>
            <li>40m turf + dual sleds</li>
            <li>Plunge / sauna recovery</li>
          </ul>
        </div>
      </section>

      <section id="programs" className="px-5 py-24 md:px-12 lg:px-16">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
              04 — Programs
            </p>
            <h2 className="mt-3 font-display text-section tracking-section uppercase">
              Pick your steel
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            No contracts dressed as community. Cancel on thirty days. Show up or
            don’t — the bar will still be here.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PROGRAMS.map((program) => (
            <article
              key={program.id}
              className="flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent"
              onMouseEnter={() =>
                useGym.getState().setHovering(program.name.toUpperCase())
              }
              onMouseLeave={() => useGym.getState().setHovering(null)}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-kicker tracking-kicker text-faint">
                  {program.index}
                </span>
                <span className="font-mono text-kicker tracking-kicker text-muted uppercase">
                  {program.cadence}
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl tracking-section uppercase">
                {program.name}
              </h3>
              <p className="mt-2 font-display text-4xl text-accent tabular-nums">
                {program.price}
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-muted">
                {program.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Button
                variant={program.id === "resident" ? "primary" : "outline"}
                className="mt-8 w-full"
                onClick={() => useGym.getState().setJoinOpen(true, program.id)}
              >
                Request {program.name}
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section
        id="visit"
        className="grid min-h-svh items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-12 lg:px-16"
      >
        <div>
          <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
            05 — Visit
          </p>
          <h2 className="mt-3 font-display text-section tracking-section uppercase">
            1400 Industrial Way
          </h2>
          <p className="mt-4 max-w-md text-lead text-muted">
            Unit B, Oakland. Roll-up doors, no signage except the mark on the
            steel. If you can find it, you can train here.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              onClick={() => useGym.getState().setJoinOpen(true, "day")}
              onMouseEnter={() => useGym.getState().setHovering("TOUR")}
              onMouseLeave={() => useGym.getState().setHovering(null)}
            >
              Request a tour
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:desk@forge.gym">
                Email the desk
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-px bg-border">
          <Info label="Weekdays" value="05:00 — 23:00" />
          <Info label="Weekend" value="07:00 — 21:00" />
          <Info label="Coaching" value="By booking" />
          <Info label="Parking" value="Lot behind B" />
        </dl>
      </section>

      <section className="border-t border-border px-5 py-24 text-center md:px-12">
        <p className="font-mono text-kicker tracking-kicker text-accent uppercase">
          The bar does not negotiate
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl font-display text-section tracking-section uppercase">
          Show up heavy. Leave quieter.
        </h2>
        <Button
          size="lg"
          className="mt-10"
          onClick={() => useGym.getState().setJoinOpen(true, "black")}
          onMouseEnter={() => useGym.getState().setHovering("FORGE")}
          onMouseLeave={() => useGym.getState().setHovering(null)}
        >
          Join Forge Black
        </Button>
      </section>

      <footer className="border-t border-border px-5 py-12 md:px-12 lg:px-16">
        <p className="font-display text-display leading-display tracking-display text-surface-2 uppercase">
          Forge
        </p>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-sm text-muted">
            <p>1400 Industrial Way, Unit B</p>
            <p>Oakland, CA</p>
            <p className="mt-2">Films via Pexels. Steel via the floor.</p>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-kicker tracking-kicker text-muted uppercase">
            <Mag href="#method">Method</Mag>
            <Mag href="#programs">Programs</Mag>
            <Mag href="#visit">Visit</Mag>
            <a href="mailto:desk@forge.gym">Desk</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background px-5 py-8">
      <dt className="font-mono text-kicker tracking-kicker text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl tracking-section uppercase">
        {value}
      </dd>
    </div>
  );
}

function HudChip({
  className,
  kicker,
  title,
  show,
}: {
  className?: string;
  kicker: string;
  title: string;
  show: boolean;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute flex flex-col border border-border bg-background/60 px-4 py-3",
        "transition-opacity duration-500",
        show ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <span className="font-mono text-kicker tracking-kicker text-accent uppercase">
        {kicker}
      </span>
      <span className="font-display text-xl tracking-section uppercase">
        {title}
      </span>
    </div>
  );
}
