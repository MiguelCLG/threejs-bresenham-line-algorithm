import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "./singleton.mjs";

class GridTile {
  constructor(size, position, color) {
    this.size = size;
    this.position = position;
    this.color = color;
    this.tile = this.createTile(
      this.position.x,
      this.position.y,
      this.size,
      this.color
    );
  }

  createTile(x, y, tileSize, cor) {
    let tileGeometry = new THREE.BoxGeometry(tileSize, tileSize, 0);
    let tileMaterial = new THREE.MeshBasicMaterial({
      color: cor,
      side: THREE.DoubleSide,
    });

    let tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.position.x = x;
    tile.position.y = y;
    tile.position.z = 0;
    return tile;
  }
}

export default class Grid {
  tileColor1 = 0xef9a70; //jshint ignore:line
  tileColor2 = 0x9a92bf;
  size = 10;

  constructor() {
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.reset();
  }

  createGrid(size, cor1, cor2) {
    const tiles = [];
    for (let x = -size; x <= size; x++) {
      for (let y = -size; y <= size; y++) {
        // queremos cores diferentes para cada bloco alternado, então verificamos os pares e construímos o tile de acordo com o resultado
        if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0))
          tiles.push(new GridTile(1, { x, y }, cor1));
        else tiles.push(new GridTile(1, { x, y }, cor2));
      }
    }
    return tiles;
  }

  reset() {
    this.tiles = this.createGrid(this.size, this.tileColor1, this.tileColor2);
    this.tiles.forEach(({ tile }) => {
      this.scene.add(tile);
    });
  }
  resize() {}
  update() {}
}
