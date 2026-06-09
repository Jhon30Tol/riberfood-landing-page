/* Author: Jhon toledo
 Date: 09/06/2026
Objective: Navbar da Landing Page
Date Alter: 09/06/2026
Alter: 09/06/2026 - Correção no comportamento do menu mobile e no estilo do botão
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="logo nav-logo">
              <img src="/riberfood-logo.png" alt="Riberfood" className="nav-logo-text" />
            </Link>
            <ul className="nav-links">
              <li><Link to="/">Solução</Link></li>
              <li><Link to="/funcionalidades">Funcionalidades</Link></li>
              <li><Link to="/calcule">Calcule</Link></li>
              <li><Link to="/planos">Plano</Link></li>
            </ul>
            <a href="https://lojista.stg.riberfood.com" target="_blank" rel="noopener noreferrer" className="btn-login">Entrar</a>
            <Link to="/#onboarding" className="btn-primary nav-cta" onClick={() => {
              const el = document.getElementById('onboarding');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>Começar grátis →</Link>
            <button 
              className={`nav-hamburger ${isMobileNavOpen ? 'open' : ''}`} 
              aria-label="Menu" 
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Menu mobile */}
      <div className={`nav-mobile ${isMobileNavOpen ? 'open' : ''}`} id="nav-mobile">
        <Link to="/" onClick={() => setIsMobileNavOpen(false)}>Solução</Link>
        <Link to="/funcionalidades" onClick={() => setIsMobileNavOpen(false)}>Funcionalidades</Link>
        <Link to="/calcule" onClick={() => setIsMobileNavOpen(false)}>Calcule</Link>
        <Link to="/planos" onClick={() => setIsMobileNavOpen(false)}>Plano</Link>
        <a href="https://lojista.stg.riberfood.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileNavOpen(false)}>Entrar</a>
        <Link to="/#onboarding" className="btn-primary" onClick={() => {
          setIsMobileNavOpen(false);
          const el = document.getElementById('onboarding');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}>Começar grátis →</Link>
      </div>
    </>
  );
}
