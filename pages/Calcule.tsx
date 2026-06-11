/* Author: Jhon toledo
 Date: 11/06/2026
Objective: Calculadora de simulação de economia da landing page
Date Alter: 11/06/2026
Alter: 11/06/2026 - Correção do layout responsivo de wrap do texto "Pedidos por mês" e alinhamento do slider e input
*/
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Calcule() {
  const [pedidos, setPedidos] = useState(300);
  const [ticketRaw, setTicketRaw] = useState('35,00');
  const [ticket, setTicket] = useState(35);
  const [taxa, setTaxa] = useState(0.27);
  const [mensalidade, setMensalidade] = useState(150);

  const [hasCalculated, setHasCalculated] = useState(false);

  useEffect(() => {
    // Initial calculation is automatic
    setHasCalculated(true);
  }, []);

  const handleTicketChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    const num = parseInt(digits || '0', 10) / 100;
    const formatted = num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setTicketRaw(formatted);
    setTicket(num);
  };

  const handleTicketSlider = (val: number) => {
    setTicket(val);
    setTicketRaw(val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  };

  const faturamento = pedidos * ticket;
  const comissao = faturamento * taxa;
  const totalTaxas = comissao + mensalidade;
  const economia = totalTaxas;
  const economiaAnual = economia * 12;

  const fmt = (v: number) => 'R$ ' + v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="label reveal visible">Calculadora de economia</div>
          <h1 className="reveal visible d1">Quanto você está<br /><span className="accent">jogando fora por mês?</span></h1>
          <p className="reveal visible d2">Simule o impacto das taxas no seu lucro e veja o que sobra quando você migra para uma plataforma sem comissão.</p>
        </div>
      </section>

      <section className="calc-main">
        <div className="container">
          <div className="calc-grid">

            <div className="calc-panel reveal visible">
              <h2>Simule o seu negócio</h2>
              <p className="sub">Ajuste os valores para refletir a realidade da sua operação.</p>

              <div className="field">
                <div className="field-top">
                  <label><span style={{ whiteSpace: 'nowrap' }}>Pedidos por mês</span> <span className="field-hint">quantos pedidos você recebe</span></label>
                  <input type="number" className="field-value-input" min="0" value={pedidos} onChange={(e) => setPedidos(parseFloat(e.target.value) || 0)} />
                </div>
                <input 
                  type="range" 
                  min="10" max="2000" step="10" 
                  value={pedidos} 
                  onChange={(e) => setPedidos(parseFloat(e.target.value))} 
                  style={{'--fill': `${((pedidos - 10) / (2000 - 10)) * 100}%`} as React.CSSProperties}
                />
                <div className="slider-bounds"><span>10</span><span>2.000</span></div>
              </div>

              <div className="field">
                <div className="field-top">
                  <label><span style={{ whiteSpace: 'nowrap' }}>Ticket médio</span> <span className="field-hint">valor médio por pedido</span></label>
                  <input type="text" className="field-value-input" inputMode="numeric" value={ticketRaw} onChange={(e) => handleTicketChange(e.target.value)} />
                </div>
                <input 
                  type="range" 
                  min="10" max="200" step="1" 
                  value={ticket} 
                  onChange={(e) => handleTicketSlider(parseFloat(e.target.value))}
                  style={{'--fill': `${((ticket - 10) / (200 - 10)) * 100}%`} as React.CSSProperties}
                />
                <div className="slider-bounds"><span>R$ 10</span><span>R$ 200</span></div>
              </div>

              <div className="divider"></div>

              <div className="platform-selector">
                <label>Plataforma atual <span className="field-hint">selecione para comparar</span></label>
                <div className="platform-btns">
                  <button className={`platform-btn ${taxa === 0.27 ? 'active' : ''}`} onClick={() => setTaxa(0.27)}>Aplicativo A (27%)</button>
                  <button className={`platform-btn ${taxa === 0.25 ? 'active' : ''}`} onClick={() => setTaxa(0.25)}>Aplicativo B (25%)</button>
                  <button className={`platform-btn ${taxa === 0.20 ? 'active' : ''}`} onClick={() => setTaxa(0.20)}>Média (20%)</button>
                  <button className={`platform-btn ${taxa === 0.12 ? 'active' : ''}`} onClick={() => setTaxa(0.12)}>Aplicativo C (12%)</button>
                </div>
              </div>

              <div className="field field-plain">
                <label>Mensalidade atual (R$) <span className="field-hint">custo fixo mensal</span></label>
                <input type="number" min="0" placeholder="150" value={mensalidade} onChange={(e) => setMensalidade(parseFloat(e.target.value) || 0)} />
              </div>

              <button onClick={() => setHasCalculated(true)} className="btn-primary" style={{width: '100%', fontSize: '15px', padding: '16px', marginTop: '4px'}}>
                Calcular economia →
              </button>
            </div>

            <div className="result-panel reveal visible d2">
              {!hasCalculated ? (
                <div className="result-empty visible">
                  <div className="result-empty-icon">🧮</div>
                  <p>Preencha os dados ao lado e clique em "Calcular" para ver quanto você economizaria por mês com o Riberfood.</p>
                </div>
              ) : (
                <div className="result-content visible">
                  <div className="result-label">Você economizaria por mês</div>
                  <div className="result-main">
                    <span className="result-currency">R$</span>
                    <span className="result-value">{economia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="result-period">com {pedidos} pedidos de {fmt(ticket)}</div>

                  <div className="result-rows">
                    <div className="result-row">
                      <span className="result-row-label">Faturamento bruto</span>
                      <span className="result-row-val neutral">{fmt(faturamento)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-row-label">Comissão atual</span>
                      <span className="result-row-val bad">− {fmt(comissao)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-row-label">Mensalidade atual</span>
                      <span className="result-row-val bad">− {fmt(mensalidade)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-row-label">Total gasto em taxas</span>
                      <span className="result-row-val bad">− {fmt(totalTaxas)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-row-label">Com Riberfood (R$ 0)</span>
                      <span className="result-row-val good">R$ 0,00</span>
                    </div>
                  </div>

                  <div className="result-anual">
                    <div className="result-anual-label">Economia em 12 meses</div>
                    <div className="result-anual-val">{fmt(economiaAnual)}</div>
                  </div>

                  <Link to="/#onboarding" className="btn-primary" style={{width: '100%', fontSize: '14px', padding: '15px'}}>
                    Quero economizar isso →
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <section className="simulation-section">
        <div className="container">
          <div className="section-head reveal visible">
            <div className="label">Exemplos reais</div>
            <h2>Veja o impacto por perfil de negócio</h2>
            <p>Quanto um restaurante típico economiza ao migrar para o Riberfood.</p>
          </div>

          <div className="simulation-grid">
            <div className="sim-card reveal visible d1">
              <div className="sim-card-header">
                <div className="sim-card-title">🥙 Marmitaria pequena</div>
                <div className="sim-card-sub">100 pedidos/mês · R$ 25 ticket</div>
              </div>
              <div className="sim-card-body">
                <div className="sim-row"><span className="sim-row-label">Faturamento</span><span className="sim-row-val">R$ 2.500</span></div>
                <div className="sim-row"><span className="sim-row-label">Comissão marketplace (27%)</span><span className="sim-row-val red">− R$ 675</span></div>
                <div className="sim-row"><span className="sim-row-label">Mensalidade</span><span className="sim-row-val red">− R$ 150</span></div>
                <div className="sim-divider"></div>
                <div className="sim-total"><span className="sim-total-label">Taxas por mês</span><span className="sim-total-val red">R$ 825</span></div>
                <div className="sim-divider"></div>
                <div className="sim-row"><span className="sim-row-label">Com Riberfood</span><span className="sim-row-val orange">R$ 0</span></div>
                <div className="sim-total"><span className="sim-total-label">Economia/mês</span><span className="sim-total-val green">+ R$ 825</span></div>
              </div>
            </div>

            <div className="sim-card featured reveal visible d2">
              <div className="sim-card-header">
                <div className="sim-card-title">🍔 Lanchonete média</div>
                <div className="sim-card-sub">300 pedidos/mês · R$ 35 ticket</div>
              </div>
              <div className="sim-card-body">
                <div className="sim-row"><span className="sim-row-label">Faturamento</span><span className="sim-row-val">R$ 10.500</span></div>
                <div className="sim-row"><span className="sim-row-label">Comissão marketplace (27%)</span><span className="sim-row-val red">− R$ 2.835</span></div>
                <div className="sim-row"><span className="sim-row-label">Mensalidade</span><span className="sim-row-val red">− R$ 150</span></div>
                <div className="sim-divider"></div>
                <div className="sim-total"><span className="sim-total-label">Taxas por mês</span><span className="sim-total-val red">R$ 2.985</span></div>
                <div className="sim-divider"></div>
                <div className="sim-row"><span className="sim-row-label">Com Riberfood</span><span className="sim-row-val orange">R$ 0</span></div>
                <div className="sim-total"><span className="sim-total-label">Economia/mês</span><span className="sim-total-val green">+ R$ 2.985</span></div>
              </div>
            </div>

            <div className="sim-card reveal visible d3">
              <div className="sim-card-header">
                <div className="sim-card-title">🍕 Pizzaria movimentada</div>
                <div className="sim-card-sub">600 pedidos/mês · R$ 55 ticket</div>
              </div>
              <div className="sim-card-body">
                <div className="sim-row"><span className="sim-row-label">Faturamento</span><span className="sim-row-val">R$ 33.000</span></div>
                <div className="sim-row"><span className="sim-row-label">Comissão marketplace (27%)</span><span className="sim-row-val red">− R$ 8.910</span></div>
                <div className="sim-row"><span className="sim-row-label">Mensalidade</span><span className="sim-row-val red">− R$ 300</span></div>
                <div className="sim-divider"></div>
                <div className="sim-total"><span className="sim-total-label">Taxas por mês</span><span className="sim-total-val red">R$ 9.210</span></div>
                <div className="sim-divider"></div>
                <div className="sim-row"><span className="sim-row-label">Com Riberfood</span><span className="sim-row-val orange">R$ 0</span></div>
                <div className="sim-total"><span className="sim-total-label">Economia/mês</span><span className="sim-total-val green">+ R$ 9.210</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-head reveal visible">
            <div className="label">Entenda a diferença</div>
            <h2>Por que a economia é tão grande?</h2>
            <p>Três cobranças que as grandes plataformas fazem — e o Riberfood não faz.</p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal visible d1">
              <div className="why-icon">💸</div>
              <h3>Comissão sobre cada venda</h3>
              <p>As grandes plataformas ficam com 12% a 30% de cada pedido. Em 300 pedidos de R$ 35, isso representa R$ 2.835 por mês saindo do seu bolso todo mês — sem exceção.</p>
            </div>
            <div className="why-card reveal visible d2">
              <div className="why-icon">📅</div>
              <h3>Mensalidade fixa</h3>
              <p>Mesmo que você venda pouco ou nada em um mês, a mensalidade é cobrada. R$ 150 a R$ 300 por mês independentemente do seu faturamento.</p>
            </div>
            <div className="why-card reveal visible d3">
              <div className="why-icon">🚫</div>
              <h3>Taxa de cancelamento</h3>
              <p>Quando o cliente cancela o pedido, algumas plataformas ainda cobram do restaurante. Você perde a venda e ainda paga a taxa. No Riberfood, isso não existe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="reveal visible">Pare de calcular. Comece a economizar.</h2>
          <p className="reveal visible d1">Cadastre seu restaurante agora e mantenha 100% do seu lucro.</p>
          <Link to="/#onboarding" className="btn-primary reveal visible d2">
            Cadastrar meu negócio →
          </Link>
          <p className="cta-note reveal visible d3">Sem mensalidade · Começa agora</p>
        </div>
      </section>
    </>
  );
}
