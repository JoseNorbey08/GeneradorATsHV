
import React, { useState } from 'react';
import type { GeneratedContent } from '../types';
import { CopyIcon } from './icons';

interface ResultDisplayProps {
  content: GeneratedContent;
}

const ContentCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-800/50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-slate-300">{title}</h4>
        <button
          onClick={handleCopy}
          className="text-slate-400 hover:text-cyan-400 transition"
          title="Copiar al portapapeles"
        >
          {copied ? '¡Copiado!' : <CopyIcon className="w-5 h-5" />}
        </button>
      </div>
      <textarea
        readOnly
        className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-md p-2 text-sm text-slate-400 resize-none"
        value={content}
      />
    </div>
  );
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState('linkedin');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Match Percentage Section */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-300 mb-2">Porcentaje de Aprobación (ATS Match)</h2>
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              className="text-slate-700"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-cyan-400"
              strokeDasharray={`${content.matchPercentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-3xl font-bold text-slate-100">{content.matchPercentage}%</span>
        </div>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">{content.justification}</p>
      </div>

      {/* Tabs for Content */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
        <div className="flex border-b border-slate-700 mb-6">
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`px-4 py-2 font-semibold transition ${activeTab === 'linkedin' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400'}`}
          >
            LinkedIn
          </button>
          <button
            onClick={() => setActiveTab('copilot')}
            className={`px-4 py-2 font-semibold transition ${activeTab === 'copilot' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400'}`}
          >
            Plataforma Genérica
          </button>
        </div>

        {activeTab === 'linkedin' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ContentCard title="Publicación (Formato Largo)" content={content.linkedin_long} />
              <ContentCard title="Perfil (Formato Sistema ATS)" content={content.linkedin_ats} />
            </div>
            <div>
              <h4 className="font-semibold text-slate-300 mb-2">Imagen de Banner Sugerida</h4>
              <img src={content.linkedin_image_url} alt="Generated for LinkedIn" className="w-full rounded-lg aspect-video object-cover border-2 border-slate-700" />
            </div>
          </div>
        )}

        {activeTab === 'copilot' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <ContentCard title="Publicación (Largo Contundente)" content={content.copilot_long} />
              <ContentCard title="Perfil (Formato Sistema ATS)" content={content.copilot_ats} />
            </div>
             <div>
              <h4 className="font-semibold text-slate-300 mb-2">Imagen de Perfil Sugerida</h4>
              <img src={content.copilot_image_url} alt="Generated for Copilot" className="w-64 h-64 mx-auto rounded-lg object-cover border-2 border-slate-700" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
