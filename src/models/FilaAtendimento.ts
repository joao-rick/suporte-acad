import type { Chamado } from "./Chamado.js";
import { IndexQueue } from "../estruturas/IndexQueue.js";

export class FilaAtendimento {
  #chamados = new IndexQueue<Chamado>();

  adicionar(chamado: Chamado): number {
    if (!chamado || typeof chamado.resumo !== "function") throw new TypeError("A fila aceita apenas chamados.");
    this.#chamados.enqueue(chamado);
    return this.#chamados.size();
  }

  retirarProximo(): Chamado | null { return this.#chamados.dequeue() ?? null; }
  tamanho(): number { return this.#chamados.size(); }

  relatorio(): Array<{ posicao: number } & ReturnType<Chamado["resumo"]>> {
    return this.#chamados.toArray().map((chamado, posicao) => ({ posicao: posicao + 1, ...chamado.resumo() }));
  }

  resumo(): { tamanho: number; chamados: ReturnType<FilaAtendimento["relatorio"]> } { return { tamanho: this.tamanho(), chamados: this.relatorio() }; }
}
