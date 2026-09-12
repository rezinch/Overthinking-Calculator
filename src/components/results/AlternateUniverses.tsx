import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { AlternateUniverse } from '../../types';

interface Props {
  universes: AlternateUniverse[];
}

export default function AlternateUniverses({ universes }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(universes[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="brutal-panel-pink p-8 sm:p-10 font-mono">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>QUANTUM BRANCHES // MULTIVERSE MODELS</span>
        <span>{universes.length} BRANCHES</span>
      </div>

      <div className="space-y-4">
        {universes.map((univ) => {
          const isExpanded = expandedId === univ.id;

          return (
            <div
              key={univ.id}
              className="bg-black border-2 border-white overflow-hidden shadow-[4px_4px_0px_#ff2a85]"
            >
              <button
                onClick={() => toggleExpand(univ.id)}
                className="w-full p-4 flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-accent-pink text-black font-black text-sm flex items-center justify-center border-2 border-white">
                    {univ.id}
                  </span>
                  <h4 className="text-sm font-black text-white">
                    UNIVERSE {univ.id} — {univ.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="badge-brutal badge-yellow text-xs">
                    {univ.probability}%
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      isExpanded ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 border-t-2 border-white text-xs font-sans space-y-3 bg-[#0a0b0e]">
                  <p className="text-white font-semibold text-sm leading-relaxed">
                    {univ.description}
                  </p>
                  <div className="p-3 bg-black border-2 border-white font-mono text-xs text-text-secondary">
                    <span className="text-accent-cyan font-bold block mb-1">EVIDENCE ATTACHED:</span>
                    {univ.evidence}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
