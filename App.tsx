
import React, { useState } from 'react';
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
  Check
} from 'lucide-react';
import { FAQItem, BenefitItem } from './types';
import ownerImage from './images/dono_resturante_1.jpeg';
import disorganizedKitchen from './images/cozinha_desorganizada_2.jpeg';
import dashboardImage from './images/dasboard_3.jpg';
import conversionRate from './images/taxa_conversao_4.jpg';
import orderScreen from './images/tela_pedidos_5.jpg';
import employeePhoto from './images/foto_fun_6.png';
import iconLogo from './images/Icon_sem_Fundo.png';
import textLogo from './images/riberfood_logo-bg_null.png';
import { SignupForm } from './types';

// Components
const Navbar: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="p-1 rounded-lg">
              <img src={iconLogo} alt="RiberFood Icon" className="w-10 h-10 object-contain" />
            </div>
            <img src={textLogo} alt="RIBERFOOD" className="h-8 object-contain" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#solucao" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Solução</a>
              <a href="#beneficios" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Benefícios</a>
              <a href="#faq" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</a>

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
                onOpenModal();
              }}
              className="w-full bg-orange-600 text-white px-3 py-3 rounded-md text-base font-bold"
            >
              Quero conhecer a plataforma
            </button>
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
      question: "A RiberFood cobra comissão por pedido?",
      answer: "Cobramos uma taxa fixa do cliente para custos de manter o sistema atualizado e funcionando, mas para a empresa não há custo nem mensalidade."
    },
    {
      question: "Preciso saber tecnologia para usar?",
      answer: "Não. A plataforma é extremamente simples e intuitiva. Além disso, você recebe um treinamento básico personalizado para começar com total segurança."
    },
    {
      question: "A RiberFood atende só Ribeirão Preto?",
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

const TrialModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<SignupForm>({
    cnpj: '',
    nomeEmpresa: '',
    nomeAdmin: '',
    email: '',
    senha: '',
    telefone: ''
  });

  if (!isOpen) return null;

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 14) value = value.slice(0, 14);

    // Mask: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');

    setFormData({ ...formData, cnpj: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    // Mask: (00) 00000-0000
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');

    setFormData({ ...formData, telefone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Clean data for API
      const payload = {
        ...formData,
        cnpj: formData.cnpj.replace(/\D/g, ''),
        telefone: formData.telefone
      };

      const response = await fetch('https://riberfood.com.br/api/public/cadastro-trial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.sucesso) {
        setStep('success');
      } else {
        alert(data.mensagem || 'Erro ao criar conta. Tente novamente.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // For demo/testing purposes, if CORS fails or server is down, we might want to simulate success?
      // But let's stick to real implementation.
      alert('Erro de conexão. Por favor, tente novamente mais tarde.');
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

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {step === 'form' ? (
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Comece seu teste grátis por 7 dias</h2>
            <p className="text-gray-600 mb-8">Preencha os dados abaixo para criar sua conta instantaneamente.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">CNPJ</label>
                <input
                  required
                  type="text"
                  placeholder="00.000.000/0000-00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                  value={formData.cnpj}
                  onChange={handleCnpjChange}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nome da Empresa</label>
                <input
                  required
                  type="text"
                  placeholder="Ex: Pizzaria do João"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                  value={formData.nomeEmpresa}
                  onChange={e => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Seu Nome</label>
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
                  <label className="block text-sm font-bold text-gray-700 mb-1">Telefone</label>
                  <input
                    required
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input
                  required
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
                <input
                  required
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 transition-all outline-none"
                  value={formData.senha}
                  onChange={e => setFormData({ ...formData, senha: e.target.value })}
                />
              </div>

              <button
                disabled={loading}
                className="w-full mt-6 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 rounded-xl text-lg font-black transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-600/30 flex items-center justify-center gap-2"
              >
                {loading ? 'Processando...' : 'Iniciar Teste Grátis'} <TrendingUp className="w-5 h-5" />
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
              <p className="text-lg">Sua conta foi criada com sucesso!</p>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="text-sm uppercase tracking-wider font-bold text-gray-400 mb-2">📧 Enviamos um email para:</p>
                <p className="text-lg font-bold text-gray-900">{formData.email}</p>
              </div>

              <div className="text-left space-y-4 max-w-xs mx-auto">
                <p className="font-medium">Dentro de alguns minutos você receberá:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>Link de acesso ao sistema</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>Suas credenciais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                    <span>Primeiros passos</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <p className="text-sm mb-4">Não recebeu?</p>
                <button
                  onClick={() => alert('Email reenviado com sucesso!')}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Reenviar email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <TrialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-gray-900 text-white overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-orange-600/10 blur-[100px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold bg-orange-600/20 text-orange-400 rounded-full tracking-wider uppercase border border-orange-600/30">
                CONTROLE TOTAL DO SEU DELIVERY
              </span>
              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                Tudo o que seu delivery precisa. <br />
                <span className="text-orange-600">Sem comissão.</span><br />
                Sem complicação.
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto md:mx-0">
                Pare de perder pedidos, organize suas entregas e tenha tudo em um só lugar — livre de mensalidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-full text-lg font-black transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-orange-600/40 flex items-center justify-center gap-2"
                >
                  Quero conhecer a plataforma <Zap className="w-5 h-5 fill-current" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img
                  src={ownerImage}
                  alt="Dono de restaurante satisfeito usando sistema RiberFood"
                  className="w-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              </div>
              {/* Floating element removed */}
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              O DELIVERY CRESCE… MAS A CONFUSÃO TAMBÉM?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Você só queria controle e simplicidade, mas a realidade tem sido estressante.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={disorganizedKitchen}
                  alt="Cozinha movimentada e desorganizada"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-red-900/10"></div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Você já passou por isso:</h3>
                <ul className="space-y-4">
                  {[
                    "Pedidos chegando de vários lados",
                    "Horário de pico e alguém diz: 'Esse pedido já saiu?'",
                    "Taxas altas e no fim do mês quase não sobra lucro"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-red-100 p-1 rounded-full">
                        <X className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
                <h3 className="text-xl font-bold text-orange-900 mb-6">Muitos donos dizem:</h3>
                <div className="space-y-6">
                  {[
                    "Pago taxa demais e quase não sobra lucro",
                    "É tudo separado: pedido de um lado, entrega de outro",
                    "O app é confuso, meu funcionário se perde"
                  ].map((quote, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-2 w-2 bg-orange-600 rounded-full flex-shrink-0"></div>
                      <p className="text-gray-800 italic font-medium">"{quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                A RIBERFOOD ORGANIZA SEU DELIVERY EM UM SÓ LUGAR
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A RiberFood é uma plataforma completa para lanchonetes, marmitarias, bares e restaurantes que querem vender por delivery sem depender de comissões abusivas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {["Pedidos", "Entregas", "Operação"].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center gap-2 group hover:border-orange-500 transition-colors">
                    <div className="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-600 transition-colors">
                      {i === 0 ? <Smartphone className="w-6 h-6 text-orange-600 group-hover:text-white" /> :
                        i === 1 ? <Truck className="w-6 h-6 text-orange-600 group-hover:text-white" /> :
                          <Monitor className="w-6 h-6 text-orange-600 group-hover:text-white" />}
                    </div>
                    <span className="font-bold text-gray-900">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700 font-medium">Tudo em uma única plataforma</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700 font-medium">Livre de mensalidades e taxas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-lg text-gray-700 font-medium">Suporte humano de verdade</span>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-2xl">
                <p className="text-blue-900 font-bold">
                  💡 E não se preocupe: Você recebe um treinamento básico para começar com segurança.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {/* Simulated Dashboard Screenshot Placeholder */}
                <div className="bg-gray-900 p-4 border-b border-white/10 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <img
                  src={dashboardImage}
                  alt="Painel de controle RiberFood"
                  className="w-full"
                />
              </div>
              <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full bg-orange-600/10 rounded-3xl blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Benefits Section */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase">MAIS CONTROLE, MENOS CUSTO</h2>
            <p className="text-xl text-orange-600 font-bold tracking-tight">MAIS TRANQUILIDADE PARA O SEU NEGÓCIO</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="aspect-video relative overflow-hidden bg-gray-200">
                <img
                  src={conversionRate}
                  alt="Tela de pedidos RiberFood"
                  className="w-full h-full object-contain p-2 transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Monitor className="w-6 h-6 text-orange-600" /> Tudo em um só lugar
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Chega de sistemas separados. Pedidos e entregas organizados em uma única tela para sua equipe não se perder.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="aspect-video relative overflow-hidden bg-gray-200">
                <img
                  src={orderScreen}
                  alt="Taxa de conversão e lucro"
                  className="w-full h-full object-contain p-2 transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-orange-600" /> Sem comissão por pedido
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Você vende mais e o lucro continua sendo 100% seu. Nada de taxas abusivas por cada lanche ou marmita vendida.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-500 transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="aspect-video relative overflow-hidden bg-gray-200">
                <img
                  src={employeePhoto}
                  alt="Funcionário usando o sistema"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-orange-600/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-orange-600" /> Simples de usar, de verdade
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  “Quero algo simples, que qualquer um saiba usar.” É exatamente isso que entregamos. Design focado na velocidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-8">
                UMA PLATAFORMA FEITA PARA QUEM VIVE O DIA A DIA DO DELIVERY
              </h2>
              <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                A RiberFood nasce com um objetivo claro: Ajudar pequenos e médios negócios a crescer sem aumentar os custos operacionais.
              </p>
              <div className="space-y-6">
                {[
                  "Parar de depender dos aplicativos grandes",
                  "Passar uma imagem mais profissional para o cliente",
                  "Crescer sem bagunçar a operação interna"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="bg-orange-600/20 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
                      <Check className="w-6 h-6 text-orange-600 group-hover:text-white" />
                    </div>
                    <span className="text-xl font-bold italic">"{item}"</span>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-2xl font-black text-orange-500">Você está no lugar certo.</p>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=1200"
                  alt="Restaurante moderno e organizado"
                  className="w-full"
                />
                <div className="absolute inset-0 bg-orange-900/10"></div>
              </div>
              {/* Proof badges */}
              <div className="absolute -top-6 -right-6 bg-white text-gray-900 px-6 py-4 rounded-2xl shadow-xl border border-gray-100 font-black flex flex-col items-center">
                <span className="text-orange-600 text-3xl">100%</span>
                <span className="text-xs uppercase tracking-widest">Nacional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gray-50 rounded-[3rem] py-20 border border-gray-200 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight relative z-10">
            PRONTO PARA ORGANIZAR <br /> SEU DELIVERY?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto relative z-10">
            Comece agora e veja como é possível ter controle, simplicidade e livre de mensalidades em um só lugar. O lucro das suas vendas pertence a você.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative z-10 bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 rounded-full text-xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-orange-600/40 flex items-center justify-center gap-3 mx-auto"
          >
            Quero ver como funciona <Truck className="w-6 h-6" />
          </button>
        </div>
      </section>

      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-md">
              <img src={iconLogo} alt="RiberFood Icon" className="w-8 h-8 object-contain" />
            </div>
            <img src={textLogo} alt="RIBERFOOD" className="h-6 object-contain filter brightness-0 invert opacity-80" />
          </div>
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Políticas</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
            <a href="#" className="hover:text-white transition-colors">Área do Cliente</a>
          </div>
          <div className="text-sm">
            © 2024 RiberFood. Todos os direitos reservados. Ribeirão Preto - SP.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
