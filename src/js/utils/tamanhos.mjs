/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
/**
 * @class Tamanhos
 * Esta class vai armazenar todos os tamanhos que percisamos para a nossa aplicação.
 * @extends {EventEmitter} class do node que nos permite emitir eventos, por sua vez,
 * permite escutar estes eventos noutra class para dar trigger a funcionalidades específicas.
 *
 */
export default class Tamanhos extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.frustrum = 5;

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");
    });
  }
}
