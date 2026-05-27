# Módulo `validators`

## Objetivo
Centraliza esquemas Yup para validação de entrada.

## Arquivos
- `common.js`: validadores base reutilizáveis.
- `authSchemas.js`: payloads de autenticação.
- `vehicleSchemas.js`: payload de veículo.
- `routeSchemas.js`: criação/listagem de rotas.
- `dashboardSchemas.js`: filtros de período para dashboard.

## Estratégia
- Normaliza dados no momento da validação.
- Rejeita payload inválido antes de chegar no controller.
