import type { Flag } from '../../types';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  greenFlags: Flag[];
  redFlags: Flag[];
}

export default function RedGreenFlags({ greenFlags, redFlags }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Green Flags */}
      <div className="brutal-panel-green p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-accent-green" />
          <h3 className="font-mono font-black text-sm text-white tracking-wider uppercase">
            EVIDENCE IN YOUR FAVOUR
          </h3>
        </div>

        {greenFlags.length === 0 ? (
          <p className="text-xs font-mono text-text-muted italic">No positive telemetry recorded.</p>
        ) : (
          <ul className="space-y-3 font-sans">
            {greenFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed font-bold">
                <span className="w-2 h-2 rounded-full bg-accent-green mt-2 flex-shrink-0" />
                <span>{flag.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Red Flags */}
      <div className="brutal-panel-red p-8">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-accent-red" />
          <h3 className="font-mono font-black text-sm text-white tracking-wider uppercase">
            REASONS TO OVERTHINK
          </h3>
        </div>

        {redFlags.length === 0 ? (
          <p className="text-xs font-mono text-text-muted italic">No threat vectors detected.</p>
        ) : (
          <ul className="space-y-3 font-sans">
            {redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-white leading-relaxed font-bold">
                <span className="w-2 h-2 rounded-full bg-accent-red mt-2 flex-shrink-0" />
                <span>{flag.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
