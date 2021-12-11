import * as THREE from './three.js-master/three.js-master/build/three.module.js'
import { OrbitControls } from './three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from './three.js-master/three.js-master/examples/jsm/loaders/GLTFLoader.js'
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const loader = new GLTFLoader()
loader.load(' assets/room.gltf',function(gltf){
    console.log(gltf)
    const root = gltf.scene;
    root.scale.set(0.3,0.3,0.3)
        //root.rotation.x = 0.5;
        //root.position.x = 0
        //root.position.y = 0
        //root.rotation.y = 1;
        //root.rotation.z = 1.5;
        root.position.z = -5;
    scene.add(root);
} , function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "%loaded")
} ,function(error){
console.log('an error accurred')
let mesh = new THREE.Mesh(geometry, buildTwistMaterial(100))
mesh.position.x = 0
mesh.position.y = 0
scene.add(mesh)
})
const randomgeometry = new THREE.PlaneGeometry(50, 50, 50)
const randomaterial = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
// Material Props.
randomaterial.wireframe = true
// Create Mesh & Add To Scene
const randomblob = new THREE.Mesh(randomgeometry, randomaterial)
randomblob.rotation.x = 1.5708
randomblob.position.y = -1.1
scene.add(randomblob)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(2,2,5)
scene.add(light)



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
//const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
//camera.position.set(0,1,2)
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.001,
    5000
  )
  camera.position.x = 5
  camera.position.y = 0
  camera.position.z = 0
  scene.add(camera) 
const controls = new OrbitControls(camera, canvas) 
controls.enableDamping = true
controls.autoRotate = true
// controls.enableZoom = false
controls.enablePan = false
controls.dampingFactor = 0.05
controls.maxDistance = 1000
controls.minDistance = 2
controls.touches = {
  ONE: THREE.TOUCH.ROTATE,
  TWO: THREE.TOUCH.DOLLY_PAN,
//scene.add(camera)
}
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true


//function animate(){
   // requestAnimationFrame(animate)
    
    //root.rotation.x += 0.01;
    //root.rotation.y += 0.02;
    //root.rotation.z += 0.03;

    //renderer.render(scene,camera)
//}
//animate()
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  scene.traverse(function (child) {
    if (child.isMesh) {
      const shader = child.material.userData.shader

      if (shader) {
        shader.uniforms.time.value = performance.now() / 1000
      }
    }
  })
  //randomblob.rotation.y -= 0.01 * Math.sin(1)
  //mesh.rotation.y += 0.01 * Math.sin(1)
  // mesh.rotation.z += 0.01 * Math.sin(1)

  // Update controls
  controls.update()
  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()