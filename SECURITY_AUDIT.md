# Security Audit - SobraRota (Backend)

## Data da revisão
2026-05-29

## Escopo
- API backend
- Autenticação
- Autorização e isolamento por usuário
- Banco de dados e Sequelize
- Variáveis de ambiente
- Dependências
- Documentação

## Itens avaliados
- Autenticação JWT
- Hash de senhas com bcrypt
- CORS
- Headers de segurança
- Rate limit
- Validação com Yup
- Tratamento global de erros
- Isolamento de dados por usuário
- Proteção contra SQL Injection
- Uso de variáveis de ambiente
- Auditoria de dependências
- Logs sensíveis

## Melhorias aplicadas
- Adicionado `helmet` global para headers de segurança.
- Adicionado `express-rate-limit` com limite geral e limite específico em `/auth/*`.
- Desabilitado `x-powered-by`.
- `express.json` com limite de `1mb`.
- CORS restrito com lista de origens permitidas via `CORS_ORIGIN`.
- Validação central de ambiente em `src/config/env.js` com bloqueio de boot inseguro em produção.
- Suporte a `DATABASE_URL` (Neon/Render) mantendo compatibilidade com `DB_*` local.
- JWT endurecido com algoritmo explícito (`HS256`) em assinatura/validação.
- Payload de token reduzido para dados mínimos (`sub`, `role`).
- Mensagem específica para sessão expirada (`TokenExpiredError`).
- Middleware global de erros ajustado para não expor stack/infra em produção.
- Validações Yup reforçadas para datas válidas, intervalo de datas e campos numéricos > 0.
- Cálculo financeiro renomeado para `calculateRouteFinancials` com alias legado e comentários de segurança.
- Atualização de rotas protegida por autenticação, ownership e recálculo financeiro no backend.
- Criado `.dockerignore` para evitar envio de arquivos sensíveis e desnecessários no build.

## Vulnerabilidades encontradas e corrigidas
1. CORS permissivo (`*`) em cenário geral.
- Correção: lista explícita de origens permitidas e bloqueio para origens não autorizadas.

2. Falta de proteção contra brute force em autenticação.
- Correção: rate limit nas rotas de login.

3. Ausência de headers de hardening HTTP.
- Correção: Helmet habilitado.

4. Risco de exposição de detalhes internos em erro 500.
- Correção: resposta segura em produção e logs reduzidos.

5. Falta de validação robusta em filtros de data/período.
- Correção: validações de paridade e ordem de datas.

6. Edição de rota sem garantia explícita de ownership e recálculo no servidor.
- Correção: `PUT /routes/:id` com busca por `user_id` e recomputação integral dos campos financeiros.

## Pontos de atenção futuros
- Adicionar testes automatizados de integração para autorização por usuário.
- Adicionar pipeline CI/CD com lint, build e audit automáticos.
- Avaliar rotação automática de segredos em produção.
- Avaliar observabilidade centralizada (Sentry/Log drains).
- `npm audit` reportou vulnerabilidades moderadas em dependências transitivas de `uuid` (via `firebase-admin` e `sequelize`), sem correção segura sem downgrade/breaking. Monitorar atualização upstream.

## Conclusão
O backend passou por revisão de segurança e organização com foco em boas práticas para aplicações web modernas. As melhorias principais foram aplicadas em autenticação, validação, autorização, proteção contra abuso, configuração de ambiente e tratamento seguro de erros.

## Checklist de qualidade
- [x] Senhas protegidas com bcrypt
- [x] JWT com expiração
- [x] CORS restrito por ambiente
- [x] Helmet configurado
- [x] Rate limit em autenticação
- [x] Validação com Yup
- [x] Cálculos financeiros no backend
- [x] Isolamento de dados por usuário
- [x] Tratamento global de erros
- [x] Variáveis sensíveis fora do repositório
- [x] README atualizado
- [x] SECURITY.md criado
- [x] SECURITY_AUDIT.md criado
- [x] ARCHITECTURE.md criado
- [ ] Testes automatizados completos
- [ ] CI/CD com auditoria automática
- [ ] Cookie HttpOnly para sessão (não aplicável ao backend isolado sem ajuste de arquitetura)
