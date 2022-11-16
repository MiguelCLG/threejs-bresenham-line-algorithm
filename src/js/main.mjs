/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import { lineMP } from "/lineMP.mjs";
import Initialize from "./modules/init.mjs";

function TestLineAlgorithm() {
  let P = { x: 0, y: 0 };
  let Q = { x: 3, y: 1 };
  let R = lineMP(P, Q);
  console.log(R);
}

Initialize();