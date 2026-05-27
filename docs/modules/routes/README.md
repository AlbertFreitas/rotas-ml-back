# Módulo `routes`

## Objetivo
Mapeia URL + método HTTP para controllers e middlewares.

## Arquivos
- `index.js`: agrega rotas e expõe `GET /health`.
- `authRoutes.js`: autenticação e perfil.
- `vehicleRoutes.js`: módulo de veículo.
- `routeRoutes.js`: módulo de rotas operacionais.
- `dashboardRoutes.js`: módulo de indicadores.

## Padrões
- Rotas protegidas usam `ensureAuth`.
- Rotas específicas de usuário usam `ensureRole('user')`.
