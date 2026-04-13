
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

export interface OnboardingTenantPayload {
  person_type: 'company';
  name: string;
  cnpj: string;
  owner_email: string;
  owner_name: string;
  subdomain: string;
}
