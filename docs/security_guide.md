# Guia de Segurança e Proteção de Dados - Riberfood

Este documento resume as medidas implementadas para proteger a landing page do Riberfood contra inspeção indesejada, injeção de SQL e exposição de dados sensíveis.

## 1. Proteção contra Inspeção de Código (Browser)

Embora não seja possível ocultar 100% do código que roda no navegador, implementamos as seguintes camadas de proteção:

- **Desativação de Source Maps**: No arquivo `vite.config.ts`, desativamos a geração de mapas de código em produção. Isso impede que usuários vejam a estrutura original do seu TypeScript no console do navegador.
- **Remoção de Logs e Debuggers**: Configuramos o Vite para remover automaticamente todos os `console.log` e comandos `debugger` durante o build de produção.
- **Bloqueio de Ferramentas de Inspeção**: Adicionamos um script no `index.html` que:
  - Desativa o menu de clique direito.
  - Bloqueia atalhos de teclado como F12, Ctrl+Shift+I, Ctrl+Shift+J e Ctrl+U (Visualizar código fonte).

## 2. Prevenção contra Injeção de SQL

A proteção principal ocorre no Backend, mas implementamos medidas preventivas no Frontend:

- **Sanitização de Inputs**: Criamos a função `sanitizeInput` no `App.tsx` que remove caracteres perigosos (como `;`, `'`, `"` e `\`) de todos os campos de formulário antes de enviá-los.
- **Envio Estruturado (JSON)**: Os dados são enviados como objetos JSON via POST, o que é inerentemente mais seguro do que passar parâmetros diretamente na URL ou em strings de query.

## 3. Proteção de Dados Sensíveis e URLs

- **URLs Limpas**: O aplicativo não utiliza parâmetros sensíveis na URL (como IDs sequenciais ou senhas).
- **Tratamento de Chaves**: Verificamos que não existem chaves de API hardcoded no código. 

> [!IMPORTANT]
> **Recomendações de Continuidade:**
> 1. **Variáveis de Ambiente**: Nunca coloque chaves secretas (Secret Keys) em variáveis que começam com `VITE_`. Elas serão expostas no bundle final. Use essas variáveis apenas para URLs públicas ou chaves públicas (como chaves anônimas do Supabase).
> 2. **UUIDs**: Se no futuro você criar páginas dinâmicas (ex: `/pedido/[id]`), use UUIDs (ex: `/pedido/550e8400...`) em vez de números sequenciais (1, 2, 3) para evitar que usuários tentem "adivinhar" outros registros.
> 3. **Row Level Security (RLS)**: Se estiver usando Supabase, certifique-se de que o RLS está ativo em todas as tabelas para que nenhum dado seja acessado sem permissão, mesmo que alguém consiga sua chave anônima.
