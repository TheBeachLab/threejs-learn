import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { DoubleSide } from 'three'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// textures

const textureLoader = new THREE.TextureLoader()

const doorcolortexture = textureLoader.load('textures/door/color.jpg')
const dooralphatexture = textureLoader.load('textures/door/alpha.jpg')
const doormetalnesstexture = textureLoader.load('textures/door/metalness.jpg')
const doorroughnesstexture = textureLoader.load('textures/door/roughness.jpg')
const doornormaltexture = textureLoader.load('textures/door/normal.jpg')
const doorheighttexture = textureLoader.load('textures/door/height.jpg')
const doorambientOcclusiontexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
const matcaptexture = textureLoader.load('/textures/matcaps/8.png')
const gradienttexture = textureLoader.load('/textures/gradients/3.jpg')

// objects
// const material = new THREE.MeshBasicMaterial()

// material.map = doorcolortexture
// material.transparent = true
//material.opacity = 0.5
// material.wireframe = true
// material.alphaMap = dooralphatexture
// material.side = DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcaptexture

// const material = new THREE.MeshDepthMaterial()

const material = new THREE.MeshLambertMaterial()

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
)

sphere.position.x = -2

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.2, 16, 16),
    material
)

torus.position.x = 2

scene.add(sphere, plane, torus)

// lighs

const ambientlight = new THREE.AmbientLight(0xffffff, 0.5)

const pointlight = new THREE.PointLight(0xffffff, 0.5)
pointlight.position.set(2, 3, 4)

scene.add(pointlight, ambientlight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(120, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // update objects
    plane.rotation.y = 0.1 * elapsedTime
    sphere.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    plane.rotation.x = 0.15 * elapsedTime
    sphere.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()