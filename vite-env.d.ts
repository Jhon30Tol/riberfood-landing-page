/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: string;
  readonly VITE_ONBOARDING_TENANTS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
