import { VinculoNaTurma } from "./VinculoNaTurma.js";

export class Turma {
  #vinculos: VinculoNaTurma[] = [];
  readonly codigo: string;
  readonly componenteCurricular: string;

  constructor(codigo: string, componenteCurricular: string) {
    if (typeof codigo !== "string" || !codigo.trim()) throw new TypeError("Código da turma inválido.");
    if (typeof componenteCurricular !== "string" || !componenteCurricular.trim()) throw new TypeError("Componente curricular inválido.");
    this.codigo = codigo.trim();
    this.componenteCurricular = componenteCurricular.trim();
  }

  matricular(estudante: import("./Estudante.js").Estudante, dataEntrada: Date | string = new Date()): ReturnType<VinculoNaTurma["resumo"]> {
    if (this.#vinculos.some((vinculo) => vinculo.matricula === estudante?.matricula)) {
      throw new Error(`A matrícula ${estudante.matricula} já está nesta turma.`);
    }
    const vinculo = new VinculoNaTurma(estudante, dataEntrada);
    this.#vinculos.push(vinculo);
    return vinculo.resumo();
  }

  atualizarFrequencia(matricula: string, percentual: number): void {
    const vinculo = this.#vinculos.find((item) => item.matricula === matricula);
    if (!vinculo) throw new Error(`Matrícula ${matricula} não encontrada nesta turma.`);
    vinculo.atualizarFrequencia(percentual);
  }

  listarMatriculados(): Array<ReturnType<VinculoNaTurma["resumo"]>> { return this.#vinculos.map((vinculo) => vinculo.resumo()); }

  resumo() {
    return {
      codigo: this.codigo,
      componenteCurricular: this.componenteCurricular,
      totalMatriculados: this.#vinculos.length,
      matriculados: this.listarMatriculados(),
    };
  }
}
