//console.log(THREE)

// scene
const scene = new THREE.Scene()

// cube
const cube = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
// a mesh is made of geometry and material
const mesh = new THREE.Mesh(cube,material)

// add mesh to the scene
scene.add(mesh)

// sizes
const sizes = {
    width: 800,
    height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z=3
scene.add(camera)

// renderer
const canvas = document.querySelector('.webgl')

const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene,camera)