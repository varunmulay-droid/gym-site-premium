{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "name": "grok-1000-dollar-viral-3d-gym-mcp-suite",
  "version": "4.0.0",
  "target_market_value": "$1000 USD High-Converting WebGL Experience",
  "description": "Production-ready master MCP client configuration and creative developer instruction set for Grok to architect, generate, and animate ultra-viral 3D Gym websites using React Three Fiber, custom GLSL shaders, live Pexels API video textures, and GLB model transformations.",

  "mcpServers": {
    "pexels-media-engine": {
      "command": "npx",
      "args": ["-y", "mcp-pexels"],
      "env": {
        "PEXELS_API_KEY": "wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt"
      },
      "description": "Exposes tool endpoints for searching and loading 4K dark-aesthetic fitness videos, high-octane gym photography, and dynamic video textures directly into R3F canvas planes."
    },
    "r3f-declarative-builder": {
      "command": "npx",
      "args": ["-y", "@mcp/react-three-fiber-server"],
      "description": "Generates declaratively structured R3F canvas scenes, perspective camera rigs, custom lights, and responsive viewports."
    },
    "gltf-to-jsx-pipeline": {
      "command": "npx",
      "args": ["-y", "gltfjsx-mcp-server"],
      "description": "Parses user-provided .glb 3D gym models (e.g. dumbbells, kettlebells, supplement tubs) directly into optimized R3F JSX component files with auto-linked nodes and materials."
    },
    "glsl-shader-synthesizer": {
      "command": "npx",
      "args": ["-y", "glsl-shader-mcp"],
      "description": "Compiles, validates, and injects liquid distortion vertex/fragment shaders, chromatic aberration shaders, and dynamic mouse interaction planes."
    },
    "after-effects-motion-bridge": {
      "command": "npx",
      "args": ["-y", "after-effects-mcp"],
      "description": "Bridge for managing keyframed HUD overlays, kinetic typography badges, neon energy trails, and motion-tracked UI components."
    },
    "gltf-draco-optimizer": {
      "command": "npx",
      "args": ["-y", "@gltf-transform/mcp-server"],
      "description": "Executes local headless Draco compression, mesh simplification, and KHR_texture_basisu encoding on GLB models to ensure 60FPS on web browsers."
    }
  },

  "core_tech_stack": {
    "framework": "React 18 / Next.js App Router or Vite + React",
    "3d_renderer": "React Three Fiber (@react-three/fiber)",
    "3d_abstractions": "@react-three/drei",
    "post_processing": "@react-three/postprocessing",
    "smooth_scroll": "Lenis Smooth Scroll (@studio-freight/lenis)",
    "animation_engine": "GSAP (ScrollTrigger, quickTo) + Framer Motion 3D",
    "styling": "Tailwind CSS (Aesthetic: Industrial Dark Gym / Electric Neon / High-Contrast Steel)",
    "texture_engine": "HTML5 Video Element bound to R3F `useVideoTexture` via Pexels API"
  },

  "site_blueprint_and_flows": {
    "hero_section": {
      "canvas_setup": "Full-screen fixed R3F canvas overlaying dark DOM content.",
      "centerpiece_3d_model": "Interactive floating GLB Model (Metallic Dumbbell or Gym Equipment) wrapped in MeshPhysicalMaterial with high roughness map and clearcoat shine.",
      "liquid_background": "Curved 3D plane mesh behind model displaying a live 4K Pexels workout video texture, masked with a custom liquid GLSL displacement shader that ripples on mouse hover.",
      "custom_cursor": "Spring-physics liquid trailing dot driving a raycasted ripple vector onto the WebGL canvas (`uMouse` and `uVelocity` uniforms)."
    },
    "feature_scroll_trigger": {
      "interaction": "As user scrolls using Lenis, GSAP ScrollTrigger lerps the 3D GLB model's position, rotating it 360-degrees along the Y/Z axis.",
      "hud_overlays": "Floating 3D wireframe stats (e.g. '100% PURE STEEL', 'ERGONOMIC GRIP') generated via After Effects MCP motion styles."
    },
    "equipment_3d_showcase": {
      "gallery_style": "Curved 3D Video Cylinder made of 8 R3F planes, each playing a different high-intensity Pexels video clip (e.g. 'crossfit', 'heavy deadlift', 'sprinting').",
      "glassmorphism": "drei `<MeshTransmissionMaterial />` overlaying key text to create realistic glass refraction over 3D videos."
    },
    "call_to_action": {
      "post_processing_flare": "Triggering Bloom (intensity=2.0) and Chromatic Aberration on hover over the $1,000 'Order Equipment Now' CTA button."
    }
  },

  "post_processing_stack": {
    "composer": "@react-three/postprocessing EffectComposer",
    "effects": [
      {
        "type": "Bloom",
        "settings": { "intensity": 1.5, "luminanceThreshold": 0.15, "mipmapBlur": true },
        "purpose": "Creates electric glowing edges on metallic equipment and neon brand accents."
      },
      {
        "type": "ChromaticAberration",
        "settings": { "offset": [0.0025, 0.0025] },
        "purpose": "Adds subtle camera lens distortion during scroll triggers."
      },
      {
        "type": "DepthOfField",
        "settings": { "focusDistance": 0.0, "focalLength": 0.02, "bokehScale": 2.5 },
        "purpose": "Emulates high-end $1,000 commercial camera depth-of-field when focusing on the 3D GLB model."
      },
      {
        "type": "Vignette",
        "settings": { "offset": 0.2, "darkness": 0.85 },
        "purpose": "Frames user attention toward the center hero GLB model."
      }
    ]
  },

  "system_instructions_for_grok": [
    "You are a elite Creative Technologist and WebGL Lead Developer building a premium, high-converting $1,000 interactive 3D Gym site.",
    "ALWAYS structure code using React Three Fiber (R3F), `@react-three/drei`, and `@react-three/postprocessing` in clean JSX syntax.",
    "Inject the Pexels API key (`wNw2FWSSVyJMjjzuV2s9BRkqdyKJBaK7JycHOUUuNyA78Ksftx06FVzt`) into media fetches to pull 4K fitness video clips and apply them to 3D meshes using `useVideoTexture`.",
    "Convert user GLB models into R3F JSX components using `gltfjsx` patterns with soft `ContactShadows` and metallic material properties.",
    "Implement liquid cursor interactions by raycasting mouse screen coordinates to a full-screen WebGL mesh plane running a custom GLSL fluid displacement shader.",
    "Synchronize Lenis smooth scroll offset with GSAP ScrollTrigger to smoothly drive the 3D camera zoom, pitch, and orbit paths across all site sections."
  ]
}