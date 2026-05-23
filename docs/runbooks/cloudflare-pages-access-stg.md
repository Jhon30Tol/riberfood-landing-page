# Runbook: Cloudflare Pages + Access (Landing STG/PROD)

## Objetivo
Operar landing em dois ambientes:
- STG: `landing.stg.riberfood` (branch `staging`)
- PROD: `landing.riberfood` (branch `main`)

Deploy via GitHub Actions -> Cloudflare Pages.

## Pre-requisitos
- Projeto Cloudflare Pages criado (unico projeto para branches `staging` e `main`)
- Rotas customizadas configuradas no Pages:
  - `staging` -> `landing.stg.riberfood`
  - `main` -> `landing.riberfood`
- Cloudflare Zero Trust habilitado (se STG protegido)

## GitHub

### Repository Variables (Actions > Variables)
- `CF_PAGES_PROJECT` = nome projeto Cloudflare Pages
- `VITE_ONBOARDING_TENANTS_URL_STG` = endpoint publico onboarding STG (opcional)
- `VITE_ONBOARDING_TENANTS_URL_PROD` = endpoint publico onboarding PROD (opcional)

### Repository Secrets (Actions > Secrets)
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Workflow
Arquivo:
- `.github/workflows/deploy-cloudflare-pages.yml`

Disparo:
- push na branch `staging`
- push na branch `main`
- `workflow_dispatch` manual

Comportamento:
- `staging` -> build com `VITE_APP_ENV=stg` e deploy `--branch staging`
- `main` -> build com `VITE_APP_ENV=prod` e deploy `--branch main`

## Cloudflare Access (opcional, STG)
Se STG for protegido:
1. Zero Trust -> Access -> Applications
2. App `Self-hosted`
3. URL: `landing.stg.riberfood/*`
4. Policy `Allow`: dominio corporativo/e-mails QA
5. Session duration recomendada: `8h`

## Smoke tests (pos-deploy)
1. `landing.stg.riberfood` abre (ou exige Access, se ligado)
2. `landing.riberfood` abre normalmente
3. CTA abre modal
4. Submit chama `POST /api/v1/onboarding/tenants`

## Troubleshooting rapido
- Deploy falha no GitHub:
  - validar `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CF_PAGES_PROJECT`
- Build falha por env:
  - validar `VITE_ONBOARDING_TENANTS_URL_STG/PROD`
- Rota errada no dominio:
  - revisar mapeamento de custom domains por branch no Pages
