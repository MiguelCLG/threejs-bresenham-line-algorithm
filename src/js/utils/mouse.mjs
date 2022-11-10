import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
import Singleton from "../modules/singleton.mjs";

/*global window, document */
export default class Mouse extends EventEmitter {
  constructor() {
    super();
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.camera = this.singleton.camera;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    document.body.addEventListener("pointermove", (e) => this.onPointerMove(e));
    window.addEventListener("keypress", (e) =>
      this.getTilePosition(e.key.toUpperCase())
    );
  }

  onPointerMove(evento) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components
    this.pointer.setX((evento.clientX / window.innerWidth) * 2 - 1);
    this.pointer.setY(-(evento.clientY / window.innerHeight) * 2 + 1);
  }

  getTilePosition(key) {
    if (key !== "X") {
      return;
    }
    this.raycaster.setFromCamera(this.pointer, this.camera.perspectiveCamera);

    const intersects = this.raycaster.intersectObjects(this.scene.children);

    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
      const { x, y, z } = intersects[i].point;
      console.log(
        `x: ${Math.round(x)} y: ${Math.round(y)} z: ${Math.round(z)}`
      );
    }
  }

  update() {}
}
