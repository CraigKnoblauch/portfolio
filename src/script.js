import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const SEPIA = new THREE.Color('#FFDEA8')
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = SEPIA

// Texture loader
const textureLoader = new THREE.TextureLoader()
const fuselageTexture = textureLoader.load('textures/rocket-uv.jpg')

/**
 * Materials
 */
const fuselageMaterial = new THREE.MeshBasicMaterial({ map: fuselageTexture })

/**
 * Models
 */
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// let mixer = null
// Load platform
gltfLoader.load('models/platform-non-compressed.glb',
    (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        gltf.scene.rotateY(45)
        scene.add(gltf.scene)
    }
)

// Load rocket
const rocket = {}
gltfLoader.load('models/rocket-non-compressed.glb',
    (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        gltf.scene.rotateY(45)

        rocket.nozzle1 = gltf.scene.children.find((child) => child.name == 'nozzle1')
        rocket.nozzle2 = gltf.scene.children.find((child) => child.name == 'nozzle2')
        rocket.payload_ferring = gltf.scene.children.find((child) => child.name == 'payload_ferring')
        rocket.fuselage = gltf.scene.children.find((child) => child.name == 'fuselage')

        rocket.fuselage.material = fuselageMaterial

        scene.add(gltf.scene)
    }
)

console.log(scene)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshBasicMaterial({
        color: SEPIA,
        // metalness: 0,
        // roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    // Update mixer
    // if(mixer != null) {
    //     mixer.update(deltaTime)
    // }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()