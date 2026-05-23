# Riberfood Landing Page

Landing page de marketing/conversao da Riberfood para apresentacao da plataforma e captura de onboarding.

## Stack
- React 19
- TypeScript
- Vite
- Tailwind via CDN (carregado em `index.html`)
- `lucide-react` para icones

## Estrutura atual
- `riberfood-landing-page/App.tsx`: UI principal (landing, planos e modais)
- `riberfood-landing-page/index.tsx`: bootstrap React
- `riberfood-landing-page/images/`: assets da landing
- `riberfood-landing-page/docs/specs/`: specs de implementacao

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

### Seguranca (importante)
- Variaveis `VITE_*` em apps Vite sao **publicas** e ficam expostas no bundle do frontend.
- Use `VITE_*` apenas para configuracoes publicas (ex.: URL de API).
- **Nao** coloque segredos, tokens privados ou chaves sensiveis no frontend.
- Valores reais de build devem ser configurados no **Cloudflare Pages (Environment Variables)** e/ou no pipeline (GitHub Actions).

## Scripts
- `npm run dev`: desenvolvimento local
- `npm run build`: build de producao
- `npm run preview`: preview local do build
- `npm run deploy`: deploy legado via GitHub Pages (`gh-pages`) - nao e fluxo principal

## Deploy (Cloudflare Pages)
Fluxo por branch:
- `staging` -> deploy no branch `staging` do Cloudflare Pages -> rota `landing.stg.riberfood`
- `main` -> deploy no branch `main` do Cloudflare Pages -> rota `landing.riberfood`

Workflow:
- `.github/workflows/deploy-cloudflare-pages.yml`
- Trigger: `push` em `staging` ou `main` (e `workflow_dispatch`)

Variaveis esperadas no GitHub:
- `vars.CF_PAGES_PROJECT`
- `vars.VITE_ONBOARDING_TENANTS_URL_STG` (opcional, tem fallback)
- `vars.VITE_ONBOARDING_TENANTS_URL_PROD` (opcional, tem fallback)
- `secrets.CLOUDFLARE_API_TOKEN`
- `secrets.CLOUDFLARE_ACCOUNT_ID`
