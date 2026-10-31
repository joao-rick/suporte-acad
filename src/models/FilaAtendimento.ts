import type { Chamado } from "./Chamado.js";

export class FilaAtendimento {
  #chamados: Chamado[] = [];

  adicionar(chamado: Chamado): number {
    if (!chamado || typeof chamado.resumo !== "function") throw new TypeError("A fila aceita apenas chamados.");
    this.#chamados.push(chamado);
    return this.#chamados.length;
  }

  retirarProximo(): Chamado | null { return this.#chamados.shift() ?? null; }
  tamanho(): number { return this.#chamados.length; }

  relatorio(): Array<{ posicao: number } & ReturnType<Chamado["resumo"]>> {
    return this.#chamados.map((chamado, posicao) => ({ posicao: posicao + 1, ...chamado.resumo() }));
  }

  resumo(): { tamanho: number; chamados: ReturnType<FilaAtendimento["relatorio"]> } { return { tamanho: this.tamanho(), chamados: this.relatorio() }; }
}
