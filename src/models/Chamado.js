const ESTADOS = Object.freeze({ ABERTO: "ABERTO", EM_ATENDIMENTO: "EM_ATENDIMENTO", FINALIZADO: "FINALIZADO" });

export class Chamado {
  #status = ESTADOS.ABERTO;
  #responsavel = null;

  constructor(id, titulo, solicitante) {
    if (id === undefined || id === null || String(id).trim() === "") throw new TypeError("ID inválido.");
    if (typeof titulo !== "string" || !titulo.trim()) throw new TypeError("Título inválido.");
    if (!solicitante || typeof solicitante.matricula !== "string") throw new TypeError("O chamado exige um estudante solicitante.");
    this.id = id;
    this.titulo = titulo.trim();
    this.solicitante = solicitante;
  }

  get status() { return this.#status; }
  get responsavel() { return this.#responsavel; }

  iniciarAtendimento(responsavel) {
    if (this.#status !== ESTADOS.ABERTO) throw new Error("Somente chamados abertos podem iniciar atendimento.");
    if (typeof responsavel !== "string" || !responsavel.trim()) throw new TypeError("Informe o responsável pelo atendimento.");
    this.#responsavel = responsavel.trim();
    this.#status = ESTADOS.EM_ATENDIMENTO;
    return this;
  }

  finalizar() {
    if (this.#status !== ESTADOS.EM_ATENDIMENTO) throw new Error("Somente chamados em atendimento podem ser finalizados.");
    this.#status = ESTADOS.FINALIZADO;
    return this;
  }

  resumo() {
    return {
      id: this.id,
      titulo: this.titulo,
      solicitante: { matricula: this.solicitante.matricula, nome: this.solicitante.nome },
      responsavel: this.#responsavel,
      status: this.#status,
    };
  }
}
