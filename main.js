// Import necessary modules from Three.js
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define the vertices of the diamond shape
const vertices = [
    new THREE.Vector3(-32,   0,  36), // Vertex 0
    new THREE.Vector3( 32,   0,  36), // Vertex 1
    new THREE.Vector3( 64,   0, -28), // Vertex 2
    new THREE.Vector3(-64,   0, -28), // Vertex 3
    new THREE.Vector3(  0,  16, -28), // Vertex 4
    new THREE.Vector3(  0, -16, -28), // Vertex 5
    new THREE.Vector3(-12,   6, -28), // Vertex 6
    new THREE.Vector3( 12,   6, -28), // Vertex 7
    new THREE.Vector3( 12,  -6, -28), // Vertex 8
    new THREE.Vector3(-12,   -6,  -28) // Vertex 9
];

// Create a geometry for the convex hull
const convexGeometry = new ConvexGeometry(vertices);

// Create a material for the solid black body
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

// Create a mesh for the solid black body
const solidMesh = new THREE.Mesh(convexGeometry, blackMaterial);

// Add the solid mesh to the scene
scene.add(solidMesh);

// Define the lines for the green outline
const greenLines = [
    // Outer diamond shape
    [vertices[0], vertices[1]],
    [vertices[1], vertices[2]],
    [vertices[1], vertices[4]],
    [vertices[0], vertices[4]],
    [vertices[0], vertices[3]],
    [vertices[3], vertices[4]],
    [vertices[2], vertices[4]],
    [vertices[3], vertices[5]],
    [vertices[2], vertices[5]],
    [vertices[1], vertices[5]],
    [vertices[0], vertices[5]],
    [vertices[6], vertices[7]],
    [vertices[7], vertices[8]],
    [vertices[6], vertices[9]],
    [vertices[8], vertices[9]]   
];


// Create a material for the green outline
const greenMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });

// Create a group to hold all lines of the outline
const greenOutlineGroup = new THREE.Group();

// Create lines for the green outline
greenLines.forEach(line => {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(line);
    const lineMesh = new THREE.Line(lineGeometry, greenMaterial);
    greenOutlineGroup.add(lineMesh);
});

// Add the green outline group to the scene
scene.add(greenOutlineGroup);


// const controls = new OrbitControls( camera, renderer.domElement );
// 			controls.target.set( 0, 0.5, 0 );
// 			controls.update();
// 			controls.enablePan = false;
// 			controls.enableDamping = true;


window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};            


// Render the scene
function animate() {
    requestAnimationFrame(animate);

    solidMesh.rotation.x += 0.01;
    solidMesh.rotation.y += 0.01;
    greenOutlineGroup.rotation.x += 0.01;
    greenOutlineGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();
