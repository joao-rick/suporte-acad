import type { Queue } from "./Queue.js";

/** Enfileirar/desenfileirar O(1) amortizado; limpa índices ao esvaziar. */
export class IndexQueue<T> implements Queue<T> {
  #items: Array<T | undefined> = [];
  #inicio = 0;
  #fim = 0;

  enqueue(valor: T): void { this.#items[this.#fim++] = valor; }
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const valor = this.#items[this.#inicio];
    this.#items[this.#inicio++] = undefined;
    if (this.#inicio === this.#fim) { this.#items = []; this.#inicio = 0; this.#fim = 0; }
    return valor;
  }
  front(): T | undefined { return this.#items[this.#inicio]; }
  toArray(): T[] { return this.#items.slice(this.#inicio, this.#fim) as T[]; }
  isEmpty(): boolean { return this.#inicio === this.#fim; }
  size(): number { return this.#fim - this.#inicio; }
}
