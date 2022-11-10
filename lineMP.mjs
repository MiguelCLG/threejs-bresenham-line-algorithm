/**
 *
 * @param {{x: int; y: int;}} p - ponto inicial
 * @param {{x: int; y: int;}} q - ponto final
 * @return todos os pixeis para rasterizar
 */
function lineMP(p, q) {
  // x e y começam no ponto inicial e calculamos as suas distancias

  let x = p.x;
  let y = p.y;
  const dx = q.x - p.x;
  const dy = q.y - p.y;
  let point = 2 * dy - dx;

  // array inicial para os pixeis a rasterizar
  let allPoints = [];

  while (x <= q.x) {
    // add pixel
    allPoints.push({ x: x, y: y });
    x++;
    if (point < 0) point = point + 2 * dy;
    else {
      point = point + 2 * dy - 2 * dx;
      y++;
    }
  }

  return allPoints;
}

export { lineMP };
