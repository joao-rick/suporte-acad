import { ArrayStack } from "../estruturas/ArrayStack.js";
import type { AlteracaoCampo } from "../dominio/AlteracaoCampo.js";

/** Guarda alterações LIFO e permite restaurar o valor anterior de um campo. */
export class HistoricoFormulario<T extends Record<string, unknown>> {
  #alteracoes = new ArrayStack<AlteracaoCampo>();
  constructor(readonly formulario: T) {}

  alterar<K extends keyof T & string>(campo: K, valor: T[K]): void {
    const valorAnterior = this.formulario[campo];
    this.formulario[campo] = valor;
    this.#alteracoes.push({ campo, valorAnterior, valorAtual: valor });
  }

  desfazer(): AlteracaoCampo | undefined {
    const alteracao = this.#alteracoes.pop();
    if (alteracao) (this.formulario as Record<string, unknown>)[alteracao.campo] = alteracao.valorAnterior;
    return alteracao;
  }
  tamanhoHistorico(): number { return this.#alteracoes.size(); }
}
