import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Terminal, BarChart2, History, ArrowRight, X } from 'lucide-react';
import { getHistory } from '../../lib/storage';

export default function LandingPage() {
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const history = getHistory();

  return (
    <div className="min-h-screen bg-bg-primary brutal-grid flex flex-col font-sans text-text-primary">
      {/* Top Header Bar */}
      <header className="border-b-2 border-white bg-black px-6 py-4 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 font-bold tracking-wider text-accent-cyan text-sm">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span>OVERTHINKING_CALCULATOR</span>
          </div>
          <span className="text-text-muted hidden sm:inline">//</span>
          <span className="text-text-secondary hidden sm:inline">v2.0.26 [NEO_BRUTALIST]</span>
        </div>

        <div className="flex items-center gap-4">
          {history.length > 0 && (
            <button onClick={() => navigate('/history')} className="btn-ghost">
              <History className="w-4 h-4" />
              <span>ARCHIVE ({history.length})</span>
            </button>
          )}
          <button onClick={() => navigate('/stats')} className="btn-ghost">
            <BarChart2 className="w-4 h-4" />
            <span>TELEMETRY</span>
          </button>
        </div>
      </header>

      {/* Hero Section — Spacious Layout */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl text-center">

          {/* System Status Tag */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-white bg-black font-mono text-xs shadow-[4px_4px_0px_#00f0ff] translate-x-[-2px]">
              <span className="w-2.5 h-2.5 bg-accent-green" />
              <span className="font-bold text-white uppercase">SYSTEM STATUS: READY FOR OVERTHINKING</span>
            </div>
          </div>

          {/* Large Hero Title */}
          <div className="mb-14 space-y-6">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-none">
              OVERTHINKING<br />
              <span className="text-accent-cyan underline decoration-4 underline-offset-8">CALCULATOR</span>
            </h1>

            <p className="text-xl sm:text-2xl font-mono font-bold text-accent-yellow max-w-2xl mx-auto leading-tight">
              "Turning one-word replies into 47 possible scenarios since 2026."
            </p>

            <p className="text-xs font-mono text-text-muted uppercase tracking-widest pt-2">
              // Because apparently 'okay' needs data science.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24 w-full max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/analyze')}
              className="btn-primary text-base w-full py-5"
              id="cta-analyze"
            >
              <Activity className="w-5 h-5" />
              <span>ANALYZE SOMETHING NOW</span>
            </button>

            <button
              onClick={() => setShowHowItWorks(true)}
              className="btn-secondary text-base w-full py-5"
              id="cta-how"
            >
              <span>HOW DOES THIS WORK?</span>
            </button>
          </div>

          {/* Spacious Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-left font-mono">
            <div className="brutal-panel p-6 flex flex-col justify-between min-h-[140px]">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">ALGORITHM</span>
              <span className="text-2xl font-black text-white block">10 FACTORS</span>
              <span className="text-xs font-bold text-accent-cyan block mt-2">DETERMINISTIC</span>
            </div>

            <div className="brutal-panel-yellow p-6 flex flex-col justify-between min-h-[140px]">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">SCENARIOS</span>
              <span className="text-2xl font-black text-white block">14,291</span>
              <span className="text-xs font-bold text-accent-yellow block mt-2">WHAT-IFS SIMULATED</span>
            </div>

            <div className="brutal-panel-pink p-6 flex flex-col justify-between min-h-[140px]">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">GLOBAL MEAN</span>
              <span className="text-2xl font-black text-white block">68.7%</span>
              <span className="text-xs font-bold text-accent-pink block mt-2">AVERAGE INDEX</span>
            </div>

            <div className="brutal-panel-red p-6 flex flex-col justify-between min-h-[140px]">
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">THREAT VECTOR</span>
              <span className="text-2xl font-black text-accent-red block">"." PERIOD</span>
              <span className="text-xs font-bold text-accent-red block mt-2">DEADLY PUNCTUATION</span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-white bg-black py-4 px-6 text-center text-xs font-mono text-text-muted">
        OVERTHINKING CALCULATOR // USELESS PROJECT SPECIFICATION // NO EXTERNAL AI REQUIRED
      </footer>

      {/* How it works modal */}
      {showHowItWorks && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/85"
          onClick={() => setShowHowItWorks(false)}
        >
          <div
            className="brutal-panel-yellow max-w-xl w-full p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b-2 border-white font-mono font-bold text-sm">
              <span>METHODOLOGY SPECIFICATION</span>
              <button onClick={() => setShowHowItWorks(false)} className="p-1 hover:bg-white hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-2xl font-black uppercase font-mono">HOW IT WORKS</h2>

            <div className="space-y-4 font-mono text-xs text-text-secondary leading-relaxed">
              <div className="p-4 bg-black border-2 border-white">
                <span className="text-accent-cyan font-bold text-sm block mb-1">01 // WHAT HAPPENED?</span>
                <span>Enter any ordinary text or micro-interaction. E.g., "She replied okay."</span>
              </div>

              <div className="p-4 bg-black border-2 border-white">
                <span className="text-accent-yellow font-bold text-sm block mb-1">02 // FORENSIC TELEMETRY</span>
                <span>Specify response delay, punctuation, capitalization, emoji, and context deviation.</span>
              </div>

              <div className="p-4 bg-black border-2 border-white">
                <span className="text-accent-pink font-bold text-sm block mb-1">03 // COMPUTED DIAGNOSIS</span>
                <span>Receive score index, probability scenario breakdown, timeline, alternate multiverse models, and useless advice.</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowHowItWorks(false);
                navigate('/analyze');
              }}
              className="btn-primary w-full text-sm py-4"
            >
              <span>PROCEED TO ANALYSIS</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
