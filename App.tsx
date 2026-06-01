// Build trigger: v2026-03-03-15-06 - feature updates
import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ChevronDown,
  ChefHat,
  Truck,
  TrendingUp,
  Monitor,
  DollarSign,
  Zap,
  Menu,
  X,
  Smartphone,
  Check,
  PartyPopper,
  Lock,
  User,
  Building
} from 'lucide-react';
import { FAQItem, BenefitItem, OnboardingTenantPayload, SignupForm } from './types';

import iconLogo from './images/Icon_sem_Fundo.png';
import textLogo from './images/riberfood_logo-bg_null.png';

const LEGACY_LOGIN_HASH_PREFIXES = ['#/login', '#/entrar', '#/auth/login', '#login', '#!/login'];

const stripLegacyLoginHash = (): boolean => {
  if (typeof window === 'undefined') return false;

  const rawHash = window.location.hash.trim().toLowerCase();
  if (!rawHash) return false;

  let decodedHash = rawHash;
  try {
    decodedHash = decodeURIComponent(rawHash);
  } catch {
    decodedHash = rawHash;
  }

  const hashesToCheck = [rawHash, decodedHash];
  const shouldStrip = hashesToCheck.some((hash) =>
    LEGACY_LOGIN_HASH_PREFIXES.some(
      (prefix) => hash === prefix || hash.startsWith(`${prefix}?`) || hash.startsWith(`${prefix}/`)
    )
  );

  if (shouldStrip) {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  return shouldStrip;
};

stripLegacyLoginHash();

const getOnboardingTenantsUrl = (): string => {
  const url = import.meta.env.VITE_ONBOARDING_TENANTS_URL?.trim();
  if (!url) {
    throw new Error('Missing VITE_ONBOARDING_TENANTS_URL');
  }
  return url;
};

const slugifySubdomain = (value: string): string => {
  const normalized = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);

  return normalized || 'restaurante';
};

const parseApiMessage = (data: unknown): string | null => {
  if (!data || typeof data !== 'object') return null;
  const maybeData = data as Record<string, unknown>;
  const candidates = [maybeData.message, maybeData.mensagem, maybeData.error];
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) return candidate;
  }
  return null;
};

// Função para sanitizar inputs e prevenir injeção de caracteres maliciosos
const sanitizeInput = (value: string): string => {
  return value
    .replace(/[;'"\\]/g, '') // Remove caracteres comuns de SQL Injection
    .trim();
};

// Types
interface SignupFormExtended extends SignupForm {
  documentType: 'CPF' | 'CNPJ';
}

const INITIAL_SIGNUP_FORM_EXTENDED: SignupFormExtended = {
  cnpj: '',
  nomeEmpresa: '',
  nomeAdmin: '',
  email: '',
  telefone: '',
  estado: '',
  subdomain: '',
  documentType: 'CNPJ'
};

// Components
const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 z-10">
          <X className="h-6 w-6" />
        </button>
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Acesse sua conta</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                placeholder="Sua senha"
              />
            </div>
            <button className="w-full bg-orange-600 text-white py-4 rounded-xl font-black hover:bg-orange-700 transition-colors shadow-xl shadow-orange-600/30">
              Entrar
            </button>
            <div className="text-center pt-2">
              <a href="#" className="text-sm font-bold text-orange-600 hover:underline">Esqueci minha senha</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const Navbar: React.FC<{ onOpenModal: () => void; onOpenLogin: () => void }> = ({ onOpenModal, onOpenLogin }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1"
            >
              <img src={iconLogo} alt="Riberfood Icon" className="w-10 h-10 object-contain" />
              <img src={textLogo} alt="RIBERFOOD" className="h-8 object-contain" />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#solucao" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Solução</a>
              <a href="#beneficios" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Benefícios</a>
              <a href="#faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</a>
              <button
                onClick={onOpenLogin}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full text-sm font-black transition-all shadow-lg shadow-orange-600/30 flex items-center gap-2 transform hover:scale-105 active:scale-95"
              >
                <Lock className="w-4 h-4" /> Login
              </button>

            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#solucao" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Solução</a>
            <a href="#beneficios" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Benefícios</a>
            <a href="#faq" onClick={() => setIsOpen(false)} className="text-gray-300 block px-3 py-2 rounded-md text-base font-medium">FAQ</a>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenLogin();
              }}
              className="w-full bg-orange-600 text-white px-3 py-3 rounded-xl text-base font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
            >
              <Lock className="w-5 h-5" /> Login
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenModal();
              }}
              className="w-full bg-orange-600 text-white px-3 py-3 rounded-md text-base font-bold"
            >
              Bora começar
            </button>
            <p className="text-orange-500 text-xs font-bold text-center mt-2 flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3" /> Comece a usar imediatamente sem Custo
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "O Riberfood cobra comissão por pedido?",
      answer: "Cobramos uma taxa fixa do cliente para custos de manter o sistema atualizado e funcionando, mas para a empresa não há custo nem mensalidade."
    },
    {
      question: "Preciso saber tecnologia para usar?",
      answer: "Não. A plataforma é extremamente simples e intuitiva. Além disso, você recebe um treinamento básico personalizado para começar com total segurança."
    },
    {
      question: "O Riberfood atende só Ribeirão Preto?",
      answer: "Nossa sede é em Ribeirão Preto/SP, mas a plataforma foi pensada para atender negócios de delivery em todo o Brasil."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center text-gray-900 mb-12">PERGUNTAS FREQUENTES</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-orange-200">
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-gray-800">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-orange-600 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600 bg-white border-t border-gray-100 animate-in slide-in-from-top-1 duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BRAZILIAN_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

const INITIAL_SIGNUP_FORM: SignupForm = {
  cnpj: '',
  nomeEmpresa: '',
  nomeAdmin: '',
  email: '',
  telefone: '',
  estado: '',
  subdomain: ''
};

const TrialModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SignupFormExtended>(INITIAL_SIGNUP_FORM_EXTENDED);
  const [isSubdomainManuallyEdited, setIsSubdomainManuallyEdited] = useState(false);
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable' | 'invalid'>('idle');
  const [subdomainError, setSubdomainError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setStep('form');
    setLoading(false);
    setSubmitError(null);
    setFormData(INITIAL_SIGNUP_FORM_EXTENDED);
    setIsSubdomainManuallyEdited(false);
    setSubdomainStatus('idle');
    setSubdomainError(null);
  }, [isOpen]);

  const validateSubdomainLocal = (sub: string): boolean => {
    if (!sub) return false;
    if (sub.length < 3) return false;
    // Lowercase letters, numbers, and single hyphens, not starting/ending with hyphen
    const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    return regex.test(sub);
  };

  const checkSubdomainAvailability = async (sub: string) => {
    if (!validateSubdomainLocal(sub)) {
      setSubdomainStatus('invalid');
      setSubdomainError('O subdomínio deve ter pelo menos 3 caracteres e conter apenas letras, números e hífen (ex: pizzaria-neves).');
      return;
    }

    setSubdomainStatus('checking');
    setSubdomainError(null);

    try {
      const baseUrl = getOnboardingTenantsUrl();
      const response = await fetch(`${baseUrl}/exists?subdomain=${sub}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        mode: 'cors'
      });

      if (response.status === 200) {
        const data = await response.json();
        const exists = data.exists === true || data.available === false || data.disponivel === false || data.sucesso === false;
        if (exists) {
          setSubdomainStatus('unavailable');
          setSubdomainError('Este subdomínio já está em uso. Tente outro.');
        } else {
          setSubdomainStatus('available');
        }
      } else if (response.status === 409) {
        setSubdomainStatus('unavailable');
        setSubdomainError('Este subdomínio já está em uso. Tente outro.');
      } else {
        console.warn('Subdomain check endpoint returned status:', response.status);
        setSubdomainStatus('available');
      }
    } catch (err) {
      console.error('Error checking subdomain availability:', err);
      setSubdomainStatus('available');
    }
  };

  useEffect(() => {
    const sub = formData.subdomain;
    if (!sub || sub.length < 3) {
      setSubdomainStatus('idle');
      setSubdomainError(null);
      return;
    }

    if (!validateSubdomainLocal(sub)) {
      setSubdomainStatus('invalid');
      setSubdomainError('O subdomínio deve ter pelo menos 3 caracteres e conter apenas letras, números e hífen (ex: pizzaria-neves).');
      return;
    }

    setSubdomainStatus('checking');
    setSubdomainError(null);

    const timer = setTimeout(() => {
      checkSubdomainAvailability(sub);
    }, 600);

    return () => clearTimeout(timer);
  }, [formData.subdomain]);

  if (!isOpen) return null;

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');

    if (formData.documentType === 'CNPJ') {
      if (value.length > 14) value = value.slice(0, 14);
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      if (value.length > 11) value = value.slice(0, 11);
      value = value.replace(/^(\d{3})(\d)/, '$1.$2');
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
    }

    setFormData({ ...formData, cnpj: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    setFormData({ ...formData, telefone: value });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const updateData: Partial<SignupFormExtended> = { nomeEmpresa: name };
    
    if (!isSubdomainManuallyEdited) {
      const suggested = slugifySubdomain(name);
      updateData.subdomain = suggested === 'restaurante' && !name ? '' : suggested;
    }
    
    setFormData(prev => ({ ...prev, ...updateData }));
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubdomainManuallyEdited(true);
    const value = e.target.value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-');
    
    setFormData(prev => ({ ...prev, subdomain: value }));
  };

  const handleSubdomainBlur = () => {
    const sub = formData.subdomain;
    if (sub && sub.length >= 3 && subdomainStatus === 'checking') {
      checkSubdomainAvailability(sub);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subdomainStatus === 'unavailable' || subdomainStatus === 'invalid') {
      setSubmitError('Por favor, corrija o subdomínio antes de prosseguir.');
      return;
    }
    setLoading(true);
    setSubmitError(null);

    try {
      const normalizedDocument = formData.cnpj.replace(/\D/g, '');
      const payload: OnboardingTenantPayload = formData.documentType === 'CNPJ'
        ? {
            person_type: 'company',
            name: sanitizeInput(formData.nomeEmpresa),
            cnpj: normalizedDocument,
            owner_email: sanitizeInput(formData.email),
            owner_name: sanitizeInput(formData.nomeAdmin),
            subdomain: slugifySubdomain(formData.subdomain || formData.nomeEmpresa),
          }
        : {
            person_type: 'individual',
            name: sanitizeInput(formData.nomeEmpresa),
            cpf: normalizedDocument,
            owner_email: sanitizeInput(formData.email),
            owner_name: sanitizeInput(formData.nomeAdmin),
            subdomain: slugifySubdomain(formData.subdomain || formData.nomeEmpresa),
          };

      const response = await fetch(getOnboardingTenantsUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
      });

      let data: unknown = null;
      const raw = await response.text();
      if (raw) {
        try {
          data = JSON.parse(raw);
        } catch {
          data = raw;
        }
      }

      if (response.status === 201 || response.ok) {
        setStep('success');
        return;
      }

      if (response.status === 409) {
        setSubmitError(parseApiMessage(data) || 'Ja existe uma empresa com estes dados (CNPJ ou subdominio).');
        return;
      }

      if (response.status === 422) {
        setSubmitError(parseApiMessage(data) || 'Dados invalidos. Revise as informacoes e tente novamente.');
        return;
      }

      setSubmitError(parseApiMessage(data) || 'Nao foi possivel concluir o onboarding agora. Tente novamente em instantes.');
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error && error.message === 'Missing VITE_ONBOARDING_TENANTS_URL') {
        setSubmitError('Configuracao ausente: defina VITE_ONBOARDING_TENANTS_URL para habilitar o onboarding.');
      } else {
        setSubmitError('Erro de conexao com o ambiente de staging. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors z-10 bg-white/80 backdrop-blur-sm rounded-full"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {step === 'form' ? (
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Comece a usar imediatamente sem Custo</h2>
              <p className="text-gray-600 mb-8">Preencha os dados abaixo para iniciar seu onboarding.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {submitError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {submitError}
                  </div>
                )}
                <div className="flex gap-4 p-1 bg-gray-100 rounded-2xl mb-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, documentType: 'CNPJ', cnpj: '' })}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${formData.documentType === 'CNPJ' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                  >
                    <Building className="w-4 h-4" /> CNPJ
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, documentType: 'CPF', cnpj: '' })}
                    className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${formData.documentType === 'CPF' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:bg-white/50'}`}
                  >
                    <User className="w-4 h-4" /> CPF
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">{formData.documentType} <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    placeholder={formData.documentType === 'CNPJ' ? "00.000.000/0000-00" : "000.000.000-00"}
                    minLength={formData.documentType === 'CNPJ' ? 18 : 14}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                    value={formData.cnpj}
                    onChange={handleDocumentChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome da Empresa <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Pizzaria do João"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                    value={formData.nomeEmpresa}
                    onChange={handleCompanyChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subdomínio <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      required
                      type="text"
                      placeholder="Ex: pizzaria-neves"
                      className={`w-full px-4 py-3 rounded-xl border transition-all outline-none ${
                        subdomainStatus === 'available'
                          ? 'border-green-500 focus:border-green-600 focus:ring-2 focus:ring-green-500/20'
                          : subdomainStatus === 'unavailable' || subdomainStatus === 'invalid'
                          ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
                          : 'border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20'
                      }`}
                      value={formData.subdomain}
                      onChange={handleSubdomainChange}
                      onBlur={handleSubdomainBlur}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      {subdomainStatus === 'checking' && (
                        <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                      )}
                      {subdomainStatus === 'available' && (
                        <span className="text-green-500 font-bold text-lg">✓</span>
                      )}
                      {(subdomainStatus === 'unavailable' || subdomainStatus === 'invalid') && (
                        <span className="text-red-500 font-bold text-lg">✗</span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Seu link será: <strong className="text-gray-700">{formData.subdomain || 'seu-nome'}.riberfood.com</strong>. Use letras minúsculas, números e hífens para separar (ex: pizzaria-neves).
                  </p>
                  {subdomainError && (
                    <p className="text-xs text-red-500 mt-1 font-medium">{subdomainError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Estado <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none appearance-none bg-white"
                      value={formData.estado}
                      onChange={e => setFormData({ ...formData, estado: e.target.value })}
                    >
                      <option value="" disabled>Selecione um estado</option>
                      {BRAZILIAN_STATES.map(state => (
                        <option key={state.value} value={state.value}>
                          {state.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="Nome completo"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                      value={formData.nomeAdmin}
                      onChange={e => setFormData({ ...formData, nomeAdmin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Telefone <span className="text-red-500">*</span></label>
                    <input
                      required
                      type="text"
                      placeholder="(00) 00000-0000"
                      minLength={14}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full mt-6 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 rounded-xl text-lg font-black transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2"
                >
                  {loading ? 'Processando...' : 'Começar Imediatamente'} <TrendingUp className="w-5 h-5" />
                </button>
              </form>
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">✅ Tudo pronto!</h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                  {formData.documentType === 'CNPJ'
                    ? 'Seu cadastro foi realizado com sucesso! Verifique seu e-mail para os próximos passos.'
                    : 'Recebemos seus dados! Um consultor da Riberfood entrará em contato em breve.'}
                </p>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <p className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-2">Contato informado:</p>
                  <p className="text-lg font-bold text-gray-900">{formData.email}</p>
                </div>

                <div className="text-left space-y-4 max-w-xs mx-auto">
                  <p className="font-medium">Proximos passos:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      <span>Acompanhar o retorno do time Riberfood</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      <span>Confirmar dados enviados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      <span>Prosseguir com ativacao quando orientado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SupportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      nome: sanitizeInput(formData.nome),
      email: sanitizeInput(formData.email),
      mensagem: sanitizeInput(formData.mensagem)
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 z-10">
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          {step === 'form' ? (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Suporte Riberfood</h2>
              <p className="text-gray-600 mb-6">Como podemos ajudar você hoje?</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none resize-none"
                    value={formData.mensagem}
                    onChange={e => setFormData({ ...formData, mensagem: e.target.value })}
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 rounded-xl text-lg font-black transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensagem'} <TrendingUp className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Mensagem Enviada!</h2>
              <p className="text-gray-600 mb-6">Recebemos sua solicitação. Nosso time entrará em contato em breve.</p>
              <button
                onClick={onClose}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WaitlistModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: ''
  });

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
    setFormData({ ...formData, telefone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      nome: sanitizeInput(formData.nome),
      telefone: sanitizeInput(formData.telefone),
      email: sanitizeInput(formData.email)
    };

    // Simulate API call for waitlist
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 z-10">
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          {step === 'form' ? (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Entre na lista de espera</h2>
              <p className="text-gray-600 mb-6">Seja o primeiro a saber quando os novos recursos estiverem disponíveis.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nome</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Telefone</label>
                  <input
                    required
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-600/20 outline-none"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-4 rounded-xl font-black hover:bg-orange-700 transition-colors"
                >
                  {loading ? 'Enviando...' : 'Entrar na lista'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Inscrito com sucesso!</h2>
              <p className="text-gray-600">Avisaremos você assim que as novidades chegarem.</p>
              <button
                onClick={onClose}
                className="mt-6 text-orange-600 font-bold hover:underline"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const formatCurrency = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';
  
  let cleanDigits = digits;
  if (cleanDigits.length < 3) {
    cleanDigits = cleanDigits.padStart(3, '0');
  }
  
  const integerPart = cleanDigits.slice(0, -2);
  const decimalPart = cleanDigits.slice(-2);
  
  const formattedInteger = parseInt(integerPart, 10).toLocaleString('pt-BR');
  return `${formattedInteger},${decimalPart}`;
};

const EconomySimulator: React.FC = () => {
  const [orders, setOrders] = useState<string>('1000');
  const [ticket, setTicket] = useState<string>('30,00');
  const [savings, setSavings] = useState<number>(0);

  const calculate = () => {
    const numOrders = parseFloat(orders) || 0;
    const cleanedTicket = ticket.replace(/\./g, '').replace(',', '.');
    const numTicket = parseFloat(cleanedTicket) || 0;
    // Calculation: (orders * ticket) * 20% commission
    const totalSavings = (numOrders * numTicket) * 0.20;
    setSavings(totalSavings);
  };

  // Run calculation on mount and whenever input changes
  useEffect(() => {
    calculate();
  }, [orders, ticket]);

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1 w-full space-y-4">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3 mb-6">
            <span role="img" aria-label="money bags">💰</span> Simulador de Economia
          </h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 text-left">Pedidos por mês</label>
            <input type="text" inputMode="numeric" value={orders} onChange={(e) => setOrders(e.target.value.replace(/\D/g, ''))} className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-600 focus:outline-none text-lg font-bold text-gray-900 transition-all" placeholder="Ex: 1000" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 text-left">Ticket Médio (R$)</label>
            <input type="text" inputMode="numeric" value={ticket} onChange={(e) => setTicket(formatCurrency(e.target.value))} className="w-full px-5 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:border-orange-600 focus:outline-none text-lg font-bold text-gray-900 transition-all" placeholder="Ex: 30,00" />
          </div>
          <button onClick={calculate} className="w-full bg-orange-700 hover:bg-orange-800 text-white py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-orange-700/20 transform active:scale-95 mt-4">
            Calcular Economia
          </button>
        </div>
        <div className="flex-1 w-full">
          <div className="bg-green-600 rounded-3xl p-8 text-white relative overflow-hidden h-full flex flex-col justify-center min-h-[250px] group">
            <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform"><PartyPopper className="w-20 h-20" /></div>
            <p className="text-sm font-bold opacity-90 mb-2 uppercase tracking-wide flex items-center gap-2">🎉 Você economiza por mês:</p>
            <div className="text-4xl md:text-5xl font-black mb-4 break-words">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(savings)}
            </div>
            <p className="text-xs opacity-80 mt-2">*Em comparação com plataformas que cobram 20%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const DashboardNavbar: React.FC<{ onOpenModal: () => void; onOpenLogin: () => void }> = ({ onOpenModal, onOpenLogin }) => (
  <nav className="fixed top-0 left-0 right-0 z-[60] py-6 px-4 bg-gray-900/50 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2">
        <img src={textLogo} alt="RIBERFOOD" className="h-8 object-contain" />
      </a>
      <div className="flex items-center gap-4">
        <button onClick={onOpenLogin} className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Login</button>
      </div>
    </div>
  </nav>
);

type ActiveSection = 'solucao' | 'beneficios' | 'faq' | 'calculadora' | 'como-funciona' | 'planos' | 'metodologia' | null;

const SolucaoSection: React.FC = () => (
  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
    <div className="text-left mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
        MAIS CONTROLE. MENOS CUSTO.
      </h2>
      <p className="text-xl text-gray-400">O Riberfood organiza seu delivery em um só lugar.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-8 rounded-3xl border border-white/10 hover:border-orange-500 transition-colors">
        <div className="w-14 h-14 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
          <Smartphone className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-white mb-4">Pedidos Centralizados</h3>
        <p className="text-gray-400 text-lg">Chega de sistemas separados. Pedidos e entregas organizados em uma única tela.</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-3xl border border-white/10 hover:border-orange-500 transition-colors">
        <div className="w-14 h-14 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
          <DollarSign className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-white mb-4">Lucro 100% Seu</h3>
        <p className="text-gray-400 text-lg">Sem comissão por pedido. Você vende mais e não paga taxas abusivas.</p>
      </div>
      <div className="bg-gray-800 p-8 rounded-3xl border border-white/10 hover:border-orange-500 transition-colors md:col-span-2">
        <div className="w-14 h-14 bg-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
          <Zap className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black text-white mb-4">Simples e Direto</h3>
        <p className="text-gray-400 text-lg">Design focado na velocidade. Treinamento básico incluso para sua equipe.</p>
      </div>
    </div>
  </div>
);

const BeneficiosSection: React.FC = () => (
  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
     <div className="text-left mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
        DORES DO DELIVERY
      </h2>
      <p className="text-xl text-gray-400">Você só queria controle, mas a realidade tem sido estressante.</p>
    </div>
    <div className="space-y-6">
      {[
        "Pedidos chegando de vários lados e se perdendo",
        "Horário de pico e alguém diz: 'Esse pedido já saiu?'",
        "Taxas altas dos apps sugando todo o seu lucro"
      ].map((item, i) => (
        <div key={i} className="bg-gray-800 p-6 rounded-2xl border border-red-500/20 flex items-center gap-4">
          <div className="bg-red-500/20 p-3 rounded-full flex-shrink-0">
            <X className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-white text-lg font-medium">{item}</span>
        </div>
      ))}
    </div>
    <div className="mt-12 bg-orange-500/10 p-8 rounded-3xl border border-orange-500/20">
      <h3 className="text-xl font-bold text-orange-400 mb-6">Nossa promessa:</h3>
      <div className="space-y-4 text-gray-300 font-medium">
        <p>• Centralizamos tudo em uma tela.</p>
        <p>• Acabamos com as taxas abusivas.</p>
        <p>• Interface super simples para funcionários.</p>
      </div>
    </div>
  </div>
);

const ComoFuncionaSection: React.FC = () => (
  <div className="animate-in slide-in-from-right-8 fade-in duration-500">
    <div className="text-left mb-12">
      <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
        COMO FUNCIONA
      </h2>
    </div>
    <div className="grid sm:grid-cols-2 gap-6">
      {[
        { step: "1", title: "Cliente faz o pedido", desc: "Ele acessa seu cardápio digital e finaliza a compra." },
        { step: "2", title: "Pedido vai direto para você", desc: "O pedido chega automaticamente na sua operação." },
        { step: "3", title: "Taxa repassada", desc: "A taxa operacional é cobrada do cliente consumidor." },
        { step: "4", title: "Sem mensalidade", desc: "Você não paga mensalidade e mantém sua margem." }
      ].map((item, i) => (
        <div key={i} className="bg-gray-800 p-8 rounded-3xl border border-white/10">
          <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-black mb-6">
            {item.step}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const MetodologiaSection: React.FC = () => (
  <div className="animate-in slide-in-from-right-8 fade-in duration-500 space-y-12">
    <div className="text-left">
      <h1 className="text-4xl md:text-6xl font-black leading-tight text-white mb-6">
        Uma plataforma pensada para você <span className="text-orange-600">lucrar mais.</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-3xl">
        Sem mensalidade e sem precisar aumentar o preço dos seus produtos para pagar taxas abusivas.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex-1">
        <p className="font-bold text-gray-500 text-sm uppercase tracking-widest mb-4">Vendeu pouco?</p>
        <p className="text-2xl font-black text-gray-900 leading-snug">Não se preocupa com mensalidade.</p>
      </div>
      <div className="bg-orange-700 p-8 rounded-3xl shadow-lg flex-1 transform hover:scale-105 transition-transform">
        <p className="font-bold text-orange-200 text-sm uppercase tracking-widest mb-4">Vendeu muito?</p>
        <p className="text-2xl font-black text-white leading-snug">O lucro é seu — nós apenas ajudamos.</p>
      </div>
    </div>

    <div className="bg-gray-800 rounded-[3rem] p-8 md:p-12 text-white border border-white/10 relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">Comece a usar nossa plataforma hoje mesmo</h2>
          <p className="text-gray-400 text-lg">Junte-se a centenas de restaurantes que transformaram sua gestão digital sem custos fixos abusivos.</p>
        </div>
        <ul className="space-y-6 text-lg font-medium">
          <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <CheckCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <span>Sistema completo para restaurantes e delivery.</span>
          </li>
          <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <CheckCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <span>Sem mensalidade. Sem pegadinhas.</span>
          </li>
          <li className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <CheckCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
            <span>Sem prazo promocional.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const PlansSection: React.FC<{ onSelectFree: () => void; onSelectSoon: () => void }> = ({ onSelectFree, onSelectSoon }) => {
  const freeBenefits = [
    "Cardápio digital via Link e QR Code",
    "Cardápio com fotos e descrições",
    "Pedidos ilimitados sem comissão",
    "Gestão de Pedidos e Entregas",
    "Painel do Lojista e Relatórios",
    "Suporte via WhatsApp",
  ];

  const soonBenefits = [
    "KDS — Display de Cozinha",
    "App Garçom e Entregador",
    "Controle de Mesas e Comanda",
    "Cupom Fiscal NFC-e",
    "Roteirização de Entregas"
  ];

  return (
    <div className="animate-in slide-in-from-right-8 fade-in duration-500">
      <div className="text-left mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">PLANOS</h1>
        <p className="text-xl text-gray-400">Transparência total e sem taxas ocultas.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] p-1 shadow-2xl">
          <div className="bg-orange-600 rounded-[1.8rem] p-6 text-white mb-6">
            <h2 className="text-2xl font-black mb-2">Plano Completo</h2>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-lg opacity-80 line-through">R$ 299,00</span>
              <div className="flex items-baseline">
                <span className="text-4xl font-black">R$ 0,00</span>
                <span className="text-sm opacity-80 ml-1">/mês</span>
              </div>
            </div>
            <p className="text-sm font-medium opacity-90">Sem mensalidade. Simples assim.</p>
          </div>
          <div className="p-6 pt-0 text-gray-900 text-left">
            <ul className="grid grid-cols-1 gap-3 mb-8 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              {freeBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={onSelectFree}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-black transition-all transform hover:scale-[1.02] shadow-xl shadow-orange-600/30"
            >
              Quero este plano
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-[2rem] p-1 border border-white/10 relative overflow-hidden">
          <div className="absolute top-8 right-[-50px] bg-orange-600 text-white px-16 py-1.5 rotate-45 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg z-20 flex justify-center items-center w-[200px]">
            Em Breve
          </div>
          <div className="p-6 mb-4">
            <h2 className="text-2xl font-black mb-2 text-white">Futuro</h2>
            <p className="text-gray-400">Recursos incríveis chegando</p>
          </div>
          <div className="p-6 pt-0 text-left">
            <ul className="space-y-3 mb-8">
              {soonBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-white">
                  <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={onSelectSoon}
              className="w-full border-2 border-white/20 hover:border-white text-white py-4 rounded-xl font-black transition-all"
            >
              Entrar na lista de espera
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  useEffect(() => {
    stripLegacyLoginHash();
    setIsLoginOpen(false);
  }, []);

  const navItems = [
    { id: 'solucao', label: 'Solução', icon: <Monitor className="w-8 h-8" /> },
    { id: 'beneficios', label: 'Benefícios', icon: <TrendingUp className="w-8 h-8" /> },
    { id: 'faq', label: 'FAQ / Perguntas', icon: <CheckCircle className="w-8 h-8" /> },
    { id: 'calculadora', label: 'Calculadora', icon: <DollarSign className="w-8 h-8" /> },
    { id: 'como-funciona', label: 'Como Funciona', icon: <Smartphone className="w-8 h-8" /> },
    { id: 'planos', label: 'Planos', icon: <Truck className="w-8 h-8" /> },
    { id: 'metodologia', label: 'Metodologia', icon: <Zap className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans overflow-x-hidden">
      <DashboardNavbar onOpenModal={() => setActiveSection('planos')} onOpenLogin={() => setIsLoginOpen(true)} />
      
      <TrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      <main className="flex-1 flex flex-col pt-32 pb-12 relative items-center justify-center min-h-[80vh]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 transition-all duration-700 ease-in-out`}>
          
          {/* Navigation Area */}
          <div className={`transition-all duration-700 ease-in-out flex flex-col ${activeSection ? 'lg:w-1/4 w-full' : 'w-full items-center justify-center'}`}>
            
            {!activeSection && (
              <div className="text-center mb-16 animate-in fade-in zoom-in duration-700">
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-orange-600/20 text-orange-400 rounded-full tracking-wider uppercase border border-orange-600/30">
                  SELECIONE UMA OPÇÃO
                </span>
                <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                  O que você quer ver <span className="text-orange-600">hoje?</span>
                </h1>
              </div>
            )}

            <div className={`grid gap-4 w-full transition-all duration-700 ${activeSection ? 'grid-cols-2 lg:grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto'}`}>
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(isActive ? null : item.id as ActiveSection)}
                    className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all duration-300 
                      ${isActive 
                        ? 'bg-orange-600 border-orange-500 shadow-xl shadow-orange-600/30 text-white scale-105 z-10' 
                        : 'bg-gray-800/80 border-white/5 hover:border-orange-500/50 hover:bg-gray-800 text-gray-400 hover:text-white hover:scale-105 hover:-translate-y-1'
                      }`}
                  >
                    <div className="mb-4">{item.icon}</div>
                    <span className="font-bold text-sm tracking-wide">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          {activeSection && (
            <div className="w-full lg:w-3/4 animate-in slide-in-from-right-12 fade-in duration-500 bg-gray-800/30 backdrop-blur-md border border-white/5 p-6 lg:p-12 rounded-[3rem] shadow-2xl relative z-10 min-h-[60vh] flex flex-col justify-center overflow-y-auto custom-scrollbar max-h-[80vh]">
              {activeSection === 'solucao' && <div className="w-full"><SolucaoSection /></div>}
              {activeSection === 'beneficios' && <div className="w-full"><BeneficiosSection /></div>}
              {activeSection === 'faq' && (
                <div className="w-full bg-white rounded-[2.5rem] overflow-hidden -m-4 sm:-m-8 p-4 sm:p-8 shadow-xl">
                  <FAQSection />
                </div>
              )}
              {activeSection === 'calculadora' && <div className="w-full"><EconomySimulator /></div>}
              {activeSection === 'como-funciona' && <div className="w-full"><ComoFuncionaSection /></div>}
              {activeSection === 'metodologia' && <div className="w-full"><MetodologiaSection /></div>}
              {activeSection === 'planos' && <div className="w-full"><PlansSection onSelectFree={() => setIsModalOpen(true)} onSelectSoon={() => setIsWaitlistOpen(true)} /></div>}
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-white/5 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md">
              <img src={iconLogo} alt="Riberfood Icon" className="w-8 h-8 object-contain" />
            </div>
            <img src={textLogo} alt="RIBERFOOD" className="h-6 object-contain filter brightness-0 invert opacity-80" />
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <button onClick={() => setIsSupportOpen(true)} className="hover:text-white transition-colors">Suporte</button>
            <a href="https://lojista.riberfood.com" className="hover:text-white transition-colors">Área do Lojista</a>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Safe Trust Tecnology. Todos os direitos reservados. Ribeirão Preto - SP.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
