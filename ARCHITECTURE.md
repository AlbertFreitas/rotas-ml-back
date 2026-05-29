# Arquitetura - SobraRota Backend

## 1. Visão geral
O backend expõe uma API REST para autenticação, rotas de entrega, veículo padrão e indicadores financeiros.

## 2. Fluxo de autenticação
1. Frontend envia login (`/auth/firebase/login`, `/auth/admin/login` ou `/auth/demo/login`).
2. Backend valida entrada e credenciais.
3. Backend gera JWT com payload mínimo (`sub`, `role`).
4. Frontend usa `Authorization: Bearer <token>` nas rotas privadas.

## 3. Fluxo de cadastro de rota
1. Frontend envia dados brutos da rota.
2. Backend valida com Yup.
3. Backend resolve veículo padrão (ou informado) do usuário autenticado.
4. Backend recalcula métricas financeiras e salva em `delivery_routes`.

## 4. Cálculos financeiros
O backend é a fonte da verdade para os cálculos financeiros. Mesmo que o frontend exiba uma pré-visualização para melhorar a experiência do usuário, todos os valores finais são recalculados no servidor antes de serem salvos no banco de dados.

Regras principais:
- Rotas canceladas consideram 40% do valor bruto.
- Litros = km / consumo.
- Gasto combustível = litros * preço do litro.
- Líquido = considerado - combustível.
- Lucro/km e custo/km calculados pelo backend.

## 5. Estrutura do backend
- `controllers`: camada HTTP
- `services`: regras de negócio
- `validators`: validações de entrada
- `middlewares`: auth, rate limit, erro global
- `models`: entidades Sequelize
- `database/migrations`: estrutura do banco
- `config`: ambiente e integrações

## 6. Relacionamentos principais
- `users` 1:N `vehicles`
- `users` 1:N `delivery_routes`
- `vehicles` 1:N `delivery_routes` (opcional por rota)

## 7. Exportações de relatório
A API fornece os dados por usuário e período; o frontend gera CSV/PDF/Excel usando apenas dados autorizados já carregados.

## 8. Decisões técnicas
- PostgreSQL + Sequelize para consistência relacional.
- JWT stateless para autenticação.
- Yup para validação de payloads e queries.
- Helmet + Rate limit + CORS restrito para hardening.

## 9. Melhorias futuras
- Testes de integração por rota crítica.
- Testes de autorização por ownership.
- Monitoramento de erros em produção.
