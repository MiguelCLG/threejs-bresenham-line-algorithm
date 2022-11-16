import * as THREE from "https://unpkg.com/three@0.124.0/build/three.module.js";
import Singleton from "./singleton.mjs";
import { lineMP } from "../../../lineMP.mjs";
import GridTile from "./gridTile.mjs";
import RasterTile from "./rasterTile.mjs";

export default class Grid {
  tileColor1 = 0xef9a70; //jshint ignore:line
  tileColor2 = 0x9a92bf;
  rasterTileColor = 0xffff00;

  constructor(size = 10) {
    this.singleton = new Singleton();
    this.size = size;
    this.scene = this.singleton.scene;
    this.information = this.singleton.information;
    this.selectedTiles = [];
    this.rasterizedTiles = [];
    this.reset();

    const botaoAlterar = document.getElementById('change-grid-btn');  
    botaoAlterar.addEventListener('click', () =>
      this.changeGridSize(document.getElementById('size-input').value)
    );
  }

  createGrid(size, cor1, cor2) {
    const tiles = [];
    for (let x = -size; x <= size; x++) {
      for (let y = -size; y <= size; y++) {
        // queremos cores diferentes para cada bloco alternado, então verificamos os pares e construímos o tile de acordo com o resultado
        if ((x % 2 === 0 && y % 2 === 0) || (x % 2 !== 0 && y % 2 !== 0))
          tiles.push(new GridTile(1, { x, y, z: 0 }, cor1));
        else tiles.push(new GridTile(1, { x, y, z: 0 }, cor2));
      }
    }
    return tiles;
  }

  createRasterTile(point) {
    return new RasterTile(
      1,
      { x: point.x, y: point.y, z: 0.25 },
      this.rasterTileColor
    );
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
      this.information.updateData({
        lastCalculation: 'N/A',
        selectedTiles: 'N/A',
        lastClicked: 'N/A'
      })
      return;
    }

    this.scene.remove(tileObject.tile);
    tileObject.setTileColor(color);
    this.scene.add(tileObject.tile);
    this.selectedTiles.push(tileObject);

    if (this.selectedTiles.length === 2) {
      // corre o algoritmo do ponto medio
      const linePointVector = lineMP(
        this.selectedTiles[0].position,
        this.selectedTiles[1].position
      );

      // desenha a linha direta de um ponto ao outro
      this.drawLine(
        new THREE.Vector3(
          this.selectedTiles[0].position.x,
          this.selectedTiles[0].position.y,
          0.1
        ),
        new THREE.Vector3(
          this.selectedTiles[1].position.x,
          this.selectedTiles[1].position.y,
          0.1
        )
      );

      // constroi os tiles de acordo com o algoritmo
      this.drawRaster(linePointVector);

      // atualiza o painel de informação
      let displayInfo = '';
      linePointVector.forEach(({ x, y }, index) =>
        displayInfo += `\n${index+1}: (${x}, ${y})` 
      );    
      let displaySelectedTiles = '';
      this.selectedTiles.forEach(({ position }, index) =>
          displaySelectedTiles += `\n${index + 1 === 1 ? 'PointA: ' : 'PointB: '}(${position.x}, ${position.y})` 
        );
      this.information.updateData({
        lastCalculation: displayInfo,
        selectedTiles: displaySelectedTiles
      });
    }
  }

  drawRaster(linePointVector) {
    linePointVector.forEach((point) => {
      const pixelToRender = this.createRasterTile(point);
      this.rasterizedTiles.push(pixelToRender.tile);
      this.scene.add(pixelToRender.tile);
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

  clean(clearRasterized) {
    if(this.tiles)
      this.tiles.forEach((tile) => this.scene.remove(tile.tile));
    this.tiles = [];
    if(clearRasterized){
      this.rasterizedTiles.forEach((tile) => { this.scene.remove(tile) });
      this.rasterizedTiles = [];
    }
    this.selectedTiles = [];
    this.scene.remove(this.line);
  }
  
  reset(clearRasterized = false) {
    this.clean(clearRasterized);
    this.tiles = this.createGrid(this.size, this.tileColor1, this.tileColor2);
    this.tiles.forEach(({ tile }) => {
      this.scene.add(tile);
    });
  }

  changeGridSize(size) {
    this.size = size;
    this.reset(true);
  }

  resize() {}
  update() {}
}
