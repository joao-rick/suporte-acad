export class FilaAtendimento {
  #chamados = [];

  adicionar(chamado) {
    if (!chamado || typeof chamado.resumo !== "function") throw new TypeError("A fila aceita apenas chamados.");
    this.#chamados.push(chamado);
    return this.#chamados.length;
  }

  retirarProximo() { return this.#chamados.shift() ?? null; }
  tamanho() { return this.#chamados.length; }

  relatorio() {
    return this.#chamados.map((chamado, posicao) => ({ posicao: posicao + 1, ...chamado.resumo() }));
  }

  resumo() { return { tamanho: this.tamanho(), chamados: this.relatorio() }; }
}
