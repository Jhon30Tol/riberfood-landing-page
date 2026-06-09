import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SC_DATA = {
  lojista: {
    title: 'Dashboard',
    slides: [
      { img:'/screens/lojista/dashboard.png',         url:'lojista.riberfood.com/dashboard',      title:'Dashboard',          desc:'Visão geral em tempo real com pedidos abertos, faturamento do dia e produtos mais vendidos.' },
      { img:'/screens/lojista/pedidos.png',            url:'lojista.riberfood.com/pedidos',         title:'Gestão de Pedidos',  desc:'Acompanhe todos os pedidos com filtros por status e data. Atualizações automáticas.' },
      { img:'/screens/lojista/kds.png',                url:'lojista.riberfood.com/kds',             title:'Cozinha KDS',        desc:'Display dedicado para a cozinha com pedidos em preparo atualizados em tempo real. Sem papel.' },
      { img:'/screens/lojista/gerenciar_cardapio.png', url:'lojista.riberfood.com/cardapio',        title:'Cardápio Digital',   desc:'Cadastre produtos, categorias e complementos. Ative ou desative itens instantaneamente.' },
      { img:'/screens/lojista/detalhe_pedido.png',     url:'lojista.riberfood.com/pedidos/detalhe', title:'Detalhe do Pedido',  desc:'Todas as informações do pedido — itens, endereço, cliente e status em uma única tela.' },
      { img:'/screens/lojista/conf_impressoeas.png',   url:'lojista.riberfood.com/configuracoes',   title:'Impressão Térmica',  desc:'Configure impressoras ESC/POS para impressão automática ao receber cada pedido.' },
      { img:'/screens/lojista/hub_riberfood.png',      url:'lojista.riberfood.com/hub',             title:'Hub Riberfood',      desc:'Previsibilidade total — acompanhe o custo pedido a pedido e tenha visibilidade completa do que sua operação consome.' },
    ]
  },
  garcom: {
    title: 'Gestão de Mesas',
    slides: [
      { img:'/screens/mobile/garcom_home.jpeg',                      title:'Gestão de Mesas',       desc:'Visualize todas as mesas com status em cores — livre, ocupada ou reservada.' },
      { img:'/screens/mobile/garcom_detalhe_mesa.jpeg',              title:'Detalhes da Mesa',      desc:'Veja os itens pedidos, tempo de ocupação e total em aberto de qualquer mesa.' },
      { img:'/screens/mobile/garcom_cardapio.jpg',                   title:'Cardápio por Mesa',     desc:'Navegue pelas categorias e adicione itens diretamente na mesa do cliente.' },
      { img:'/screens/mobile/garom_detalhe_produto_cardapio.jpg',    title:'Detalhe do Produto',    desc:'Veja complementos, selecione opções e envie o pedido direto para a cozinha.' },
      { img:'/screens/mobile/garcom_fechar_mesa.jpeg',               title:'Fechar Conta',          desc:'Encerre o atendimento, divida a conta e libere a mesa com confirmação na tela.' },
      { img:'/screens/mobile/garcom_cupom.jpeg',                     title:'Cupom',                 desc:'Visualize o comprovante do atendimento com todos os itens consumidos e totais.' },
    ]
  },
  entregador: {
    title: 'Em Rota',
    slides: [
      { img:'/screens/mobile/emtregador_em_rota.JPG',      title:'Em Rota',               desc:'Pedido aceito e em rota — acompanhe o status e o endereço de entrega.' },
      { img:'/screens/mobile/entregador_ganhos.JPG',       title:'Painel de Ganhos',      desc:'Acompanhe ganhos do dia, progresso da meta diária e posição no ranking.' },
      { img:'/screens/mobile/entregador_entregue.JPG',     title:'Entrega Concluída',     desc:'Confirme a entrega com um toque e registre o encerramento da corrida.' },
      { img:'/screens/mobile/entregador_nao_entregue.JPG', title:'Não Entregue',          desc:'Registre o motivo em caso de insucesso e devolva o pedido ao restaurante.' },
      { img:'/screens/mobile/entregador_perfil.JPG',       title:'Perfil',                desc:'Gerencie seus dados, configure sua meta diária e veja o histórico de entregas.' },
    ]
  },
  cardapio: {
    title: 'Home do Cardápio',
    slides: [
      { video:'/screens/mobile/cardapio-demo.mp4', img:'/screens/mobile/cardapio_home.jpeg', title:'Demo ao vivo',       desc:'Do pedido ao checkout em menos de 1 minuto — veja o cardápio digital em ação.' },
      { img:'/screens/mobile/cardapio_home2.jpeg',              title:'Categorias',         desc:'Navegue pelos produtos organizados por categorias com busca integrada.' },
      { img:'/screens/mobile/cardapio_detalhes_produto.jpeg',   title:'Detalhe do Produto', desc:'Foto, descrição e complementos com cálculo de subtotal antes de adicionar ao carrinho.' },
      { img:'/screens/mobile/cardapio_checkout.jpeg',           title:'Checkout',           desc:'Selecione endereço, modalidade (delivery/retirada) e forma de pagamento em uma tela.' },
      { img:'/screens/mobile/cardapio_checkout2.jpeg',          title:'Checkout',           desc:'Revisão do pedido — confira os itens, endereço e total antes de finalizar.' },
      { img:'/screens/mobile/cardapio_confirmacao_pedido.jpeg', title:'Confirmação',        desc:'Pedido confirmado com número e estimativa de tempo de entrega.' },
      { img:'/screens/mobile/cardapio_acompanhar_pedido.jpeg',  title:'Rastreamento',       desc:'Acompanhe o status do pedido em tempo real com timeline completa.' },
    ]
  }
};

type AppKey = 'lojista' | 'garcom' | 'cardapio' | 'entregador';

export default function Funcionalidades() {
  const [activeTab, setActiveTab] = useState<AppKey>('cardapio');
  const [slideIndexes, setSlideIndexes] = useState<{ [K in AppKey]: number }>({
    lojista: 0,
    garcom: 0,
    cardapio: 0,
    entregador: 0
  });
  
  const [activeAppList, setActiveAppList] = useState('app-lojista');
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart auto play for slides
  useEffect(() => {
    startAutoPlay();
    return () => {
      stopAutoPlay();
    };
  }, [activeTab, slideIndexes]);

  const stopAutoPlay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progTimerRef.current) clearInterval(progTimerRef.current);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    setProgress(0);
    const slide = SC_DATA[activeTab].slides[slideIndexes[activeTab]];
    const interval = slide.video ? 57000 : 8000;
    
    let elapsed = 0;
    progTimerRef.current = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min(100, (elapsed / interval) * 100));
    }, 50);

    timerRef.current = setTimeout(() => {
      const totalSlides = SC_DATA[activeTab].slides.length;
      if (slideIndexes[activeTab] < totalSlides - 1) {
        setSlideIndexes(prev => ({ ...prev, [activeTab]: prev[activeTab] + 1 }));
      } else {
        // Next tab
        const tabOrder: AppKey[] = ['cardapio', 'lojista', 'garcom', 'entregador'];
        const nextIndex = (tabOrder.indexOf(activeTab) + 1) % tabOrder.length;
        setActiveTab(tabOrder[nextIndex]);
        setSlideIndexes(prev => ({ ...prev, [tabOrder[nextIndex]]: 0 }));
      }
    }, interval);
  };

  const scGoTo = (idx: number) => {
    setSlideIndexes(prev => ({ ...prev, [activeTab]: idx }));
  };

  const scNav = (dir: number) => {
    const totalSlides = SC_DATA[activeTab].slides.length;
    const currentIdx = slideIndexes[activeTab];
    const newIdx = Math.max(0, Math.min(totalSlides - 1, currentIdx + dir));
    if (newIdx !== currentIdx) {
      scGoTo(newIdx);
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge reveal" style={{ marginBottom: 16 }}><span className="label">Plataforma completa</span></div>
            <h1 className="reveal reveal-delay-1">Tudo que você precisa.<br /><span className="accent">Tudo incluso.</span></h1>
            <p className="hero-sub reveal reveal-delay-2">Explore cada funcionalidade e veja como funciona na prática.</p>
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div className="container">

          <div className="showcase-header">
            <span className="label">Screenshots reais</span>
            <h2>Conheça as principais funções</h2>
            <p>Veja como cada aplicativo funciona na prática — telas reais da plataforma.</p>
          </div>

          <div className="showcase-tabs">
            <button className={`showcase-tab ${activeTab === 'cardapio' ? 'active' : ''}`} onClick={() => setActiveTab('cardapio')}>📱 Cardápio</button>
            <button className={`showcase-tab ${activeTab === 'lojista' ? 'active' : ''}`} onClick={() => setActiveTab('lojista')}>🏪 App Lojista</button>
            <button className={`showcase-tab ${activeTab === 'garcom' ? 'active' : ''}`} onClick={() => setActiveTab('garcom')}>🍽️ App Garçom</button>
            <button className={`showcase-tab ${activeTab === 'entregador' ? 'active' : ''}`} onClick={() => setActiveTab('entregador')}>🛵 App Entregador</button>
          </div>

          {(Object.keys(SC_DATA) as AppKey[]).map((key) => {
            const data = SC_DATA[key];
            const isActive = activeTab === key;
            const currentIdx = slideIndexes[key];
            const slide = data.slides[currentIdx];

            return (
              <div 
                key={key} 
                className={`showcase-panel ${isActive ? 'active' : ''}`} 
                id={`sp-${key}`}
                onMouseEnter={stopAutoPlay}
                onMouseLeave={() => { if(isActive) startAutoPlay(); }}
              >
                <div className="sc-info">
                  <div className="sc-counter">{String(currentIdx + 1).padStart(2, '0')} / {String(data.slides.length).padStart(2, '0')}</div>
                  <h3>{slide.title}</h3>
                  <p>{slide.desc}</p>
                  <div className="sc-progress">
                    <div className="sc-progress-fill" style={{ width: isActive ? `${progress}%` : '0%', transition: isActive && progress > 0 ? 'width .05s linear' : 'none' }}></div>
                  </div>
                  <div className="sc-nav">
                    <button className="sc-arrow" onClick={() => scNav(-1)} disabled={currentIdx === 0}>←</button>
                    <div className="sc-dots">
                      {data.slides.map((_, i) => (
                        <button key={i} className={`sc-dot ${i === currentIdx ? 'active' : ''}`} onClick={() => scGoTo(i)}></button>
                      ))}
                    </div>
                    <button className="sc-arrow" onClick={() => scNav(1)} disabled={currentIdx === data.slides.length - 1}>→</button>
                  </div>
                </div>

                <div className={`sc-device ${key !== 'lojista' ? 'sc-device--phone' : ''}`}>
                  {key === 'lojista' ? (
                    <div className="device-browser">
                      <div className="browser-chrome">
                        <div className="browser-tl"><span className="btl btl-r"></span><span className="btl btl-y"></span><span className="btl btl-g"></span></div>
                        <div className="browser-addr">{slide.url || ''}</div>
                      </div>
                      <div className="browser-vp">
                        <img src={slide.img} alt={slide.title} />
                      </div>
                    </div>
                  ) : (
                    <div className="device-phone">
                      <div className="phone-island"></div>
                      <div className="phone-screen">
                        {slide.video ? (
                          <video autoPlay loop muted playsInline style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }}>
                            <source src={slide.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={slide.img} alt={slide.title} />
                        )}
                      </div>
                      <div className="phone-home-bar"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="apps-section" id="por-aplicativo">
        <div className="container">
          <div className="section-head">
            <div className="label" style={{ marginBottom: 12 }}>Por aplicativo</div>
            <h2>Quatro aplicativos para uma operação completa</h2>
            <p>Cada app é desenvolvido para quem vai usá-lo — do dono ao entregador.</p>
          </div>

          <div className="apps-tabs-wrap">
            <div className="apps-tabs">
              <button className={`app-tab ${activeAppList === 'app-lojista' ? 'active' : ''}`} onClick={() => setActiveAppList('app-lojista')}>
                <div className="app-tab-icon">🏪</div>
                <div><span className="app-tab-name">App Lojista</span><span className="app-tab-for">Dono / Gerente</span></div>
              </button>
              <button className={`app-tab ${activeAppList === 'app-garcom' ? 'active' : ''}`} onClick={() => setActiveAppList('app-garcom')}>
                <div className="app-tab-icon">🍽️</div>
                <div><span className="app-tab-name">App Garçom</span><span className="app-tab-for">Atendentes</span></div>
              </button>
              <button className={`app-tab ${activeAppList === 'app-cardapio' ? 'active' : ''}`} onClick={() => setActiveAppList('app-cardapio')}>
                <div className="app-tab-icon">📱</div>
                <div><span className="app-tab-name">Cardápio Digital</span><span className="app-tab-for">Cliente final</span></div>
              </button>
              <button className={`app-tab ${activeAppList === 'app-entregador' ? 'active' : ''}`} onClick={() => setActiveAppList('app-entregador')}>
                <div className="app-tab-icon">🛵</div>
                <div><span className="app-tab-name">App Entregador</span><span className="app-tab-for">Entregadores</span></div>
              </button>
            </div>
          </div>

          <div className={`app-panel ${activeAppList === 'app-lojista' ? 'active' : ''}`}>
            <div className="app-features-grid">
              <div className="app-feature"><div className="app-feature-icon">📊</div><h4>Dashboard Inteligente</h4><p>Visão geral em tempo real — pedidos abertos, vendas do dia, taxa de conclusão e produtos mais vendidos.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🛒</div><h4>Gestão de Pedidos</h4><p>Acompanhe todos os pedidos com filtros por status, canal e data. Atualizações automáticas em tempo real.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">🪑</div><h4>Controle de Mesas</h4><p>Grid visual com status por cores. Abra atendimentos, adicione itens e transfira mesas entre garçons.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📋</div><h4>Cardápio Digital</h4><p>Cadastre produtos, categorias, fotos e complementos. Ative ou desative itens instantaneamente.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">🗺️</div><h4>Rastreamento de Entregas</h4><p>Mapa ao vivo com GPS dos entregadores. Veja cada pedido em rota do início ao fim.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">🧭</div><h4>Roteirização Inteligente</h4><p>Selecione pedidos e entregadores — o sistema calcula automaticamente a melhor rota.</p></div>
              <div className="app-feature"><div className="app-feature-icon">👨‍🍳</div><h4>KDS — Tela da Cozinha</h4><p>Display dedicado para cozinha com pedidos em preparo atualizados em tempo real. Sem papel.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🖨️</div><h4>Impressão Térmica Automática</h4><p>Impressão ESC/POS automática ao receber o pedido — funciona em qualquer impressora térmica, sem configuração complicada.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">🧾</div><h4>Cupom Fiscal NFC-e</h4><p>Emissão de NFC-e integrada ao pedido com envio automático por e-mail e exportação em PDF.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">🎯</div><h4>CRM e Campanhas</h4><p>Gerencie sua base de clientes e crie campanhas promocionais segmentadas para fidelizar.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🏷️</div><h4>Cupons e Banners</h4><p>Crie cupons de desconto e banners para datas especiais e promoções pontuais.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🔐</div><h4>Controle de Acesso</h4><p>Defina permissões individuais por operador com mais de 38 níveis de acesso.</p></div>
              <div className="app-feature"><div className="app-feature-icon">⚙️</div><h4>Configurações da Loja</h4><p>Identidade visual, zonas de entrega, horários e métodos de pagamento — tudo em um só lugar.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📲</div><h4>App Instalável (PWA)</h4><p>Acesse o painel como um app nativo em qualquer dispositivo — smartphone, tablet ou computador.</p></div>
            </div>
          </div>

          <div className={`app-panel ${activeAppList === 'app-garcom' ? 'active' : ''}`}>
            <div className="app-features-grid">
              <div className="app-feature"><div className="app-feature-icon">🪑</div><h4>Gestão de Mesas e Reservas</h4><p>Visualize todas as mesas com status em cores — livre, ocupada ou reservada.</p></div>
              <div className="app-feature"><div className="app-feature-icon">✅</div><h4>Abertura de Atendimento</h4><p>Abra uma mesa para consumo imediato ou registre uma reserva com nome, nota e horário.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📋</div><h4>Cardápio Digital por Mesa</h4><p>Navegue pelas categorias, selecione produtos com complementos e envie o pedido pela mesa.</p></div>
              <div className="app-feature"><div className="app-feature-icon">⚡</div><h4>Detalhes em Tempo Real</h4><p>Veja itens pedidos, tempo de ocupação e total em aberto de uma mesa com um toque.</p></div>
              <div className="app-feature"><div className="app-feature-icon">💳</div><h4>Fechar Conta</h4><p>Encerre o atendimento e libere a mesa com confirmação na tela.</p></div>
              <div className="app-feature"><div className="app-feature-icon">↔️</div><h4>Transferência de Mesa</h4><p>Mova um atendimento para outro número sem perder os itens pedidos.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">💳</div><h4>Integrado à Maquininha</h4><p>O app do garçom roda direto na maquininha de cartão — anote o pedido e receba o pagamento.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📲</div><h4>App Instalável (PWA)</h4><p>Acesse o painel como um app nativo em qualquer dispositivo — smartphone, tablet ou computador.</p></div>
            </div>
          </div>

          <div className={`app-panel ${activeAppList === 'app-cardapio' ? 'active' : ''}`}>
            <div className="app-features-grid">
              <div className="app-feature"><div className="app-feature-icon">📂</div><h4>Cardápio por Categorias</h4><p>Navegue por produtos organizados por categoria com busca integrada por nome e descrição.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🔍</div><h4>Detalhe do Produto</h4><p>Foto, descrição, complementos obrigatórios/opcionais e cálculo do subtotal antes de adicionar.</p></div>
              <div className="app-feature"><div className="app-feature-icon">💳</div><h4>Checkout Completo</h4><p>Selecione endereço, modalidade (delivery/retirada), pagamento e aplique cupom de desconto.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📍</div><h4>Rastreamento em Tempo Real</h4><p>Acompanhe o pedido no mapa com posição GPS do entregador e timeline de status ao vivo.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📜</div><h4>Histórico de Pedidos</h4><p>Veja pedidos ativos e passados, cancele pedidos em aberto e repita pedidos anteriores.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🔑</div><h4>Login sem Senha</h4><p>Acesso via SMS (OTP) ou Magic Link por e-mail — sem precisar criar ou lembrar senhas.</p></div>
              <div className="app-feature"><div className="app-feature-icon">👤</div><h4>Perfil e Endereços</h4><p>Gerencie dados pessoais e múltiplos endereços salvos com opção de endereço padrão.</p></div>
              <div className="app-feature"><div className="app-feature-icon">ℹ️</div><h4>Info da Loja</h4><p>Horário de funcionamento, formas de pagamento, endereço e redes sociais da loja.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🎨</div><h4>Personalização por Loja</h4><p>Identidade visual com cores e logo customizados por estabelecimento.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">💬</div><h4>Status do Pedido via WhatsApp</h4><p>Cliente recebe atualizações automáticas do pedido direto no WhatsApp.</p></div>
              <div className="app-feature soon"><div className="app-feature-icon">💰</div><h4>Pagamento Online</h4><p>Cliente finaliza o pedido pagando direto pelo app via cartão de crédito ou Pix.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📲</div><h4>App Instalável (PWA)</h4><p>Acesse o painel como um app nativo em qualquer dispositivo.</p></div>
            </div>
          </div>

          <div className={`app-panel ${activeAppList === 'app-entregador' ? 'active' : ''}`}>
            <div className="app-features-grid">
              <div className="app-feature"><div className="app-feature-icon">⚡</div><h4>Entregas em Tempo Real</h4><p>Receba novos pedidos instantaneamente e aceite com um toque.</p></div>
              <div className="app-feature"><div className="app-feature-icon">✅</div><h4>Ciclo Completo da Entrega</h4><p>Aceite, conclua ou registre não entrega com registro de motivos em caso de insucesso.</p></div>
              <div className="app-feature"><div className="app-feature-icon">💰</div><h4>Painel de Ganhos</h4><p>Acompanhe ganhos do dia, meta diária com barra de progresso, avaliação e ranking.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📜</div><h4>Histórico de Entregas</h4><p>Filtre por hoje, semana ou mês e veja total de entregas, valor acumulado e média por período.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📍</div><h4>Rastreamento de Localização</h4><p>Envio automático de GPS ao backend a cada deslocamento — rastreamento contínuo em background.</p></div>
              <div className="app-feature"><div className="app-feature-icon">📶</div><h4>Status de Rede</h4><p>Banner visual ao perder ou reconectar a conexão — nunca perde um pedido por falta de sinal.</p></div>
              <div className="app-feature"><div className="app-feature-icon">🎯</div><h4>Meta Diária Configurável</h4><p>Defina sua meta de valor e quantidade de entregas por dia diretamente no perfil.</p></div>
            </div>
          </div>

        </div>
      </section>

      <section className="cta-bar">
        <div className="container">
          <h2>Plataforma completa. R$&nbsp;0/mês.</h2>
          <p>Comece hoje. Configure em minutos e já comece a receber pedidos.</p>
          <Link to="/#onboarding" className="btn-primary">Cadastrar meu negócio →</Link>
          <p className="cta-note">Sem mensalidade · Começa agora</p>
        </div>
      </section>
    </>
  );
}
