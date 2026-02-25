# Runbook: Cloudflare Pages + Access (Landing STG)

## Objetivo
Operar a landing STG em `landing.stg.riberfood.com` com:
- deploy via GitHub Actions -> Cloudflare Pages
- acesso protegido por Cloudflare Access

## Pre-requisitos
- Projeto Cloudflare Pages criado (ex.: `riberfood-landing-stg`)
- Dominio `landing.stg.riberfood.com` disponivel na zona Cloudflare
- Cloudflare Zero Trust habilitado
- Branch de deploy: `staging`

## GitHub (sem segredos no repo)

### Repository Variables (Actions > Variables)
- `CF_PAGES_PROJECT_STG` = nome do projeto Cloudflare Pages STG
- `VITE_ONBOARDING_TENANTS_URL_STG` = endpoint publico de onboarding STG

Observacao:
- `VITE_ONBOARDING_TENANTS_URL_STG` e configuracao publica de frontend
- nao e segredo, mas fica centralizada no CI para evitar hardcode no repo

### Repository Secrets (Actions > Secrets)
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Workflow
Arquivo:
- `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/.github/workflows/deploy-staging-cloudflare-pages.yml`

Disparo:
- push na branch `staging`
- `workflow_dispatch` manual

## Cloudflare Pages
1. Criar/confirmar projeto Pages STG
2. Configurar dominio customizado `landing.stg.riberfood.com`
3. Garantir SSL ativo
4. Validar ultimo deploy do branch `staging`

## Cloudflare Access (protecao)
1. Cloudflare Zero Trust -> Access -> Applications
2. Criar app `Self-hosted`
3. Domain/URL:
   - `landing.stg.riberfood.com`
   - path `/*`
4. Policy `Allow`:
   - dominio corporativo (ex.: `@riberfood.com`) e/ou lista de emails QA
5. Session duration:
   - recomendado `8h`
6. Salvar e validar acesso em janela anonima

## Smoke tests (pos-deploy)
1. `landing.stg.riberfood.com` exige login do Access
2. Landing carrega apos autenticacao
3. CTA abre modal
4. Submit chama `POST /api/v1/onboarding/tenants` no backend STG
5. Erros `409/422` exibem mensagem amigavel

## Troubleshooting rapido
- Deploy falha no GitHub:
  - validar `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CF_PAGES_PROJECT_STG`
- Build falha por env:
  - validar `VITE_ONBOARDING_TENANTS_URL_STG`
- CORS bloqueado:
  - confirmar backend STG permite `https://landing.stg.riberfood.com`
- Access bloqueando time:
  - revisar policy `Allow` e identidade usada no login
