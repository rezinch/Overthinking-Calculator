import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Terminal, AlertCircle } from 'lucide-react';
import { getResult } from '../../lib/storage';
import type { AnalysisResult } from '../../types';
import ScoreGauge from './ScoreGauge';
import InterpretationList from './InterpretationList';
import EvidencePanel from './EvidencePanel';
import RedGreenFlags from './RedGreenFlags';
import Timeline from './Timeline';
import AlternateUniverses from './AlternateUniverses';
import OverthinkingGraph from './OverthinkingGraph';
import VerdictCard from './VerdictCard';
import Recommendation from './Recommendation';
import ShareCard from './ShareCard';

export default function ResultsDashboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      const data = getResult(id);
      if (data) {
        setResult(data);
        window.scrollTo(0, 0);
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-bg-primary brutal-grid pb-24 text-text-primary font-sans">
      {/* Top Header */}
      <nav className="border-b-2 border-white bg-black px-6 py-4 flex items-center justify-between font-mono text-xs font-bold">
        <button onClick={() => navigate('/')} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN_HOME</span>
        </button>

        <div className="flex items-center gap-2 text-accent-cyan">
          <Terminal className="w-4 h-4" />
          <span>REPORT_DOSSIER // {result.id}</span>
        </div>

        <button onClick={() => navigate('/analyze')} className="btn-primary py-2 px-4 text-xs">
          <RotateCcw className="w-4 h-4" />
          <span>NEW_ANALYSIS</span>
        </button>
      </nav>

      {/* Main Container — Spacious Layout */}
      <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12">

        {/* Easter Egg Notice */}
        {result.easterEgg && (
          <div className="p-4 bg-black border-2 border-white text-accent-pink flex items-center gap-3 font-mono text-xs font-bold shadow-[4px_4px_0px_#ff2a85]">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-extrabold uppercase">EASTER EGG DETECTED:</span>
            <span>"{result.easterEgg}"</span>
          </div>
        )}

        {/* Payload Target Header */}
        <div className="brutal-panel p-8 text-center space-y-2">
          <span className="text-xs font-mono text-text-muted uppercase tracking-widest block font-bold">
            EVALUATED INTERACTION PAYLOAD
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-accent-cyan">
            "{result.input.exactMessage || result.input.whatHappened}"
          </h1>
        </div>

        {/* Gauge & Verdict Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <ScoreGauge score={result.overthinkingIndex} category={result.scoreCategory} />
          <VerdictCard verdict={result.verdict} />
        </div>

        {/* Interpretation Matrix */}
        <InterpretationList interpretations={result.interpretations} />

        {/* Evidence Breakdown & Red/Green Flags */}
        <div className="space-y-8">
          <EvidencePanel evidence={result.evidence} />
          <RedGreenFlags greenFlags={result.greenFlags} redFlags={result.redFlags} />
        </div>

        {/* Timeline & Graph */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Timeline timeline={result.timeline} />
          <OverthinkingGraph graphData={result.graphData} finalScore={result.overthinkingIndex} />
        </div>

        {/* Multiverse Alternate Universes */}
        <AlternateUniverses universes={result.alternateUniverses} />

        {/* Algorithmic Advice */}
        <Recommendation recommendation={result.recommendation} score={result.overthinkingIndex} />

        {/* Share & Download Card */}
        <div className="pt-8 border-t-2 border-white">
          <ShareCard result={result} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <button onClick={() => navigate('/analyze')} className="btn-primary text-sm px-10 py-5 font-mono">
            <RotateCcw className="w-5 h-5" />
            <span>ANALYZE ANOTHER INTERACTION</span>
          </button>
        </div>
      </div>
    </div>
  );
}
