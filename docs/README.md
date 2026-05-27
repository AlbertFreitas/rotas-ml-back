# Documentação do Backend

Este diretório organiza a documentação técnica do backend por módulos de pasta.

## Visão rápida
- Stack: Node.js, Express, Sequelize, PostgreSQL, Firebase Admin, JWT.
- Entrada da API: `src/server.js`.
- Composição da aplicação: `src/app.js`.
- Conexão ORM: `src/database/index.js`.

## Módulos
- [app-server](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/app-server/README.md)
- [config](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/config/README.md)
- [controllers](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/controllers/README.md)
- [database](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/database/README.md)
- [middlewares](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/middlewares/README.md)
- [models](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/models/README.md)
- [routes](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/routes/README.md)
- [services](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/services/README.md)
- [utils](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/utils/README.md)
- [validators](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/validators/README.md)

## Fluxo de autenticação
1. Frontend autentica no Firebase e envia `idToken` para `POST /auth/firebase/login`.
2. O backend valida no Firebase Admin e cria/consulta `User`.
3. O backend retorna JWT próprio para chamadas protegidas.
4. Middlewares `ensureAuth` e `ensureRole` controlam acesso.

## Segurança para produção
- Nunca versionar `.env` nem arquivos de chave privada.
- Definir `JWT_SECRET` forte no ambiente.
- Em produção com Neon, SSL é obrigatório e já está habilitado no Sequelize.

## Operação
- Health check: `GET /health`
- Migrations: `npm run db:migrate`
- Seed demo: `npm run db:seed`
