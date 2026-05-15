<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'
import { INJECT_THEME_KEY, Theme } from '~/types'

const theme = inject<Ref<Theme>>(INJECT_THEME_KEY)
const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const countries = [
  { code: 'USA', label: 'United States', lat: 39, lon: -98 },
  { code: 'UK', label: 'United Kingdom', lat: 55, lon: -3 },
  { code: 'DE', label: 'Germany', lat: 51, lon: 10 },
  { code: 'CA', label: 'Canada', lat: 56, lon: -106 },
  { code: 'ES', label: 'Spain', lat: 40, lon: -4 },
  { code: 'NG', label: 'Nigeria', lat: 9, lon: 8 },
  { code: 'BE', label: 'Belgium', lat: 50.5, lon: 4.5 },
  { code: 'MT', label: 'Malta', lat: 35.9, lon: 14.4 }
]

const isDark = computed(() => theme?.value === Theme.DARK)

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let globeGroup: THREE.Group | null = null
let THREE: typeof import('three') | null = null
let animationFrame = 0
let resizeObserver: ResizeObserver | null = null
const markerMeshes: THREE.Mesh[] = []

function latLonToVector3(lat: number, lon: number, radius: number) {
  if (!THREE) return null
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function createGlobeMaterial() {
  if (!THREE) return null
  return new THREE.MeshStandardMaterial({
    color: isDark.value ? '#111827' : '#eef2ff',
    roughness: 0.55,
    metalness: 0.08,
    emissive: isDark.value ? '#080a20' : '#dbeafe',
    emissiveIntensity: isDark.value ? 0.22 : 0.08
  })
}

function updateThemeColors() {
  if (!THREE || !scene || !globeGroup) return

  scene.background = null
  const globe = globeGroup.getObjectByName('globe') as THREE.Mesh | undefined
  if (globe?.material instanceof THREE.MeshStandardMaterial) {
    globe.material.color.set(isDark.value ? '#111827' : '#eef2ff')
    globe.material.emissive.set(isDark.value ? '#080a20' : '#dbeafe')
    globe.material.emissiveIntensity = isDark.value ? 0.22 : 0.08
  }

  markerMeshes.forEach((marker) => {
    if (marker.material instanceof THREE.MeshBasicMaterial) {
      marker.material.color.set('#565BCF')
    }
  })
}

function setupScene() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!THREE || !canvas || !container) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 0.25, 6.2)

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  globeGroup = new THREE.Group()
  scene.add(globeGroup)

  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(2, 72, 72),
    createGlobeMaterial()!
  )
  globe.name = 'globe'
  globeGroup.add(globe)

  const wireframe = new THREE.Mesh(
    new THREE.SphereGeometry(2.012, 36, 18),
    new THREE.MeshBasicMaterial({
      color: '#565BCF',
      wireframe: true,
      transparent: true,
      opacity: 0.18
    })
  )
  globeGroup.add(wireframe)

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.14, 72, 72),
    new THREE.MeshBasicMaterial({
      color: '#565BCF',
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide
    })
  )
  globeGroup.add(atmosphere)

  const markerGeometry = new THREE.SphereGeometry(0.055, 16, 16)
  countries.forEach((country) => {
    const position = latLonToVector3(country.lat, country.lon, 2.08)
    if (!position) return
    const marker = new THREE.Mesh(
      markerGeometry,
      new THREE.MeshBasicMaterial({ color: '#565BCF' })
    )
    marker.position.copy(position)
    markerMeshes.push(marker)
    globeGroup?.add(marker)
  })

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
  scene.add(ambientLight)

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
  keyLight.position.set(4, 4, 5)
  scene.add(keyLight)

  const rimLight = new THREE.PointLight('#565BCF', 16, 16)
  rimLight.position.set(-3, 1.5, 4)
  scene.add(rimLight)

  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(container)
  handleResize()
  animate()
}

function handleResize() {
  const container = containerRef.value
  if (!container || !renderer || !camera) return

  const width = container.clientWidth
  const height = container.clientHeight
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function animate() {
  if (!renderer || !scene || !camera || !globeGroup) return

  globeGroup.rotation.y += 0.0035
  globeGroup.rotation.x = -0.12
  renderer.render(scene, camera)
  animationFrame = requestAnimationFrame(animate)
}

function cleanup() {
  cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  renderer?.dispose()
  scene?.traverse((object) => {
    if (THREE && object instanceof THREE.Mesh) {
      object.geometry.dispose()
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose())
      } else {
        object.material.dispose()
      }
    }
  })
  renderer = null
  scene = null
  camera = null
  globeGroup = null
  markerMeshes.length = 0
}

watch(isDark, updateThemeColors)

onMounted(async () => {
  THREE = await import('three')
  setupScene()
})
onBeforeUnmount(cleanup)
</script>

<template>
  <div ref="containerRef" class="relative h-[300px] w-full overflow-hidden sm:h-[340px]">
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" aria-label="3D globe showing client countries"></canvas>

    <div class="pointer-events-none absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-2 px-3">
      <span
        v-for="country in countries"
        :key="country.code"
        class="border border-info/30 bg-secondary/80 px-2.5 py-1 font-ibmMono text-[0.68rem] text-primary/75 backdrop-blur"
      >
        {{ country.code }}
      </span>
    </div>
  </div>
</template>
