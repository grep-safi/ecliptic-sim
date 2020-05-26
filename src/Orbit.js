// If you change width or height, you must change the css width and height for div,
// the aspect ratio in this file and of course, the width and height values in the canvas element

import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/build/three.module.js';

let camera,
    scene;

function createCamera(width, height) {
    const fov = 75;
    const aspect = width / height;
    const near = 0.1;
    const far = 5;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
}

function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

    createCamera(canvas.clientWidth, canvas.clientHeight);

    scene = new THREE.Scene();

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        cube.position.x = x;

        return cube;
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance(geometry, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 0.01 + ndx * 0.01;
            const rot = speed;
            cube.rotation.x += rot;
            cube.rotation.y += rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    render();

    // requestAnimationFrame(render);
}

main();

