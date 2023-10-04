# IGNITE - DESAFIO: 01 - TRILHA: Node.js

# Inicialização do projeto

- Para iniciar o projeto basta rodar o comando abaixo no terminal:
  `yarn dev`

- Para testar a inserção de tasks via CSV, basta executar o comando: `node csv/csv-handle.js`

## Tarefas Realizadas

- [x] - Criação de task em um in memory database;
- [x] - Listagem de todas as tasks;
- [x] - Atualização de uma task pelo id;
- [x] - Remover uma task pelo id;
- [x] - Marcar pelo id uma task como completa;
- [x] - Inserção de tasks no database através de um arquivo CSV.

## Rotas

- POST - /tasks
  - Cria uma task.
- GET - /tasks
  - Lista todas as taks.
- PUT - /tasks/:id
  - Edita uma task.
- PATCH - /tasks/:id/complete
  - Altera o status da task (data em que foi completada ou null).
- DELETE - /tasks/:id
  - Deleta uma taks.
