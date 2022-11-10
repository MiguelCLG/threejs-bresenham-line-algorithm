import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "./singleton.mjs";
import { lineMP } from "../../../lineMP.mjs";

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

  setTileColor(color) {
    this.color = color;
    this.tile = this.createTile(
      this.position.x,
      this.position.y,
      this.size,
      this.color
    );
  }
}

export default class Grid {
  tileColor1 = 0xef9a70; //jshint ignore:line
  tileColor2 = 0x9a92bf;
  rasterTileColor = 0xffff00;
  size = 10;

  constructor() {
    this.singleton = new Singleton();
    this.scene = this.singleton.scene;
    this.selectedTiles = [];
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

  createRasterTile(point) {
    return new GridTile(1, point, this.rasterTileColor);
  }

  getTile(position) {
    const selectedTile = this.tiles.filter(
      (tile) => tile.position.x === position.x && tile.position.y === position.y
    )[0];
    return selectedTile;
  }

  selectTile(tileObject, color = 0xff0000) {
    if (this.selectedTiles.length >= 2) {
      this.reset();
      return;
    }

    this.scene.remove(tileObject.tile);
    tileObject.setTileColor(color);
    this.scene.add(tileObject.tile);
    this.selectedTiles.push(tileObject);

    if (this.selectedTiles.length === 2) {
      const linePointVector = lineMP(
        this.selectedTiles[0].position,
        this.selectedTiles[1].position
      );

      this.drawLine(
        new THREE.Vector3(
          this.selectedTiles[0].position.x,
          this.selectedTiles[0].position.y,
          1
        ),
        new THREE.Vector3(
          this.selectedTiles[1].position.x,
          this.selectedTiles[1].position.y,
          1
        )
      );
      console.log(linePointVector);
      this.drawRaster(linePointVector);
    }
  }

  drawRaster(linePointVector) {
    linePointVector.forEach((point) => {
      this.createRasterTile(point);
    });
  }

  drawLine(p, q) {
    const points = [];
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    points.push(p);
    points.push(q);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.line = new THREE.Line(geometry, material);
    this.scene.add(this.line);
  }

  reset() {
    this.tiles = this.createGrid(this.size, this.tileColor1, this.tileColor2);
    this.tiles.forEach(({ tile }) => {
      this.scene.add(tile);
    });
    this.selectedTiles = [];
    this.scene.remove(this.line);
  }
  resize() {}
  update() {}
}
