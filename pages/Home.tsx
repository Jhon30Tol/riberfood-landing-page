/* Author: Jhon toledo
 Date: 11/06/2026
Objective: Página Home contendo formulário de onboarding da landing page
Date Alter: 11/06/2026
Alter: 11/06/2026 - Separação dos campos Nome da Empresa e Subdomínio em linhas diferentes para melhor alinhamento das mensagens de validação
*/
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form State
  const [docType, setDocType] = useState<'cnpj' | 'cpf'>('cnpj');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [estado, setEstado] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable' | 'error'>('idle');
  const [autoGenerateSubdomain, setAutoGenerateSubdomain] = useState(true);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout>();

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    val = val.replace(/\s+/g, '-');
    val = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    val = val.replace(/-+/g, '-');
    val = val.replace(/^-+/g, '');
    setSubdomain(val);
    
    if (val === '') {
      setAutoGenerateSubdomain(true);
    } else {
      setAutoGenerateSubdomain(false);
    }
    
    setSubdomainStatus('idle');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    if (val.length >= 3 && !val.endsWith('-')) {
      setSubdomainStatus('checking');
      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://api.stg.riberfood.com/api/v1/onboarding/subdomains/${val}/availability`);
          if (res.ok) {
            const data = await res.json();
            setSubdomainStatus(data.available ? 'available' : 'unavailable');
          } else {
            setSubdomainStatus('unavailable');
          }
        } catch (error) {
          setSubdomainStatus('error');
        }
      }, 500);
    }
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpresa(e.target.value);
    if (autoGenerateSubdomain) {
      const normalized = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      const generated = normalized.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
      setSubdomain(generated);
      if (generated.length >= 3) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setSubdomainStatus('checking');
        timeoutRef.current = setTimeout(async () => {
          try {
            const res = await fetch(`https://api.stg.riberfood.com/api/v1/onboarding/subdomains/${generated}/availability`);
            if (res.ok) {
              const data = await res.json();
              setSubdomainStatus(data.available ? 'available' : 'unavailable');
            } else {
              setSubdomainStatus('unavailable');
            }
          } catch (error) {
            setSubdomainStatus('error');
          }
        }, 500);
      } else {
        setSubdomainStatus('idle');
      }
    }
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (subdomainStatus === 'unavailable') {
      alert('Subdomínio indisponível. Escolha outro.');
      return;
    }
    // Simulate API call
    setFormSuccess(true);
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-badge reveal">🚀 Sem mensalidade. Sem comissão por pedido.</div>

            <h1 className="reveal reveal-delay-1">
              Controle total do seu delivery.<br />
              <span className="accent underline-accent">O lucro é 100% seu.</span>
            </h1>

            <p className="hero-sub reveal reveal-delay-2">
              Plataforma completa para lanchonetes, marmitarias, bares e restaurantes.<br />
              Sem taxas abusivas. Sem complicação. Começa em minutos.
            </p>

            <div className="hero-stats reveal reveal-delay-2">
              <div className="hero-stat">
                <div className="hero-stat-val"><span className="orange">R$</span> 0</div>
                <div className="hero-stat-label">Mensalidade</div>
              </div>
              <div className="hero-stats-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-val"><span className="orange">0</span>%</div>
                <div className="hero-stat-label">Comissão</div>
              </div>
              <div className="hero-stats-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-val"><span className="orange">100</span>%</div>
                <div className="hero-stat-label">Lucro seu</div>
              </div>
            </div>

            <div className="hero-actions reveal reveal-delay-3">
              <Link to="/#onboarding" className="btn-primary" style={{ fontSize: 16, padding: '18px 40px' }} onClick={() => {
                const el = document.getElementById('onboarding');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                Cadastrar meu negócio →
              </Link>
              <Link to="/funcionalidades" className="btn-ghost">Ver a plataforma</Link>
            </div>
            <p className="hero-note reveal reveal-delay-4">Sem prazo promocional · Sem cartão de crédito · Começa agora</p>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            <div className="trust-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/></svg>
              Suporte via WhatsApp
            </div>
          </div>
        </div>
      </div>

      {/* PILARES */}
      <section id="solucao" className="pillars">
        <div className="container">
          <div className="section-head reveal">
            <div className="label">Por que o Riberfood?</div>
            <h2>Mais controle, menos custo</h2>
            <p>Tudo que você precisa para vender por delivery, sem abrir mão do seu lucro.</p>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card reveal reveal-delay-1">
              <div className="pillar-icon">💰</div>
              <h3>Sem mensalidade</h3>
              <p>Vendeu pouco ou muito — você não paga nada fixo. O lucro das suas vendas é inteiramente seu.</p>
            </div>
            <div className="pillar-card reveal reveal-delay-2">
              <div className="pillar-icon">📦</div>
              <h3>Sem comissão por pedido</h3>
              <p>Esqueça pagar 20%–30% para plataformas gigantes em cima de cada lanche ou marmita vendida.</p>
            </div>
            <div className="pillar-card reveal reveal-delay-3">
              <div className="pillar-icon">⚡</div>
              <h3>Configuração simples</h3>
              <p>Sem instalação, sem técnico. Você mesmo configura em minutos e já começa a receber pedidos.</p>
            </div>
            <div className="pillar-card reveal reveal-delay-4">
              <div className="pillar-icon">📱</div>
              <h3>Funciona em qualquer device</h3>
              <p>Celular, tablet ou computador. Sem app para baixar — acessa direto pelo navegador.</p>
            </div>
          </div>

          <div className="pillars-carousel">
            <div className="pillar-card">
              <div className="pillar-icon">💰</div>
              <h3>Sem mensalidade</h3>
              <p>Vendeu pouco ou muito — você não paga nada fixo. O lucro das suas vendas é inteiramente seu.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">📦</div>
              <h3>Sem comissão por pedido</h3>
              <p>Esqueça pagar 20%–30% para plataformas gigantes em cima de cada lanche ou marmita vendida.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">⚡</div>
              <h3>Configuração simples</h3>
              <p>Sem instalação, sem técnico. Você mesmo configura em minutos e já começa a receber pedidos.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-icon">📱</div>
              <h3>Funciona em qualquer device</h3>
              <p>Celular, tablet ou computador. Sem app para baixar — acessa direto pelo navegador.</p>
            </div>
          </div>
          <p className="pillars-scroll-hint">← deslize para ver mais →</p>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="how">
        <div className="container">
          <div className="section-head reveal">
            <div className="label">Simples &amp; rápido</div>
            <h2>Cadastre sua loja em menos de 5 min</h2>
            <p>Sem instalação, sem complicação. Começar é mais fácil do que você imagina.</p>
          </div>

          <div className="how-inner reveal">
            <div className="steps" id="how-steps">
              {[
                { title: 'Preencha as informações do seu negócio', desc: 'Nome do estabelecimento, endereço e contato. Leva menos de 2 minutos.' },
                { title: 'Configure seu cardápio digital', desc: 'Adicione produtos com fotos, descrições e preços. Seu link e QR Code são gerados automaticamente.' },
                { title: 'Receba pedidos e gerencie entregas', desc: 'Tudo numa tela só: do pedido ao entregador. Sem confusão no horário de pico.' },
                { title: 'Lucro 100% no seu bolso', desc: 'R$ 0 de mensalidade. 0% de comissão. O que você vende, você fica.' }
              ].map((step, idx) => (
                <div key={idx} className={`step ${activeStep === idx ? 'active' : ''}`} onClick={() => setActiveStep(idx)}>
                  <div className="step-num">{idx + 1}</div>
                  <div className="step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="how-visual">
              <div className={`how-frame ${activeStep === 0 ? 'visible' : ''}`}>
                <div className="how-frame-icon">📝</div>
                <div className="how-frame-title">Dados do negócio</div>
                <div className="how-frame-desc">Nome, endereço e contato. Tudo em um formulário simples e direto.</div>
                <div className="how-frame-badge">⏱ ~2 minutos</div>
              </div>
              <div className={`how-frame ${activeStep === 1 ? 'visible' : ''}`}>
                <div className="how-frame-icon">🍔</div>
                <div className="how-frame-title">Cardápio digital pronto</div>
                <div className="how-frame-desc">Fotos, descrições e preços. Seu link e QR Code gerados na hora.</div>
                <div className="how-frame-badge">🔗 Link + QR Code</div>
              </div>
              <div className={`how-frame ${activeStep === 2 ? 'visible' : ''}`}>
                <div className="how-frame-icon">📦</div>
                <div className="how-frame-title">Operação organizada</div>
                <div className="how-frame-desc">Pedidos, status e entregadores numa única tela. Zero confusão.</div>
                <div className="how-frame-badge">⚡ Tempo real</div>
              </div>
              <div className={`how-frame ${activeStep === 3 ? 'visible' : ''}`}>
                <div className="how-frame-icon">💰</div>
                <div className="how-frame-title">Lucro é seu</div>
                <div className="how-frame-desc">R$ 0 de mensalidade. 0% de comissão. O que você vende, você fica.</div>
                <div className="how-frame-badge">✅ Sem pegadinhas</div>
              </div>
            </div>
          </div>

          <div className="how-mobile-cards">
            {[
              { num: '01', title: 'Preencha as informações do seu negócio', desc: 'Nome, endereço e contato. Leva menos de 2 minutos.' },
              { num: '02', title: 'Configure seu cardápio digital', desc: 'Produtos com fotos, preços e QR Code gerado automaticamente.' },
              { num: '03', title: 'Receba pedidos e gerencie entregas', desc: 'Tudo numa tela só, do pedido ao entregador. Sem confusão.' },
              { num: '04', title: 'Lucro 100% no seu bolso', desc: 'R$ 0 de mensalidade. 0% de comissão. O que você vende, você fica.' }
            ].map((c, i) => (
              <div key={i} className="how-mobile-card">
                <div className="how-mobile-card-num">{c.num}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="how-mobile-scroll-hint">← deslize para ver os passos →</p>

          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link to="/#onboarding" className="btn-primary" onClick={() => {
              const el = document.getElementById('onboarding');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Cadastrar meu negócio →</Link>
          </div>
        </div>
      </section>

      {/* PLAN TRIGGER */}
      <div id="plano" className="plan-trigger-bar">
        <div className="container">
          <div className="highlights reveal">
            <div className="plan-highlight"><span>R$ 0</span> mensalidade</div>
            <div className="plan-highlight"><span>0%</span> comissão</div>
            <div className="plan-highlight"><span>∞</span> pedidos</div>
          </div>
          <p className="reveal">Um plano completo. Sem pegadinhas. Sem prazo promocional.</p>
          <button onClick={() => setIsPlanModalOpen(true)} className="btn-outline-dark reveal">
            Ver plano e preços →
          </button>
        </div>
      </div>

      {/* MODAL PLANO */}
      {isPlanModalOpen && (
        <div className="modal-overlay" onClick={() => setIsPlanModalOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsPlanModalOpen(false)} aria-label="Fechar">✕</button>

            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div className="label" style={{ marginBottom: 12 }}>Transparência total</div>
              <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-.02em', marginBottom: 6 }}>Plano Completo</h2>
              <p style={{ fontSize: 14, color: 'var(--gray-5)' }}>Sem taxas ocultas. Sem pegadinhas. Sem prazo promocional.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 28, border: '1.5px solid var(--gray-2)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--gray-1)', borderBottom: '1px solid var(--gray-2)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-8)' }}>Mensalidade</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-5)', marginTop: 2 }}>Custo fixo mensal para usar a plataforma</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#ccc', textDecoration: 'line-through', fontWeight: 600 }}>R$ 299/mês</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--orange)' }}>Grátis</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--white)', borderBottom: '1px solid var(--gray-2)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-8)' }}>Comissão por pedido</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-5)', marginTop: 2 }}>Cobrada sobre cada venda realizada</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#ccc', textDecoration: 'line-through', fontWeight: 600 }}>20–30%</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--orange)' }}>0%</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--white)', borderBottom: '1px solid var(--gray-2)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-8)' }}>Taxa operacional</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-5)', marginTop: 2 }}>Para manutenção do sistema</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--orange)' }}>Do cliente</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-5)' }}>não de você</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'var(--gray-1)' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-8)' }}>Limite de pedidos</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-5)', marginTop: 2 }}>Pedidos processados por mês</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--orange)' }}>Ilimitado</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--orange-dim)', border: '1px solid rgba(255,107,0,.2)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 24 }}>
              <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10 }}>Tudo incluso no plano</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Gestão de pedidos', 'Cardápio digital', 'App do entregador', 'Mesas e comanda', 'Cupom Fiscal NFC-e', 'Relatórios gerenciais', 'Suporte via WhatsApp'].map((item, i) => (
                  <div key={i} style={{ fontSize: 13, color: 'var(--gray-8)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: 'var(--orange)', fontWeight: 900 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/#onboarding" onClick={() => {
              setIsPlanModalOpen(false);
              const el = document.getElementById('onboarding');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: 17, display: 'flex' }}>
              Quero este plano →
            </Link>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 12 }}>
              Sem cartão de crédito · Começa agora
            </p>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-head reveal">
            <div className="label">Perguntas frequentes</div>
            <h2>Tire suas dúvidas</h2>
          </div>
          <div className="faq-list">
            {[
              { q: 'O Riberfood cobra comissão por pedido?', a: 'Não. Cobramos uma taxa operacional fixa do cliente consumidor para manter o sistema funcionando. Para você, lojista, não há mensalidade nem comissão sobre os pedidos.' },
              { q: 'Preciso ser técnico para usar?', a: 'Não. A plataforma é extremamente simples e intuitiva. Se você sabe usar o celular, saberá usar o Riberfood. Em poucos minutos você está configurado e já começa a receber pedidos.' }
            ].map((faq, idx) => (
              <div key={idx} className={`faq-item reveal ${activeFaq === idx ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  {faq.q}
                  <span className="faq-chevron">▾</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING CTA / FORM */}
      <section id="onboarding" className="onboarding-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-eyebrow reveal">Cadastro gratuito</div>
            <h2 className="reveal">Comece <span className="accent">agora mesmo.</span><br />Sem custo, sem enrolação.</h2>
            <p className="reveal reveal-delay-1">Junte-se a centenas de restaurantes que transformaram sua gestão digital sem pagar comissão abusiva em cada pedido.</p>

            <div className="form-trust-row reveal reveal-delay-1">
              <span className="form-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Dados 100% seguros
              </span>
              <span className="form-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Ativação em 24h
              </span>
              <span className="form-trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Sem cartão de crédito
              </span>
            </div>

            <div className="form-card reveal reveal-delay-2">
              {!formSuccess ? (
                <form id="form-onboarding" onSubmit={submitForm}>
                  <div className="form-card-header">
                    <div className="form-card-title">Informações do seu negócio</div>
                    <div className="form-card-sub">Preencha abaixo — leva menos de 2 minutos.</div>
                  </div>

                  <div className="doc-toggle" style={{ marginBottom: 16 }}>
                    <button type="button" className={`doc-tab ${docType === 'cnpj' ? 'active' : ''}`} onClick={() => setDocType('cnpj')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      CNPJ
                    </button>
                    <button type="button" className={`doc-tab ${docType === 'cpf' ? 'active' : ''}`} onClick={() => setDocType('cpf')}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      CPF
                    </button>
                  </div>

                  {docType === 'cnpj' && (
                    <div className="field" style={{ marginBottom: 12 }}>
                      <label>CNPJ</label>
                      <input type="text" required placeholder="00.000.000/0000-00" maxLength={18} value={cnpj} onChange={e => setCnpj(e.target.value)} />
                    </div>
                  )}
                  {docType === 'cpf' && (
                    <div className="field" style={{ marginBottom: 12 }}>
                      <label>CPF</label>
                      <input type="text" required placeholder="000.000.000-00" maxLength={14} value={cpf} onChange={e => setCpf(e.target.value)} />
                    </div>
                  )}

                  <div className="field" style={{ marginBottom: 12 }}>
                    <label>Nome da Empresa</label>
                    <input type="text" required placeholder="Ex: Pizzaria do João" value={empresa} onChange={handleEmpresaChange} />
                  </div>
                  <div className="field" style={{ marginBottom: 12 }}>
                    <label>Subdomínio</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="pizzaria-joao" 
                      pattern="[a-z0-9\-]{3,}" 
                      value={subdomain} 
                      onChange={handleSubdomainChange} 
                      style={{
                        borderColor: subdomainStatus === 'available' ? '#22c55e' : subdomainStatus === 'unavailable' ? '#ef4444' : undefined,
                        outline: subdomainStatus === 'available' ? '1px solid #22c55e' : subdomainStatus === 'unavailable' ? '1px solid #ef4444' : undefined
                      }}
                    />
                    <div className="field-hint">
                      {subdomainStatus === 'checking' && <span style={{ color: 'var(--orange)' }}>Verificando disponibilidade...</span>}
                      {subdomainStatus === 'available' && <span style={{ color: '#16a34a', fontWeight: 500 }}>✅ Subdomínio disponível!</span>}
                      {subdomainStatus === 'unavailable' && <span style={{ color: '#dc2626', fontWeight: 500 }}>❌ Subdomínio já está em uso</span>}
                      {subdomainStatus === 'error' && <span style={{ color: '#dc2626', fontWeight: 500 }}>❌ Erro ao verificar subdomínio</span>}
                      {subdomainStatus === 'idle' && <>Seu link: <strong>{subdomain || 'seu-nome'}</strong>.riberfood.com<br/><span style={{fontSize: 11, opacity: 0.7}}>Regra: apenas letras minúsculas, números e traços.</span></>}
                    </div>
                  </div>

                  <div className="form-row" style={{ marginBottom: 12 }}>
                    <div className="field" style={{ marginBottom: 0 }}>
                      <label>Estado</label>
                      <select required value={estado} onChange={e => setEstado(e.target.value)}>
                        <option value="">Selecione</option>
                        {['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'].map(est => (
                          <option key={est}>{est}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field" style={{ marginBottom: 0 }}>
                      <label>Seu Nome</label>
                      <input type="text" required placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
                    </div>
                  </div>

                  <div className="form-row" style={{ marginBottom: 0 }}>
                    <div className="field" style={{ marginBottom: 0 }}>
                      <label>Telefone / WhatsApp</label>
                      <input type="tel" required placeholder="(11) 99999-0000" maxLength={15} value={telefone} onChange={e => setTelefone(e.target.value)} />
                    </div>
                    <div className="field" style={{ marginBottom: 0 }}>
                      <label>E-mail</label>
                      <input type="email" required placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                  </div>

                  <hr className="form-divider" />

                  <div className="form-submit-wrap">
                    <button type="submit" className="btn-primary form-submit" disabled={subdomainStatus === 'checking'}>
                      Cadastrar meu negócio →
                    </button>
                    <div className="form-microcopy">
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        Sem cartão
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Sem mensalidade
                      </span>
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Começa hoje
                      </span>
                    </div>
                  </div>
                </form>
              ) : (
                <div id="form-success" className="form-success" style={{ display: 'block' }}>
                  <div className="form-success-icon-wrap">🎉</div>
                  <h3>Cadastro recebido!</h3>
                  <p>Um consultor da Riberfood entrará em contato em breve para ativar sua conta.</p>
                  <ul className="form-success-steps">
                    <li>Aguardar o retorno do time Riberfood</li>
                    <li>Confirmar os dados enviados</li>
                    <li>Receber acesso e iniciar a configuração</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
