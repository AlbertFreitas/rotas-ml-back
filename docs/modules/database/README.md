# Módulo `database`

## Objetivo
Define ciclo de vida do banco via Sequelize (models, migrations, seeds).

## Estrutura
- `src/database/index.js`: inicializa Sequelize e registra models/associações.
- `src/database/migrations/*.cjs`: criação de tabelas e índices.
- `src/database/seeders/*.cjs`: dados iniciais (admin e demo).

## Tabelas principais
- `admins`
- `users`
- `vehicles`
- `delivery_routes`

## Comandos
- `npm run db:migrate`
- `npm run db:migrate:undo`
- `npm run db:seed`
- `npm run db:seed:undo`
