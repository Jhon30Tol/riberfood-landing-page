import sys

with open('App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add ArrowLeft to imports
if "ArrowLeft" not in content[:1000]:
    content = content.replace("import {\n  CheckCircle,", "import {\n  ArrowLeft,\n  CheckCircle,")

# Split lines to keep everything before DashboardNavbar
lines = content.split('\n')
idx = -1
for i, line in enumerate(lines):
    if 'const DashboardNavbar:' in line:
        idx = i
        break

if idx != -1:
    kept_lines = [line + '\n' for line in lines[:idx]]
else:
    kept_lines = [line + '\n' for line in lines]

new_code = """const DashboardNavbar: React.FC<{ onOpenModal: () => void; onOpenLogin: () => void }> = ({ onOpenModal, onOpenLogin }) => (
  <nav className="fixed top-0 left-0 right-0 z-[60] py-6 px-4 bg-gray-900/50 backdrop-blur-md border-b border-white/10">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <a href="/" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center gap-2">
        <img src={textLogo} alt="RIBERFOOD" className="h-8 object-contain" />
      </a>
      <div className="flex items-center gap-4">
        <button onClick={onOpenLogin} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105">Login</button>
      </div>
    </div>
  </nav>
);

type ActiveSection = 'solucao' | 'beneficios' | 'faq' | 'calculadora' | 'como-funciona' | 'planos' | 'metodologia' | null;

const SolucaoSection: React.FC = () => (
  <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
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
  <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
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
  <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
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
  <div className="animate-in slide-in-from-bottom-8 fade-in duration-500 space-y-12">
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
    <div className="animate-in slide-in-from-bottom-8 fade-in duration-500">
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

        <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 transition-all duration-700 ease-in-out`}>
          
          {/* Navigation Area */}
          <div className="transition-all duration-700 ease-in-out flex flex-col w-full items-center justify-center z-20">
            
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

            <div className={`transition-all duration-700 w-full ${activeSection ? 'flex flex-wrap justify-center gap-3 mb-8' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto'}`}>
              {activeSection && (
                  <button
                    onClick={() => setActiveSection(null)}
                    className="flex flex-col items-center justify-center transition-all duration-300 p-4 rounded-[1.5rem] border-2 bg-gray-800/80 border-white/10 hover:border-white/30 text-gray-400 hover:text-white hover:scale-105 min-w-[100px]"
                  >
                    <div className="mb-2 scale-75 text-white"><ArrowLeft className="w-8 h-8" /></div>
                    <span className="font-bold tracking-wide text-xs">Voltar</span>
                  </button>
              )}
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(isActive ? null : item.id as ActiveSection)}
                    className={`flex flex-col items-center justify-center transition-all duration-300 
                      ${activeSection ? 'p-4 rounded-[1.5rem] border min-w-[110px]' : 'p-6 rounded-[2rem] border'}
                      ${isActive 
                        ? 'bg-orange-600 border-orange-500 shadow-xl shadow-orange-600/30 text-white scale-105 z-10' 
                        : 'bg-gray-800/80 border-white/5 hover:border-orange-500/50 hover:bg-gray-800 text-gray-400 hover:text-white hover:scale-105 hover:-translate-y-1'
                      }`}
                  >
                    <div className={activeSection ? 'mb-2 scale-75' : 'mb-4'}>{item.icon}</div>
                    <span className={`font-bold tracking-wide ${activeSection ? 'text-xs' : 'text-sm'}`}>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          {activeSection && (
            <div className="w-full animate-in slide-in-from-bottom-12 fade-in duration-500 bg-gray-800/30 backdrop-blur-md border border-white/5 p-6 lg:p-12 rounded-[3rem] shadow-2xl relative z-10 min-h-[50vh] flex flex-col justify-center">
              {activeSection === 'solucao' && <div className="w-full max-w-5xl mx-auto"><SolucaoSection /></div>}
              {activeSection === 'beneficios' && <div className="w-full max-w-5xl mx-auto"><BeneficiosSection /></div>}
              {activeSection === 'faq' && (
                <div className="w-full max-w-5xl mx-auto bg-white rounded-[2.5rem] overflow-hidden -m-4 sm:-m-8 p-4 sm:p-8 shadow-xl text-gray-900">
                  <FAQSection />
                </div>
              )}
              {activeSection === 'calculadora' && <div className="w-full max-w-5xl mx-auto"><EconomySimulator /></div>}
              {activeSection === 'como-funciona' && <div className="w-full max-w-5xl mx-auto"><ComoFuncionaSection /></div>}
              {activeSection === 'metodologia' && <div className="w-full max-w-5xl mx-auto"><MetodologiaSection /></div>}
              {activeSection === 'planos' && <div className="w-full max-w-5xl mx-auto"><PlansSection onSelectFree={() => setIsModalOpen(true)} onSelectSoon={() => setIsWaitlistOpen(true)} /></div>}
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
"""

with open('App.tsx', 'w', encoding='utf-8') as f:
    f.writelines(kept_lines)
    f.write(new_code)
