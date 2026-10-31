export class VinculoNaTurma {
  #estudante;
  #dataEntrada;
  #frequencia = 0;

  constructor(estudante: import("./Estudante.js").Estudante, dataEntrada: Date | string = new Date()) {
    if (!estudante || typeof estudante.matricula !== "string") throw new TypeError("O vínculo exige um estudante válido.");
    const data = dataEntrada instanceof Date ? new Date(dataEntrada.getTime()) : new Date(dataEntrada);
    if (Number.isNaN(data.getTime())) throw new TypeError("Data de entrada inválida.");
    this.#estudante = estudante;
    this.#dataEntrada = data;
  }

  get matricula() { return this.#estudante.matricula; }

  atualizarFrequencia(percentual: number): void {
    if (typeof percentual !== "number" || !Number.isFinite(percentual) || percentual < 0 || percentual > 100) {
      throw new RangeError("A frequência deve estar entre 0 e 100%.");
    }
    this.#frequencia = percentual;
  }

  resumo() {
    return {
      matricula: this.#estudante.matricula,
      nome: this.#estudante.nome,
      dataEntrada: this.#dataEntrada.toISOString(),
      frequencia: this.#frequencia,
    };
  }
}
