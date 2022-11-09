import { getMousePosition, CreateInput } from './utils.mjs';
import { CreateGrid } from './geometry.mjs';
import Singleton from './singleton.mjs';

export let renderer, scene, camera, canvas, grid;

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
    canvas = document.querySelector('.main-canvas');
    const mainApp = new Singleton(canvas);
    
    canvas.addEventListener('mousemove', (evento) => {
        let mousePos = getMousePosition(canvas, evento);
        //console.log(`(${mousePos.x}, ${mousePos.y})`);
    })
}

// Tenho de adicionar esta função à window para permitir a sua utilização nos botões de UI
/* window.InitializeGrid = () => {
    scene.remove.apply(scene, scene.children);
    grid = [];

    const gridSizeElement = document.getElementsByClassName('grid-size-input')[0];
    grid = CreateGrid(parseInt(gridSizeElement.value), tileColor1, tileColor2);

    grid.forEach((tile) => scene.add(tile));
} */

export { Initialize, CreateHeader };