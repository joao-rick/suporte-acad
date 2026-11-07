import type { Stack } from "./Stack.js";

/** Array push/pop/peek têm custo O(1) amortizado. */
export class ArrayStack<T> implements Stack<T> {
  #items: T[] = [];
  push(valor: T): void { this.#items.push(valor); }
  pop(): T | undefined { return this.#items.pop(); }
  peek(): T | undefined { return this.#items[this.#items.length - 1]; }
  isEmpty(): boolean { return this.#items.length === 0; }
  size(): number { return this.#items.length; }
}
