/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Keyboard from "../utils/keyboard.mjs";
import Mouse from "../utils/mouse.mjs";
import Tamanhos from "../utils/tamanhos.mjs";
import Tempo from "../utils/tempo.mjs";
import Camera from "./camera.mjs";
import Grid from "./grid.mjs";
import Information from "./information.mjs";
import Renderer from "./renderer.mjs";
/**
 * @class Singleton
 * Cria uma instancia desta class, usando o padrão de singleton para que haja apenas
 * uma class principal que gere o resto das classes.
 * @param canvas - canvas que vamos usar
 */
export default class Singleton {
  static instance; //jshint ignore:line

  constructor(canvas) {
    if (Singleton.instance) {
      // se fizermos um new Singleton() e já existir um, então esse não será criado e será retornado o existente.
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.tempo = new Tempo();
    this.information = new Information();
    this.tamanhos = new Tamanhos();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.grid = new Grid(10);
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    this.axesHelper = new THREE.AxesHelper( 5 );
    
    this.scene.add(this.axesHelper);
    
    this.tamanhos.on("resize", () => this.resize());
    this.tempo.on("update", () => this.update());
  }

  /**
   * Quando a janela é redimensionada, fazemos update a todas as dependencias
   */
  resize() {
    this.camera.resize();
    this.renderer.resize();
    this.grid.resize();
  }

  /**
   * Quando queremos dar update com o metodo de requestAnimationFrame, queremos
   * chamar todas as funções de update em todas as classes restantes.
   * Quando adicionamos uma class nova, adicionamos a sua função de update aqui.
   */
  update() {
    this.camera.update();
    this.renderer.update();
    this.grid.update();
    this.mouse.update();
    this.information.update();
  }
}
