# Changelog

## v1.1.1

### Segurança
- Adicionado Helmet.
- Adicionado rate limit global e em autenticação.
- CORS restrito por ambiente.
- JWT com algoritmo explícito e payload mínimo.
- Tratamento global de erros endurecido para produção.
- Validação de ambiente com bloqueio de boot inseguro em produção.
- Reforço de validações Yup para datas, período e valores numéricos.

### Qualidade
- Suporte a `DATABASE_URL` para Neon/Render com fallback local `DB_*`.
- Função de cálculo financeiro padronizada como `calculateRouteFinancials`.
- `.dockerignore` adicionado.

### Documentação
- README reestruturado para portfólio.
- `SECURITY.md` criado.
- `SECURITY_AUDIT.md` criado.
- `ARCHITECTURE.md` criado.

## v1.0.0

### Adicionado
- Dashboard financeiro
- Cadastro de rotas
- Cadastro de veículo
- Cálculo automático de lucro líquido
- Histórico de rotas
- Login e modo demonstração
