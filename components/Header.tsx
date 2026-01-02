
import React from 'react';
import { BotIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <BotIcon className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              Generador de Perfil ATS con IA
            </h1>
            <p className="text-sm text-slate-400">Potenciado por Gemini</p>
          </div>
        </div>
      </div>
    </header>
  );
};
