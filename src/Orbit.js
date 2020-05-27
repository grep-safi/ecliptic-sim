import * as OrbitControls from '../node_modules/three-js/addons/OrbitControls';

const SPHERE_WIDTH_SEGMENTS = 100;
const SPHERE_HEIGHT_SEGMENTS = 100;

let canvas,
    camera,
    scene,
    renderer,
    controls;

let solarSystem;
let rotatingObjects = [];

function createCamera() {
    const fov = 85;
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const near = 0.1;
    const far = 6;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
}

function createSystem() {
    solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
}

function createSphere(radius, x, color, emissive) {
    const sphereGeometry = new THREE.SphereBufferGeometry(
        radius, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS);

    const sphereMaterial = new THREE.MeshPhongMaterial({color: color, emissive: emissive});
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.position.x = x;
    solarSystem.add(sphereMesh);
}

function createOrbitCircle() {
    let geometry = new THREE.RingGeometry( 2.98, 3, 128 );
    let material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
    let mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
}

function createOrbitControls() {
    controls = new OrbitControls( camera, renderer.domElement );
    controls.update();
}

function resizeRendererToDisplaySize(renderer) {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

function createLight() {
    const color = 0xFFFFFF;
    const intensity = 0.60;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0,0,1);
    scene.add(light);
}

function init() {
    canvas = document.querySelector('#c');
    renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    scene = new THREE.Scene();
    createCamera();

    createSystem();
    createLight();
    createSphere(0.30, 0, 'rgb(255,255,163)', 'black');
    createSphere(0.35, 3, 'rgb(33,148,206)', 'black');
    createOrbitCircle();
    createOrbitControls();

    render();
}

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    let speed = 0.005;
    solarSystem.rotation.z += speed;

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

init();

