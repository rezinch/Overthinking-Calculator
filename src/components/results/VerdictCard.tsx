import type { VerdictData } from '../../types';
import { Award, AlertTriangle } from 'lucide-react';

interface Props {
  verdict: VerdictData;
}

export default function VerdictCard({ verdict }: Props) {
  const getBadgeStyle = (classification: VerdictData['classification']) => {
    switch (classification) {
      case 'NORMAL':
        return 'badge-green';
      case 'MILDLY_CONCERNING':
        return 'badge-cyan';
      case 'OVERTHINKING':
        return 'badge-yellow';
      case 'SEVERE_OVERTHINKING':
        return 'badge-yellow';
      case 'ABSOLUTE_CINEMA':
        return 'badge-red';
    }
  };

  return (
    <div className="brutal-panel-yellow p-8 sm:p-10 flex flex-col justify-between">
      <div>
        <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
          <span>FINAL VERDICT</span>
          <div className={`badge-brutal ${getBadgeStyle(verdict.classification)} flex items-center gap-1.5`}>
            <Award className="w-4 h-4" />
            <span>{verdict.classificationLabel}</span>
          </div>
        </div>

        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-accent-yellow uppercase tracking-wider block">
            PRIMARY EXPLANATION (BASE MODEL)
          </span>
          <p className="text-2xl font-black text-white leading-tight font-sans">
            "{verdict.mainExplanation}"
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 bg-black border-2 border-white text-accent-yellow flex items-center gap-4 text-xs font-mono font-bold shadow-[4px_4px_0px_#ffe600]">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <div>
          <span className="text-white uppercase block text-sm mb-0.5">BUT...</span>
          <span>
            Your mind generated {verdict.alternativeCount} alternative scenarios.
          </span>
        </div>
      </div>
    </div>
  );
}
