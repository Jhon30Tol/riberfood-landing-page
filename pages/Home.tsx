import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Truck, Zap } from 'lucide-react';

export default function Home({ onOpenTrial }: { onOpenTrial: () => void }) {
  return (
    <div className="w-full flex flex-col items-center min-h-[70vh] animate-in slide-in-from-bottom-12 fade-in duration-700 pb-20 pt-12">
      
      {/* Hero Section */}
      <div className="text-center max-w-5xl mx-auto px-4 mt-12 mb-24">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white uppercase">
          Tudo o que seu<br />
          <span className="text-orange-600">delivery precisa.</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-400 mb-12 tracking-tight max-w-3xl mx-auto">
          Plataforma completa para lanchonetes, marmitarias, bares e restaurantes. Sem taxas abusivas. Sem complicação.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button 
            onClick={onOpenTrial} 
            className="bg-orange-600 text-white px-10 py-6 font-black text-xl hover:bg-orange-700 transition-all transform hover:scale-105 shadow-2xl shadow-orange-600/30"
          >
            COMEÇAR GRÁTIS
          </button>
          <Link 
            to="/funcionalidades" 
            className="bg-gray-900 text-white px-10 py-6 font-black text-xl hover:bg-gray-800 transition-all border-2 border-white/10 hover:border-white/30"
          >
            VER FUNCIONALIDADES
          </Link>
        </div>
      </div>

      {/* Value Proposition (Brutalist Grid) */}
      <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        
        <div className="bg-gray-950 border border-white/5 p-10 md:p-16 hover:border-orange-500/50 transition-colors">
          <h2 className="text-4xl font-black text-white mb-4 uppercase">Sem Mensalidade</h2>
          <p className="text-xl text-gray-400 font-medium">Vendeu pouco ou muito — você não paga nada fixo. O lucro das suas vendas é inteiramente seu.</p>
        </div>
        
        <div className="bg-gray-950 border border-white/5 p-10 md:p-16 hover:border-orange-500/50 transition-colors">
          <h2 className="text-4xl font-black text-white mb-4 uppercase">Zero Comissão</h2>
          <p className="text-xl text-gray-400 font-medium">Esqueça pagar 20%–30% para plataformas gigantes em cima de cada lanche ou marmita vendida.</p>
        </div>

        <div className="bg-gray-950 border border-white/5 p-10 md:p-16 hover:border-orange-500/50 transition-colors">
          <h2 className="text-4xl font-black text-white mb-4 uppercase">Setup Simples</h2>
          <p className="text-xl text-gray-400 font-medium">Sem instalação, sem técnico. Você mesmo configura em minutos e já começa a receber pedidos.</p>
        </div>

        <div className="bg-gray-950 border border-white/5 p-10 md:p-16 hover:border-orange-500/50 transition-colors">
          <h2 className="text-4xl font-black text-white mb-4 uppercase">Qualquer Device</h2>
          <p className="text-xl text-gray-400 font-medium">Celular, tablet ou computador. Sem app para baixar — acessa direto pelo navegador de forma leve.</p>
        </div>

      </div>

      {/* Steps (Anti-cliche step by step) */}
      <div className="w-full max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase mb-16 tracking-tight">Como Funciona</h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-center justify-between bg-orange-600 text-white p-8 md:p-12 text-left shadow-2xl">
            <div>
              <span className="text-sm font-black tracking-[0.3em] opacity-80 mb-2 block">PASSO 01</span>
              <h3 className="text-3xl font-black uppercase">Preencha suas informações</h3>
            </div>
            <p className="text-xl font-medium max-w-md mt-4 md:mt-0 opacity-90">Nome do estabelecimento, endereço e contato. Leva menos de 2 minutos.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900 border border-white/10 text-white p-8 md:p-12 text-left hover:border-orange-500/50 transition-colors">
            <div>
              <span className="text-sm font-black tracking-[0.3em] text-orange-500 mb-2 block">PASSO 02</span>
              <h3 className="text-3xl font-black uppercase">Cardápio Digital</h3>
            </div>
            <p className="text-xl font-medium max-w-md mt-4 md:mt-0 text-gray-400">Adicione produtos com fotos, descrições e preços. Seu link e QR Code são gerados automaticamente.</p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between bg-gray-900 border border-white/10 text-white p-8 md:p-12 text-left hover:border-orange-500/50 transition-colors">
            <div>
              <span className="text-sm font-black tracking-[0.3em] text-orange-500 mb-2 block">PASSO 03</span>
              <h3 className="text-3xl font-black uppercase">Receba Pedidos</h3>
            </div>
            <p className="text-xl font-medium max-w-md mt-4 md:mt-0 text-gray-400">Tudo numa tela só: do pedido ao entregador. Sem confusão no horário de pico.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
