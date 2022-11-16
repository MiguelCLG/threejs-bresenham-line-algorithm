/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "../modules/singleton.mjs";

export default class Keyboard {
  constructor() {
    this.canPress = {};

    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.camera = this.singleton.camera;

    this.mouse = this.singleton.mouse;
    this.pointer = this.mouse.pointer;
    this.raycaster = new THREE.Raycaster();
    this.information = this.singleton.information;

    document.body.addEventListener(
      "keyup",
      (e) => delete this.canPress[e.code]
    );
    document.body.addEventListener("keydown", (e) =>
      this.getTilePosition(e.code)
    );
  }

  getTilePosition(key) {
    if (key === "Backspace") {this.singleton.grid.reset(true); return;}
    if (key !== "KeyX" || this.canPress[key]) {
      return;
    }
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);
    const { grid } = this.singleton;

    // intersects[i].object.material.color.set(0xff0000);
    const { x, y } = intersects[0].point;
    // console.log(`x: ${Math.round(x)} y: ${Math.round(y)}`);
    const tile = grid.getTile({
      x: Math.round(x),
      y: Math.round(y),
    });
    grid.selectTile(tile);
    this.information.updateData({
      lastClicked: `(${Math.round(x)}, ${Math.round(y)})`
    })
    this.canPress[key] = true;
  }

  update() {}
}
