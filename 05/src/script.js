import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

// axis helper
const axis = new THREE.AxesHelper(2)
scene.add(axis)

const group = new THREE.Group()
scene.add (group)


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
group.add(mesh)
//mesh.position.y=2
mesh.position.set(1,1,1)
mesh.position.normalize()
console.log('origin to cube', mesh.position.length())

mesh.scale.x = 0.5

mesh.rotation.reorder('YXZ')
mesh.rotation.x = 1 // radians
mesh.rotation.y =1

const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'blue'})
)

group.add(mesh2)

const mesh3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
mesh3.position.x=-1
group.add(mesh3)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
camera.position.x = 1
camera.lookAt(mesh.position)

console.log('cube to camera',mesh.position.distanceTo(camera.position))

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)