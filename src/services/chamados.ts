import type { StatusChamado } from "../types.js";

export interface ChamadoDados {
  readonly id: string;
  readonly titulo: string;
  status: StatusChamado;
}

export function definirStatus(chamado: ChamadoDados, status: StatusChamado): ChamadoDados {
  chamado.status = status;
  return chamado;
}

export function ehStatusChamado(valor: unknown): valor is StatusChamado {
  return valor === "ABERTO" || valor === "EM_ATENDIMENTO" || valor === "FINALIZADO";
}

export function atualizarStatus(chamado: ChamadoDados, valor: unknown): boolean {
  if (!ehStatusChamado(valor)) return false;
  definirStatus(chamado, valor);
  return true;
}
