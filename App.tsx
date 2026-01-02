
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { generateAllContent } from './services/geminiService';
import type { GeneratedContent } from './types';
import { TONE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [tone, setTone] = useState(TONE_OPTIONS[0].value);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!jobDescription.trim() || !resume.trim()) {
      setError('Por favor, complete la vacante y la hoja de vida.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateAllContent(jobDescription, resume, tone);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al generar el contenido. Por favor, intente de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-center text-slate-400 mb-8">
          Pegue la descripción de la vacante y su hoja de vida para generar contenido optimizado para sistemas ATS y redes profesionales como LinkedIn.
        </p>

        <InputForm
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          resume={resume}
          setResume={setResume}
          tone={tone}
          setTone={setTone}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />

        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <Spinner />
            <p className="mt-4 text-slate-400">Analizando y generando contenido... Esto puede tardar un momento.</p>
          </div>
        )}

        {generatedContent && !isLoading && (
          <div className="mt-8">
            <ResultDisplay content={generatedContent} />
          </div>
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
