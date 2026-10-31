import type { DadosEstudanteEntrada, Estudante, ResultadoValidacao } from "../types.js";

const estudantes: Estudante[] = [];

export function validarEstudante(entrada: DadosEstudanteEntrada): ResultadoValidacao {
  const erros: string[] = [];
  const nome: unknown = entrada.nome;
  const matricula: unknown = entrada.matricula;

  if (typeof nome !== "string" || nome.trim().length === 0) erros.push("Nome é obrigatório e deve ser texto.");
  if (typeof matricula !== "string" || !/^\d{7}$/.test(matricula.trim())) {
    erros.push("Matrícula é obrigatória e deve conter exatamente 7 dígitos.");
  }

  if (erros.length > 0 || typeof nome !== "string" || typeof matricula !== "string") {
    return { valido: false, erros };
  }

  return {
    valido: true,
    erros,
    estudante: { nome: nome.trim(), matricula: matricula.trim(), curso: "Não informado", ativo: true },
  };
}

export function cadastrarEstudante(estudante: Estudante): Estudante | null {
  if (estudantes.some((item) => item.matricula === estudante.matricula)) return null;
  const novoEstudante: Estudante = { ...estudante };
  estudantes.push(novoEstudante);
  return novoEstudante;
}

export function buscarEstudante(matricula: string): Estudante | null {
  return estudantes.find((estudante) => estudante.matricula === matricula) ?? null;
}

export function calcularMedia(notas: readonly number[]): number | null {
  if (notas.length === 0) return null;
  return notas.reduce((soma, nota) => soma + nota, 0) / notas.length;
}

export function listarEstudantes(): Estudante[] {
  return estudantes.map((estudante) => ({ ...estudante }));
}
