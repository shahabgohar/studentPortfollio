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
