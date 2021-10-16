import './styles/main.css'
import * as THREE from '../node_modules/three/build/three.module.js'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { gsap } from '../node_modules/gsap';
import { ScrollTrigger } from '../node_modules/gsap/ScrollTrigger'
import { TextureLoader } from 'three';


// Import images
import imgLogo from '../src/assets/images/logo.png';
import imgHappyEnter from '../src/assets/images/happyEnter.png';
// import imgTest1 from '../src/assets/images/cubeTexture.jpg';

document.getElementById("imgLogo").innerHTML = `<img src= ${imgLogo} alt="logo">`;
document.getElementById("btnEnter").innerHTML = `<img src= ${imgHappyEnter} id="btn" class="btnEnter" alt="">`;
// document.getElementById("imgTest1").innerHTML = `<img src= ${imgTest1} alt="logo">`;


gsap.registerPlugin(ScrollTrigger);

document.getElementById('btn').addEventListener('click', () => {
    let x = "-100%";
    gsap.to('.containerG', {
        duration: 2,
        x: x,
    });

    gsap.to('.containerD', {
        duration: 2,
        y: x,
    });
});




gsap.to('.navFooter', {
    scrollTrigger: {
        trigger: '.navFooter',
        start: 'top 95%',
        // end: 'bottom 60%',
        // markers: true,
        toggleAction: 'restart pause none pause'
    },
    duration: .5,
    y: -82,
});

// gsap.to('.footer', {
//     scrollTrigger: {
//         trigger: '.footer',
//         // start: 'bottom 95%',
//         // end: 'bottom 60%',
//         markers: true,
//         toggleAction: 'restart pause none pause'
//     },
//     duration: 1,
//     y: 82,
//     x: x
// });


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = .1;
camera.position.y = .1;
camera.position.z = .1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));




/**
 * Objetcs
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial( {color: 'white', wireframe: true, wireframeLinecap: 5} )
)
scene.add(cube);

const addRond = () => {
    const geometrie = new THREE.SphereGeometry ( .1, 24, 24 );
    const material = new THREE.MeshBasicMaterial( {color: 'white'} );
    const rond = new THREE.Mesh( geometrie, material );

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));

    rond.position.set(x, y, z);
    scene.add(rond);
};

Array(2000).fill().forEach(addRond);

// const addCube = () => {
//     const geometrie = new THREE.BoxGeometry ( 1, 1, 1 );
//     const material = new THREE.MeshBasicMaterial( {color: 'white', wireframe: true} );
//     const cube = new THREE.Mesh( geometrie, material );
//     let y = 5;

//     cube.position.set(y);
//     scene.add(cube);
// };

// Array(6).fill().forEach(addCube);



/**
 * Animate
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width + 1
    cursor.y = - event.clientY / sizes.height + 1
});


const clock = new THREE.Clock();
let lastElapsedTime = 0;

const Animate = () => {
    // Params
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;

    // Animate cube
    cube.rotation.x += 0.001;
    cube.rotation.y += 0.0005;
    cube.rotation.z += 0.001;

    // Move camera animate
    camera.position.x = Math.sin(cursor.x * Math.PI * 1);
    camera.position.z = Math.cos(cursor.x * Math.PI * 1);
    camera.position.y = cursor.y * -.5
    camera.lookAt(scene.position);

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call Animate again on the next frame
    window.requestAnimationFrame(Animate);
}

Animate();

// Move Camera
const moveCamera = () => {
    const t = document.body.getBoundingClientRect().bottom;
    cube.rotation.x += .05;
    cube.rotation.y += .075;
    cube.rotation.z += .05;
    
    // camera.position.z -= t * -.01;
    // camera.position.x -= t * -.0002;
    // camera.position.y -= t* -.0002;
};

document.body.onscroll = moveCamera;




