# Variant-E: "The Architect" — Cyberpunk Neural Nexus

## Overview

A cinematic, scroll-triggered 3D portfolio variant built with Three.js, GSAP ScrollTrigger, and custom GLSL shaders. The page opens in total darkness and progressively reveals a central 3D character surrounded by a living neural-network particle system, symbolizing the transformation from legacy systems to modern AI-powered architectures.

## Visual Concept

The user scrolls into a digital consciousness. A spotlight pierces the void, revealing a 3D avatar standing at the center of a neural network of glowing particles. Each particle represents a piece of the tech stack. As scroll progresses, particles shift from dim cold blues to blazing cyan and magenta — legacy to modern. The whole page feels like descending into the mind of an engineer, rendered in light.

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary (neural glow) | Electric Cyan | `#00F0FF` |
| Secondary (energy pulse) | Hot Magenta | `#FF00AA` |
| Accent (data flow) | Phosphor Green | `#39FF14` |
| Warning/highlight | Signal Amber | `#FFAA00` |
| Background | Void Black | `#020208` |
| Text primary | Pale Hologram | `#E0F0FF` |
| Text secondary | Dim Terminal | `#607080` |

## Typography

- **Headings**: Oswald (bold, uppercase) — consistent with other variants
- **Tech labels / monospace**: VT323 — terminal/HUD elements
- **Body**: Roboto Mono — primary font from project config

## Component Architecture

All components use the `Ve` prefix. Directory: `components/variant-e/`.

### 1. VeNeuralField.vue — Three.js Particle Background

**Purpose**: Full-screen WebGL neural network particle system.

**Implementation**:
- 1000 particles using `BufferGeometry` with position, velocity, and phase attributes
- Custom `ShaderMaterial` with GLSL vertex/fragment shaders
- Vertex shader: oscillates particle positions with `sin(uTime + position.x * 0.5)` and `cos(uTime + position.z * 0.3)` for organic drift
- Fragment shader: radial gradient point with pulsing brightness. Color interpolates from cold blue (`#1a3a5c`) to electric cyan (`#00F0FF`) to hot magenta (`#FF00AA`) based on `uScrollProgress` uniform
- Nearby particles (distance < threshold) connected with `LineSegments` using a separate `LineBasicMaterial` with low opacity (`0.08-0.15`)
- Connection lines recalculated every 3 frames for performance
- Continuous slow rotation on Y-axis (`0.0003 rad/frame`) independent of scroll
- `uScrollProgress` uniform (0.0-1.0) driven by GSAP ScrollTrigger

**GLSL Vertex Shader**:
```glsl
uniform float uTime;
uniform float uScrollProgress;
attribute float aPhase;
attribute float aSize;
varying float vAlpha;
varying float vProgress;

void main() {
  vec3 pos = position;
  pos.x += sin(uTime * 0.3 + aPhase) * 0.5;
  pos.y += cos(uTime * 0.2 + aPhase * 1.3) * 0.4;
  pos.z += sin(uTime * 0.25 + aPhase * 0.7) * 0.3;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = aSize * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;

  vAlpha = 0.3 + 0.7 * sin(uTime * 0.5 + aPhase);
  vProgress = uScrollProgress;
}
```

**GLSL Fragment Shader**:
```glsl
uniform float uTime;
varying float vAlpha;
varying float vProgress;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float glow = 1.0 - smoothstep(0.0, 0.5, dist);
  glow = pow(glow, 1.5);

  // Color shift: cold blue -> cyan -> magenta based on scroll
  vec3 coldBlue = vec3(0.1, 0.23, 0.36);
  vec3 cyan = vec3(0.0, 0.94, 1.0);
  vec3 magenta = vec3(1.0, 0.0, 0.67);

  vec3 color = mix(coldBlue, cyan, smoothstep(0.0, 0.5, vProgress));
  color = mix(color, magenta, smoothstep(0.5, 1.0, vProgress) * 0.4);

  gl_FragColor = vec4(color * glow, glow * vAlpha * (0.4 + vProgress * 0.6));
}
```

### 2. VeModelStage.vue — Three.js GLB Character Reveal

**Purpose**: Central 3D character with scroll-driven lighting reveal and camera dolly.

**Implementation**:
- Separate Three.js scene rendered on the same canvas (via `autoClear: false` layering)
- `GLTFLoader` loads placeholder GLB model (path configurable, defaults to `/models/avatar.glb`)
- Falls back gracefully if no model found (shows a geometric placeholder — an icosahedron with wireframe)
- Lighting rig:
  - `SpotLight` (white, `#FFFFFF`): intensity `0 → 2.5`, angle 0.6, penumbra 0.8, position (0, 5, 3), target at model center
  - `PointLight` (magenta, `#FF00AA`): intensity `0 → 1.5`, position (-2, 1, 2) — rim/accent light
  - `PointLight` (cyan, `#00F0FF`): intensity `0 → 0.8`, position (2, -1, 3) — fill
  - `AmbientLight` (`#0a0a1a`): intensity `0.03` — faint silhouette hint
- Camera: `PerspectiveCamera` fov 45, starts at z=8, dolly to z=4.5 across scroll
- All lighting intensities and camera.z driven by GSAP ScrollTrigger `onUpdate`

**Scroll Mapping**:
- `0-30%` scroll: SpotLight ramps `0 → 2.5`
- `15-40%` scroll: Magenta PointLight ramps `0 → 1.5`
- `20-45%` scroll: Cyan PointLight ramps `0 → 0.8`
- `0-100%` scroll: Camera z `8 → 4.5` (slow continuous push-in)

### 3. VeHero.vue — Holographic HUD Overlay

**Purpose**: Name, title, and tagline floating over the 3D scene.

**Data**:
- Name: `SHAHAB GOHAR`
- Title: `SENIOR SOFTWARE ENGINEER`
- Tagline: `Architect of intelligent systems. Builder of digital futures.`
- Links: LinkedIn, GitHub, Email (same URLs as other variants)

**Effects**:
- Boot sequence: text appears character-by-character with a blinking cursor (typewriter at 40ms/char)
- Before name appears, a "SYSTEM BOOT" / "NEURAL LINK ESTABLISHED" sequence plays (2s)
- Name has CSS glitch effect (same technique as VdHero — `::before`/`::after` pseudo-elements with clip-path animation)
- Subtle scanline overlay on text (repeating-linear-gradient, 2px lines, low opacity)
- Title fades in after name with `gsap.fromTo` (y: 20, opacity: 0 → 1)
- Social links appear as `[LINK::<service>]` format, glow on hover

**GSAP Timeline**:
```
0.0s - 0.5s:  Black screen
0.5s - 1.5s:  Boot text types ("INITIALIZING NEURAL LINK...")
1.5s - 1.8s:  Boot text fades, screen flash
1.8s - 2.5s:  Name glitches in (scale 1.1→1, opacity flicker)
2.5s - 3.0s:  Title slides up (y: 30→0, opacity 0→1)
3.0s - 3.5s:  Tagline fades (opacity 0→1)
3.5s - 4.0s:  Links appear (stagger 0.1s each, opacity 0→1)
4.0s - 4.5s:  Scroll indicator pulses in
```

### 4. VeSynapses.vue — Skills as Neural Clusters

**Purpose**: Tech stack displayed as interconnected neural cluster nodes.

**Data** (3 clusters):
```
Cluster 1: "CORE PROTOCOLS" — HTML, CSS, JavaScript, SQL, PHP, Python
Cluster 2: "FRAMEWORKS" — Vue, React, Nuxt, Laravel, Tailwind, Alpine.js, Bootstrap
Cluster 3: "ARCHITECT TIER" — Gen AI Products, System Architecture, Cloud, Automation
```

**Layout**: Three cluster groups arranged horizontally (stacked on mobile). Each skill is a glowing node (circle) with its label. Nodes within a cluster are connected by pulsing SVG lines. Clusters connected to each other by dimmer cross-lines.

**Effects**:
- Nodes enter via ScrollTrigger (start: `top 80%`): scale 0→1 with stagger 0.08s
- Connection lines draw in with SVG `stroke-dashoffset` animation
- Each node has a subtle CSS pulse animation (box-shadow oscillation)
- Cluster headers labeled as `CLUSTER::01`, `CLUSTER::02`, `CLUSTER::03`
- Hover on a node brightens its connections

### 5. VeMemoryBank.vue — Experience as Data Downloads

**Purpose**: Work experience styled as memory bank data entries.

**Data**:
```
[0x00] ESPER SOLUTIONS | 2023 - Present | Senior Software Engineer
       "Architecting AI-powered enterprise systems"
       STATUS: ACTIVE_PROCESS

[0x01] CTO GMBH | 2022 - 2023 | Software Engineer
       "Engineering enterprise-grade platforms"
       STATUS: ARCHIVED

[0x02] MOTOCLE | 2021 - 2022 | Full Stack Developer
       "Channeling full-stack development"
       STATUS: ARCHIVED

[0x03] FIVERR | 2020 - 2021 | Freelancer
       "Freelance engineering across 50+ projects"
       STATUS: ARCHIVED

[0x04] FATIMA SUGAR MILLS | 2019 - 2020 | IT Support
       "The first spark — system initialization"
       STATUS: ARCHIVED
```

**Effects**:
- Each entry has a progress bar that fills left-to-right on scroll enter (simulating "download")
- Hex address prefix (`0x00`, `0x01`, etc.) in phosphor green
- Active entry has a pulsing cyan left border
- Entries stagger in via ScrollTrigger (y: 60→0, opacity 0→1, stagger 0.15s)
- Status badge: `ACTIVE_PROCESS` pulses, `ARCHIVED` is dim

### 6. VeUplink.vue — Education as Satellite Data Transfer

**Purpose**: Education section styled as an uplink data beam.

**Data**:
```
UPLINK SOURCE: COMSATS UNIVERSITY
PAYLOAD: BS Computer Science
SIGNAL STRENGTH: ████████████ 98%
VERIFIED CREDENTIALS:
  - BS Computer Science [VERIFIED]
  - COMSATS University [AUTHENTICATED]
  - Dean's List [CONFIRMED]
  - Research Projects [CATALOGUED]
```

**Effects**:
- Section enters with a "scan line" that sweeps top-to-bottom (CSS gradient animation)
- Data appears line-by-line with typewriter effect (triggered by ScrollTrigger)
- Signal strength bar animates from 0% to 98% width
- Credential badges flip in (rotateX 90→0 with stagger)
- Faint horizontal scan lines across the section

### 7. VeCoreDump.vue — About & Contact as System Diagnostics

**Purpose**: About section styled as a terminal core dump / system report.

**Data**:
```
=== CORE DUMP: ENGINEER PROFILE ===

ABOUT:
"Senior Software Engineer with expertise in building AI-powered products,
scalable architectures, and modern web applications. Passionate about turning
complex problems into elegant solutions through clean code and innovative
technology."

SYSTEM DIAGNOSTICS:
  FRONTEND   [████████████████████░░] 92%
  BACKEND    [██████████████████░░░░] 88%
  AI / ML    [███████████████░░░░░░░] 78%
  DEVOPS     [██████████████░░░░░░░░] 72%
  ARCHITECT  [█████████████████░░░░░] 85%

NETWORK ENDPOINTS:
  SSH  → linkedin.com/in/shahabgohar
  GIT  → github.com/engineershahabgohar
  SMTP → shahab@example.com

LOCATION: Pakistan
STATUS: ONLINE
AVAILABILITY: Open to opportunities

// PROCESS COMPLETE — NEURAL LINK TERMINATED
// (c) 2026 SHAHAB GOHAR — ALL SYSTEMS NOMINAL
```

**Effects**:
- Entire section rendered in monospace (VT323/Roboto Mono)
- Text appears with rapid typewriter effect on scroll enter
- ASCII progress bars animate from empty to filled
- "ONLINE" status has a blinking green dot
- Contact links glow cyan on hover
- Footer text fades in last

### 8. VeSignalNoise.vue — Cinematic Overlay

**Purpose**: Persistent full-screen overlay adding cinematic texture.

**Effects**:
- Scanlines: `repeating-linear-gradient` with 1px transparent / 1px rgba(0,0,0,0.03) at 2px intervals
- Film grain: CSS animation cycling `background-position` of a subtle noise texture (generated via tiny SVG data URI)
- Chromatic aberration: very subtle (0.5px) text-shadow offset on the page wrapper in red/blue channels
- All effects at very low opacity (0.03-0.08) — felt, not seen
- `pointer-events: none` — never interferes with interaction
- Toggle-able: respects `prefers-reduced-motion`

## Page Structure

File: `pages/variant-e/index.vue`

```vue
<template>
  <div class="ve-page">
    <!-- Layer 0: Three.js Canvas (neural field + model) -->
    <ClientOnly>
      <VeNeuralField />
    </ClientOnly>

    <!-- Layer 1: Cinematic overlay -->
    <ClientOnly>
      <VeSignalNoise />
    </ClientOnly>

    <!-- Layer 2: Scrollable content -->
    <main class="relative z-10">
      <ClientOnly>
        <VeHero />
      </ClientOnly>
      <ClientOnly>
        <VeSynapses />
      </ClientOnly>
      <ClientOnly>
        <VeMemoryBank />
      </ClientOnly>
      <ClientOnly>
        <VeUplink />
      </ClientOnly>
      <ClientOnly>
        <VeCoreDump />
      </ClientOnly>
    </main>
  </div>
</template>
```

Note: `VeModelStage` is integrated into `VeNeuralField` — they share the same Three.js renderer and canvas. `VeNeuralField` manages the WebGL lifecycle and renders both scenes.

## Three.js Architecture

### Single Renderer, Two Scenes

```
┌─────────────────────────────────┐
│         WebGLRenderer           │
│  (single <canvas>, autoClear:   │
│   false, alpha: true)           │
├─────────────────────────────────┤
│  Scene 1: Neural Field          │
│  - Points (1000 particles)      │
│  - LineSegments (connections)   │
│  - PerspectiveCamera (static)   │
├─────────────────────────────────┤
│  Scene 2: Model Stage           │
│  - GLB Model / Placeholder      │
│  - SpotLight + 2x PointLight    │
│  - AmbientLight                 │
│  - PerspectiveCamera (dolly)    │
└─────────────────────────────────┘
```

### Render Loop
```
requestAnimationFrame:
  1. Update uTime uniform
  2. Update particle positions (vertex shader handles via uTime)
  3. Recalculate connection lines (every 3 frames)
  4. renderer.clear()
  5. renderer.render(neuralScene, neuralCamera)
  6. renderer.render(modelScene, modelCamera)  // renders on top
```

### Performance Considerations
- Particle count: 1000 (tunable, reduce on mobile via `window.innerWidth < 768` check → 500)
- Connection line recalculation: every 3 frames, max 2000 line segments
- `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` — cap at 2x
- Dispose all Three.js objects (geometries, materials, textures, renderer) in `onBeforeUnmount`
- Canvas positioned `fixed` to avoid reflow during scroll

### GLB Model Fallback
If no GLB file is found at `/public/models/avatar.glb`, display a geometric placeholder:
- `IcosahedronGeometry(1.2, 1)` with `MeshStandardMaterial({ wireframe: true, color: #00F0FF, emissive: #00F0FF, emissiveIntensity: 0.3 })`
- Slow rotation on Y-axis (0.005 rad/frame)
- Same scroll-driven lighting applies

## Dependencies

New npm packages required:
- `three` (^0.170.0)
- `@types/three` (dev dependency)

No other new dependencies. GSAP and ScrollTrigger already in project.

## GSAP ScrollTrigger Integration

A single master ScrollTrigger on the page container drives all Three.js uniforms:

```javascript
ScrollTrigger.create({
  trigger: '.ve-page',
  start: 'top top',
  end: 'bottom bottom',
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress // 0 to 1
    // Update shader uniforms
    neuralMaterial.uniforms.uScrollProgress.value = progress
    // Update lighting
    spotLight.intensity = Math.min(progress * 8.33, 2.5) // full at 30%
    magentaLight.intensity = Math.max(0, Math.min((progress - 0.15) * 6, 1.5))
    cyanLight.intensity = Math.max(0, Math.min((progress - 0.2) * 3.2, 0.8))
    // Update camera
    modelCamera.position.z = 8 - progress * 3.5
  }
})
```

Individual section ScrollTriggers handle CSS animations (hero timeline, skills entry, experience stagger, etc.) using the same patterns as existing variants.

## File Inventory

```
components/variant-e/
  VeNeuralField.vue    — Three.js WebGL scene (particles + model + render loop)
  VeHero.vue           — Holographic HUD hero overlay
  VeSynapses.vue       — Skills as neural cluster nodes
  VeMemoryBank.vue     — Experience as memory bank data entries
  VeUplink.vue         — Education as satellite uplink
  VeCoreDump.vue       — About/contact as system diagnostics terminal
  VeSignalNoise.vue    — Cinematic scanline/grain overlay

pages/variant-e/
  index.vue            — Page layout, meta, global ScrollTrigger setup

public/models/
  avatar.glb           — (placeholder, user-provided later)
```

## Responsive Behavior

- **Desktop (>1024px)**: Full particle count (1000), all effects active
- **Tablet (768-1024px)**: Reduced particles (700), connection lines every 5 frames
- **Mobile (<768px)**: Particles reduced to 500, connection lines disabled, model camera starts closer (z: 6), skill clusters stack vertically

## Accessibility

- `prefers-reduced-motion`: disables scanline overlay, slows particle animation to near-static, disables glitch effects, keeps scroll-driven lighting functional
- All text content remains readable without JavaScript (basic fallback in `<noscript>`)
- Color contrast ratios maintained for all text against `#020208` background
