/** Fila FIFO. dequeue/front devolvem undefined quando vazia. */
export interface Queue<T> {
  enqueue(valor: T): void;
  dequeue(): T | undefined;
  front(): T | undefined;
  isEmpty(): boolean;
  size(): number;
}
