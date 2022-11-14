/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

/**
 * Função que retorna os pontos de uma linha raster calculado pelo algoritmo do ponto médio
 * @param {{x: int; y: int;}} p - ponto inicial
 * @param {{x: int; y: int;}} q - ponto final
 * @return todos os pixeis para rasterizar
 */
function lineMP(p, q) {
    /*              
  Octantes 1 - 8 
  Temos dois algoritmos que calculam a linha dependendo da octante que estamos a tentar calcular
  calculaLinhaEixoX calcula as octantes 1, 4, 5 e 8
  calculaLinhaEixoY calcula as octantes 2, 3, 6 e 7
  
                  ^
        \         |         /
          \       |       /
            \  6  |  2  /
          5   \   |   /   1
                \ | /
        <-------------------->
                / | \
          8   /   |   \   4
            /  7  |  3  \
          /       |       \
        /         |         \

*/

  if (p === q) return [p]; // se os pontos forem iguais, então apenas retorna o primeiro ponto e nao faz cálculos

  let { x: x0, y: y0 } = p;
  let { x: x1, y: y1 } = q;

  // distancia entre os pontos X
  let dx = Math.abs(x1 - x0);

  // distancia entre os pontos Y
  let dy = Math.abs(y1 - y0);

  
  if (dy < dx)
  {
      if(x0 > x1)
          return calculoLinhaEixoX(q, p);
      else
          return calculoLinhaEixoX(p, q)
  }
  else 
  {
      if(y0 > y1)
          return calculoLinhaEixoY(q, p);
      else
          return calculoLinhaEixoY(p, q)
  }
}

/**
 * Esta função é chamada quando o dx (distancia entre os dois pontos X) 
 * é maior ou igual a dy (distancia entre os dois pontos Y)
 */
function calculoLinhaEixoX(pointA, pointB) {  
  // array inicial para os pixeis a rasterizar
  let allPoints = [];

  // x e y começam no ponto inicial e calculamos as suas distancias
  let x = pointA.x;
  let y = pointA.y;

  // distancia entre os pontos x e y
  let dx = pointB.x - pointA.x;
  let dy = pointB.y - pointA.y;

  /**  direção entre os pontos, 
   * se a distancia Y for maior que 0 então é positivo (y incrementa e calcula octantes 1 e 8), 
   * senão é negativo (y decrementa e calcula octantes 4 e 5)
   * usado para calculo de simetrias
   */
  let directionY = 1;
  if (dy < 0)
  {
      directionY = -1;
      dy = -dy;
  }

  let point = 2 * dy - dx;

  while (x <= pointB.x) {
    // adiciona pixel
    allPoints.push({ x: x, y: y });
    x++;
    /** 
    * Se o ponto for negativo ou neutro
    * Então recalculamos o novo ponto em torno do eixo dos X (incluindo a sua simetria)
    * Senão incrementamos o Y e calculamos os pontos correspondendo às octantes 1, 4, 5, 8
    */
    if (point <= 0)
    {
      point = point + 2 * dy;
    }
    else {
      y += directionY;
      point = point + 2 * (dy - dx);
    }
  }

  return allPoints;
}

function calculoLinhaEixoY(pointA, pointB) {
  // x e y começam no ponto inicial e calculamos as suas distancias
  
  let x = pointA.x;
  let y = pointA.y;
  let dx = pointB.x - pointA.x;
  let dy = pointB.y - pointA.y;
  // array inicial para os pixeis a rasterizar
  let allPoints = [];
  let directionX = 1;
  if (dx < 0)
  {
      directionX = -1;
      dx = -dx;
  }
    
  let point = 2 * dx - dy;
  while (y <= pointB.y) {
    // add pixel
    allPoints.push({ x, y });
    y++;
      if (point <= 0) {
        point = point + 2 * dx;
      }
      else {
        point = point + 2 * (dx - dy);
        x += directionX;
    }
  }

  return allPoints;
}

export { lineMP };