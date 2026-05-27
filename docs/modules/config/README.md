# Módulo `config`

## Objetivo
Centraliza variáveis de ambiente e configurações de infraestrutura.

## Arquivos
- `src/config/env.js`: leitura e normalização do `.env`.
- `src/config/database.js`: configuração principal do Sequelize em runtime.
- `src/config/sequelize-cli.cjs`: configuração para migrations/seeders do `sequelize-cli`.
- `src/config/firebase.js`: inicialização do Firebase Admin e parser de chave (JSON/base64).

## Pontos importantes
- Em produção/Neon, SSL fica habilitado em `database.js` e `sequelize-cli.cjs`.
- `FIREBASE_SERVICE_ACCOUNT_JSON` aceita JSON puro ou base64.
