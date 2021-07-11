import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// fonts loader

const fontLoader = new THREE.FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        //console.log('font ok')
        const textGeometry = new THREE.TextGeometry(
            'Hello TBL',
            {
                font: font,
                size: 0.3,
                height: 0.2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelSize: 0.02,
                bevelThickness: 0.03,
                bevelOffset: 0,
                bevelSegments: 3
            }

        )
        // textGeometry.computeBoundingBox() // calculate the bounding box
        // // console.log(textGeometry.boundingBox)
        // textGeometry.translate( // not exactly the center
        //     -textGeometry.boundingBox.max.x / 2,
        //     -textGeometry.boundingBox.max.y / 2,
        //     -textGeometry.boundingBox.max.z / 2,
        // )
        textGeometry.center()
        const textMaterial = new THREE.MeshBasicMaterial()
        textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
    }
)

// axis helper
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()



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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()