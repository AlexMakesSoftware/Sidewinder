import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    -32, 0, 36,   // Vertex 0
    32, 0, 36,    // Vertex 1
    64, 0, -28,   // Vertex 2
    -64, 0, -28,  // Vertex 3
    0, 16, -28,   // Vertex 4
    0, -16, -28,  // Vertex 5
    -12, 6, -28,  // Vertex 6
    12, 6, -28,   // Vertex 7
    12, -6, -28,  // Vertex 8
    -12, -6, -28  // Vertex 9
]);


const indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Side faces
    0, 3, 4,
    0, 4, 5,
    0, 5, 6,
    0, 6, 7,
    0, 7, 8,
    0, 8, 9,
    // Bottom face
    2, 3, 4,
    2, 4, 5,
    // Top face
    1, 6, 7,
    1, 7, 8,
    1, 8, 9,
    1, 9, 2,
    // Back face
    6, 7, 8,
    6, 8, 9
];


geometry.setIndex( indices );
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
//const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

// Create a material for the faces (black color)
const faceMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

// Create a material for the outline (green color)
const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

// Create a mesh for the solid faces
const solidMesh = new THREE.Mesh(geometry, faceMaterial);
scene.add(solidMesh);

// Create a mesh for the outline
const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
scene.add(outlineMesh);

camera.position.z = 100;

function animate() {
	requestAnimationFrame( animate );

    solidMesh.rotation.x += 0.01;
    solidMesh.rotation.y += 0.01;
    outlineMesh.rotation.x += 0.01;
    outlineMesh.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();
