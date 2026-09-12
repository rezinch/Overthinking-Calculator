import type { Interpretation } from '../../types';

interface Props {
  interpretations: Interpretation[];
}

export default function InterpretationList({ interpretations }: Props) {
  return (
    <div className="brutal-panel p-8 sm:p-10">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>INTERPRETATION MATRIX</span>
        <span>{interpretations.length} SCENARIOS SIMULATED</span>
      </div>

      <div className="space-y-4 font-mono">
        {interpretations.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-black border-2 border-white space-y-3 shadow-[4px_4px_0px_#00f0ff]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-sm font-black text-accent-cyan mt-0.5">
                  [{String(idx + 1).padStart(2, '0')}]
                </span>
                <div>
                  <p className="text-base font-bold text-white leading-snug font-sans">
                    {item.text}
                  </p>
                  {item.isAbsurd && (
                    <span className="inline-block badge-brutal badge-yellow text-[10px] mt-2">
                      HIGH AMBIGUITY VECTOR
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-base font-black text-accent-cyan">
                  {item.probability.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="meter-bg">
              <div
                className="meter-fill"
                style={{
                  width: `${Math.max(item.probability, 2)}%`,
                  backgroundColor: item.isAbsurd ? '#ffe600' : '#00f0ff',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
