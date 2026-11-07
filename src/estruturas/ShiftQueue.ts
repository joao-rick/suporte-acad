import type { Queue } from "./Queue.js";

/** Demonstração simples: shift reindexa os elementos e custa O(n) por dequeue. */
export class ShiftQueue<T> implements Queue<T> {
  #items: T[] = [];
  enqueue(valor: T): void { this.#items.push(valor); }
  dequeue(): T | undefined { return this.#items.shift(); }
  front(): T | undefined { return this.#items[0]; }
  isEmpty(): boolean { return this.#items.length === 0; }
  size(): number { return this.#items.length; }
}
