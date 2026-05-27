# Módulo `middlewares`

## Objetivo
Intercepta requisições para autenticação, validação e tratamento de erros.

## Arquivos
- `authMiddleware.js`: valida JWT e regra de perfil (`role`).
- `validate.js`: valida `body/query` com Yup.
- `errorMiddleware.js`: converte erros de validação, domínio e falhas internas em respostas padronizadas.

## Fluxo típico
1. Validação de payload.
2. Autenticação/autorização.
3. Controller.
4. Error middleware (se necessário).
