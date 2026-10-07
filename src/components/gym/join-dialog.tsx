import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useGym, type PlanId } from "@/lib/gym-store";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name needs at least two characters"),
  email: z.string().email("Enter a valid email"),
  plan: z.enum(["day", "resident", "black"]),
});

const PLANS: { id: PlanId; label: string }[] = [
  { id: "day", label: "Day pass" },
  { id: "resident", label: "Resident" },
  { id: "black", label: "Forge Black" },
];

const STORAGE_KEY = "forge-waitlist";

export function JoinDialog() {
  const open = useGym((s) => s.joinOpen);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<PlanId>("resident");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const onOpenChange = (next: boolean) => {
    if (next) {
      setSelected(useGym.getState().joinPlan);
      setDone(false);
      setError(null);
    }
    useGym.getState().setJoinOpen(next);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({
      name: name.trim(),
      email: email.trim(),
      plan: selected,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the form");
      return;
    }
    const existing = (() => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown[];
      } catch {
        return [];
      }
    })();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([...existing, { ...parsed.data, at: new Date().toISOString() }]),
    );
    setDone(true);
    toast.success("You're on the list. We'll confirm your bay.");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-4 right-4 z-50 mx-auto w-full max-w-md -translate-y-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2",
            "rounded-lg border border-border bg-surface p-6 shadow-none",
          )}
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl tracking-section uppercase">
                {done ? "Locked in" : "Claim a bay"}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {done
                  ? "We saved your request on this device. A coach will follow up by email."
                  : "Members-only floor. Tell us who you are and which program you want."}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm" className="px-2" aria-label="Close">
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          {done ? (
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Back to the floor
            </Button>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={submit}>
              <label className="flex flex-col gap-1.5 font-mono text-kicker tracking-kicker text-muted uppercase">
                Name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="h-12 rounded-sm border border-border bg-background px-3 font-sans text-sm text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="flex flex-col gap-1.5 font-mono text-kicker tracking-kicker text-muted uppercase">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-12 rounded-sm border border-border bg-background px-3 font-sans text-sm text-foreground outline-none focus:border-accent"
                />
              </label>
              <fieldset className="flex flex-col gap-2">
                <legend className="font-mono text-kicker tracking-kicker text-muted uppercase">
                  Program
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {PLANS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelected(item.id)}
                      className={cn(
                        "h-11 rounded-sm border font-mono text-kicker tracking-kicker uppercase transition-colors duration-150",
                        selected === item.id
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border text-muted hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              {error ? <p className="text-sm text-muted">{error}</p> : null}
              <Button type="submit" className="mt-2 w-full">
                Request membership
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
