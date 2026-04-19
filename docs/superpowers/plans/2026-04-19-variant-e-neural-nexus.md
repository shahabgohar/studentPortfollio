# Variant-E "Neural Nexus" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic Three.js cyberpunk portfolio variant with GLSL shader particles, scroll-driven GLB model reveal, and neural-network aesthetics.

**Architecture:** Single-page variant at `/variant-e/` with 7 Vue components + 1 page. A single Three.js WebGLRenderer manages two scenes (neural particle field + model stage) on a fixed canvas. GSAP ScrollTrigger drives all Three.js uniforms (lighting, camera, shader color shift). HTML/CSS sections overlay the 3D canvas with scroll-triggered entrance animations.

**Tech Stack:** Vue 3 (Nuxt 3), Three.js, GSAP + ScrollTrigger, custom GLSL shaders, Tailwind CSS

---

## Task 0: Install Three.js dependency

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install three.js**

```bash
npm install three
npm install -D @types/three
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('three'); console.log('three.js OK')"
```

Expected: `three.js OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add three.js dependency for variant-e"
```

---

## Task 1: Page scaffold — `pages/variant-e/index.vue`

**Files:**
- Create: `pages/variant-e/index.vue`

- [ ] **Step 1: Create the page file**

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

definePageMeta({
  title: 'Shahab Gohar — The Architect',
  layout: false
})

useHead({
  title: 'Shahab Gohar | The Architect — Neural Nexus Portfolio',
  meta: [
    { name: 'description', content: 'Cyberpunk neural-nexus portfolio of Shahab Gohar — Senior Software Engineer, AI Architect. Scroll to awaken the neural network.' },
    { name: 'theme-color', content: '#020208' }
  ],
  bodyAttrs: {
    style: 'background-color: #020208; margin: 0; padding: 0;'
  }
})

onMounted(() => {
  ScrollTrigger.refresh()
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="ve-page relative min-h-screen w-full overflow-x-hidden" style="background-color: #020208; color: #E0F0FF;">
    <!-- Layer 0: Three.js Canvas (neural field + model stage) -->
    <ClientOnly>
      <VeNeuralField />
    </ClientOnly>

    <!-- Layer 1: Cinematic overlay -->
    <ClientOnly>
      <VeSignalNoise />
    </ClientOnly>

    <!-- Layer 2: Scrollable content -->
    <main class="relative" style="z-index: 10;">
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

<style>
.ve-page {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.ve-page ::-webkit-scrollbar {
  width: 4px;
}

.ve-page ::-webkit-scrollbar-track {
  background: #020208;
}

.ve-page ::-webkit-scrollbar-thumb {
  background: #00F0FF;
  border-radius: 2px;
}

.ve-page ::-webkit-scrollbar-thumb:hover {
  background: #FF00AA;
}

.ve-page ::selection {
  background-color: rgba(0, 240, 255, 0.2);
  color: #FF00AA;
}
</style>
```

- [ ] **Step 2: Verify page loads**

```bash
npm run dev
```

Open `http://localhost:3000/variant-e/` — should show a dark page with no errors in console. Components will be missing (expected), but no crash.

- [ ] **Step 3: Commit**

```bash
git add pages/variant-e/index.vue
git commit -m "feat(variant-e): add page scaffold"
```

---

## Task 2: Signal noise overlay — `VeSignalNoise.vue`

**Files:**
- Create: `components/variant-e/VeSignalNoise.vue`

- [ ] **Step 1: Create the overlay component**

```vue
<script setup lang="ts">
</script>

<template>
  <div class="ve-signal-noise fixed inset-0 pointer-events-none" style="z-index: 5;">
    <!-- Scanlines -->
    <div class="absolute inset-0 ve-scanlines" />
    <!-- Film grain -->
    <div class="absolute inset-0 ve-grain" />
  </div>
</template>

<style scoped>
.ve-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.03) 1px,
    rgba(0, 0, 0, 0.03) 2px
  );
  opacity: 0.6;
}

.ve-grain {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  animation: ve-grain-shift 0.5s steps(4) infinite;
  opacity: 0.5;
}

@keyframes ve-grain-shift {
  0% { background-position: 0 0; }
  25% { background-position: 128px 0; }
  50% { background-position: 0 128px; }
  75% { background-position: 128px 128px; }
  100% { background-position: 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-scanlines,
  .ve-grain {
    display: none;
  }
}
</style>
```

- [ ] **Step 2: Verify overlay renders**

Reload `/variant-e/` — should see faint scanlines and grain over the dark background. Barely visible — that's correct.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeSignalNoise.vue
git commit -m "feat(variant-e): add cinematic signal noise overlay"
```

---

## Task 3: Three.js neural field + model stage — `VeNeuralField.vue`

This is the most complex component. It manages:
- A single `WebGLRenderer` and `<canvas>`
- Scene 1: Neural particle network with custom GLSL shaders
- Scene 2: GLB model (or icosahedron fallback) with scroll-driven lighting
- A master GSAP ScrollTrigger that drives all uniforms

**Files:**
- Create: `components/variant-e/VeNeuralField.vue`

- [ ] **Step 1: Create the component file**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  ShaderMaterial,
  LineSegments,
  BufferAttribute,
  LineBasicMaterial,
  SpotLight,
  PointLight,
  AmbientLight,
  IcosahedronGeometry,
  MeshStandardMaterial,
  Mesh,
  Color,
  Vector3
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Three.js objects (assigned in onMounted, cleaned in onBeforeUnmount)
let renderer: WebGLRenderer | null = null
let neuralScene: Scene | null = null
let neuralCamera: PerspectiveCamera | null = null
let modelScene: Scene | null = null
let modelCamera: PerspectiveCamera | null = null
let animationId: number | null = null
let masterTrigger: ScrollTrigger | null = null

// Shader uniforms (shared references for scroll updates)
let neuralMaterial: ShaderMaterial | null = null
let spotLight: SpotLight | null = null
let magentaLight: PointLight | null = null
let cyanLight: PointLight | null = null
let modelMesh: Mesh | null = null

// State
let scrollProgress = 0
let frameCount = 0
const clock = { startTime: 0 }

// Disposables for cleanup
const disposables: Array<{ dispose: () => void }> = []

// --- Particle config ---
function getParticleCount(): number {
  if (typeof window === 'undefined') return 800
  if (window.innerWidth < 768) return 400
  if (window.innerWidth < 1024) return 600
  return 800
}

// --- GLSL Shaders ---
const vertexShader = `
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
`

const fragmentShader = `
  uniform float uTime;
  varying float vAlpha;
  varying float vProgress;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    glow = pow(glow, 1.5);

    vec3 coldBlue = vec3(0.1, 0.23, 0.36);
    vec3 cyan = vec3(0.0, 0.94, 1.0);
    vec3 magenta = vec3(1.0, 0.0, 0.67);

    vec3 color = mix(coldBlue, cyan, smoothstep(0.0, 0.5, vProgress));
    color = mix(color, magenta, smoothstep(0.5, 1.0, vProgress) * 0.4);

    gl_FragColor = vec4(color * glow, glow * vAlpha * (0.4 + vProgress * 0.6));
  }
`

// --- Connection lines data ---
let lineGeometry: BufferGeometry | null = null
let lineSegments: LineSegments | null = null
let particlePositions: Float32Array | null = null
let particleCount = 0

function buildConnectionLines(positions: Float32Array, count: number, threshold: number): Float32Array {
  const linePositions: number[] = []
  const maxLines = 1500
  let lineCount = 0

  for (let i = 0; i < count && lineCount < maxLines; i++) {
    const ix = i * 3
    for (let j = i + 1; j < count && lineCount < maxLines; j++) {
      const jx = j * 3
      const dx = positions[ix] - positions[jx]
      const dy = positions[ix + 1] - positions[jx + 1]
      const dz = positions[ix + 2] - positions[jx + 2]
      const dist = dx * dx + dy * dy + dz * dz

      if (dist < threshold * threshold) {
        linePositions.push(
          positions[ix], positions[ix + 1], positions[ix + 2],
          positions[jx], positions[jx + 1], positions[jx + 2]
        )
        lineCount++
      }
    }
  }

  return new Float32Array(linePositions)
}

// --- Scene setup ---
function setupNeuralScene(scene: Scene, camera: PerspectiveCamera): void {
  particleCount = getParticleCount()
  const positions = new Float32Array(particleCount * 3)
  const phases = new Float32Array(particleCount)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14
    phases[i] = Math.random() * Math.PI * 2
    sizes[i] = 1.5 + Math.random() * 2.5
  }

  particlePositions = positions

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aPhase', new Float32BufferAttribute(phases, 1))
  geometry.setAttribute('aSize', new Float32BufferAttribute(sizes, 1))
  disposables.push(geometry)

  neuralMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 }
    },
    transparent: true,
    depthWrite: false
  })
  disposables.push(neuralMaterial)

  const points = new Points(geometry, neuralMaterial)
  scene.add(points)

  // Connection lines
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  if (!isMobile) {
    lineGeometry = new BufferGeometry()
    const initialLinePositions = buildConnectionLines(positions, particleCount, 2.5)
    lineGeometry.setAttribute('position', new BufferAttribute(initialLinePositions, 3))
    disposables.push(lineGeometry)

    const lineMaterial = new LineBasicMaterial({
      color: new Color('#00F0FF'),
      transparent: true,
      opacity: 0.08
    })
    disposables.push(lineMaterial)

    lineSegments = new LineSegments(lineGeometry, lineMaterial)
    scene.add(lineSegments)
  }

  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)
}

function setupModelScene(scene: Scene, camera: PerspectiveCamera): void {
  // Lighting rig — all start at 0 intensity
  spotLight = new SpotLight(0xffffff, 0, 20, 0.6, 0.8)
  spotLight.position.set(0, 5, 3)
  scene.add(spotLight)
  scene.add(spotLight.target)

  magentaLight = new PointLight(0xff00aa, 0)
  magentaLight.position.set(-2, 1, 2)
  scene.add(magentaLight)

  cyanLight = new PointLight(0x00f0ff, 0)
  cyanLight.position.set(2, -1, 3)
  scene.add(cyanLight)

  const ambientLight = new AmbientLight(0x0a0a1a, 0.03)
  scene.add(ambientLight)

  // Try loading GLB, fallback to icosahedron
  const loader = new GLTFLoader()
  loader.load(
    '/models/avatar.glb',
    (gltf) => {
      const model = gltf.scene
      model.position.set(0, -1, 0)
      model.scale.setScalar(1.5)
      scene.add(model)
      modelMesh = model as unknown as Mesh
    },
    undefined,
    () => {
      // Fallback: wireframe icosahedron
      const geo = new IcosahedronGeometry(1.2, 1)
      const mat = new MeshStandardMaterial({
        wireframe: true,
        color: new Color('#00F0FF'),
        emissive: new Color('#00F0FF'),
        emissiveIntensity: 0.3
      })
      disposables.push(geo, mat)
      const mesh = new Mesh(geo, mat)
      mesh.position.set(0, 0, 0)
      scene.add(mesh)
      modelMesh = mesh
    }
  )

  camera.position.set(0, 0, 8)
  camera.lookAt(0, 0, 0)
}

// --- Animation loop ---
function animate(): void {
  animationId = requestAnimationFrame(animate)

  if (!renderer || !neuralScene || !neuralCamera || !modelScene || !modelCamera) return

  const elapsed = (performance.now() - clock.startTime) / 1000

  // Update shader uniforms
  if (neuralMaterial) {
    neuralMaterial.uniforms.uTime.value = elapsed
    neuralMaterial.uniforms.uScrollProgress.value = scrollProgress
  }

  // Rotate neural field slowly
  if (neuralScene.children[0]) {
    neuralScene.children[0].rotation.y += 0.0003
    if (lineSegments) {
      lineSegments.rotation.y = neuralScene.children[0].rotation.y
    }
  }

  // Recalculate connection lines every 5 frames
  frameCount++
  if (lineGeometry && particlePositions && frameCount % 5 === 0) {
    const points = neuralScene.children[0] as Points
    const posAttr = points.geometry.getAttribute('position')
    if (posAttr) {
      const newLinePositions = buildConnectionLines(
        posAttr.array as Float32Array,
        particleCount,
        2.5
      )
      lineGeometry.setAttribute('position', new BufferAttribute(newLinePositions, 3))
      lineGeometry.attributes.position.needsUpdate = true
    }
  }

  // Rotate fallback model
  if (modelMesh && 'geometry' in modelMesh && (modelMesh as Mesh).geometry?.type === 'IcosahedronGeometry') {
    modelMesh.rotation.y += 0.005
  }

  // Update lighting from scroll
  if (spotLight) spotLight.intensity = Math.min(scrollProgress * 8.33, 2.5)
  if (magentaLight) magentaLight.intensity = Math.max(0, Math.min((scrollProgress - 0.15) * 6, 1.5))
  if (cyanLight) cyanLight.intensity = Math.max(0, Math.min((scrollProgress - 0.2) * 3.2, 0.8))

  // Update model camera dolly
  modelCamera.position.z = 8 - scrollProgress * 3.5

  // Render both scenes
  renderer.clear()
  renderer.render(neuralScene, neuralCamera)
  renderer.render(modelScene, modelCamera)
}

// --- Resize handler ---
function handleResize(): void {
  if (!renderer || !neuralCamera || !modelCamera) return

  const width = window.innerWidth
  const height = window.innerHeight

  renderer.setSize(width, height)

  neuralCamera.aspect = width / height
  neuralCamera.updateProjectionMatrix()

  modelCamera.aspect = width / height
  modelCamera.updateProjectionMatrix()
}

onMounted(() => {
  if (!canvasRef.value) return

  const width = window.innerWidth
  const height = window.innerHeight

  // Renderer
  renderer = new WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.autoClear = false
  renderer.setClearColor(0x020208, 1)

  // Neural scene
  neuralScene = new Scene()
  neuralCamera = new PerspectiveCamera(60, width / height, 0.1, 100)
  setupNeuralScene(neuralScene, neuralCamera)

  // Model scene
  modelScene = new Scene()
  modelCamera = new PerspectiveCamera(45, width / height, 0.1, 100)
  setupModelScene(modelScene, modelCamera)

  // Master ScrollTrigger
  masterTrigger = ScrollTrigger.create({
    trigger: '.ve-page',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    onUpdate: (self) => {
      scrollProgress = self.progress
    }
  })

  // Start animation
  clock.startTime = performance.now()
  animate()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  if (masterTrigger) masterTrigger.kill()
  window.removeEventListener('resize', handleResize)

  // Dispose all Three.js objects
  disposables.forEach(d => d.dispose())

  if (renderer) {
    renderer.dispose()
    renderer = null
  }

  neuralScene = null
  neuralCamera = null
  modelScene = null
  modelCamera = null
  neuralMaterial = null
  spotLight = null
  magentaLight = null
  cyanLight = null
  modelMesh = null
  lineGeometry = null
  lineSegments = null
  particlePositions = null
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0"
    style="z-index: 0;"
  />
</template>
```

- [ ] **Step 2: Create placeholder models directory**

```bash
mkdir -p public/models
```

No GLB file needed yet — the component falls back to a wireframe icosahedron.

- [ ] **Step 3: Verify the 3D scene renders**

Reload `/variant-e/` — should see:
- Dark background with faint glowing particles drifting organically
- A wireframe icosahedron (cyan, glowing) in the center, initially very dim
- Scrolling brightens lights, camera pushes in, particle colors shift

- [ ] **Step 4: Commit**

```bash
git add components/variant-e/VeNeuralField.vue public/models
git commit -m "feat(variant-e): add Three.js neural field with GLSL shaders and model stage"
```

---

## Task 4: Hero overlay — `VeHero.vue`

**Files:**
- Create: `components/variant-e/VeHero.vue`

- [ ] **Step 1: Create the hero component**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const heroRef = ref<HTMLElement | null>(null)
const bootRef = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const taglineRef = ref<HTMLElement | null>(null)
const linksRef = ref<HTMLElement | null>(null)
const scrollRef = ref<HTMLElement | null>(null)

const bootText = ref('')
const showCursor = ref(true)
let tl: gsap.core.Timeline | null = null
let cursorInterval: ReturnType<typeof setInterval> | null = null

const bootMessages = [
  'INITIALIZING NEURAL LINK...',
  'CONNECTING TO NEXUS...',
  'LINK ESTABLISHED.'
]

function typeText(text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    let i = 0
    const interval = setInterval(() => {
      bootText.value = text.slice(0, i + 1)
      i++
      if (i >= text.length) {
        clearInterval(interval)
        resolve()
      }
    }, speed)
  })
}

async function runBootSequence(): Promise<void> {
  for (const msg of bootMessages) {
    bootText.value = ''
    await typeText(msg, 35)
    await new Promise(r => setTimeout(r, 400))
  }
}

onMounted(async () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)

  // Run boot sequence first
  await runBootSequence()

  // Then animate in the main content
  tl = gsap.timeline({ delay: 0.2 })

  tl.to(bootRef.value, { opacity: 0, duration: 0.3 })
    .fromTo(
      nameRef.value,
      { opacity: 0, scale: 1.1, filter: 'blur(4px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
    )
    .fromTo(
      titleRef.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      taglineRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    )
    .fromTo(
      linksRef.value!.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo(
      scrollRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.1'
    )
})

onBeforeUnmount(() => {
  if (tl) tl.kill()
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<template>
  <section ref="heroRef" class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
    <!-- Grid overlay -->
    <div class="absolute inset-0 pointer-events-none opacity-[0.02]" style="
      background-image:
        linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px);
      background-size: 80px 80px;
    " />

    <div class="relative text-center max-w-4xl mx-auto">
      <!-- Boot sequence text -->
      <div ref="bootRef" class="mb-4 h-8">
        <span class="font-vt323 text-sm tracking-[0.3em]" style="color: #39FF14;">
          {{ bootText }}<span :class="{ 'opacity-0': !showCursor }">_</span>
        </span>
      </div>

      <!-- Name with glitch -->
      <h1
        ref="nameRef"
        class="ve-glitch font-oswald font-[900] uppercase leading-none tracking-tight mb-6 opacity-0"
        style="font-size: clamp(3rem, 10vw, 7rem); color: #E0F0FF;"
        data-text="SHAHAB GOHAR"
      >
        SHAHAB GOHAR
      </h1>

      <!-- Title with electric line -->
      <div ref="titleRef" class="mb-8 opacity-0">
        <p class="font-oswald font-bold uppercase tracking-[0.3em] text-sm md:text-base" style="color: #00F0FF;">
          SENIOR SOFTWARE ENGINEER
        </p>
        <div class="ve-neural-line mx-auto mt-2" style="width: 200px; height: 2px;" />
      </div>

      <!-- Tagline -->
      <p ref="taglineRef" class="font-sans text-base md:text-lg mb-10 opacity-0" style="color: #607080;">
        Architect of intelligent systems. Builder of digital futures.
      </p>

      <!-- Links -->
      <div ref="linksRef" class="flex items-center justify-center gap-4 flex-wrap">
        <a
          href="https://www.linkedin.com/in/shahabgohar/"
          target="_blank"
          rel="noopener noreferrer"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::LINKEDIN]</span>
        </a>
        <a
          href="https://github.com/engineershahabgohar"
          target="_blank"
          rel="noopener noreferrer"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::GITHUB]</span>
        </a>
        <a
          href="mailto:shahab@example.com"
          class="ve-link-btn"
        >
          <span class="font-vt323 text-sm tracking-wider">[LINK::EMAIL]</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollRef" class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
      <span class="font-vt323 text-xs tracking-[0.3em] animate-pulse" style="color: #00F0FF;">SCROLL TO AWAKEN</span>
      <svg class="w-5 h-5 animate-bounce" style="color: #00F0FF;" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
</template>

<style scoped>
/* Glitch effect */
.ve-glitch {
  position: relative;
  animation: ve-glitch-skew 6s ease-in-out infinite alternate;
}

.ve-glitch::before,
.ve-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.ve-glitch::before {
  color: #00F0FF;
  animation: ve-glitch-1 5s ease-in-out infinite alternate;
  clip-path: inset(0 0 60% 0);
}

.ve-glitch::after {
  color: #FF00AA;
  animation: ve-glitch-2 5s ease-in-out infinite alternate;
  clip-path: inset(60% 0 0 0);
}

@keyframes ve-glitch-skew {
  0%, 90%, 100% { transform: skewX(0deg); }
  93% { transform: skewX(-0.5deg); }
  95% { transform: skewX(0.5deg); }
  97% { transform: skewX(0deg); }
}

@keyframes ve-glitch-1 {
  0%, 85%, 100% { opacity: 0; transform: translate(0); }
  87% { opacity: 0.8; transform: translate(-2px, 1px); }
  89% { opacity: 0; transform: translate(2px, -1px); }
  91% { opacity: 0.5; transform: translate(-1px, 0px); }
  93% { opacity: 0; }
}

@keyframes ve-glitch-2 {
  0%, 88%, 100% { opacity: 0; transform: translate(0); }
  90% { opacity: 0.6; transform: translate(2px, -1px); }
  92% { opacity: 0; transform: translate(-2px, 1px); }
  94% { opacity: 0.4; transform: translate(1px, 0px); }
  96% { opacity: 0; }
}

/* Neural line */
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
  animation: ve-line-pulse 2.5s ease-in-out infinite;
}

@keyframes ve-line-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4); }
  50% { opacity: 0.6; box-shadow: 0 0 4px #00F0FF, 0 0 10px rgba(0,240,255,0.2); }
}

/* Link buttons */
.ve-link-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 240, 255, 0.2);
  color: #00F0FF;
  text-decoration: none;
  background: rgba(0, 240, 255, 0.03);
  transition: all 0.3s ease;
}

.ve-link-btn:hover {
  border-color: #00F0FF;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(0, 240, 255, 0.05);
  color: #FFFFFF;
  text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
}

@media (prefers-reduced-motion: reduce) {
  .ve-glitch::before,
  .ve-glitch::after {
    display: none;
  }
  .ve-glitch {
    animation: none;
  }
}
</style>
```

- [ ] **Step 2: Verify hero renders**

Reload `/variant-e/` — should see boot sequence typing, then name glitches in with title, tagline, and links appearing in sequence.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeHero.vue
git commit -m "feat(variant-e): add holographic HUD hero with boot sequence"
```

---

## Task 5: Skills neural clusters — `VeSynapses.vue`

**Files:**
- Create: `components/variant-e/VeSynapses.vue`

- [ ] **Step 1: Create the skills component**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const clustersRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface Cluster {
  id: string
  label: string
  skills: string[]
  color: string
  glowColor: string
}

const clusters: Cluster[] = [
  {
    id: 'CLUSTER::01',
    label: 'CORE PROTOCOLS',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP', 'Python'],
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.3)'
  },
  {
    id: 'CLUSTER::02',
    label: 'FRAMEWORKS',
    skills: ['Vue', 'React', 'Nuxt', 'Laravel', 'Tailwind', 'Alpine.js', 'Bootstrap'],
    color: '#FF00AA',
    glowColor: 'rgba(255, 0, 170, 0.3)'
  },
  {
    id: 'CLUSTER::03',
    label: 'ARCHITECT TIER',
    skills: ['Gen AI Products', 'System Architecture', 'Cloud', 'Automation'],
    color: '#39FF14',
    glowColor: 'rgba(57, 255, 20, 0.3)'
  }
]

onMounted(() => {
  // Header animation
  const headerTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(headerRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(headerTrigger)

  // Cluster cards stagger
  const clusterTrigger = ScrollTrigger.create({
    trigger: clustersRef.value,
    start: 'top 80%',
    onEnter: () => {
      if (!clustersRef.value) return
      const cards = clustersRef.value.querySelectorAll('.ve-cluster-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      )
      // Stagger skill nodes inside each card
      cards.forEach((card, cardIdx) => {
        const nodes = card.querySelectorAll('.ve-skill-node')
        gsap.fromTo(nodes,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, delay: 0.3 + cardIdx * 0.15, ease: 'back.out(1.7)' }
        )
      })
    },
    once: true
  })
  triggers.push(clusterTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #39FF14;">
          // NEURAL MAPPING
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          SYNAPSES
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Cluster grid -->
      <div ref="clustersRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="cluster in clusters"
          :key="cluster.id"
          class="ve-cluster-card opacity-0"
          :style="{ borderColor: cluster.color + '22' }"
        >
          <!-- Cluster header -->
          <div class="px-6 pt-6 pb-3 border-b" :style="{ borderColor: cluster.color + '15' }">
            <div class="font-vt323 text-xs tracking-[0.4em] mb-1" :style="{ color: cluster.color }">
              {{ cluster.id }}
            </div>
            <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #E0F0FF;">
              {{ cluster.label }}
            </h3>
          </div>

          <!-- Skill nodes -->
          <div class="p-6 flex flex-wrap gap-3">
            <div
              v-for="skill in cluster.skills"
              :key="skill"
              class="ve-skill-node opacity-0"
              :style="{
                '--node-color': cluster.color,
                '--node-glow': cluster.glowColor
              } as any"
            >
              <div class="ve-node-dot" :style="{ background: cluster.color }" />
              <span class="font-vt323 text-sm tracking-wider" style="color: #E0F0FF;">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-cluster-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.ve-cluster-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 30px rgba(0, 240, 255, 0.08);
}

.ve-skill-node {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.3s ease;
}

.ve-skill-node:hover {
  border-color: var(--node-color);
  box-shadow: 0 0 12px var(--node-glow);
  background: rgba(255, 255, 255, 0.04);
}

.ve-node-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: ve-node-pulse 2s ease-in-out infinite;
}

@keyframes ve-node-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 4px currentColor; }
  50% { opacity: 0.5; box-shadow: 0 0 8px currentColor; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-node-dot {
    animation: none;
  }
}
</style>
```

- [ ] **Step 2: Verify skills section renders**

Scroll down on `/variant-e/` — three cluster cards should animate in with skill nodes popping in with a bounce effect.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeSynapses.vue
git commit -m "feat(variant-e): add neural cluster skills section"
```

---

## Task 6: Experience memory bank — `VeMemoryBank.vue`

**Files:**
- Create: `components/variant-e/VeMemoryBank.vue`

- [ ] **Step 1: Create the experience component**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const entriesRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface MemoryEntry {
  address: string
  company: string
  period: string
  role: string
  description: string
  status: 'ACTIVE_PROCESS' | 'ARCHIVED'
}

const entries: MemoryEntry[] = [
  {
    address: '0x00',
    company: 'ESPER SOLUTIONS',
    period: '2023 — Present',
    role: 'Senior Software Engineer',
    description: 'Architecting AI-powered enterprise systems',
    status: 'ACTIVE_PROCESS'
  },
  {
    address: '0x01',
    company: 'CTO GMBH',
    period: '2022 — 2023',
    role: 'Software Engineer',
    description: 'Engineering enterprise-grade platforms',
    status: 'ARCHIVED'
  },
  {
    address: '0x02',
    company: 'MOTOCLE',
    period: '2021 — 2022',
    role: 'Full Stack Developer',
    description: 'Channeling full-stack development',
    status: 'ARCHIVED'
  },
  {
    address: '0x03',
    company: 'FIVERR',
    period: '2020 — 2021',
    role: 'Freelancer',
    description: 'Freelance engineering across 50+ projects',
    status: 'ARCHIVED'
  },
  {
    address: '0x04',
    company: 'FATIMA SUGAR MILLS',
    period: '2019 — 2020',
    role: 'IT Support',
    description: 'The first spark — system initialization',
    status: 'ARCHIVED'
  }
]

const downloadProgress = ref<number[]>(entries.map(() => 0))

onMounted(() => {
  // Header
  const headerTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(headerRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(headerTrigger)

  // Entries stagger + progress bar fill
  const entriesTrigger = ScrollTrigger.create({
    trigger: entriesRef.value,
    start: 'top 80%',
    onEnter: () => {
      if (!entriesRef.value) return
      const cards = entriesRef.value.querySelectorAll('.ve-memory-entry')

      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out' }
      )

      // Animate progress bars
      entries.forEach((_, i) => {
        gsap.to({}, {
          duration: 0.8,
          delay: 0.3 + i * 0.12,
          onUpdate: function () {
            downloadProgress.value[i] = Math.round(100 * this.progress())
          }
        })
      })
    },
    once: true
  })
  triggers.push(entriesTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FFAA00;">
          // DATA RETRIEVAL
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          MEMORY BANK
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Entries -->
      <div ref="entriesRef" class="space-y-4">
        <div
          v-for="(entry, index) in entries"
          :key="entry.address"
          class="ve-memory-entry opacity-0"
          :class="{ 've-entry-active': entry.status === 'ACTIVE_PROCESS' }"
        >
          <!-- Address + Company -->
          <div class="flex items-start justify-between mb-2 flex-wrap gap-2">
            <div class="flex items-center gap-3">
              <span class="font-vt323 text-sm" style="color: #39FF14;">[{{ entry.address }}]</span>
              <h3 class="font-oswald font-bold uppercase text-lg tracking-wider" style="color: #E0F0FF;">
                {{ entry.company }}
              </h3>
            </div>
            <span class="font-vt323 text-xs tracking-wider" style="color: #607080;">{{ entry.period }}</span>
          </div>

          <!-- Role -->
          <p class="font-vt323 text-sm tracking-wider mb-1" style="color: #00F0FF;">
            {{ entry.role }}
          </p>

          <!-- Description -->
          <p class="font-sans text-sm mb-3" style="color: #607080;">
            "{{ entry.description }}"
          </p>

          <!-- Progress bar + status -->
          <div class="flex items-center gap-3">
            <div class="ve-progress-track flex-1">
              <div
                class="ve-progress-fill"
                :style="{
                  width: downloadProgress[index] + '%',
                  background: entry.status === 'ACTIVE_PROCESS'
                    ? 'linear-gradient(90deg, #00F0FF88, #00F0FF)'
                    : 'linear-gradient(90deg, #60708088, #607080)'
                }"
              />
            </div>
            <span
              class="font-vt323 text-xs tracking-wider whitespace-nowrap"
              :class="{ 've-status-pulse': entry.status === 'ACTIVE_PROCESS' }"
              :style="{ color: entry.status === 'ACTIVE_PROCESS' ? '#00F0FF' : '#444444' }"
            >
              {{ entry.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-memory-entry {
  padding: 1.25rem 1.5rem;
  background: rgba(2, 2, 8, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-left: 3px solid #333;
  transition: all 0.3s ease;
}

.ve-memory-entry:hover {
  background: rgba(2, 2, 8, 0.9);
  border-left-color: #607080;
}

.ve-entry-active {
  border-left-color: #00F0FF;
  box-shadow: -2px 0 15px rgba(0, 240, 255, 0.08);
}

.ve-entry-active:hover {
  border-left-color: #00F0FF;
}

.ve-progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.ve-progress-fill {
  height: 100%;
  transition: width 0.05s linear;
}

.ve-status-pulse {
  animation: ve-pulse-status 2s ease-in-out infinite;
}

@keyframes ve-pulse-status {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-status-pulse {
    animation: none;
  }
}
</style>
```

- [ ] **Step 2: Verify experience section renders**

Scroll to experience section — entries should stagger in with progress bars filling left-to-right.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeMemoryBank.vue
git commit -m "feat(variant-e): add memory bank experience section"
```

---

## Task 7: Education uplink — `VeUplink.vue`

**Files:**
- Create: `components/variant-e/VeUplink.vue`

- [ ] **Step 1: Create the education component**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const badgesRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

const signalWidth = ref(0)

interface Credential {
  label: string
  tag: string
}

const credentials: Credential[] = [
  { label: 'BS Computer Science', tag: 'VERIFIED' },
  { label: 'COMSATS University', tag: 'AUTHENTICATED' },
  { label: "Dean's List", tag: 'CONFIRMED' },
  { label: 'Research Projects', tag: 'CATALOGUED' }
]

onMounted(() => {
  // Header
  const headerTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(headerRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(headerTrigger)

  // Content + signal bar
  const contentTrigger = ScrollTrigger.create({
    trigger: contentRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(contentRef.value,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
      // Animate signal bar
      gsap.to({}, {
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out',
        onUpdate: function () {
          signalWidth.value = Math.round(98 * this.progress())
        }
      })
    },
    once: true
  })
  triggers.push(contentTrigger)

  // Badges
  const badgesTrigger = ScrollTrigger.create({
    trigger: badgesRef.value,
    start: 'top 85%',
    onEnter: () => {
      if (!badgesRef.value) return
      const badges = badgesRef.value.querySelectorAll('.ve-credential')
      gsap.fromTo(badges,
        { opacity: 0, rotateX: 90 },
        { opacity: 1, rotateX: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(badgesTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <!-- Scan line sweep -->
    <div class="ve-scan-sweep absolute inset-0 pointer-events-none" />

    <div class="max-w-3xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FF00AA;">
          // UPLINK TRANSFER
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          DATA UPLINK
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Uplink data -->
      <div ref="contentRef" class="ve-uplink-card p-8 mb-10 opacity-0">
        <div class="space-y-4 font-vt323 text-sm tracking-wider">
          <div class="flex items-center gap-3">
            <span style="color: #607080;">UPLINK SOURCE:</span>
            <span class="font-oswald font-bold uppercase text-base" style="color: #E0F0FF;">COMSATS UNIVERSITY</span>
          </div>
          <div class="flex items-center gap-3">
            <span style="color: #607080;">PAYLOAD:</span>
            <span style="color: #00F0FF;">BS Computer Science</span>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span style="color: #607080;">SIGNAL STRENGTH:</span>
              <span style="color: #39FF14;">{{ signalWidth }}%</span>
            </div>
            <div class="ve-signal-track">
              <div
                class="ve-signal-fill"
                :style="{ width: signalWidth + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Credentials -->
      <div ref="badgesRef" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="cred in credentials"
          :key="cred.label"
          class="ve-credential opacity-0"
          style="perspective: 600px;"
        >
          <div class="flex items-center justify-between">
            <span class="font-sans text-sm" style="color: #E0F0FF;">{{ cred.label }}</span>
            <span class="font-vt323 text-xs tracking-wider" style="color: #39FF14;">[{{ cred.tag }}]</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-scan-sweep {
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 240, 255, 0.02) 50%,
    transparent 100%
  );
  background-size: 100% 200%;
  animation: ve-sweep 4s ease-in-out infinite;
}

@keyframes ve-sweep {
  0% { background-position: 0 -100%; }
  100% { background-position: 0 200%; }
}

.ve-uplink-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.1);
}

.ve-signal-track {
  height: 6px;
  background: rgba(57, 255, 20, 0.08);
  border: 1px solid rgba(57, 255, 20, 0.1);
  overflow: hidden;
}

.ve-signal-fill {
  height: 100%;
  background: linear-gradient(90deg, #39FF1488, #39FF14);
  box-shadow: 0 0 8px rgba(57, 255, 20, 0.4);
  transition: width 0.05s linear;
}

.ve-credential {
  padding: 0.875rem 1.25rem;
  background: rgba(2, 2, 8, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.ve-credential:hover {
  border-color: rgba(57, 255, 20, 0.2);
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .ve-scan-sweep {
    animation: none;
    opacity: 0;
  }
}
</style>
```

- [ ] **Step 2: Verify education section renders**

Scroll to education — uplink card should appear with signal bar animating, then credential badges flip in.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeUplink.vue
git commit -m "feat(variant-e): add satellite uplink education section"
```

---

## Task 8: About & contact core dump — `VeCoreDump.vue`

**Files:**
- Create: `components/variant-e/VeCoreDump.vue`

- [ ] **Step 1: Create the about/contact component**

```vue
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const aboutRef = ref<HTMLElement | null>(null)
const metersRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)
const triggers: ScrollTrigger[] = []

interface DiagnosticMeter {
  label: string
  value: number
  color: string
}

const meters: DiagnosticMeter[] = [
  { label: 'FRONTEND', value: 92, color: '#00F0FF' },
  { label: 'BACKEND', value: 88, color: '#FF00AA' },
  { label: 'AI / ML', value: 78, color: '#FFAA00' },
  { label: 'DEVOPS', value: 72, color: '#39FF14' },
  { label: 'ARCHITECT', value: 85, color: '#00F0FF' }
]

const meterWidths = ref<number[]>(meters.map(() => 0))

function generateBar(current: number, total: number): string {
  const filled = Math.round((current / 100) * total)
  return '\u2588'.repeat(filled) + '\u2591'.repeat(total - filled)
}

onMounted(() => {
  // Header
  const headerTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.fromTo(headerRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(headerTrigger)

  // About
  const aboutTrigger = ScrollTrigger.create({
    trigger: aboutRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(aboutRef.value,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(aboutTrigger)

  // Meters
  const metersTrigger = ScrollTrigger.create({
    trigger: metersRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(metersRef.value,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      )
      meters.forEach((meter, i) => {
        gsap.to({}, {
          duration: 1,
          delay: i * 0.12,
          onUpdate: function () {
            meterWidths.value[i] = Math.round(meter.value * this.progress())
          }
        })
      })
    },
    once: true
  })
  triggers.push(metersTrigger)

  // Contact
  const contactTrigger = ScrollTrigger.create({
    trigger: contactRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(contactRef.value,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    },
    once: true
  })
  triggers.push(contactTrigger)

  // Footer
  const footerTrigger = ScrollTrigger.create({
    trigger: footerRef.value,
    start: 'top 95%',
    onEnter: () => {
      gsap.fromTo(footerRef.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
    },
    once: true
  })
  triggers.push(footerTrigger)
})

onBeforeUnmount(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="relative py-24 md:py-32 px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16 opacity-0">
        <div class="font-vt323 text-xs tracking-[0.5em] uppercase mb-3" style="color: #FF00AA;">
          // SYSTEM REPORT
        </div>
        <h2 class="font-oswald font-bold uppercase text-4xl md:text-5xl tracking-tight" style="color: #E0F0FF;">
          CORE DUMP
        </h2>
        <div class="ve-neural-line mx-auto mt-4" style="width: 80px; height: 2px;" />
      </div>

      <!-- Two column -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <!-- About -->
        <div ref="aboutRef" class="ve-dump-card p-6 opacity-0">
          <div class="font-vt323 text-xs tracking-[0.4em] mb-4" style="color: #FFAA00;">
            === ENGINEER PROFILE ===
          </div>
          <p class="font-sans text-sm leading-relaxed mb-6" style="color: #607080;">
            Senior Software Engineer with expertise in building AI-powered products,
            scalable architectures, and modern web applications. Passionate about turning
            complex problems into elegant solutions through clean code and innovative technology.
          </p>
          <div class="space-y-3 font-vt323 text-sm tracking-wider">
            <div class="flex items-center gap-3">
              <span style="color: #607080;">LOCATION:</span>
              <span style="color: #E0F0FF;">Pakistan</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="color: #607080;">STATUS:</span>
              <span class="ve-online-dot" style="color: #39FF14;">ONLINE</span>
            </div>
            <div class="flex items-center gap-3">
              <span style="color: #607080;">AVAILABILITY:</span>
              <span style="color: #E0F0FF;">Open to opportunities</span>
            </div>
          </div>
        </div>

        <!-- Diagnostics -->
        <div ref="metersRef" class="ve-dump-card p-6 opacity-0">
          <div class="font-vt323 text-xs tracking-[0.4em] mb-6" style="color: #FFAA00;">
            === SYSTEM DIAGNOSTICS ===
          </div>
          <div class="space-y-3">
            <div v-for="(meter, i) in meters" :key="meter.label" class="font-vt323 text-sm">
              <div class="flex items-center justify-between mb-1">
                <span style="color: #607080;">{{ meter.label }}</span>
                <span :style="{ color: meter.color }">{{ meterWidths[i] }}%</span>
              </div>
              <div class="ve-ascii-bar" :style="{ color: meter.color }">
                {{ generateBar(meterWidths[i], 22) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div ref="contactRef" class="text-center opacity-0">
        <div class="font-vt323 text-xs tracking-[0.4em] mb-6" style="color: #FFAA00;">
          === NETWORK ENDPOINTS ===
        </div>
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://www.linkedin.com/in/shahabgohar/"
            target="_blank"
            rel="noopener noreferrer"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">SSH</span>
              <span style="color: #607080;"> &rarr; </span>
              LINKEDIN
            </span>
          </a>
          <a
            href="https://github.com/engineershahabgohar"
            target="_blank"
            rel="noopener noreferrer"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">GIT</span>
              <span style="color: #607080;"> &rarr; </span>
              GITHUB
            </span>
          </a>
          <a
            href="mailto:shahab@example.com"
            class="ve-endpoint-btn"
          >
            <span class="font-vt323 text-sm tracking-wider">
              <span style="color: #39FF14;">SMTP</span>
              <span style="color: #607080;"> &rarr; </span>
              EMAIL
            </span>
          </a>
        </div>
      </div>

      <!-- Footer -->
      <footer ref="footerRef" class="mt-24 pt-8 border-t text-center opacity-0" style="border-color: rgba(0,240,255,0.08);">
        <div class="font-vt323 text-sm tracking-[0.3em] mb-2" style="color: #00F0FF;">
          // PROCESS COMPLETE — NEURAL LINK TERMINATED
        </div>
        <div class="ve-hum font-vt323 text-xs tracking-wider mb-4" style="color: #333333;">
          &copy; 2026 SHAHAB GOHAR — ALL SYSTEMS NOMINAL
        </div>

        <button
          class="mt-4 mx-auto flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:opacity-80"
          @click="() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="transform rotate-180">
            <path d="M12 4L12 20M12 20L6 14M12 20L18 14" stroke="#00F0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="font-vt323 text-xs tracking-widest" style="color: #00F0FF;">RETURN TO NEXUS</span>
        </button>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.ve-neural-line {
  background: #00F0FF;
  box-shadow: 0 0 8px #00F0FF, 0 0 20px rgba(0,240,255,0.4);
}

.ve-dump-card {
  background: rgba(2, 2, 8, 0.8);
  border: 1px solid rgba(0, 240, 255, 0.08);
  height: 100%;
}

.ve-online-dot {
  position: relative;
  padding-left: 1rem;
}

.ve-online-dot::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #39FF14;
  box-shadow: 0 0 6px #39FF14;
  animation: ve-blink-dot 2s ease-in-out infinite;
}

@keyframes ve-blink-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.ve-ascii-bar {
  font-size: 0.7rem;
  line-height: 1;
  letter-spacing: 0.5px;
}

.ve-endpoint-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  border: 1px solid rgba(0, 240, 255, 0.15);
  color: #00F0FF;
  text-decoration: none;
  background: rgba(0, 240, 255, 0.02);
  transition: all 0.3s ease;
}

.ve-endpoint-btn:hover {
  border-color: #00F0FF;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  color: #FFFFFF;
}

.ve-hum {
  animation: ve-hum-anim 4s ease-in-out infinite;
}

@keyframes ve-hum-anim {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

@media (prefers-reduced-motion: reduce) {
  .ve-online-dot::before,
  .ve-hum {
    animation: none;
  }
}
</style>
```

- [ ] **Step 2: Verify about section renders**

Scroll to the bottom — should see the about card, ASCII diagnostic meters animating, network endpoints, and footer.

- [ ] **Step 3: Commit**

```bash
git add components/variant-e/VeCoreDump.vue
git commit -m "feat(variant-e): add core dump about/contact section"
```

---

## Task 9: Full integration test

- [ ] **Step 1: Run dev server and test full scroll journey**

```bash
npm run dev
```

Open `http://localhost:3000/variant-e/` and verify:

1. Page loads with dark background, faint particles visible
2. Boot sequence types out, then hero name glitches in
3. Scrolling brightens the 3D scene (icosahedron reveals, particles brighten)
4. Skills clusters animate in with bouncing nodes
5. Memory bank entries stagger in with progress bars filling
6. Education uplink card appears with signal bar, credentials flip in
7. Core dump section shows about text, ASCII meters animate, endpoints render
8. Footer fades in with "RETURN TO NEXUS" button
9. Scanline/grain overlay is subtly visible throughout
10. No console errors

- [ ] **Step 2: Test responsive behavior**

Resize to mobile width (~375px):
- Content stacks vertically
- Particle count should be lower (visual confirmation: fewer dots)
- All sections readable and properly spaced

- [ ] **Step 3: Test prefers-reduced-motion**

In browser DevTools, enable "Reduce motion" in rendering settings:
- Glitch effects should be disabled
- Scanline overlay should be hidden
- Particle animation should still work (just the organic drift)

- [ ] **Step 4: Commit all files together**

```bash
git add -A
git commit -m "feat(variant-e): complete Neural Nexus cyberpunk portfolio variant

Adds a new Three.js-powered portfolio variant featuring:
- WebGL neural particle network with custom GLSL shaders
- Scroll-driven GLB model reveal with cinematic lighting
- Holographic HUD hero with boot sequence
- Neural cluster skill nodes
- Memory bank experience timeline
- Satellite uplink education section
- Terminal core dump about/contact
- Cinematic scanline/grain overlay
- Responsive and reduced-motion accessible"
```
