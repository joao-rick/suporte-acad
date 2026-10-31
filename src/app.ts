import { Estudante } from "./models/Estudante.js";
import { Turma } from "./models/Turma.js";
import { Chamado } from "./models/Chamado.js";
import { FilaAtendimento } from "./models/FilaAtendimento.js";
import { cadastrarEstudante, validarEstudante } from "./services/estudantes.js";

const estudante1 = new Estudante("2026001", "Ana Souza", "Sistemas de Informação");
const estudante2 = new Estudante("2026002", "Bruno Lima", "Ciência da Computação");
estudante1.adicionarNota(8.5).adicionarNota(9);
estudante2.adicionarNota(6.5).adicionarNota(7.5);
console.log("Estudantes:", estudante1.resumo(), estudante2.resumo());

const turma = new Turma("SI-101", "Programação Orientada a Objetos");
turma.matricular(estudante1, "2026-02-10T12:00:00.000Z");
turma.matricular(estudante2, "2026-02-11T12:00:00.000Z");
turma.atualizarFrequencia(estudante1.matricula, 95);
turma.atualizarFrequencia(estudante2.matricula, 88);
console.log("Turma:", turma.resumo());

const chamado1 = new Chamado("C-001", "Acesso ao ambiente virtual", estudante1);
const chamado2 = new Chamado("C-002", "Dúvida sobre matrícula", estudante2);
const fila = new FilaAtendimento();
fila.adicionar(chamado1);
fila.adicionar(chamado2);
console.log("Fila antes do atendimento:", fila.resumo());

const proximo = fila.retirarProximo();
if (proximo) {
  console.log("Próximo chamado (FIFO):", proximo.resumo());
  proximo.iniciarAtendimento("Técnico Marcos").finalizar();
  console.log("Chamado finalizado:", proximo.resumo());
}
console.log("Fila restante:", fila.resumo());
console.log("Fila vazia retorna:", new FilaAtendimento().retirarProximo());

const validacao = validarEstudante({ nome: "Carla Mendes", matricula: "2026003" });
if (validacao.valido && validacao.estudante) cadastrarEstudante(validacao.estudante);
