import type { Chamado } from "../models/Chamado.js";
import { IndexQueue } from "../estruturas/IndexQueue.js";

/** Fila FIFO tipada de chamados; enqueue/dequeue O(1) amortizado. */
export class FilaChamados {
  #fila = new IndexQueue<Chamado>();
  adicionar(chamado: Chamado): number { this.#fila.enqueue(chamado); return this.#fila.size(); }
  retirarProximo(): Chamado | undefined { return this.#fila.dequeue(); }
  proximo(): Chamado | undefined { return this.#fila.front(); }
  tamanho(): number { return this.#fila.size(); }
  estaVazia(): boolean { return this.#fila.isEmpty(); }
}
