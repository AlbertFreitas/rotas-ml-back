# Rotas ML Backend

API backend para gestão financeira de rotas de entregadores.

## Stack
- Node.js + Express
- Sequelize + PostgreSQL
- Firebase Admin
- JWT + bcrypt
- Yup
- Docker (ambiente local)

## Documentação técnica por módulos
A documentação interna está organizada em módulos/pastas:
- [Documentação Geral](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/README.md)
- [Módulo app-server](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/app-server/README.md)
- [Módulo config](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/config/README.md)
- [Módulo controllers](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/controllers/README.md)
- [Módulo database](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/database/README.md)
- [Módulo middlewares](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/middlewares/README.md)
- [Módulo models](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/models/README.md)
- [Módulo routes](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/routes/README.md)
- [Módulo services](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/services/README.md)
- [Módulo utils](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/utils/README.md)
- [Módulo validators](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/modules/validators/README.md)

## Subir localmente

### 1) Banco local com Docker
```bash
docker compose up -d
```

### 2) Ambiente
```bash
cp .env.example .env
```

### 3) Banco
```bash
npm run db:migrate
npm run db:seed
```

### 4) API
```bash
npm run dev
```

API: `http://localhost:3333`

## Endpoints principais
### Health
- `GET /health`

### Auth
- `POST /auth/admin/login`
- `POST /auth/firebase/login`
- `POST /auth/demo/login`
- `GET /auth/me`

### Veículo
- `GET /vehicles/me`
- `PUT /vehicles/me`

### Rotas
- `POST /routes`
- `GET /routes?month=3&year=2025&status=CONCLUIDA`
- `DELETE /routes/:id`

### Dashboard
- `GET /dashboard/summary?month=3&year=2025`
- `GET /dashboard/charts?month=3&year=2025`
- `GET /dashboard/monthly-comparison`
- `GET /dashboard/analysis?month=3&year=2025`
- `GET /dashboard/statement`

## Publicação segura (repositório público)
Antes de publicar, confirme:
1. `.env` e qualquer arquivo de segredo não estão versionados.
2. Não há JSON de chave Firebase no projeto.
3. Senhas/segredos antigos foram rotacionados (Neon/Firebase/JWT).
4. Variáveis reais estão apenas na plataforma de deploy (Render/Vercel).

## Postman
Coleção: [rotas-ml.postman_collection.json](/Users/albertdumontsilvafreitas/Documents/ROTAS_ML/backend/docs/postman/rotas-ml.postman_collection.json)
