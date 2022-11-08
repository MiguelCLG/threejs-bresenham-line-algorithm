import Singleton from "./singleton.mjs";
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.singleton = new Singleton();
        this.tamanhos = this.singleton.tamanhos;
        this.canvas = this.singleton.canvas;
        this.scene = this.singleton.scene;
        
        this.createPerspectiveCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            75,
            this.tamanhos.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(29, 14, 12)
    }
    
    setOrbitControls() {
        console.log(this.canvas, this.perspectiveCamera);
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }

    resize() { 
        this.perspectiveCamera.aspect = this.tamanhos.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }
    update() {}
}