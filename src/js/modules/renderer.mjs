/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "./singleton.mjs";

/**
 *
 * @export
 * @class Renderer
 * Faz setup e update ao renderer do threejs
 */
export default class Renderer {
  constructor() {
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.canvas = this.singleton.canvas;
    this.camera = this.singleton.camera;
    this.tamanhos = this.singleton.tamanhos;
    this.setRenderer();
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.tamanhos.width, this.tamanhos.height);
    this.renderer.setPixelRatio(this.tamanhos.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.tamanhos.width, this.tamanhos.height);
    this.renderer.setPixelRatio(this.tamanhos.pixelRatio);
  }

  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera);
  }
}
