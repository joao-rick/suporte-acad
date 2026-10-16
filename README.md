# Suporte acadêmico OO

Exemplo de sistema de suporte acadêmico em JavaScript com Node.js e módulos ECMAScript. O projeto demonstra encapsulamento com campos privados, associação entre chamado e estudante, composição dos vínculos dentro da turma e atendimento FIFO.

## Executar

Requer Node.js com suporte a módulos ESM.

```sh
npm start
```

`Estudante` mantém notas privadas e retorna cópias. `Turma` cria e mantém vínculos privados, impedindo matrícula repetida. `Chamado` só permite as transições `ABERTO → EM_ATENDIMENTO → FINALIZADO`. `FilaAtendimento` não expõe sua coleção e retorna `null` quando vazia.
