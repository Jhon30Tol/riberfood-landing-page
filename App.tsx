import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Funcionalidades from './pages/Funcionalidades';
import Calcule from './pages/Calcule';
import Planos from './pages/Planos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Restore original # hash handling for backwards compatibility with legacy urls if any
const stripLegacyLoginHash = () => {
  if (window.location.hash === '#login') {
    window.location.hash = '';
    // Let it handle login via some other way, but currently we just strip it
  }
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null;
};

const RevealScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    // Wait a tick for React to render the new route's DOM elements
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        // Reset visibility on route change so it can animate again
        el.classList.remove('visible');
        observer.observe(el);
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    stripLegacyLoginHash();
  }, []);

  return (
    <HashRouter>
      <ScrollToTop />
      <RevealScroll />
      <Navbar />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/funcionalidades" element={<Funcionalidades />} />
          <Route path="/calcule" element={<Calcule />} />
          <Route path="/planos" element={<Planos />} />
        </Routes>
      </main>

      <Footer />
    </HashRouter>
  );
};

export default App;
