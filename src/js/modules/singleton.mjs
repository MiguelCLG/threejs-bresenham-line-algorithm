import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import Tamanhos from '../utils/tamanhos.mjs';
import Camera from './camera.mjs';
import Renderer from './renderer.mjs';
/**
 * @class Singleton
 * Cria uma instancia de esta class, usando o padrão de singleton para que haja apenas
 * uma class principal que gestiona o resto das classes.
 * @param canvas - canvas que vamos usar
 */
export default class Singleton {
    static instance;

    constructor(canvas)
    {
        if (Singleton.instance) // se fizermos um new Singleton() e já existir um, então esse não será criado e será retornado o existente.
        {
            return Singleton.instance;
        }
        Singleton.instance = this;
        console.log(canvas);

        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.tamanhos = new Tamanhos();
        this.camera = new Camera();
        this.renderer = new Renderer();
    }

    /**
     * Quando a janela é redimensionada, fazemos update a todas as dependencias
     */
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }
    
    /**
     * Quando queremos dar update com o metodo de requestAnimationFrame, queremos
     * chamar todas as funções de update em todas as classes restantes.
     * Quando adicionamos uma class nova, adicionamos a sua função de update aqui.
     */
    update() {
        this.camera.update();
        this.renderer.update();
    }

}