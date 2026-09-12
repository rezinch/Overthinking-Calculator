import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserStats } from '../../lib/storage';
import type { UserStats } from '../../types';
import { ArrowLeft, Terminal, BarChart2, Globe } from 'lucide-react';

export default function StatisticsPanel() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-bg-primary terminal-grid p-6 md:p-12 text-text-primary font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-border pb-4 font-mono text-xs">
          <button onClick={() => navigate('/')} className="btn-ghost">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN_HOME</span>
          </button>
        </div>

        <div>
          <div className="flex items-center gap-2 text-text-muted font-mono text-xs mb-1">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span>GLOBAL_AND_LOCAL_TELEMETRY</span>
          </div>
          <h1 className="text-2xl font-extrabold font-mono">ANALYTICS & METRIC DASHBOARD</h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            Quantitative benchmarks from personal evaluation runs and global baselines.
          </p>
        </div>

        {/* Personal Telemetry */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-cyan">
            <BarChart2 className="w-4 h-4" />
            <span>LOCAL TELEMETRY</span>
          </div>

          {stats.totalAnalyses === 0 ? (
            <div className="panel p-6 text-center text-text-muted text-xs font-mono">
              NO LOCAL TELEMETRY RECORDED. RUN AN ANALYSIS TO GENERATE METRICS.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">AVG OVERTHINKING INDEX</span>
                <span className="text-2xl font-bold text-accent-cyan">{stats.averageScore}%</span>
                <span className="text-[10px] text-text-muted block">{stats.totalAnalyses} total analyses</span>
              </div>

              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">PEAK OVERTHOUGHT PHRASE</span>
                <span className="text-sm font-bold text-text-primary truncate block font-sans">"{stats.mostOverthoughtPhrase}"</span>
                <span className="text-[10px] text-text-muted block">Highest recorded score</span>
              </div>

              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">SCENARIOS SIMULATED</span>
                <span className="text-2xl font-bold text-accent-purple">{stats.totalScenariosImagined}</span>
                <span className="text-[10px] text-text-muted block">Multiverse branches</span>
              </div>

              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">DEADLIEST PUNCTUATION</span>
                <span className="text-2xl font-bold text-accent-red">"."</span>
                <span className="text-[10px] text-text-muted block">High Threat Level</span>
              </div>

              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">PEAK LATENCY ANXIETY</span>
                <span className="text-2xl font-bold text-accent-amber">{stats.mostSuspiciousResponseTime}m</span>
                <span className="text-[10px] text-text-muted block">Maximum delay</span>
              </div>

              <div className="panel p-4 space-y-1">
                <span className="text-[10px] text-text-muted uppercase block">ESTIMATED HOURS WASTED</span>
                <span className="text-2xl font-bold text-accent-green">{stats.totalHoursWasted} hrs</span>
                <span className="text-[10px] text-text-muted block">Cognitive bandwidth</span>
              </div>
            </div>
          )}
        </div>

        {/* Global Benchmarks */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-accent-purple">
            <Globe className="w-4 h-4" />
            <span>GLOBAL BENCHMARKS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="panel p-4 space-y-1">
              <span className="text-[10px] text-text-muted uppercase block">GLOBAL MEAN INDEX</span>
              <span className="text-xl font-bold text-text-primary">68.7%</span>
              <span className="text-[10px] text-text-muted block">Baseline human mean</span>
            </div>

            <div className="panel p-4 space-y-1">
              <span className="text-[10px] text-text-muted uppercase block">MOST SUSPICIOUS PHRASE</span>
              <span className="text-xl font-bold text-accent-red">"k"</span>
              <span className="text-[10px] text-text-muted block">94.2% Overthink rate</span>
            </div>

            <div className="panel p-4 space-y-1">
              <span className="text-[10px] text-text-muted uppercase block">DEADLIEST VECTOR</span>
              <span className="text-xl font-bold text-accent-amber">"."</span>
              <span className="text-[10px] text-text-muted block">Period menace</span>
            </div>

            <div className="panel p-4 space-y-1">
              <span className="text-[10px] text-text-muted uppercase block">THREAT EMOJI</span>
              <span className="text-xl font-bold text-text-primary">👍</span>
              <span className="text-[10px] text-text-muted block">Passive-aggressive king</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
