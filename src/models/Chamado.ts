const ESTADOS = Object.freeze({ ABERTO: "ABERTO", EM_ATENDIMENTO: "EM_ATENDIMENTO", FINALIZADO: "FINALIZADO" });
import type { StatusChamado } from "../types.js";
import type { Estudante } from "./Estudante.js";

export class Chamado {
  #status: StatusChamado = ESTADOS.ABERTO;
  #responsavel: string | null = null;
  readonly id: string | number;
  readonly titulo: string;
  readonly solicitante: Estudante;

  constructor(id: string | number, titulo: string, solicitante: Estudante) {
    if (id === undefined || id === null || String(id).trim() === "") throw new TypeError("ID inválido.");
    if (typeof titulo !== "string" || !titulo.trim()) throw new TypeError("Título inválido.");
    if (!solicitante || typeof solicitante.matricula !== "string") throw new TypeError("O chamado exige um estudante solicitante.");
    this.id = id;
    this.titulo = titulo.trim();
    this.solicitante = solicitante;
  }

  get status() { return this.#status; }
  get responsavel() { return this.#responsavel; }

  iniciarAtendimento(responsavel: string): this {
    if (this.#status !== ESTADOS.ABERTO) throw new Error("Somente chamados abertos podem iniciar atendimento.");
    if (typeof responsavel !== "string" || !responsavel.trim()) throw new TypeError("Informe o responsável pelo atendimento.");
    this.#responsavel = responsavel.trim();
    this.#status = ESTADOS.EM_ATENDIMENTO;
    return this;
  }

  finalizar(): this {
    if (this.#status !== ESTADOS.EM_ATENDIMENTO) throw new Error("Somente chamados em atendimento podem ser finalizados.");
    this.#status = ESTADOS.FINALIZADO;
    return this;
  }

  resumo(): { id: string | number; titulo: string; solicitante: { matricula: string; nome: string }; responsavel: string | null; status: StatusChamado } {
    return {
      id: this.id,
      titulo: this.titulo,
      solicitante: { matricula: this.solicitante.matricula, nome: this.solicitante.nome },
      responsavel: this.#responsavel,
      status: this.#status,
    };
  }
}
