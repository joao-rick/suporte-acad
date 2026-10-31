export type Estudante = {
  readonly matricula: string;
  nome: string;
  curso: string;
  ativo: boolean;
};

export type StatusChamado = "ABERTO" | "EM_ATENDIMENTO" | "FINALIZADO";

export interface DadosEstudanteEntrada {
  readonly nome?: unknown;
  readonly matricula?: unknown;
}

export interface ResultadoValidacao {
  readonly valido: boolean;
  readonly erros: string[];
  readonly estudante?: Estudante;
}

export interface ResumoEstudante {
  readonly matricula: string;
  readonly nome: string;
  readonly curso: string;
  readonly notas: readonly number[];
  readonly media: number | null;
  readonly situacao: "SEM_NOTAS" | "APROVADO" | "EM_RECUPERACAO";
}
