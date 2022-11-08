import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

function CreatePlane(scene, size, color = 0xFFFFFF)
{
    console.log(size);
    const planeGeometry = new THREE.PlaneGeometry(size.x, size.y);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
}

function CreateBox(scene, color = 0xFF7700)
{
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: color});
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);
}

function CreateTile(x, y, tileSize, cor) {
    let tileGeometry = new THREE.BoxGeometry(tileSize, tileSize, 0);
    let tileMaterial = new THREE.MeshBasicMaterial({ color: cor, side: THREE.DoubleSide });

    let tile = new THREE.Mesh(tileGeometry, tileMaterial);
    tile.position.x = x;
    tile.position.y = y;
    tile.position.z = 0;
    return tile;
}

function CreateGrid(size, cor1, cor2) {
    const tiles = [];
    for (let x = -size; x <= size; x ++) {
        for (let y = -size; y <= size; y++){
            // queremos cores diferentes para cada bloco alternado, então verificamos os pares e construímos o tile de acordo com o resultado
            if ((x % 2 === 0 && y % 2 === 0) ||(x%2 !== 0 && y%2 !== 0))
                tiles.push(new CreateTile(x, y, 1, cor1));
            else
                tiles.push(new CreateTile(x, y, 1, cor2));
        }
    }
    return tiles;
}
export { CreatePlane, CreateBox, CreateGrid };