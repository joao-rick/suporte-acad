import { configuracao } from "../config/configuracao.js";

export class Estudante {
  #matricula;
  #notas = [];

  constructor(matricula, nome, curso) {
    if (typeof matricula !== "string" || !matricula.trim()) throw new TypeError("Matrícula inválida.");
    if (typeof nome !== "string" || !nome.trim()) throw new TypeError("Nome inválido.");
    if (typeof curso !== "string" || !curso.trim()) throw new TypeError("Curso inválido.");
    this.#matricula = matricula.trim();
    this.nome = nome.trim();
    this.curso = curso.trim();
  }

  get matricula() { return this.#matricula; }

  adicionarNota(nota) {
    if (typeof nota !== "number" || !Number.isFinite(nota) || nota < configuracao.notaMinima || nota > configuracao.notaMaxima) {
      throw new RangeError(`A nota deve estar entre ${configuracao.notaMinima} e ${configuracao.notaMaxima}.`);
    }
    this.#notas.push(nota);
    return this;
  }

  calcularMedia() {
    if (this.#notas.length === 0) return null;
    return this.#notas.reduce((soma, nota) => soma + nota, 0) / this.#notas.length;
  }

  listarNotas() { return [...this.#notas]; }

  resumo() {
    const media = this.calcularMedia();
    return {
      matricula: this.#matricula,
      nome: this.nome,
      curso: this.curso,
      notas: this.listarNotas(),
      media,
      situacao: media === null ? "SEM_NOTAS" : media >= configuracao.mediaMinima ? "APROVADO" : "EM_RECUPERACAO",
    };
  }
}
