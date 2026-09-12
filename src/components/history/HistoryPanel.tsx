import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, clearHistory } from '../../lib/storage';
import type { HistoryEntry } from '../../types';
import { ArrowLeft, Trash2, Terminal, ChevronRight } from 'lucide-react';

export default function HistoryPanel() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear your overthinking history? This cannot be undone.')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary terminal-grid p-6 md:p-12 text-text-primary font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs">
          <button onClick={() => navigate('/')} className="btn-ghost">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN_HOME</span>
          </button>

          {history.length > 0 && (
            <button onClick={handleClear} className="btn-ghost text-accent-red hover:bg-accent-red/10">
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR_ARCHIVE</span>
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-text-muted font-mono text-xs mb-1">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span>LOCAL_DOSSIER_ARCHIVE</span>
          </div>
          <h1 className="text-2xl font-extrabold font-mono">RECENT OVERTHINKING HISTORY</h1>
          <p className="text-xs text-text-secondary font-mono mt-1">
            Registry of previous micro-interaction forensic evaluations.
          </p>
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <div className="panel p-12 text-center space-y-4 font-mono">
            <p className="text-xs text-text-muted">NO ARCHIVED RECORDINGS FOUND.</p>
            <button onClick={() => navigate('/analyze')} className="btn-primary text-xs">
              START NEW ANALYSIS
            </button>
          </div>
        ) : (
          <div className="space-y-2.5 font-mono">
            {history.map((entry) => (
              <div
                key={entry.id}
                onClick={() => navigate(`/results/${entry.id}`)}
                className="panel panel-interactive p-4 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-10 rounded bg-bg-primary border border-border flex items-center justify-center font-bold text-xs text-accent-cyan flex-shrink-0">
                    {entry.score.toFixed(0)}%
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-text-primary truncate font-sans">
                      "{entry.phrase}"
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">
                      {entry.category} • {new Date(entry.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
