import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as MeshTransmissionMaterial, c as useGLTF, f as useFrame, i as Float, l as useProgress, n as ContactShadows, o as useVideoTexture, p as useThree, r as Environment, s as Grid, t as Lightformer, u as Canvas } from "../_libs/@react-three/drei+[...].mjs";
import { n as useGym } from "./routes-DSK2F1V9.mjs";
import { Lt as Vector2, Rt as Vector3, X as MathUtils, _ as DataTexture, l as Box3, m as Color, nt as MeshPhysicalMaterial, rt as MeshStandardMaterial } from "../_libs/monogrid__gainmap-js+three.mjs";
import { i as Vignette, n as ChromaticAberration, r as EffectComposer, t as Bloom } from "../_libs/@react-three/postprocessing+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stage-DMUoHIcU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
useGLTF.preload("/models/dumbbell.glb");
useGLTF.preload("/models/sci-fi-dumbbell.glb");
function enhance(root) {
	root.traverse((obj) => {
		const mesh = obj;
		if (!mesh.isMesh) return;
		const apply = (material) => {
			if (material instanceof MeshStandardMaterial || material instanceof MeshPhysicalMaterial) {
				material.metalness = Math.max(material.metalness, .7);
				material.roughness = Math.min(material.roughness, .38);
				material.envMapIntensity = 1.45;
			}
		};
		if (Array.isArray(mesh.material)) mesh.material.forEach(apply);
		else if (mesh.material) apply(mesh.material);
	});
}
function FittedGltf({ url, target = 2.15, ...props }) {
	const { scene } = useGLTF(url);
	const group = (0, import_react.useRef)(null);
	const cloned = (0, import_react.useMemo)(() => {
		const copy = scene.clone(true);
		enhance(copy);
		return copy;
	}, [scene]);
	(0, import_react.useLayoutEffect)(() => {
		const box = new Box3().setFromObject(cloned);
		const size = box.getSize(new Vector3());
		const center = box.getCenter(new Vector3());
		cloned.position.sub(center);
		const scale = target / Math.max(size.x, size.y, size.z, .001);
		if (group.current) group.current.scale.setScalar(scale);
	}, [cloned, target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("primitive", { object: cloned })
	});
}
var _offset = new Vector3();
function HeroDumbbell() {
	const group = (0, import_react.useRef)(null);
	const reduced = useGym((s) => s.reducedMotion);
	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const d = Math.min(delta, .1);
		const t = useGym.getState().progress;
		const spin = t * Math.PI * 2.15;
		const inspect = smooth(t, .08, .28);
		g.rotation.y = MathUtils.damp(g.rotation.y, spin + inspect * .4, 4, d);
		g.rotation.x = MathUtils.damp(g.rotation.x, Math.sin(t * Math.PI) * .22, 4, d);
		_offset.set(MathUtils.lerp(0, -1.85, smooth(t, .32, .48)), MathUtils.lerp(.15, .05, inspect), MathUtils.lerp(0, .4, smooth(t, .32, .5)));
		g.position.lerp(_offset, 1 - Math.exp(-5 * d));
		const hide = Math.max(1 - smooth(t, .78, .92), .001);
		g.scale.setScalar(MathUtils.damp(g.scale.x || 1, hide, 6, d));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Float, {
			speed: reduced ? 0 : 1.4,
			rotationIntensity: reduced ? 0 : .25,
			floatIntensity: reduced ? 0 : .45,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FittedGltf, {
				url: "/models/dumbbell.glb",
				target: 2.2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				-1.2,
				0
			],
			opacity: .55,
			scale: 10,
			blur: 2.4,
			far: 3.5,
			color: "#000000"
		})]
	});
}
function ConceptDumbbell() {
	const group = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const d = Math.min(delta, .1);
		const t = useGym.getState().progress;
		const show = smooth(t, .42, .55) * (1 - smooth(t, .78, .9));
		g.visible = show > .02;
		g.position.set(2.1, .1, .2);
		g.rotation.y += d * .35;
		g.scale.setScalar(.85 * Math.max(show, .001));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		visible: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FittedGltf, {
			url: "/models/sci-fi-dumbbell.glb",
			target: 1.7
		})
	});
}
function FloorProps() {
	const group = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const t = useGym.getState().progress;
		const show = smooth(t, .38, .52) * (1 - smooth(t, .74, .88));
		g.visible = show > .04;
		const d = Math.min(delta, .1);
		g.position.y = MathUtils.damp(g.position.y, show * .05 - .9, 4, d);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		visible: false,
		position: [
			0,
			-.9,
			-.4
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProteinTub, {
				position: [
					-3.2,
					.4,
					1.1
				],
				accent: "#ccff00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProteinTub, {
				position: [
					3.4,
					.4,
					.6
				],
				accent: "#d9d9d9"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightStack, { position: [
				-3.6,
				0,
				-1.4
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeightStack, { position: [
				3.8,
				0,
				-1.1
			] })
		]
	});
}
function ProteinTub({ accent, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		...props,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.32,
				.36,
				.72,
				28
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#161616",
				metalness: .35,
				roughness: .45
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.4,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.3,
					.3,
					.08,
					28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0d0d0d",
					metalness: .2,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.06,
					.345
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.42, .32] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: accent,
					metalness: .1,
					roughness: .35,
					emissive: accent,
					emissiveIntensity: .18
				})]
			})
		]
	});
}
function WeightStack(props) {
	const plates = [
		.55,
		.5,
		.44,
		.38,
		.32
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		...props,
		children: [plates.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.07 + i * .12,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				r,
				r,
				.1,
				28
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: i % 2 ? "#1a1a1a" : "#111111",
				metalness: .82,
				roughness: .28
			})]
		}, r)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.42,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.045,
				.045,
				.95,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c5c5c5",
				metalness: .9,
				roughness: .18
			})]
		})]
	});
}
function DustField() {
	const ref = (0, import_react.useRef)(null);
	const positions = (0, import_react.useMemo)(() => {
		const arr = /* @__PURE__ */ new Float32Array(360);
		for (let i = 0; i < 120; i++) {
			arr[i * 3] = (Math.random() - .5) * 10;
			arr[i * 3 + 1] = Math.random() * 4 - .5;
			arr[i * 3 + 2] = (Math.random() - .5) * 8;
		}
		return arr;
	}, []);
	useFrame((state, delta) => {
		const pts = ref.current;
		if (!pts) return;
		const d = Math.min(delta, .1);
		pts.rotation.y += d * .015;
		pts.position.y = Math.sin(state.clock.elapsedTime * .15) * .08;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("points", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
			attach: "attributes-position",
			args: [positions, 3]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointsMaterial", {
			size: .022,
			color: "#ccff00",
			transparent: true,
			opacity: .28,
			depthWrite: false,
			sizeAttenuation: true
		})]
	});
}
function smooth(t, a, b) {
	const u = MathUtils.clamp((t - a) / (b - a), 0, 1);
	return u * u * (3 - 2 * u);
}
var VERT = `
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
var FRAG = `
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

  vec3 base = vec3(0.04, 0.04, 0.035);
  if (uHasVideo > 0.5) {
    vec3 vid = texture2D(uMap, uv).rgb;
    float luma = dot(vid, vec3(0.299, 0.587, 0.114));
    vid = mix(vec3(luma), vid, 0.32);
    vid *= vec3(0.82, 0.9, 0.62);
    base = vid * 0.26;
  }

  float gx = smoothstep(0.045, 0.0, abs(fract(uv.x * 16.0) - 0.5));
  float gy = smoothstep(0.045, 0.0, abs(fract(uv.y * 16.0) - 0.5));
  base += vec3(0.08, 0.09, 0.04) * max(gx, gy) * 0.14;

  float glow = exp(-dist * 5.5) * (0.1 + vel * 0.38);
  base += vec3(0.8, 1.0, 0.05) * glow;
  base += sin((uv.y + uTime * 0.04) * 780.0) * 0.016;

  float vig = smoothstep(1.05, 0.2, length(uv - 0.5) * 1.35);
  base *= vig;
  gl_FragColor = vec4(base, 1.0);
}
`;
var _mouse = new Vector2(.5, .5);
var _vel = new Vector2();
function LiquidBackground({ videoUrl }) {
	if (videoUrl) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoLiquid, { url: videoUrl });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShaderPlane, { map: null });
}
function VideoLiquid({ url }) {
	const texture = useVideoTexture(url, {
		unsuspend: "canplay",
		start: true,
		muted: true,
		loop: true,
		playsInline: true,
		crossOrigin: "anonymous"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShaderPlane, { map: texture });
}
function ShaderPlane({ map }) {
	const dummy = (0, import_react.useMemo)(() => {
		const t = new DataTexture(new Uint8Array([
			8,
			8,
			8,
			255
		]), 1, 1);
		t.needsUpdate = true;
		return t;
	}, []);
	const uniforms = (0, import_react.useMemo)(() => ({
		uTime: { value: 0 },
		uMouse: { value: new Vector2(.5, .5) },
		uVelocity: { value: new Vector2() },
		uMap: { value: map ?? dummy },
		uHasVideo: { value: map ? 1 : 0 }
	}), [dummy, map]);
	const mat = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		const m = mat.current;
		if (!m) return;
		const d = Math.min(delta, .1);
		const { mouse, velocity, reducedMotion } = useGym.getState();
		m.uniforms.uTime.value += reducedMotion ? 0 : d;
		_mouse.set(mouse.x, mouse.y);
		_vel.set(velocity.x, velocity.y);
		m.uniforms.uMouse.value.lerp(_mouse, 1 - Math.exp(-8 * d));
		m.uniforms.uVelocity.value.lerp(_vel, 1 - Math.exp(-6 * d));
		m.uniforms.uMap.value = map ?? dummy;
		m.uniforms.uHasVideo.value = map ? 1 : 0;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			0,
			.6,
			-6.2
		],
		frustumCulled: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [
			16,
			9,
			48,
			28
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("shaderMaterial", {
			ref: mat,
			uniforms,
			vertexShader: VERT,
			fragmentShader: FRAG,
			toneMapped: false
		})]
	});
}
function VideoWall({ urls }) {
	const group = (0, import_react.useRef)(null);
	const clips = urls.slice(0, 3);
	useFrame((_, delta) => {
		const g = group.current;
		if (!g) return;
		const d = Math.min(delta, .1);
		const t = useGym.getState().progress;
		const show = smooth(t, .34, .48) * (1 - smooth(t, .72, .88));
		g.visible = show > .03;
		g.position.z = MathUtils.damp(g.position.z, -1.1, 3, d);
		g.rotation.y = Math.sin(t * 2.2) * .08;
		g.scale.setScalar(.92 + show * .08);
	});
	if (!clips.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: group,
		position: [
			0,
			.35,
			-1.1
		],
		visible: false,
		children: clips.map((url, i) => {
			const count = clips.length;
			const a = ((i + .5) / count - .5) * 1.05;
			const r = 5.4;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				position: [
					Math.sin(a) * r,
					0,
					Math.cos(a) * r - r + .4
				],
				rotation: [
					0,
					-a,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoPanel, {
					url,
					featured: i === 1
				})
			}, url);
		})
	});
}
function VideoPanel({ url, featured }) {
	const texture = useVideoTexture(url, {
		unsuspend: "canplay",
		start: true,
		muted: true,
		loop: true,
		playsInline: true,
		crossOrigin: "anonymous"
	});
	const enableFx = useGym((s) => s.enableFx);
	const frame = (0, import_react.useMemo)(() => new Color("#161616"), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				-.03
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.62, 1.54] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: frame,
				metalness: .86,
				roughness: .28
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, 1.35] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			map: texture,
			toneMapped: false
		})] }),
		featured && enableFx ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				-.35,
				.1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.15, .42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshTransmissionMaterial, {
				samples: 4,
				resolution: 128,
				thickness: .25,
				chromaticAberration: .03,
				anisotropy: .08,
				distortion: .08,
				distortionScale: .12,
				temporalDistortion: .04,
				roughness: .18,
				color: "#d6f26a",
				transmission: .92,
				ior: 1.4
			})]
		}) : null
	] });
}
var POS_KEYS = [
	{
		t: 0,
		p: [
			.55,
			.22,
			4.7
		]
	},
	{
		t: .18,
		p: [
			-.85,
			.42,
			2.85
		]
	},
	{
		t: .4,
		p: [
			.15,
			.38,
			8.4
		]
	},
	{
		t: .58,
		p: [
			.05,
			.32,
			7.1
		]
	},
	{
		t: .82,
		p: [
			.25,
			.18,
			5.1
		]
	},
	{
		t: 1,
		p: [
			0,
			1.45,
			7.8
		]
	}
];
var LOOK_KEYS = [
	{
		t: 0,
		p: [
			0,
			.08,
			0
		]
	},
	{
		t: .18,
		p: [
			0,
			.12,
			0
		]
	},
	{
		t: .4,
		p: [
			0,
			.2,
			-1.6
		]
	},
	{
		t: .58,
		p: [
			0,
			.15,
			-1
		]
	},
	{
		t: .82,
		p: [
			0,
			.05,
			0
		]
	},
	{
		t: 1,
		p: [
			0,
			.5,
			0
		]
	}
];
var _pos = new Vector3();
var _look = new Vector3();
var CA_OFFSET = new Vector2(.0011, .0011);
function sample(t, keys, out) {
	const u = MathUtils.clamp(t, 0, 1);
	let i = 0;
	while (i < keys.length - 1 && keys[i + 1].t < u) i += 1;
	const a = keys[i];
	const b = keys[Math.min(i + 1, keys.length - 1)];
	const span = b.t - a.t || 1;
	const k = MathUtils.clamp((u - a.t) / span, 0, 1);
	const s = k * k * (3 - 2 * k);
	out.set(a.p[0] + (b.p[0] - a.p[0]) * s, a.p[1] + (b.p[1] - a.p[1]) * s, a.p[2] + (b.p[2] - a.p[2]) * s);
}
function CameraRig() {
	const { camera } = useThree();
	const look = (0, import_react.useRef)(new Vector3(0, .08, 0));
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const { progress, reducedMotion, mouse } = useGym.getState();
		sample(progress, POS_KEYS, _pos);
		sample(progress, LOOK_KEYS, _look);
		if (!reducedMotion) {
			_pos.x += (mouse.x - .5) * .22;
			_pos.y += (mouse.y - .5) * .12;
		}
		const k = reducedMotion ? 1 : 1 - Math.exp(-3.2 * d);
		camera.position.lerp(_pos, k);
		look.current.lerp(_look, k);
		camera.lookAt(look.current);
	});
	return null;
}
function PostFX() {
	if (!useGym((s) => s.enableFx)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(EffectComposer, {
		enableNormalPass: false,
		multisampling: 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bloom, {
				intensity: 1.05,
				luminanceThreshold: .62,
				luminanceSmoothing: .22,
				mipmapBlur: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromaticAberration, { offset: CA_OFFSET }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vignette, {
				offset: .28,
				darkness: .72
			})
		]
	});
}
function Scene({ videos }) {
	const enableVideo = useGym((s) => s.enableVideo);
	const bgVideo = enableVideo ? videos[0] : void 0;
	const wallVideos = enableVideo ? videos.slice(1, 4) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#0a0a0a"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("fog", {
			attach: "fog",
			args: [
				"#0a0a0a",
				9,
				24
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .28 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				4.5,
				6.2,
				4
			],
			intensity: 48,
			angle: .42,
			penumbra: .85,
			color: "#fff4e0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
			position: [
				-5,
				3.2,
				2.2
			],
			intensity: 16,
			angle: .5,
			penumbra: .9,
			color: "#ccff00"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				2,
				3,
				-4
			],
			intensity: 1.4,
			color: "#9aa3ad"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			position: [
				0,
				-.4,
				2.8
			],
			intensity: 5,
			color: "#ccff00",
			distance: 7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Environment, {
				resolution: 256,
				environmentIntensity: .7,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: 5.5,
						position: [
							0,
							5,
							1
						],
						scale: [
							8,
							1.6,
							1
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: 2.6,
						position: [
							5,
							.4,
							2
						],
						scale: [
							2,
							8,
							1
						],
						color: "#f3f3f0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "rect",
						intensity: 2,
						position: [
							-4.2,
							1,
							2
						],
						scale: [
							2,
							6,
							1
						],
						color: "#ccff00"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightformer, {
						form: "ring",
						intensity: 1.3,
						position: [
							0,
							0,
							-5
						],
						scale: 7,
						color: "#7f8b99"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidBackground, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidBackground, { videoUrl: bgVideo })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: wallVideos.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoWall, { urls: wallVideos }) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
			fallback: null,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDumbbell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConceptDumbbell, {})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FloorProps, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DustField, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid, {
			position: [
				0,
				-1.28,
				0
			],
			args: [20, 20],
			cellSize: .5,
			cellThickness: .55,
			cellColor: "#1b1b1b",
			sectionSize: 2,
			sectionThickness: 1.05,
			sectionColor: "#2c2d22",
			fadeDistance: 16,
			fadeStrength: 1.1,
			infiniteGrid: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostFX, {})
	] });
}
var WebGLGuard = class extends import_react.Component {
	state = { failed: false };
	static getDerivedStateFromError() {
		return { failed: true };
	}
	render() {
		if (this.state.failed) return null;
		return this.props.children;
	}
};
function BootLoader() {
	const { progress, active } = useProgress();
	const [forceHide, setForceHide] = (0, import_react.useState)(false);
	const [minElapsed, setMinElapsed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const min = window.setTimeout(() => setMinElapsed(true), 350);
		const kill = window.setTimeout(() => setForceHide(true), 4500);
		return () => {
			window.clearTimeout(min);
			window.clearTimeout(kill);
		};
	}, []);
	if (forceHide || minElapsed && !active && progress >= 99 || minElapsed && progress >= 100) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-30 flex flex-col items-center justify-center bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-4xl tracking-kicker text-foreground",
				children: "FORGE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-px w-40 bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-px bg-accent transition-[width] duration-200",
					style: { width: `${Math.min(progress, 100)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-kicker tracking-kicker text-muted tabular-nums",
				children: Math.round(Math.min(progress, 100))
			})
		]
	});
}
function GymStage({ videos }) {
	const isMobile = useGym((s) => s.isMobile);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootLoader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebGLGuard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			dpr: isMobile ? [1, 1.25] : [1, 1.75],
			gl: {
				antialias: !isMobile,
				alpha: false,
				powerPreference: "high-performance"
			},
			camera: {
				position: [
					.55,
					.22,
					4.7
				],
				fov: 42,
				near: .1,
				far: 70
			},
			onCreated: ({ gl }) => {
				gl.setClearColor("#0a0a0a");
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, { videos })
		}) })
	})] });
}
//#endregion
export { GymStage };
