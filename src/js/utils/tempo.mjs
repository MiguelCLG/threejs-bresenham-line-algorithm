/*
    efolioA - Algoritmo do Ponto Médio  
    Miguel Gonçalves 1901337 - 18/11/2022
*/

import { EventEmitter } from "https://unpkg.com/@dekkai/event-emitter";
/**
 * @class Tempo
 * Esta class vai armazenar o tempo elapsed, vai permitir que tenhamos apenas um requestAnimationFrame().
 * @extends {EventEmitter} class do node que nos permite emitir eventos, por sua vez,
 * permite escutar estes eventos noutra class para dar trigger a funcionalidades específicas.
 *
 */
export default class Tempo extends EventEmitter {
  constructor() {
    super();
    this.startTime = Date.now();
    this.current = this.startTime;
    this.elapsedTime = 0;
    this.deltaTime = 16;

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.deltaTime = currentTime - this.current;
    this.current = currentTime;
    this.elapsedTime = this.current - this.startTime;

    this.emit("update"); // emissão do update, todos os components que estejam à escuta deste emit vão fazer update (neste caso será o singleton)
    window.requestAnimationFrame(() => this.update());
  }
}
