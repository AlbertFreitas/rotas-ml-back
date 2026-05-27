# Módulo `controllers`

## Objetivo
Recebe requisições HTTP, coordena serviços e devolve respostas.

## Arquivos
- `authController.js`: login admin, login Firebase, login demo e `me`.
- `vehicleController.js`: leitura/atualização do veículo padrão do usuário.
- `routeController.js`: criação, listagem e exclusão de rotas.
- `dashboardController.js`: endpoints de resumo, gráficos, análise e extrato.

## Boas práticas usadas
- Controllers sem SQL direto complexo.
- Tratamento de erros por `AppError` + middleware global.
- Funções assíncronas encapsuladas por `asyncHandler`.
