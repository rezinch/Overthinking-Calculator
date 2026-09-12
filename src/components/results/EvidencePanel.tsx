import type { EvidenceFactor } from '../../types';

interface Props {
  evidence: EvidenceFactor[];
}

export default function EvidencePanel({ evidence }: Props) {
  const highest = [...evidence].sort((a, b) => b.score - a.score)[0];

  return (
    <div className="brutal-panel p-8 sm:p-10">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>EVIDENCE BREAKDOWN</span>
        <span>10 VECTORS EVALUATED</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 font-mono text-xs">
        {evidence.map((factor, idx) => (
          <div key={idx} className="p-4 bg-black border-2 border-white space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-white flex items-center gap-2">
                <span>{factor.icon}</span>
                <span>{factor.label}</span>
              </span>
              <span className="text-accent-cyan">{Math.round(factor.score)}%</span>
            </div>
            <div className="meter-bg">
              <div className="meter-fill" style={{ width: `${factor.score}%` }} />
            </div>
          </div>
        ))}
      </div>

      {highest && (
        <div className="p-4 bg-black border-2 border-white text-center font-mono text-xs">
          <span className="text-accent-yellow font-bold uppercase block text-xs mb-1">DOMINANT VECTOR:</span>
          <span className="text-white text-sm font-bold font-sans">
            "Your {highest.label.toLowerCase()} is contributing most significantly to your overthinking index."
          </span>
        </div>
      )}
    </div>
  );
}
