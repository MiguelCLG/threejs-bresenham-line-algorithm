import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';
import { getMousePosition, CreateInput } from './utils.mjs';
import { CreateGrid } from './geometry.mjs';
import Singleton from './singleton.mjs';

export let renderer, scene, camera, canvas, grid;
const tileColor1 = 0xEF9A70;
const tileColor2 = 0x9A92BF;

function CreateHeader() {
    const header = document.createElement('div');
    header.setAttribute('style', `height: 20vh; width: ${window.innerWidth}px;background-color: #333333;`);
    document.body.insertBefore(header, document.body.firstChild); // Cria o header antes do canvas

    const { label, input } = CreateInput("Tamanho da grid: ", "number", 'grid-size-input', { min: 10, value: 10 });

    header.appendChild(label);
    header.appendChild(input);

    const { label: btnLabel, input: btnInput } = CreateInput('', 'button', 'reset-btn', { type: 'button', value: 'RESET', onclick: "InitializeGrid()" });

    header.appendChild(btnLabel);
    header.appendChild(btnInput);
    
}

function Initialize() {
    // scene = new THREE.Scene();
    // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    
    // renderer = new THREE.WebGLRenderer();
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild(renderer.domElement);

    canvas = document.querySelector('.main-canvas');
    
    console.log(canvas)
    const mainApp = new Singleton(canvas);
    
    canvas.addEventListener('mousemove', (evento) => {
        let mousePos = getMousePosition(canvas, evento);
        //console.log(`(${mousePos.x}, ${mousePos.y})`);
    })
}

// function Animate() {
//     requestAnimationFrame(Animate);
//     renderer.render(scene, camera);
// }

// function SetupOrbitControls() {
//     const orbit = new OrbitControls(camera, renderer.domElement);
//     const axesHelper = new THREE.AxesHelper(3);
//     scene.add(axesHelper);
//     camera.position.set(0, 0, 25);
//     camera.lookAt(0, 0, 0);
//     orbit.update();
// }

// Tenho de adicionar esta função à window para permitir a sua utilização nos botões de UI
window.InitializeGrid = () => {
    scene.remove.apply(scene, scene.children);
    grid = [];

    const gridSizeElement = document.getElementsByClassName('grid-size-input')[0];
    grid = CreateGrid(parseInt(gridSizeElement.value), tileColor1, tileColor2);

    grid.forEach((tile) => scene.add(tile));
}

export { Initialize, CreateHeader };