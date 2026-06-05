# SobraRota Backend

API REST do **SobraRota**, sistema financeiro para entregadores acompanharem quanto realmente sobra em cada rota.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![Status](https://img.shields.io/badge/status-ativo-1f7a1f)
![License](https://img.shields.io/badge/license-MIT-blue)

## Descrição
O backend centraliza autenticação, regras de negócio e cálculos financeiros de rotas. O frontend pode mostrar prévias, mas o servidor é a fonte da verdade para todos os valores salvos.

## Funcionalidades
- Login administrativo
- Login de usuário com Google/Firebase
- Modo demonstração
- Cadastro e listagem de rotas
- Cálculo automático de valor considerado, litros, combustível, lucro líquido, lucro/km e custo/km
- Configuração de veículo padrão
- Dashboard financeiro (resumo, gráficos, análise, comparativo)
- Base para exportações (CSV/PDF/Excel no frontend)

## Destaques técnicos
- API REST com Node.js e Express
- Banco PostgreSQL com Sequelize
- Autenticação com JWT
- Senhas protegidas com bcrypt
- Validação de dados com Yup
- Cálculos financeiros centralizados no backend
- Isolamento de dados por usuário autenticado
- Segurança com Helmet, CORS restrito e rate limit
- Estrutura preparada para deploy com Render e Neon
- Auditoria documentada em `SECURITY_AUDIT.md`

## Por que este projeto é relevante?
O SobraRota simula um sistema real de gestão financeira para entregadores, resolvendo uma dor prática: entender quanto realmente sobra depois dos custos com combustível. O projeto foi desenvolvido com foco em regras de negócio, segurança, organização de código, responsividade e experiência do usuário.

## Tecnologias
- Node.js
- Express
- Sequelize
- PostgreSQL
- Yup
- bcryptjs
- jsonwebtoken
- cors
- helmet
- express-rate-limit
- uuid
- Firebase Admin
- Docker

## Estrutura de pastas
- `src/config`: ambiente, banco e firebase
- `src/controllers`: orquestração HTTP
- `src/middlewares`: auth, validação, rate limit e erro global
- `src/models`: entidades Sequelize
- `src/routes`: rotas da API
- `src/services`: regras de negócio e autenticação
- `src/validators`: schemas Yup
- `src/database`: migrations e seeders
- `src/utils`: utilitários e classes de erro

## Como rodar localmente
1. Clone o repositório.
2. Instale dependências:
```bash
npm install
```
3. Configure ambiente:
```bash
cp .env.example .env
```
4. Suba o banco local:
```bash
docker compose up -d
```
5. Rode migrations e seeders:
```bash
npm run db:migrate
npm run db:seed
```
6. Inicie a API:
```bash
npm run dev
```

API local: `http://localhost:3333`

## Variáveis de ambiente
Consulte `.env.example`.

Principais variáveis:
- `NODE_ENV`
- `PORT`
- `DATABASE_URL` (preferencial em produção)
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS` (alternativa local)
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CORS_ORIGIN`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `FIREBASE_PROJECT_ID`

## Scripts
- `npm run dev`: sobe API com nodemon
- `npm run start`: sobe API em modo padrão
- `npm run db:migrate`: aplica migrations
- `npm run db:seed`: aplica seeders
- `npm run db:reset`: recria estrutura e seeds
- `npm run audit`: auditoria de dependências

## Segurança
Boas práticas aplicadas:
- Senhas com bcrypt
- JWT com expiração
- CORS restrito por ambiente
- Helmet
- Rate limit em autenticação
- Validação com Yup
- Isolamento por usuário
- Tratamento global de erros sem stack em produção
- Variáveis sensíveis fora do repositório

Detalhes:
- `SECURITY.md`
- `SECURITY_AUDIT.md`

## Deploy
- Backend: Render
- Banco: Neon

## Postman
Coleção: `docs/postman/rotas-ml.postman_collection.json`

## Autor
Albert Freitas  
GitHub: https://github.com/AlbertFreitas  
LinkedIn: https://linkedin.com/in/albert-freitas-a56a62280/  
Instagram: @albert.dsf  
Email: freitasalbert4@gmail.com  
Localização: São Luís - MA
