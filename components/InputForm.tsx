
import React from 'react';
import { TONE_OPTIONS } from '../constants';

interface InputFormProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  resume: string;
  setResume: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  jobDescription,
  setJobDescription,
  resume,
  setResume,
  tone,
  setTone,
  onSubmit,
  isLoading,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job-description" className="block text-sm font-medium text-slate-300 mb-2">
            Vacante Requerida
          </label>
          <textarea
            id="job-description"
            rows={10}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
            placeholder="Pegue aquí la descripción completa de la vacante..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-slate-300 mb-2">
            Hoja de Vida (CV)
          </label>
          <textarea
            id="resume"
            rows={10}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 placeholder-slate-500"
            placeholder="Pegue aquí el contenido de su hoja de vida..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="tone" className="block text-sm font-medium text-slate-300 mb-2">
          Tono Deseado
        </label>
        <select
          id="tone"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          {TONE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Generando...' : 'Generar Contenido'}
        </button>
      </div>
    </form>
  );
};
