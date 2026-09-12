import type { TimelineEvent } from '../../types';
import { AlertCircle } from 'lucide-react';

interface Props {
  timeline: TimelineEvent[];
}

export default function Timeline({ timeline }: Props) {
  return (
    <div className="brutal-panel p-8 sm:p-10">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>CHRONOLOGICAL RECONSTRUCTION</span>
        <span>{timeline.length} EVENTS</span>
      </div>

      <div className="relative pl-8 border-l-2 border-white space-y-6 ml-2 font-mono text-xs">
        {timeline.map((event, idx) => (
          <div key={idx} className="relative">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[39px] top-1 w-3.5 h-3.5 border-2 border-white ${
                event.isCritical
                  ? 'bg-accent-red'
                  : 'bg-accent-cyan'
              }`}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="font-black text-accent-cyan text-sm">
                {event.time}
              </span>
              {event.isCritical && (
                <span className="badge-brutal badge-red text-[10px] inline-flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> CRITICAL ANOMALY
                </span>
              )}
            </div>

            <h4
              className={`font-black text-sm ${
                event.isCritical ? 'text-accent-red text-base' : 'text-white'
              }`}
            >
              {event.label}
            </h4>
            <p className="text-text-secondary mt-1 font-sans text-xs font-semibold leading-relaxed">
              {event.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
