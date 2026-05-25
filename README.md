# Rotas ML Backend

API backend para gestão de rotas de entregadores, usando:
- Node.js + Express
- Sequelize + PostgreSQL
- Docker (Postgres local)
- Yup (validação)
- bcrypt (senha de admin)
- JWT (autenticação)
- Firebase Admin (login usuário)
- CORS
- UUID

## 1) Subir banco com Docker

```bash
cd backend
docker compose up -d
```

## 2) Configurar ambiente

```bash
cp .env.example .env
```

Preencha o `.env` (principalmente `JWT_SECRET` e `FIREBASE_SERVICE_ACCOUNT_JSON`).

## 3) Rodar migrations e seed

```bash
npm run db:migrate
npm run db:seed
```

## 4) Rodar API

```bash
npm run dev
```

A API sobe em `http://localhost:3333`.

## Credenciais seed (admin)
- Email: `admin@rotaliquida.com`
- Senha: `123456`

## Usuário demo seed
- `firebase_uid`: `demo-firebase-uid-001`
- email: `demo@rotaliquida.com`

> Para login real de usuário é necessário enviar um `idToken` válido do Firebase em `POST /auth/firebase/login`.

## Endpoints principais

### Health
- `GET /health`

### Auth
- `POST /auth/admin/login`
- `POST /auth/firebase/login`
- `POST /auth/demo/login`
- `GET /auth/me`

### Veículo (usuário logado)
- `GET /vehicles/me`
- `PUT /vehicles/me`

### Rotas (usuário logado)
- `POST /routes`
- `GET /routes?month=3&year=2025&status=CONCLUIDA`
- `DELETE /routes/:id`

### Dashboard (usuário logado)
- `GET /dashboard/summary?month=3&year=2025`
- `GET /dashboard/charts?month=3&year=2025`
- `GET /dashboard/monthly-comparison`
- `GET /dashboard/analysis?month=3&year=2025`
- `GET /dashboard/statement`

## Beekeeper Studio (conexão)
Use estes dados:
- Host: `127.0.0.1`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `rotas_ml`

## Teste rápido no Postman
1. `POST /auth/admin/login` para validar admin.
2. `POST /auth/firebase/login` com token Firebase real para obter JWT de usuário.
3. Com token de usuário (`Bearer`), testar `/vehicles/me`, `/routes`, `/dashboard/*`.
