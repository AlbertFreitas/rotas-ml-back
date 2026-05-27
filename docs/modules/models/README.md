# Módulo `models`

## Objetivo
Representa entidades do domínio e seus relacionamentos.

## Arquivos
- `Admin.js`: administrador local com hash de senha.
- `User.js`: usuário autenticado via Firebase.
- `Vehicle.js`: configurações do veículo por usuário.
- `DeliveryRoute.js`: registro financeiro de cada rota.

## Relacionamentos
- `User` 1:N `Vehicle`
- `User` 1:N `DeliveryRoute`
- `Vehicle` 1:N `DeliveryRoute`
