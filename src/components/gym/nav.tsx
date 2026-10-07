import type { ComponentProps, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGym } from "@/lib/gym-store";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#method", label: "Method" },
  { href: "#floor", label: "Floor" },
  { href: "#programs", label: "Programs" },
  { href: "#visit", label: "Visit" },
];

function MagLink({
  href,
  children,
  className,
  ...props
}: ComponentProps<"a"> & { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      {...props}
      onClick={(e) => {
        props.onClick?.(e);
        if (e.defaultPrevented || !href.startsWith("#")) return;
        e.preventDefault();
        useGym.getState().scrollTo?.(href);
        useGym.getState().setMenuOpen(false);
      }}
    >
      {children}
    </a>
  );
}

export function Nav() {
  const progress = useGym((s) => s.progress);
  const menuOpen = useGym((s) => s.menuOpen);
  const solid = progress > 0.04;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-40 transition-[background-color,border-color] duration-200",
          solid
            ? "border-b border-border/80 bg-background/80 backdrop-blur-sm"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <MagLink
            href="#hero"
            className="font-display text-xl tracking-kicker text-foreground"
            onMouseEnter={() => useGym.getState().setHovering("TOP")}
            onMouseLeave={() => useGym.getState().setHovering(null)}
          >
            FORGE
          </MagLink>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <MagLink
                key={link.href}
                href={link.href}
                className="font-mono text-kicker tracking-kicker text-muted uppercase transition-colors duration-150 hover:text-foreground"
                onMouseEnter={() =>
                  useGym.getState().setHovering(link.label.toUpperCase())
                }
                onMouseLeave={() => useGym.getState().setHovering(null)}
              >
                {link.label}
              </MagLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => useGym.getState().setJoinOpen(true, "resident")}
              onMouseEnter={() => useGym.getState().setHovering("JOIN")}
              onMouseLeave={() => useGym.getState().setHovering(null)}
            >
              Join the floor
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => useGym.getState().setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-30 flex flex-col justify-end bg-background px-6 pt-24 pb-10 md:hidden",
          "transition-opacity duration-200 ease-out",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex flex-col gap-2">
          {LINKS.map((link) => (
            <MagLink
              key={link.href}
              href={link.href}
              className="font-display text-section tracking-section text-foreground uppercase"
            >
              {link.label}
            </MagLink>
          ))}
        </nav>
        <Button
          size="lg"
          className="mt-8 w-full"
          onClick={() => {
            useGym.getState().setMenuOpen(false);
            useGym.getState().setJoinOpen(true, "resident");
          }}
        >
          Join the floor
        </Button>
      </div>
    </>
  );
}
