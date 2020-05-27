let canvas,
    camera,
    scene,
    renderer;

function createCamera() {
    const fov = 75;
    const aspect = canvas.width / canvas.height;
    const near = 0.1;
    const far = 5;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
}

function createSphere() {
    const radius = 0.75;
    const widthSegments = 100;
    const heightSegments = 100;
    const sphereGeometry = new THREE.SphereBufferGeometry(
        radius, widthSegments, heightSegments);

    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);

    const sunMaterial = new THREE.MeshPhongMaterial();
    // const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff6b});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    solarSystem.add(sunMesh);
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

    createLight();

    createSphere();

    render();
}

function render() {
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

init();

