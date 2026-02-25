# Riberfood Landing Page

Landing page de marketing/conversao da Riberfood para apresentacao da plataforma e captura de onboarding.

## Stack
- React 19
- TypeScript
- Vite
- Tailwind via CDN (carregado em `index.html`)
- `lucide-react` para icones

## Estrutura atual
- `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/App.tsx`: UI principal (landing, planos e modais)
- `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/index.tsx`: bootstrap React
- `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/images/`: assets da landing
- `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/docs/specs/`: specs de implementacao

## Rodando localmente
```bash
npm install
npm run dev
```

Servidor local padrao:
- `http://localhost:3000`

## Variaveis de ambiente
Copie os valores de referencia de `.env.example` para um `.env.local`.

Variaveis suportadas:
- `VITE_APP_ENV` (`local`, `stg`, `prod`)
- `VITE_ONBOARDING_TENANTS_URL` (endpoint de onboarding publico)

Exemplo para staging:
- `VITE_APP_ENV=stg`
- `VITE_ONBOARDING_TENANTS_URL=https://<seu-host-stg>/api/v1/onboarding/tenants`

### Seguranca (importante)
- Variaveis `VITE_*` em apps Vite sao **publicas** e ficam expostas no bundle do frontend.
- Use `VITE_*` apenas para configuracoes publicas (ex.: URL de API).
- **Nao** coloque segredos, tokens privados ou chaves sensiveis no frontend.
- Valores reais de build devem ser configurados no **Cloudflare Pages (Environment Variables)** e/ou no pipeline (GitHub Actions/GitHub Secrets, se houver CI de deploy).

## Scripts
- `npm run dev`: desenvolvimento local
- `npm run build`: build de producao
- `npm run preview`: preview local do build
- `npm run deploy`: deploy legado via GitHub Pages (`gh-pages`) - nao e o fluxo principal do STG

## STG (Cloudflare Pages)
Fluxo alvo de staging:
- Projeto dedicado no Cloudflare Pages
- Branch de deploy: `staging`
- Dominio: `landing.stg.riberfood.com`
- Protecao: Cloudflare Access
- Backend STG: `POST https://stg.riberfood.com/api/v1/onboarding/tenants`

Documentacao relacionada:
- Spec: `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/docs/specs/stg-landing-cloudflare-onboarding.md`
- Runbook operacional: `/Users/paluanbatista/Documents/SafeTrust/riberfood/riberfood-landing-page/docs/runbooks/cloudflare-pages-access-stg.md`

## Observacoes
- O repositório ainda possui `wrangler.json`, mas o fluxo principal desta entrega STG sera via **Cloudflare Pages**.
- OAuth esta fora do escopo desta fase de staging.
