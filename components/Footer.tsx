import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link to="/" className="logo nav-logo">
              <img src="/riberfood-logo.png" alt="Riberfood" className="nav-logo-text" />
            </Link>
            <p>Sistema completo para restaurantes e delivery.</p>
          </div>
          <div className="footer-info">
            Ribeirão Preto/SP<br />
            <a href="mailto:suporte@riberfood.com" style={{ color: 'rgba(255,107,0,.7)' }}>suporte@riberfood.com</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} Riberfood.<br />Desenvolvido por SafeTrust Technology.</div>
        </div>
      </div>
    </footer>
  );
}
