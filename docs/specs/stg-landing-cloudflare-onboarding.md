# Spec: Landing STG no Cloudflare com Integracao de Onboarding

## Status
- `proposta_aprovada_para_implementacao`
- Data: `2026-02-25`

## Resumo
Criar uma versao de staging da landing page em **Cloudflare Pages**, publicada em `landing.stg.riberfood.com`, protegida por **Cloudflare Access**, e integrar o modal principal ao endpoint publico de onboarding do backend STG:

- `POST https://stg.riberfood.com/api/v1/onboarding/tenants`

O objetivo e permitir testes reais do fluxo de captura/onboarding sem usar endpoint de producao e sem expor a landing STG publicamente.

## Contexto e Estado Atual (validado)

### Repositorio da landing
- Stack: `React + TypeScript + Vite`
- Arquivo principal de UI/logica: `App.tsx`
- Atualmente o modal de cadastro chama endpoint fixo de producao:
  - `https://riberfood.com.br/api/public/cadastro-trial`

### Backend/infra STG (validado em servidor)
- `stg.riberfood.com` ja existe e esta ocupado pelo frontend principal (Flutter)
- STG atual esta protegido por **Basic Auth** no Nginx (nao OAuth)
- Backend STG responde em:
  - `https://stg.riberfood.com/api/v1/health`
- Endpoint publico de onboarding ja existe (documentado em `/app/docs/openapi.yaml`):
  - `POST /api/v1/onboarding/tenants`
- CORS do backend STG ja contempla sufixo:
  - `.stg.riberfood.com`

## Objetivos
- Publicar a landing em um host STG separado (`landing.stg.riberfood.com`)
- Proteger o acesso da landing STG com Cloudflare Access
- Trocar integracao do modal para onboarding publico do backend STG
- Remover dependencia de endpoint hardcoded de producao no fluxo STG
- Padronizar configuracao por ambiente para facilitar `stg` e `prod`
- Remover chaves/configuracoes obsoletas do codigo para reduzir ambiguidade de manutencao
- Atualizar o `README` para refletir o projeto real, seu fluxo de deploy e integracao atual

## Nao Objetivos (fora de escopo desta entrega)
- Implementar OAuth de usuario final
- Alterar backend para criar novos endpoints de OAuth
- Mudar a infra atual de `stg.riberfood.com` (frontend principal Flutter + Nginx)
- Refatorar estruturalmente toda a landing

## Decisoes Fechadas
- Hospedagem STG: **Cloudflare Pages**
- Dominio da landing STG: **`landing.stg.riberfood.com`**
- Deploy automatico: **branch `staging`**
- Protecao de acesso: **Cloudflare Access**
- Integracao de onboarding: **modal da landing faz `POST` direto no endpoint publico de onboarding**
- Fluxo principal: **modal (nao redirect)**
- OAuth: **fase futura (fora de escopo)**

## Arquitetura da Solucao (alto nivel)

### Fluxo de acesso
1. Usuario acessa `https://landing.stg.riberfood.com`
2. Cloudflare Access valida sessao
3. Se nao autenticado, usuario passa por login do Access (email/IdP configurado)
4. Cloudflare libera acesso aos assets da landing no Pages
5. Usuario interage com a landing
6. Ao enviar modal, frontend chama `POST https://stg.riberfood.com/api/v1/onboarding/tenants`

### Limite de protecao
- **Protegido por Access:** somente a landing STG (`landing.stg.riberfood.com`)
- **Nao alterado nesta entrega:** backend STG e frontend principal em `stg.riberfood.com`

## Mudancas de Implementacao (frontend)

## 1. Configuracao por ambiente (sem hardcode)

### Novas variaveis de ambiente
- `VITE_APP_ENV`
- `VITE_ONBOARDING_TENANTS_URL`

### Valores STG
- `VITE_APP_ENV=stg`
- `VITE_ONBOARDING_TENANTS_URL=https://stg.riberfood.com/api/v1/onboarding/tenants`

### Regras
- Nenhum endpoint de API deve ficar hardcoded em `App.tsx`
- O endpoint do modal deve ser lido via `import.meta.env`
- Se `VITE_ONBOARDING_TENANTS_URL` estiver ausente, o app deve falhar de forma clara (erro de runtime amigavel ou mensagem de configuracao)

## 1.1 Limpeza de chaves/configuracoes obsoletas (tech cleanup obrigatorio)

### Objetivo
Eliminar configuracoes herdadas de template ou nao utilizadas que hoje confundem manutencao e deploy.

### Escopo minimo de limpeza
- Remover defines/aliases de chaves obsoletas nao utilizadas em `vite.config.ts` (ex.: chaves `GEMINI` / `API_KEY` se nao forem usadas pela landing)
- Revisar referencias a variaveis/envs nao utilizadas no fluxo atual
- Revisar links/imports de assets/arquivos inexistentes ou herdados de template quando impactarem o entendimento do projeto

### Regra
- Toda chave/config removida deve ser confirmada como nao utilizada no codigo da landing
- Se houver duvida sobre uso futuro, documentar no `README` ou mover para configuracao opcional explicitamente nomeada

## 2. Integracao do modal atual com onboarding publico

### Componente afetado
- `TrialModal` em `App.tsx` (pode manter o nome nesta fase)

### Contrato de request (payload enviado)
Usar payload de onboarding publico (fluxo PJ/company), mapeado a partir do formulario atual:

- `person_type`: `"company"`
- `name`: `nomeEmpresa`
- `cnpj`: `cnpj` (somente digitos)
- `owner_email`: `email`
- `owner_name`: `nomeAdmin`
- `subdomain`: derivado de `nomeEmpresa` por slug

### Campos atuais do formulario que **nao entram** no payload (fase 1)
- `senha`
- `telefone`
- `estado`

Motivo:
- Nao ha confirmacao do contrato desses campos no endpoint publico de onboarding
- Evitar quebra por enviar campos nao suportados

### Geracao de `subdomain` (decisao)
Gerar automaticamente a partir de `nomeEmpresa`:
- lowercase
- remover acentos
- trocar sequencias nao alfanumericas por `-`
- colapsar `--`
- remover `-` inicial/final
- tamanho maximo recomendado: `40`
- fallback se vazio: `restaurante`

Observacao:
- Se o backend responder `409` por subdominio em uso, mostrar erro amigavel e orientar o usuario a ajustar nome (fase 1)
- Campo de subdominio manual pode ser adicionado em fase 2, se necessario

## 3. Tratamento de respostas e UX

### Sucesso
- HTTP `201`: exibir tela de sucesso no modal
- A mensagem de sucesso deve ser **neutra**, sem prometer envio de credenciais/email automaticamente (isso dependia do fluxo antigo)

### Erros esperados
- HTTP `409`: conflito (CNPJ/subdominio ja existe)
- HTTP `422`: erro de validacao (payload invalido)
- Erros de rede/CORS/5xx: mensagem de indisponibilidade temporaria

### Regras de UX
- Manter feedback de loading no botao
- Nao fechar modal automaticamente em erro
- Preservar dados preenchidos em caso de erro
- Logar erro no console somente para debug (sem expor detalhes sensiveis ao usuario)

## 4. Estrutura de tipos (TypeScript)

### Tipos a adicionar (ou equivalente)
- `OnboardingTenantPayload`
- `OnboardingApiError` (opcional)

### Tipos existentes impactados
- `SignupForm` permanece para estado do formulario

### Contrato sugerido (`OnboardingTenantPayload`)
```ts
type OnboardingTenantPayload = {
  person_type: 'company';
  name: string;
  cnpj: string;
  owner_email: string;
  owner_name: string;
  subdomain: string;
};
```

## 5. CTA e fluxo de navegacao
- CTA principal continua abrindo modal (na landing e na tela de planos)
- Nao redirecionar para `stg.riberfood.com` nesta entrega
- Waitlist modal permanece como esta (mock) e fora do fluxo de onboarding

## Mudancas de Infra (Cloudflare)

## 6. Cloudflare Pages (projeto STG dedicado)

### Projeto
- Criar projeto Pages dedicado para STG (ex.: `riberfood-landing-stg`)
- Nao reutilizar projeto de producao

### Build configuration
- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

### Deploy trigger
- Branch: `staging`
- Deploy automatico a cada push nessa branch

### Variaveis de ambiente (Pages)
- `VITE_APP_ENV=stg`
- `VITE_ONBOARDING_TENANTS_URL=https://stg.riberfood.com/api/v1/onboarding/tenants`

## 7. Dominio customizado
- Adicionar `landing.stg.riberfood.com` no projeto Pages STG
- Validar emissao de SSL pela Cloudflare
- Nao usar `stg.riberfood.com` para evitar conflito com frontend principal

## 8. Cloudflare Access (protecao da landing STG)

### Tipo de app
- `Access > Applications > Self-hosted`

### Aplicacao
- Hostname: `landing.stg.riberfood.com`
- Path: `/*`

### Politica inicial recomendada
- `Allow` para emails do time (ex.: dominio corporativo) e/ou lista de emails de QA

### Sessoes
- Duracao recomendada: `8h` (ajustavel)

### Comportamento esperado
- Usuarios nao autenticados serao bloqueados antes da landing carregar
- Protecao ocorre na borda da Cloudflare, sem login dentro do app React

## 9. CORS e integracao com backend STG

### Origem da landing STG
- `https://landing.stg.riberfood.com`

### Backend STG (estado atual)
- Ja possui `CORS_ALLOWED_ORIGIN_SUFFIXES=.stg.riberfood.com`

### Validacao obrigatoria
- Confirmar `OPTIONS` preflight e `POST` real do browser para `/api/v1/onboarding/tenants`

### Acao se falhar
- Ajustar backend para incluir origem explicita:
  - `https://landing.stg.riberfood.com`

## Mudancas de Documentacao no Repositorio

## 10. Arquivos a adicionar/atualizar

### Adicionar
- `docs/specs/stg-landing-cloudflare-onboarding.md` (este documento)
- `.env.example` com variaveis de configuracao da landing (recomendado na implementacao)

### Atualizar
- `README.md` com:
  - descricao realista do projeto (landing de marketing/conversao da Riberfood)
  - stack real (`React + Vite + TypeScript`, Tailwind via CDN no `index.html`)
  - estrutura atual (arquivo principal `App.tsx`, assets em `images/`)
  - setup local (`npm install`, `npm run dev`)
  - variaveis de ambiente suportadas (`VITE_APP_ENV`, `VITE_ONBOARDING_TENANTS_URL`)
  - fluxo de deploy `staging` no Cloudflare Pages (branch `staging`)
  - dominio STG (`landing.stg.riberfood.com`) e protecao via Cloudflare Access
  - integracao com backend STG (`POST /api/v1/onboarding/tenants`)
  - observacao de que `wrangler.json` existe no repo, mas nao e o caminho principal desta entrega STG
  - limitacoes conhecidas / fora de escopo (ex.: OAuth fora desta fase)

## Public APIs / Interfaces / Types (impacto)

### API externa consumida (backend STG)
- `POST /api/v1/onboarding/tenants` (sem mudancas de contrato previstas nesta entrega)

### Interface interna (frontend)
- Introducao de configuracao `VITE_ONBOARDING_TENANTS_URL`
- Introducao de `OnboardingTenantPayload`
- Alteracao do fluxo de submit do `TrialModal`

## Testes e Criterios de Aceite

## Testes locais (frontend)
1. `npm run build` conclui com sucesso
2. Nenhuma referencia ao endpoint antigo de producao permanece no fluxo de submit STG
3. Variavel ausente (`VITE_ONBOARDING_TENANTS_URL`) gera falha clara de configuracao
4. Chaves/configs obsoletas removidas nao sao mais referenciadas no codigo
5. `README.md` descreve corretamente stack, setup e fluxo STG atuais

## Testes em STG (funcionais)
1. `landing.stg.riberfood.com` exige autenticacao via Cloudflare Access
2. Landing abre normalmente apos autenticacao
3. CTA principal abre modal
4. Submit valido retorna sucesso (`201`) e mostra mensagem adequada
5. CNPJ/subdominio duplicado retorna erro amigavel (`409`)
6. Payload invalido retorna erro de validacao (`422`)
7. Falha de rede/CORS mostra mensagem generica de indisponibilidade
8. Dados permanecem no formulario apos erro

## Testes de integracao / rede
1. Preflight `OPTIONS` de `landing.stg.riberfood.com` para backend STG e aceito
2. `POST /api/v1/onboarding/tenants` via browser nao e bloqueado por CORS
3. Cloudflare Access protege somente a landing (nao interfere no backend STG)

## Rollout (ordem de execucao)
1. Implementar configuracao por ambiente e troca de endpoint no frontend
2. Adaptar payload do modal para onboarding publico
3. Ajustar mensagens de sucesso/erro
4. Validar build local
5. Criar projeto Cloudflare Pages STG
6. Configurar env vars no Pages
7. Configurar dominio `landing.stg.riberfood.com`
8. Configurar Cloudflare Access
9. Publicar branch `staging`
10. Executar smoke tests end-to-end

## Rollback
- Reverter deploy da Pages para build anterior
- Desativar/ajustar Access policy se bloquear time indevidamente
- Reverter branch `staging` se integracao do modal falhar
- (Opcional temporario) desabilitar submit real do modal e exibir mensagem de indisponibilidade

## Riscos e Mitigacoes
- **Contrato real do endpoint diferir do exemplo**:
  - Mitigacao: validar com chamada real em STG antes de go-live
- **Conflitos recorrentes de subdominio gerado automaticamente**:
  - Mitigacao: erro amigavel agora; campo manual de subdominio em fase 2
- **Mensagem de sucesso desalinhada com backend**:
  - Mitigacao: usar mensagem neutra nesta fase
- **CORS nao aceitar wildcard/sufixo como esperado**:
  - Mitigacao: incluir `https://landing.stg.riberfood.com` explicitamente

## Assumptions / Defaults
- Sem OAuth nesta entrega (confirmado pelo ajuste de escopo)
- Integracao usa endpoint publico de onboarding do backend STG
- Fluxo principal de onboarding sera via modal da landing
- `landing.stg.riberfood.com` sera provisionado na mesma zona Cloudflare do projeto
- Protecao sera feita via Cloudflare Access (nao Basic Auth na landing)
- "Chaves obsoletas" inclui especialmente configuracoes/envs herdados e nao utilizados pela landing atual (ex.: referencias `GEMINI`), salvo comprovacao de uso
