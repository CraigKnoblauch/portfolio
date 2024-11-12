// HUGE Thanks to Bruno Simon for allowing me to use his code as a starter. And for all the lessons given and gained
// on threejs-journey.com
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TextureLoader } from 'three'

import MatcapManger from './MatcapManager'
import matcapImages from './matcapImages'
import GenericArea from './GenericArea'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const careerAreaGroundTexture = textureLoader.load('textures/career-are-baked.jpg')
careerAreaGroundTexture.flipY = false
careerAreaGroundTexture.encoding = THREE.sRGBEncoding

/**
 * Materials
 */
const matcapMgr = new MatcapManger()
matcapMgr.loadMatcaps('matcaps', matcapImages)

const testMatcapMgr = new MatcapManger()
testMatcapMgr.loadMatcaps('matcaps', [
  'test-material-1.png',
  'test-material-2.png',
  'test-material-3.png'
])
// Career area ground material
const careerAreaGroundMaterial = new THREE.MeshBasicMaterial({ map: careerAreaGroundTexture })

/**
 * Model
 */
gltfLoader.load(
    'models/career-area.glb',
    (gltf) =>
    {
        const careerArea = new GenericArea(gltf, matcapMgr, careerAreaGroundMaterial, [
            "career_ground", 
            "asu_camera_zone", "asu_camera",
            "nrl_camera_zone", "nrl_camera",
            "exhaust_emitter", "rocket", "rocket_nozzle_1", "rocket_nozzle_2", "rocket_cradle",
            "rocket_yellow_flames_1", "rocket_yellow_flames_2",
            "launch_button"
        ])
        scene.add(careerArea.group)
    }
)

// gltfLoader.load(
//     'models/test-area.glb',
//     (gltf) => 
//     {
//       const testArea = new GenericArea(gltf, testMatcapMgr, careerAreaGroundMaterial, ["test_exclusion_1", "test_exclusion_2"])
//       scene.add(testArea.group)
//       console.log('loaded')
//     }
// )

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
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()