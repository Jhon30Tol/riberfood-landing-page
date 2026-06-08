import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Funcionalidades({ onOpenTrial }: { onOpenTrial: () => void }) {
  const features = [
    "Cardápio Digital Integrado",
    "Gestão de Pedidos em Tempo Real",
    "QR Code para Mesas (Em Breve)",
    "Relatórios Financeiros de Vendas",
    "Painel do Entregador Integrado",
    "Controle de Taxa de Entrega",
    "Recebimento direto no PIX ou Cartão"
  ];

  return (
    <div className="w-full flex flex-col items-center min-h-[70vh] animate-in slide-in-from-bottom-12 fade-in duration-700 pb-20 pt-12">
      
      <div className="text-center max-w-5xl mx-auto px-4 mb-20">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white uppercase">
          Tudo que você precisa.<br />
          <span className="text-orange-600">Tudo Incluso.</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-400 mb-12 tracking-tight">
          Plataforma completa. Tudo no plano gratuito, sem custo extra.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-gray-900 border border-white/10 p-8 md:p-16 mb-12 shadow-2xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-orange-600 flex-shrink-0" />
                <span className="text-2xl font-bold text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <button 
          onClick={onOpenTrial} 
          className="bg-orange-600 text-white px-10 py-6 font-black text-xl hover:bg-orange-700 transition-all transform hover:scale-105 shadow-2xl shadow-orange-600/30 uppercase"
        >
          Cadastrar meu restaurante
        </button>
      </div>
    </div>
  );
}
