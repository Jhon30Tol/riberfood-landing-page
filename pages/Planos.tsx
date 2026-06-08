import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Planos({ onOpenTrial, onOpenWaitlist }: { onOpenTrial: () => void, onOpenWaitlist: () => void }) {
  const freeBenefits = [
    "Cardápio digital com QR Code",
    "Cardápio com fotos e descrições",
    "Pedidos ilimitados sem comissão",
    "Gestão de Pedidos e Entregas",
    "Painel do Lojista e Relatórios",
    "Suporte Especializado",
  ];

  const soonBenefits = [
    "KDS — Display de Cozinha",
    "App Garçom e Entregador",
    "Controle de Mesas e Comanda",
    "Roteirização de Entregas"
  ];

  return (
    <div className="w-full flex flex-col items-center min-h-[70vh] animate-in slide-in-from-bottom-12 fade-in duration-700 pb-20 pt-12">
      
      <div className="text-center max-w-5xl mx-auto px-4 mb-20">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white uppercase">
          Um plano completo.<br />
          <span className="text-orange-600">Sem pegadinhas.</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-400 mb-12 tracking-tight">
          Sem prazo promocional. Sem cartão de crédito. Começa agora.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        
        {/* Plano Completo (Destaque) */}
        <div className="bg-gray-950 border-4 border-orange-600 p-8 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-0 bg-orange-600 text-white px-6 py-2 font-black uppercase text-sm -mt-4 mr-8">
            Atual
          </div>
          <h2 className="text-4xl font-black text-white mb-2 uppercase">Plano Completo</h2>
          
          <div className="flex items-baseline gap-2 mb-8 mt-6">
            <span className="text-6xl md:text-7xl font-black text-orange-600">R$ 0</span>
            <span className="text-xl text-gray-500 font-bold uppercase tracking-widest">/mês</span>
          </div>
          
          <ul className="space-y-4 mb-12">
            {freeBenefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-4 text-xl font-medium text-gray-200">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onOpenTrial} 
            className="w-full bg-orange-600 text-white py-6 font-black text-2xl hover:bg-orange-700 transition-all uppercase shadow-2xl shadow-orange-600/30"
          >
            QUERO ESTE PLANO
          </button>
        </div>

        {/* Plano Futuro */}
        <div className="bg-gray-900 border border-white/10 p-8 md:p-12 hover:border-white/30 transition-colors relative">
          <div className="absolute top-0 right-0 bg-gray-800 text-gray-400 px-6 py-2 font-black uppercase text-sm -mt-4 mr-8">
            Em breve
          </div>
          <h2 className="text-4xl font-black text-gray-400 mb-2 uppercase">Recursos Premium</h2>
          
          <div className="flex items-baseline gap-2 mb-8 mt-6">
            <span className="text-3xl md:text-4xl font-black text-gray-600">Em desenvolvimento</span>
          </div>
          
          <ul className="space-y-4 mb-12">
            {soonBenefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-4 text-xl font-medium text-gray-500">
                <CheckCircle className="w-6 h-6 text-gray-700 flex-shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onOpenWaitlist} 
            className="w-full bg-transparent border-2 border-gray-700 text-gray-400 py-6 font-black text-2xl hover:bg-gray-800 hover:text-white transition-all uppercase"
          >
            ENTRAR NA LISTA DE ESPERA
          </button>
        </div>

      </div>
    </div>
  );
}
