/** Pilha LIFO. pop/peek devolvem undefined quando vazia. */
export interface Stack<T> {
  push(valor: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
