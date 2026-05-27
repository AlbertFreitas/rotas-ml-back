# Módulo `app-server`

## Objetivo
Responsável por montar e iniciar a aplicação Express.

## Arquivos
- `src/app.js`: configura middlewares globais (JSON, CORS, request id), registra rotas e tratamento de erros.
- `src/server.js`: autentica conexão com o banco e inicia o servidor HTTP.

## Responsabilidades
- Garantir ordem correta dos middlewares.
- Não carregar regra de negócio (isso fica em controllers/services).
- Expor endpoint de saúde via rotas.
