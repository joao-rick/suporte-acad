import { ShiftQueue } from "../estruturas/ShiftQueue.js";
import { IndexQueue } from "../estruturas/IndexQueue.js";
import process from "node:process";

/** Comparação demonstrativa; os tempos dependem do ambiente e do volume. */
export function compararFilas(quantidade = 100_000): void {
  const shift = new ShiftQueue<number>();
  const index = new IndexQueue<number>();
  console.time(`ShiftQueue (${quantidade})`);
  for (let i = 0; i < quantidade; i++) shift.enqueue(i);
  while (!shift.isEmpty()) shift.dequeue();
  console.timeEnd(`ShiftQueue (${quantidade})`);
  console.time(`IndexQueue (${quantidade})`);
  for (let i = 0; i < quantidade; i++) index.enqueue(i);
  while (!index.isEmpty()) index.dequeue();
  console.timeEnd(`IndexQueue (${quantidade})`);
}

if (process.argv[1]?.replace(/\\/g, "/").endsWith("/comparacaoFilas.ts")) compararFilas();
