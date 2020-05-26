// If you change width or height, you must change the css width and height for div,
// the aspect ratio in this file and of course, the width and height values in the canvas element

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,7 / 6,0.1,1000)
camera.position.z = 5;

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});

// var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(700,600);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(700 ,600);
    camera.aspect = 7 / 6;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xF7F7F7});
//var mesh = new THREE.Mesh(geometry, material);

//scene.add(mesh);

let meshX = -10;
for(var i = 0; i<15;i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
    meshX+=1;
}


var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);

var render = function() {
    requestAnimationFrame(render);


    renderer.render(scene, camera);
}

// function onMouseMove(event) {
//     event.preventDefault();
//
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//
//     raycaster.setFromCamera(mouse, camera);
// }



// window.addEventListener('mousemove', onMouseMove);
render();
