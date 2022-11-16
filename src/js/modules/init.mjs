/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import Singleton from "./singleton.mjs";

function Initialize() {
  const canvas = document.querySelector(".main-canvas");
  const mainApp = new Singleton(canvas);
}

export default Initialize;