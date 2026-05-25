
export interface FAQItem {
  question: string;
  answer: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  image: string;
}
export interface SignupForm {
  cnpj: string;
  nomeEmpresa: string;
  nomeAdmin: string;
  email: string;
  telefone: string;
  estado: string;
}

interface OnboardingTenantBasePayload {
  name: string;
  owner_email: string;
  owner_name: string;
  subdomain: string;
}

export type OnboardingTenantPayload =
  | (OnboardingTenantBasePayload & {
      person_type: 'company';
      cnpj: string;
      cpf?: never;
    })
  | (OnboardingTenantBasePayload & {
      person_type: 'individual';
      cpf: string;
      cnpj?: never;
    });
