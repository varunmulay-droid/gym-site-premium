import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as create } from "../_libs/@react-three/drei+[...].mjs";
import { a as DialogOverlay, c as Slot, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as ArrowDown, i as ArrowUpRight, r as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as string, i as object, t as _enum } from "../_libs/zod.mjs";
import { n as Route, r as __exportAll } from "./router-DzBEI_tp.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { n as gsapWithCSS, t as ScrollTrigger } from "../_libs/gsap.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DSK2F1V9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useGym = create((set) => ({
	progress: 0,
	mouse: {
		x: .5,
		y: .5
	},
	velocity: {
		x: 0,
		y: 0
	},
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
	setMouse: (x, y, vx, vy) => set({
		mouse: {
			x,
			y
		},
		velocity: {
			x: vx,
			y: vy
		}
	}),
	setHovering: (hovering) => set({ hovering }),
	setJoinOpen: (joinOpen, plan) => set(plan ? {
		joinOpen,
		joinPlan: plan
	} : { joinOpen }),
	setMenuOpen: (menuOpen) => set({ menuOpen }),
	setFlags: (flags) => set(flags),
	setScrollTo: (scrollTo) => set({ scrollTo })
}));
gsapWithCSS.registerPlugin(ScrollTrigger);
function LenisRoot({ children }) {
	(0, import_react.useEffect)(() => {
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
				enableFx: !isMobile && !reducedMotion
			});
		};
		applyFlags();
		mobile.addEventListener("change", applyFlags);
		reduced.addEventListener("change", applyFlags);
		coarse.addEventListener("change", applyFlags);
		const lenis = new Lenis({
			duration: reduced.matches ? 0 : 1.15,
			smoothWheel: !reduced.matches,
			touchMultiplier: 1.1
		});
		useGym.getState().setScrollTo((target, options) => {
			lenis.scrollTo(target, options);
		});
		lenis.on("scroll", ScrollTrigger.update);
		lenis.on("scroll", ({ progress }) => {
			useGym.getState().setProgress(progress);
		});
		useGym.getState().setProgress(lenis.limit ? lenis.scroll / lenis.limit : 0);
		const ticker = (time) => {
			lenis.raf(time * 1e3);
		};
		gsapWithCSS.ticker.add(ticker);
		gsapWithCSS.ticker.lagSmoothing(0);
		return () => {
			gsapWithCSS.ticker.remove(ticker);
			useGym.getState().setScrollTo(null);
			lenis.destroy();
			ScrollTrigger.getAll().forEach((t) => t.kill());
			mobile.removeEventListener("change", applyFlags);
			reduced.removeEventListener("change", applyFlags);
			coarse.removeEventListener("change", applyFlags);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LiquidCursor() {
	const dotRef = (0, import_react.useRef)(null);
	const trailRef = (0, import_react.useRef)(null);
	const hovering = useGym((s) => s.hovering);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(pointer: coarse)").matches) return;
		const dot = dotRef.current;
		const trail = trailRef.current;
		if (!dot || !trail) return;
		document.body.classList.add("has-custom-cursor");
		gsapWithCSS.set(dot, {
			xPercent: -50,
			yPercent: -50
		});
		gsapWithCSS.set(trail, {
			xPercent: -50,
			yPercent: -50
		});
		const xDot = gsapWithCSS.quickTo(dot, "x", {
			duration: .08,
			ease: "power3.out"
		});
		const yDot = gsapWithCSS.quickTo(dot, "y", {
			duration: .08,
			ease: "power3.out"
		});
		const xTrail = gsapWithCSS.quickTo(trail, "x", {
			duration: .38,
			ease: "power3.out"
		});
		const yTrail = gsapWithCSS.quickTo(trail, "y", {
			duration: .38,
			ease: "power3.out"
		});
		let lastX = window.innerWidth * .5;
		let lastY = window.innerHeight * .5;
		let lastT = performance.now();
		const onMove = (e) => {
			const now = performance.now();
			const dt = Math.max((now - lastT) / 1e3, 1 / 120);
			const vx = (e.clientX - lastX) / window.innerWidth / dt;
			const vy = (lastY - e.clientY) / window.innerHeight / dt;
			lastX = e.clientX;
			lastY = e.clientY;
			lastT = now;
			xDot(e.clientX);
			yDot(e.clientY);
			xTrail(e.clientX);
			yTrail(e.clientY);
			useGym.getState().setMouse(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight, vx * .04, vy * .04);
		};
		window.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			window.removeEventListener("pointermove", onMove);
			document.body.classList.remove("has-custom-cursor");
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-50 hidden md:block",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: trailRef,
			className: cn("absolute top-0 left-0 flex size-12 items-center justify-center rounded-full border border-accent/70", "transition-[width,height,opacity,background-color] duration-200 ease-out", hovering ? "size-24 border-accent bg-accent/10" : "opacity-70"),
			children: hovering ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-kicker tracking-kicker text-accent",
				children: hovering
			}) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: dotRef,
			className: "absolute top-0 left-0 size-2 rounded-full bg-accent"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-display uppercase tracking-kicker text-sm transition-[color,background-color,border-color,transform,opacity] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-foreground hover:bg-foreground hover:text-background",
			outline: "border border-border bg-transparent text-foreground hover:border-foreground",
			ghost: "text-muted hover:text-foreground"
		},
		size: {
			sm: "h-11 px-4 text-kicker",
			default: "h-12 px-6",
			lg: "h-14 px-8"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var LINKS = [
	{
		href: "#method",
		label: "Method"
	},
	{
		href: "#floor",
		label: "Floor"
	},
	{
		href: "#programs",
		label: "Programs"
	},
	{
		href: "#visit",
		label: "Visit"
	}
];
function MagLink({ href, children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className,
		...props,
		onClick: (e) => {
			props.onClick?.(e);
			if (e.defaultPrevented || !href.startsWith("#")) return;
			e.preventDefault();
			useGym.getState().scrollTo?.(href);
			useGym.getState().setMenuOpen(false);
		},
		children
	});
}
function Nav() {
	const progress = useGym((s) => s.progress);
	const menuOpen = useGym((s) => s.menuOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: cn("fixed top-0 right-0 left-0 z-40 transition-[background-color,border-color] duration-200", progress > .04 ? "border-b border-border/80 bg-background/80 backdrop-blur-sm" : "border-b border-transparent"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagLink, {
					href: "#hero",
					className: "font-display text-xl tracking-kicker text-foreground",
					onMouseEnter: () => useGym.getState().setHovering("TOP"),
					onMouseLeave: () => useGym.getState().setHovering(null),
					children: "FORGE"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagLink, {
						href: link.href,
						className: "font-mono text-kicker tracking-kicker text-muted uppercase transition-colors duration-150 hover:text-foreground",
						onMouseEnter: () => useGym.getState().setHovering(link.label.toUpperCase()),
						onMouseLeave: () => useGym.getState().setHovering(null),
						children: link.label
					}, link.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "hidden md:inline-flex",
						onClick: () => useGym.getState().setJoinOpen(true, "resident"),
						onMouseEnter: () => useGym.getState().setHovering("JOIN"),
						onMouseLeave: () => useGym.getState().setHovering(null),
						children: "Join the floor"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "px-3 md:hidden",
						"aria-label": menuOpen ? "Close menu" : "Open menu",
						onClick: () => useGym.getState().setMenuOpen(!menuOpen),
						children: menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("fixed inset-0 z-30 flex flex-col justify-end bg-background px-6 pt-24 pb-10 md:hidden", "transition-opacity duration-200 ease-out", menuOpen ? "opacity-100" : "pointer-events-none opacity-0"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex flex-col gap-2",
			children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagLink, {
				href: link.href,
				className: "font-display text-section tracking-section text-foreground uppercase",
				children: link.label
			}, link.href))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "lg",
			className: "mt-8 w-full",
			onClick: () => {
				useGym.getState().setMenuOpen(false);
				useGym.getState().setJoinOpen(true, "resident");
			},
			children: "Join the floor"
		})]
	})] });
}
var STATS = [
	{
		value: "24",
		label: "Lifting bays"
	},
	{
		value: "05:00",
		label: "Doors open"
	},
	{
		value: "0",
		label: "Chrome machines"
	},
	{
		value: "100%",
		label: "Calibrated steel"
	}
];
var PROGRAMS = [
	{
		id: "day",
		index: "01",
		name: "Day pass",
		price: "$45",
		cadence: "single session",
		points: [
			"Full floor access",
			"Open programming",
			"Cold plunge add-on"
		]
	},
	{
		id: "resident",
		index: "02",
		name: "Resident",
		price: "$190",
		cadence: "per month",
		points: [
			"Unlimited bays",
			"Strength tracks",
			"Guest pass / month"
		]
	},
	{
		id: "black",
		index: "03",
		name: "Forge Black",
		price: "$340",
		cadence: "per month",
		points: [
			"1:1 coaching",
			"Recovery suite",
			"Priority 5am slots"
		]
	}
];
function Mag({ href, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className,
		onClick: (e) => {
			if (!href.startsWith("#")) return;
			e.preventDefault();
			useGym.getState().scrollTo?.(href);
		},
		children
	});
}
function Overlays() {
	const progress = useGym((s) => s.progress);
	const inspect = progress > .12 && progress < .38;
	const floor = progress > .4 && progress < .68;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative z-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "hero",
				className: "relative flex min-h-svh flex-col justify-end px-5 pb-16 md:justify-center md:px-12 lg:px-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl pt-24 md:pt-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-kicker tracking-kicker text-accent uppercase",
							children: "Est. 2019 — Members only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-display leading-display tracking-display text-foreground uppercase",
							children: [
								"Forged",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"in steel"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-md text-lead text-muted",
							children: "A performance gym built around calibrated iron, turf, and coaches who still lift. No smoothie bar. No chrome."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								onClick: () => useGym.getState().setJoinOpen(true, "resident"),
								onMouseEnter: () => useGym.getState().setHovering("JOIN"),
								onMouseLeave: () => useGym.getState().setHovering(null),
								children: "Claim a bay"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "lg",
								onClick: () => useGym.getState().scrollTo?.("#floor"),
								onMouseEnter: () => useGym.getState().setHovering("TOUR"),
								onMouseLeave: () => useGym.getState().setHovering(null),
								children: "Tour the floor"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex", "transition-opacity duration-500", progress > .08 ? "opacity-0" : "opacity-100"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-kicker tracking-kicker text-muted uppercase",
						children: "Scroll"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4 text-accent" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "method",
				className: "relative flex min-h-svh items-center px-5 py-24 md:px-12 lg:px-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("max-w-lg rounded-lg border border-border bg-background/70 p-6 md:p-8", "transition-opacity duration-500", inspect ? "opacity-100" : "opacity-90"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-kicker tracking-kicker text-accent uppercase",
								children: "02 — Method"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-section tracking-section uppercase",
								children: "Precision engineering"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lead text-muted",
								children: "Diamond knurl. Stainless sleeves. Plates that actually weigh what they say. The bar in the hero is the same steel on the floor — nothing for the camera, everything for the work."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
						className: "top-1/4 right-8 hidden lg:flex",
						kicker: "Grip",
						title: "Diamond knurl",
						show: inspect
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HudChip, {
						className: "top-1/2 right-16 hidden lg:flex",
						kicker: "Load",
						title: "Calibrated 2.5kg",
						show: inspect
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 py-8 md:px-12 lg:px-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-px bg-border md:grid-cols-4",
					children: STATS.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-background px-5 py-8 md:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl tracking-display text-foreground tabular-nums md:text-5xl",
							children: stat.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-mono text-kicker tracking-kicker text-muted uppercase",
							children: stat.label
						})]
					}, stat.label))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "floor",
				className: "relative flex min-h-svh items-center px-5 py-24 md:px-12 lg:px-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("max-w-md rounded-lg border border-border bg-background/70 p-6 md:p-8", "transition-opacity duration-500", floor ? "opacity-100" : "opacity-80"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-kicker tracking-kicker text-accent uppercase",
							children: "03 — Floor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-section tracking-section uppercase",
							children: "Eight bays. Turf. Sled."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lead text-muted",
							children: "Live training films mapped onto the cylinder behind you. The floor is loud on purpose: plates, chains, and a cold plunge that does not care how you feel at 5:12am."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 space-y-2 font-mono text-kicker tracking-kicker text-steel uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Competition bars — 20kg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Calibrated plates to 25kg" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "40m turf + dual sleds" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Plunge / sauna recovery" })
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "programs",
				className: "px-5 py-24 md:px-12 lg:px-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-kicker tracking-kicker text-accent uppercase",
						children: "04 — Programs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-section tracking-section uppercase",
						children: "Pick your steel"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-muted",
						children: "No contracts dressed as community. Cancel on thirty days. Show up or don’t — the bar will still be here."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: PROGRAMS.map((program) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-accent",
						onMouseEnter: () => useGym.getState().setHovering(program.name.toUpperCase()),
						onMouseLeave: () => useGym.getState().setHovering(null),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-kicker tracking-kicker text-faint",
									children: program.index
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-kicker tracking-kicker text-muted uppercase",
									children: program.cadence
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-3xl tracking-section uppercase",
								children: program.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-4xl text-accent tabular-nums",
								children: program.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-6 flex-1 space-y-2 text-sm text-muted",
								children: program.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: point }, point))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: program.id === "resident" ? "primary" : "outline",
								className: "mt-8 w-full",
								onClick: () => useGym.getState().setJoinOpen(true, program.id),
								children: ["Request ", program.name]
							})
						]
					}, program.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "visit",
				className: "grid min-h-svh items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-12 lg:px-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-kicker tracking-kicker text-accent uppercase",
						children: "05 — Visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-section tracking-section uppercase",
						children: "1400 Industrial Way"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-lead text-muted",
						children: "Unit B, Oakland. Roll-up doors, no signage except the mark on the steel. If you can find it, you can train here."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => useGym.getState().setJoinOpen(true, "day"),
							onMouseEnter: () => useGym.getState().setHovering("TOUR"),
							onMouseLeave: () => useGym.getState().setHovering(null),
							children: "Request a tour"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:desk@forge.gym",
								children: ["Email the desk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-2 gap-px bg-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Weekdays",
							value: "05:00 — 23:00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Weekend",
							value: "07:00 — 21:00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Coaching",
							value: "By booking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
							label: "Parking",
							value: "Lot behind B"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border-t border-border px-5 py-24 text-center md:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-kicker tracking-kicker text-accent uppercase",
						children: "The bar does not negotiate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mx-auto mt-4 max-w-4xl font-display text-section tracking-section uppercase",
						children: "Show up heavy. Leave quieter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "mt-10",
						onClick: () => useGym.getState().setJoinOpen(true, "black"),
						onMouseEnter: () => useGym.getState().setHovering("FORGE"),
						onMouseLeave: () => useGym.getState().setHovering(null),
						children: "Join Forge Black"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border px-5 py-12 md:px-12 lg:px-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-display leading-display tracking-display text-surface-2 uppercase",
					children: "Forge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "1400 Industrial Way, Unit B" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Oakland, CA" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: "Films via Pexels. Steel via the floor."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-6 font-mono text-kicker tracking-kicker text-muted uppercase",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mag, {
								href: "#method",
								children: "Method"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mag, {
								href: "#programs",
								children: "Programs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mag, {
								href: "#visit",
								children: "Visit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:desk@forge.gym",
								children: "Desk"
							})
						]
					})]
				})]
			})
		]
	});
}
function Info({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background px-5 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "font-mono text-kicker tracking-kicker text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-2 font-display text-2xl tracking-section uppercase",
			children: value
		})]
	});
}
function HudChip({ className, kicker, title, show }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute flex flex-col border border-border bg-background/60 px-4 py-3", "transition-opacity duration-500", show ? "opacity-100" : "opacity-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-kicker tracking-kicker text-accent uppercase",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl tracking-section uppercase",
			children: title
		})]
	});
}
var schema = object({
	name: string().min(2, "Name needs at least two characters"),
	email: string().email("Enter a valid email"),
	plan: _enum([
		"day",
		"resident",
		"black"
	])
});
var PLANS = [
	{
		id: "day",
		label: "Day pass"
	},
	{
		id: "resident",
		label: "Resident"
	},
	{
		id: "black",
		label: "Forge Black"
	}
];
var STORAGE_KEY = "forge-waitlist";
function JoinDialog() {
	const open = useGym((s) => s.joinOpen);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)("resident");
	const [error, setError] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const onOpenChange = (next) => {
		if (next) {
			setSelected(useGym.getState().joinPlan);
			setDone(false);
			setError(null);
		}
		useGym.getState().setJoinOpen(next);
	};
	const submit = (e) => {
		e.preventDefault();
		const parsed = schema.safeParse({
			name: name.trim(),
			email: email.trim(),
			plan: selected
		});
		if (!parsed.success) {
			setError(parsed.error.issues[0]?.message ?? "Check the form");
			return;
		}
		const existing = (() => {
			try {
				return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
			} catch {
				return [];
			}
		})();
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, {
			...parsed.data,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}]));
		setDone(true);
		toast.success("You're on the list. We'll confirm your bay.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: cn("fixed top-1/2 left-4 right-4 z-50 mx-auto w-full max-w-md -translate-y-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2", "rounded-lg border border-border bg-surface p-6 shadow-none"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl tracking-section uppercase",
					children: done ? "Locked in" : "Claim a bay"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-1 text-sm text-muted",
					children: done ? "We saved your request on this device. A coach will follow up by email." : "Members-only floor. Tell us who you are and which program you want."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						className: "px-2",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})
				})]
			}), done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: () => onOpenChange(false),
				children: "Back to the floor"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-4",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 font-mono text-kicker tracking-kicker text-muted uppercase",
						children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							autoComplete: "name",
							className: "h-12 rounded-sm border border-border bg-background px-3 font-sans text-sm text-foreground outline-none focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-1.5 font-mono text-kicker tracking-kicker text-muted uppercase",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "email",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							autoComplete: "email",
							className: "h-12 rounded-sm border border-border bg-background px-3 font-sans text-sm text-foreground outline-none focus:border-accent"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "font-mono text-kicker tracking-kicker text-muted uppercase",
							children: "Program"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: PLANS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelected(item.id),
								className: cn("h-11 rounded-sm border font-mono text-kicker tracking-kicker uppercase transition-colors duration-150", selected === item.id ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted hover:text-foreground"),
								children: item.label
							}, item.id))
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-2 w-full",
						children: "Request membership"
					})
				]
			})]
		})] })
	});
}
function HomePage({ videos }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LenisRoot, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-svh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CanvasGate, { videos }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlays, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JoinDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidCursor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right"
			})
		]
	}) });
}
function CanvasGate({ videos }) {
	const [Stage, setStage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let live = true;
		import("./stage-DMUoHIcU.mjs").then((mod) => {
			if (live) setStage(() => mod.GymStage);
		});
		return () => {
			live = false;
		};
	}, []);
	if (!Stage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-0 bg-background",
		style: { background: "radial-gradient(ellipse 55% 45% at 62% 48%, #1a1a14 0%, #0a0a0a 70%)" },
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, { videos });
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	const videos = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomePage, { videos });
}
//#endregion
export { useGym as n, routes_exports as t };
