import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Planos() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="label reveal visible">Transparência total</div>
          <h1 className="reveal visible d1">Um plano.<br /><span className="accent">Sem pegadinhas.</span></h1>
          <p className="reveal visible d2">Sem mensalidade, sem comissão. Cada item de custo aberto para você comparar.</p>
        </div>
      </section>

      <div className="summary-bar">
        <div className="container">
          <div className="summary-inner">
            <div className="summary-item reveal visible">
              <div className="summary-val"><span className="accent">R$</span> 0</div>
              <div className="summary-label">Mensalidade</div>
            </div>
            <div className="summary-item reveal visible d1">
              <div className="summary-val"><span className="accent">0</span>%</div>
              <div className="summary-label">Comissão por pedido</div>
            </div>
            <div className="summary-item reveal visible d2">
              <div className="summary-val"><span className="accent">∞</span></div>
              <div className="summary-label">Pedidos por mês</div>
            </div>
            <div className="summary-item reveal visible d3">
              <div className="summary-val"><span className="accent">✓</span></div>
              <div className="summary-label">Tudo incluso</div>
            </div>
          </div>
        </div>
      </div>

      <section className="transparency-section">
        <div className="container">
          <div className="transparency-inner reveal visible">
            <div className="transparency-icon">🔍</div>
            <h2>Previsibilidade que outros sistemas não oferecem</h2>
            <p>A cada pedido recebido, você sabe exatamente quanto vai repassar — sem variáveis escondidas, sem surpresas no extrato. Não importa o volume do mês: o custo é previsível desde o primeiro pedido até o último.</p>
            <div className="transparency-pills">
              <div className="transparency-pill"><span>✓</span> R$ 0 de mensalidade</div>
              <div className="transparency-pill"><span>✓</span> 0% de comissão sobre vendas</div>
              <div className="transparency-pill"><span>✓</span> Sem letras miúdas</div>
            </div>
            <a href="#modelo-cobranca" className="btn-transparency">Conheça o modelo de cobrança →</a>
          </div>
        </div>
      </section>

      <section className="costs-section">
        <div className="container">
          <div className="section-head reveal visible">
            <div className="label">Compare lado a lado</div>
            <h2>Riberfood vs outras plataformas</h2>
            <p>Veja exatamente o que você paga — e o que você deixa de pagar.</p>
          </div>

          <div className="cost-compare-grid">

            <div className="cost-col featured reveal visible d1">
              <div className="cost-col-header">
                <div className="cost-col-name">Riberfood</div>
                <div className="cost-col-badge">✓ Recomendado</div>
              </div>
              <div className="cost-rows">
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Mensalidade</div>
                    <div className="cost-row-sub">Custo fixo mensal</div>
                  </div>
                  <div>
                    <div className="cost-val-old">R$ 299/mês</div>
                    <div className="cost-val good">Grátis</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Comissão por pedido</div>
                    <div className="cost-row-sub">Sobre cada venda</div>
                  </div>
                  <div>
                    <div className="cost-val-old">20–30%</div>
                    <div className="cost-val good">0%</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Taxa de saque</div>
                    <div className="cost-row-sub">Para receber seu dinheiro</div>
                  </div>
                  <div>
                    <div className="cost-val good">Grátis</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Taxa operacional</div>
                    <div className="cost-row-sub">Manutenção do sistema</div>
                  </div>
                  <div>
                    <div className="cost-val good" style={{fontSize: '15px'}}>Do cliente</div>
                    <div className="cost-val-note">não de você</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Limite de pedidos</div>
                    <div className="cost-row-sub">Por mês</div>
                  </div>
                  <div>
                    <div className="cost-val good">Ilimitado</div>
                  </div>
                </div>
              </div>
              <div className="cost-col-footer">
                <Link to="/#onboarding" className="btn-primary" style={{width: '100%', fontSize: '15px', padding: '16px'}}>
                  Quero este plano →
                </Link>
              </div>
            </div>

            <div className="cost-col reveal visible d2">
              <div className="cost-col-header">
                <div className="cost-col-name">Outras plataformas</div>
                <div className="cost-col-badge">Modelo de aplicativo</div>
              </div>
              <div className="cost-rows">
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Mensalidade</div>
                    <div className="cost-row-sub">Custo fixo mensal</div>
                  </div>
                  <div>
                    <div className="cost-val bad">R$ 130–300</div>
                    <div className="cost-val-note">por mês</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Comissão por pedido</div>
                    <div className="cost-row-sub">Sobre cada venda</div>
                  </div>
                  <div>
                    <div className="cost-val bad">12–30%</div>
                    <div className="cost-val-note">de cada pedido</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Taxa de saque</div>
                    <div className="cost-row-sub">Para receber seu dinheiro</div>
                  </div>
                  <div>
                    <div className="cost-val bad" style={{fontSize: '16px'}}>Até 1,59%</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Taxa operacional</div>
                    <div className="cost-row-sub">Manutenção do sistema</div>
                  </div>
                  <div>
                    <div className="cost-val bad" style={{fontSize: '15px'}}>Você paga</div>
                    <div className="cost-val-note">embutida no pedido</div>
                  </div>
                </div>
                <div className="cost-row">
                  <div>
                    <div className="cost-row-label">Limite de pedidos</div>
                    <div className="cost-row-sub">Por mês</div>
                  </div>
                  <div>
                    <div className="cost-val bad" style={{fontSize: '15px'}}>Plano limitado</div>
                  </div>
                </div>
              </div>
              <div className="cost-col-footer">
                <p style={{fontSize: '13px', color: 'var(--gray-5)', textAlign: 'center', fontWeight: 600}}>
                  Você paga mesmo sem vender nada.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={{padding: '64px 0', background: 'var(--gray-1)', textAlign: 'center'}}>
        <div className="container">
          <div className="label" style={{marginBottom: '16px'}}>Plataforma completa</div>
          <h2 style={{fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 900, letterSpacing: '-.02em', marginBottom: '12px'}}>Quatro aplicativos para uma operação completa</h2>
          <p style={{fontSize: '16px', color: 'var(--gray-5)', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.65}}>Cada app é desenvolvido para quem vai usá-lo — do dono ao entregador. Veja todas as funcionalidades em detalhe.</p>
          <Link to="/funcionalidades#por-aplicativo" className="btn-primary">Ver todas as funcionalidades →</Link>
        </div>
      </section>

      <section className="taxa-section" id="modelo-cobranca">
        <div className="container">
          <div className="section-head reveal visible">
            <div className="label">Como funciona na prática</div>
            <h2>Do pedido ao lucro,<br/>sem surpresas.</h2>
            <p>Entenda exatamente o que acontece a cada venda no seu estabelecimento.</p>
          </div>

          <div className="flow-timeline reveal visible">

            <div className="flow-step">
              <div className="flow-step-num">🛒</div>
              <div className="flow-step-body">
                <div className="flow-step-title">Cliente faz o pedido</div>
                <div className="flow-step-desc">Ele acessa seu cardápio digital e finaliza a compra diretamente pelo link ou QR Code do seu negócio.</div>
                <span className="flow-step-tag">Cardápio próprio · sem intermediários</span>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-step-num">⚡</div>
              <div className="flow-step-body">
                <div className="flow-step-title">Pedido vai direto para você</div>
                <div className="flow-step-desc">O pedido chega automaticamente na sua operação — tela de gestão, cozinha digital e impressora. Em tempo real.</div>
                <span className="flow-step-tag">Tempo real · sem perda de pedido</span>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-step-num">💳</div>
              <div className="flow-step-body">
                <div className="flow-step-title">Taxa repassada pelo lojista</div>
                <div className="flow-step-desc">A taxa operacional é cobrada do cliente consumidor e repassada por você, lojista — exatamente como acontece com a taxa de cartão de crédito.</div>
                <span className="flow-step-tag">Você controla o repasse</span>
              </div>
            </div>

            <div className="flow-step">
              <div className="flow-step-num">💰</div>
              <div className="flow-step-body">
                <div className="flow-step-title">Sem mensalidade</div>
                <div className="flow-step-desc">Você não paga mensalidade e mantém sua margem intacta. O que você vende é seu — 100%.</div>
                <span className="flow-step-tag">R$ 0 de mensalidade · 0% de comissão</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-head reveal visible">
            <div className="label">Dúvidas frequentes</div>
            <h2>Perguntas sobre preços</h2>
          </div>
          <div className="faq-list">
            <div className={`faq-item reveal visible d1 ${openFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(0)}>
                O Riberfood realmente não cobra mensalidade?
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openFaq === 0 ? '500px' : '0' }}>
                <p>Sim. Não existe custo fixo mensal para usar a plataforma. Vendeu pouco ou muito — você não paga nada de mensalidade. O modelo é sustentável pela taxa operacional cobrada do consumidor.</p>
              </div>
            </div>
            <div className={`faq-item reveal visible d2 ${openFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                O Riberfood cobra comissão por pedido?
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openFaq === 1 ? '500px' : '0' }}>
                <p>Não. Nenhuma comissão é cobrada sobre suas vendas. Diferente das grandes plataformas que ficam com 12% a 30% de cada pedido, aqui você fica com 100% do valor dos seus produtos.</p>
              </div>
            </div>
            <div className={`faq-item reveal visible d1 ${openFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                Todas as funcionalidades estão inclusas no plano gratuito?
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openFaq === 2 ? '500px' : '0' }}>
                <p>Sim. Gestão de pedidos, controle de estoque, relatórios inteligentes, gestão financeira, gestão de equipe, cozinha digital (KDS), delivery completo, impressão térmica, notas fiscais NFC-e, PWA instalável, multi-unidades e autoatendimento — tudo incluso sem custo adicional.</p>
              </div>
            </div>
            <div className={`faq-item reveal visible d2 ${openFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                O Riberfood atende só Ribeirão Preto?
                <span className="faq-chevron">▾</span>
              </button>
              <div className="faq-answer" style={{ maxHeight: openFaq === 3 ? '500px' : '0' }}>
                <p>Nossa sede é em Ribeirão Preto/SP, mas a plataforma foi desenvolvida para atender negócios de delivery em todo o Brasil.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="cta-section">
        <div className="container">
          <h2 className="reveal visible">Pronto para começar sem custo?</h2>
          <p className="reveal visible d1">Preencha os dados e nosso time entra em contato para o seu onboarding.</p>
          <Link to="/#onboarding" className="btn-primary reveal visible d2">
            Cadastrar meu restaurante →
          </Link>
          <p className="cta-note reveal visible d3">Sem cartão de crédito · Começa agora</p>
        </div>
      </section>
    </>
  );
}
