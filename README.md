# Suporte acadêmico tipado

Projeto de cadastro acadêmico em TypeScript estrito, com modelos de estudantes, turmas e chamados, serviços de cadastro e estruturas genéricas de dados lineares.

## Estruturas lineares

Os contratos `Stack<T>` e `Queue<T>` ficam em `src/estruturas/`. `ArrayStack<T>` implementa pilha LIFO com `push`, `pop` e `peek` em O(1) amortizado. `IndexQueue<T>` implementa fila FIFO com `enqueue` e `dequeue` em O(1) amortizado, mantendo índices de início e fim e limpando os espaços liberados. Operações de consulta de tamanho e elemento da frente também são O(1).

`ShiftQueue<T>` é uma implementação didática: `enqueue` é O(1) amortizado, mas `dequeue` usa `Array.shift()` e é O(n), pois os elementos restantes precisam ser deslocados. Ela serve para a comparação em `src/aplicacoes/comparacaoFilas.ts`; para atendimento real foi substituída por `IndexQueue<Chamado>` em `FilaAtendimento` e `FilaChamados`.

Em pilhas e filas vazias, `pop`/`peek` e `dequeue`/`front` retornam `undefined`. O histórico do formulário usa `ArrayStack<AlteracaoCampo>` para desfazer alterações em ordem LIFO.

## Executar

Requer Node.js e npm.

```sh
npm install
npm start
npm run typecheck
npm test
npm run benchmark
```

O benchmark mede uma carga padrão de 100 mil elementos com `console.time`. Os resultados variam conforme hardware e runtime; a expectativa qualitativa é que a fila por índices escale melhor durante os dequeues, enquanto `shift` move repetidamente os itens restantes.
