/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "../modules/singleton.mjs";

/**
 *
 * @export
 * @class Keyboard
 * Controla as teclas premidas no teclado e as suas funcionalidades
 */
export default class Keyboard {
  constructor() {
    this.canPress = {}; // estrutura para armazenar teclas premidas e remover quando são soltas

    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.camera = this.singleton.camera;

    this.mouse = this.singleton.mouse;
    this.pointer = this.mouse.pointer;
    this.raycaster = new THREE.Raycaster();
    this.information = this.singleton.information;

    // evento para quando a tecla é solta
    document.body.addEventListener(
      "keyup",
      (e) => delete this.canPress[e.code]
    );

    // evento para quando a tecla é premida
    document.body.addEventListener("keydown", (e) =>
      this.getTilePosition(e.code)
    );
  }

  getTilePosition(key) {
    // se for backspace dá reset à grid
    if (key === "Backspace" || this.canPress[key]) {
      this.canPress[key] = true;
      this.singleton.grid.reset(true);
      return;
    }

    // se nao for X então evitamos de dar cast ao raycaster
    if (key !== "KeyX" || this.canPress[key]) {
      return;
    }
    // "dispara" um raio entre a posição da camera relativa ao ponteiro do rato
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    // obtém os objectos interceptados
    const intersects = this.raycaster.intersectObjects(this.scene.children);
    const { grid } = this.singleton;

    const { x, y } = intersects[0].point;
    const tile = grid.getTile({
      x: Math.round(x), // math.round porque queremos obter o inteiro
      y: Math.round(y),
    });
    grid.selectTile(tile); // seleciona o tile

    // dá update à informação
    this.information.updateData({
      lastClicked: `(${Math.round(x)}, ${Math.round(y)})`,
    });
    this.canPress[key] = true;
  }
}
