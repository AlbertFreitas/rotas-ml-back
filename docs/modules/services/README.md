# Módulo `services`

## Objetivo
Concentra lógica de negócio reutilizável, separada do transporte HTTP.

## Arquivos
- `tokenService.js`: emissão/validação de JWT.
- `firebaseAuthService.js`: validação de `idToken` no Firebase Admin.
- `routeFinanceService.js`: cálculos financeiros da rota.
- `dashboardService.js`: agregações para cards, gráficos e análises.

## Benefícios
- Facilita testes.
- Evita duplicação de regras entre controllers.
