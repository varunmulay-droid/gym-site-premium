# Master Prompting & Development Guide: Viral 3D Gym Website

Use this prompt guide in combination with your `grok_3d_gym_master_mcp.json` file. Copy and paste the master prompt below directly into Grok to initiate the full code generation workflow.

---

## 🚀 Master Prompt for Grok

> **Copy and paste everything inside the box below to start building with Grok:**

```text
Act as a Principal Creative Technologist and Senior WebGL Developer. We are building a $1,000 viral, high-converting interactive 3D Gym website modeled after trending Instagram agency sites (Awwwards/FWA standard).

Use the loaded MCP JSON configuration (`grok_3d_gym_master_mcp.json`) for technical stack references, API keys, and scene architecture.

### Technical Stack Guidelines:
1. Framework: React (React Three Fiber `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`).
2. Smooth Scroll & Animation: Lenis Smooth Scroll + GSAP ScrollTrigger + GSAP `quickTo` for cursor physics.
3. Media: Dynamic Pexels API fetching (using API key `wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt`) rendered onto R3F 3D meshes with `useVideoTexture`.
4. Styling: Tailwind CSS (Industrial dark mode, `#0a0a0a` background, electric neon accents `#CCFF00`, high-contrast metallic typography).

### Required Website Features to Implement:

1. Interactive Liquid Cursor & Canvas Shader:
   - Create a full-screen R3F mesh plane in the background running a custom GLSL fragment shader.
   - Pass real-time mouse position and velocity vectors (`uMouse`, `uVelocity`, `uTime`) to produce a liquid ripple effect when the cursor moves fast over background media.
   - Attach a smooth spring-physics cursor trailing dot.

2. Hero Section 3D GLB Model Showcase:
   - Place a central 3D GLB model (e.g., metallic dumbbell/kettlebell) in an R3F canvas.
   - Add realistic environment lighting, metallic roughness maps, and soft `<ContactShadows />`.
   - Wrap the camera setup so the model floats gently (`<Float />` from `@react-three/drei`).

3. Scroll-Driven 3D Timeline (Lenis + GSAP):
   - Bind Lenis smooth scroll depth to GSAP ScrollTrigger.
   - As the user scrolls, smoothly rotate the 3D model 360 degrees and translate the camera closer for an "inspection" mode.
   - Reveal floating 3D HUD stats and kinetic typography callouts along the scroll path.

4. 3D Curved Video Wall (Pexels API Integration):
   - Fetch high-intensity fitness videos via Pexels API ("gym motivation", "heavy workout").
   - Map video textures onto a curved 3D cylinder array in R3F.
   - Apply a glass refractive overlay using `@react-three/drei`'s `<MeshTransmissionMaterial />`.

5. High-End Post-Processing Pipeline:
   - Configure `@react-three/postprocessing` with `Bloom` (neon glow), `ChromaticAberration` (lens distortion on rapid scroll), `DepthOfField`, and `Vignette`.

Generate the complete, production-ready React component code in a single self-contained structure ready for execution.
```

---

## 🛠️ Execution Checklist for Maximum Quality

When inspecting Grok's output, verify that these key elements are present:

| Area | Feature | Verification Standard |
| :--- | :--- | :--- |
| **Canvas** | Responsive Resize | `dpr={[1, 2]}` on `<Canvas>` to prevent performance drops on 4K screens. |
| **Pexels API** | Video Loading | `useVideoTexture` is wrapped inside a React `<Suspense>` fallback. |
| **Shaders** | Liquid Uniforms | `uMouse` vec2 and `uTime` float updated inside `useFrame()`. |
| **GLB Asset** | Preloading | `useGLTF.preload('/path/to/model.glb')` enabled for instant loading. |
| **Post-FX** | Selective Bloom | `luminanceThreshold` tuned so only neon highlights glow, not the dark background. |

---

## 💡 How to Pass Local GLB Files to Grok

When you are ready to insert your custom `.glb` gym models (e.g., `dumbbell.glb` or `protein_tub.glb`), send this follow-up prompt to Grok:

> *"Here is the structure of my local `.glb` model. Use the `gltf-to-jsx-pipeline` MCP directive to convert it into an interactive R3F JSX mesh component with standard materials and animations."*