import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Calcule({ onOpenTrial }: { onOpenTrial: () => void }) {
  const [pedidosPorDia, setPedidosPorDia] = useState(50);
  const [ticketMedio, setTicketMedio] = useState(40);
  
  const faturamentoMensal = pedidosPorDia * ticketMedio * 30;
  const economiaIfood = faturamentoMensal * 0.27; // 27% na plataforma concorrente
  const lucroReal = faturamentoMensal;

  return (
    <div className="w-full flex flex-col items-center min-h-[70vh] animate-in slide-in-from-bottom-12 fade-in duration-700 pb-20 pt-12">
      
      <div className="text-center max-w-5xl mx-auto px-4 mb-16">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 text-white uppercase">
          Calcule sua<br />
          <span className="text-orange-600">Economia.</span>
        </h1>
        <p className="text-2xl md:text-3xl font-medium text-gray-400 mb-12 tracking-tight">
          Descubra quanto dinheiro você está deixando na mesa com taxas abusivas.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        
        {/* Controles */}
        <div className="bg-gray-950 border border-white/10 p-8 md:p-12">
          <h2 className="text-3xl font-black text-white mb-10 uppercase">Seus Números</h2>
          
          <div className="mb-10">
            <label className="flex justify-between text-xl font-bold text-gray-300 mb-4">
              <span>Pedidos por dia</span>
              <span className="text-orange-500">{pedidosPorDia}</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="500" 
              value={pedidosPorDia} 
              onChange={(e) => setPedidosPorDia(Number(e.target.value))}
              className="w-full accent-orange-600 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-10">
            <label className="flex justify-between text-xl font-bold text-gray-300 mb-4">
              <span>Ticket Médio (R$)</span>
              <span className="text-orange-500">R$ {ticketMedio}</span>
            </label>
            <input 
              type="range" 
              min="15" 
              max="150" 
              value={ticketMedio} 
              onChange={(e) => setTicketMedio(Number(e.target.value))}
              className="w-full accent-orange-600 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-orange-600 p-8 md:p-12 shadow-2xl flex flex-col justify-center">
          <h2 className="text-2xl font-black text-white/80 mb-2 uppercase">Faturamento Mensal Estimado</h2>
          <p className="text-5xl md:text-6xl font-black text-white mb-10">
            R$ {faturamentoMensal.toLocaleString('pt-BR')}
          </p>

          <div className="bg-gray-900/40 p-6 mb-8 border-l-4 border-white">
            <p className="text-lg font-bold text-white/70 uppercase mb-1">O que você pagaria de taxa (27%)</p>
            <p className="text-4xl font-black text-red-300">
              - R$ {economiaIfood.toLocaleString('pt-BR')}
            </p>
          </div>

          <div>
            <p className="text-xl font-bold text-white uppercase mb-2">Com Riberfood, você lucra os mesmos</p>
            <p className="text-5xl font-black text-white">
              R$ {lucroReal.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm font-bold mt-2 opacity-80 uppercase tracking-widest">Sem descontos. 100% seu.</p>
          </div>
        </div>

      </div>

      <div className="text-center mt-16">
        <button 
          onClick={onOpenTrial} 
          className="bg-white text-orange-600 px-12 py-6 font-black text-2xl hover:bg-gray-200 transition-all uppercase shadow-2xl"
        >
          Parar de perder dinheiro
        </button>
      </div>
    </div>
  );
}
