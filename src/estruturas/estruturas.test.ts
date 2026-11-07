import test from "node:test";
import assert from "node:assert/strict";
import { ArrayStack } from "./ArrayStack.js";
import { ShiftQueue } from "./ShiftQueue.js";
import { IndexQueue } from "./IndexQueue.js";
import { HistoricoFormulario } from "../aplicacoes/historicoFormulario.js";

test("pilha vazia e operações LIFO", () => {
  const pilha = new ArrayStack<string>();
  assert.equal(pilha.pop(), undefined);
  assert.equal(pilha.peek(), undefined);
  assert.equal(pilha.isEmpty(), true);
  pilha.push("primeiro"); pilha.push("segundo");
  assert.equal(pilha.peek(), "segundo");
  assert.equal(pilha.pop(), "segundo");
  assert.equal(pilha.size(), 1);
});

test("filas vazias e operações FIFO", () => {
  for (const fila of [new ShiftQueue<number>(), new IndexQueue<number>()]) {
    assert.equal(fila.dequeue(), undefined);
    assert.equal(fila.front(), undefined);
    assert.equal(fila.isEmpty(), true);
    fila.enqueue(10); fila.enqueue(20);
    assert.equal(fila.front(), 10);
    assert.equal(fila.dequeue(), 10);
    assert.equal(fila.dequeue(), 20);
    assert.equal(fila.dequeue(), undefined);
  }
});

test("ambas as filas mantêm a ordem em centenas de operações", () => {
  for (const fila of [new ShiftQueue<number>(), new IndexQueue<number>()]) {
    for (let i = 0; i < 500; i++) fila.enqueue(i);
    assert.equal(fila.size(), 500);
    for (let i = 0; i < 500; i++) assert.equal(fila.dequeue(), i);
    assert.equal(fila.size(), 0);
    for (let i = 500; i < 750; i++) fila.enqueue(i);
    for (let i = 500; i < 750; i++) assert.equal(fila.dequeue(), i);
    assert.equal(fila.isEmpty(), true);
  }
});

test("histórico de formulário desfaz as alterações mais recentes", () => {
  const historico = new HistoricoFormulario({ nome: "Ana", ativo: true });
  historico.alterar("nome", "Ana Souza");
  historico.alterar("ativo", false);
  historico.desfazer();
  assert.equal(historico.formulario.ativo, true);
  historico.desfazer();
  assert.equal(historico.formulario.nome, "Ana");
  assert.equal(historico.desfazer(), undefined);
});
