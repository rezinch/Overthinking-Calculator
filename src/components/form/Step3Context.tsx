import type { AnalysisInput } from '../../types';

interface Props {
  input: AnalysisInput;
  updateInput: (partial: Partial<AnalysisInput>) => void;
}

const TIME_SPENT_OPTIONS = [
  { value: '1_min', label: '1 minute' },
  { value: '10_min', label: '10 minutes' },
  { value: '1_hour', label: '1 hour' },
  { value: 'several_hours', label: 'Several hours' },
  { value: 'reconstructed', label: 'I have reconstructed the entire conversation' },
] as const;

export default function Step3Context({ input, updateInput }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <span className="badge-brutal badge-red mb-3 inline-block">
          STEP 03 // CONTEXTUAL VECTORS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Context Analysis</h2>
        <p className="text-text-secondary text-sm font-mono mt-2">
          Subtext, emotional investment, and prior friction.
        </p>
      </div>

      <div className="space-y-8">
        {/* Immediately before */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-2">
            WHAT HAPPENED IMMEDIATELY BEFORE THIS?
          </label>
          <textarea
            className="input-field font-mono text-base"
            placeholder='e.g., "I asked if she wanted to grab dinner this weekend."'
            value={input.whatHappenedBefore}
            onChange={(e) => updateInput({ whatHappenedBefore: e.target.value })}
            rows={3}
          />
        </div>

        {/* Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateInput({ recentDisagreement: !input.recentDisagreement })}
            className={`chip justify-between py-3.5 ${input.recentDisagreement ? 'active' : ''}`}
          >
            <span>WAS THERE A RECENT DISAGREEMENT?</span>
            <span className="font-mono text-sm font-black">{input.recentDisagreement ? 'YES' : 'NO'}</span>
          </button>

          <button
            type="button"
            onClick={() => updateInput({ usuallyFastReplier: !input.usuallyFastReplier })}
            className={`chip justify-between py-3.5 ${input.usuallyFastReplier ? 'active' : ''}`}
          >
            <span>USUALLY A FAST REPLIER?</span>
            <span className="font-mono text-sm font-black">{input.usuallyFastReplier ? 'YES' : 'NO'}</span>
          </button>

          <button
            type="button"
            onClick={() => updateInput({ usedPhraseBefore: !input.usedPhraseBefore })}
            className={`chip justify-between py-3.5 sm:col-span-2 ${input.usedPhraseBefore ? 'active' : ''}`}
          >
            <span>HAVE THEY USED THIS EXACT PHRASE BEFORE?</span>
            <span className="font-mono text-sm font-black">{input.usedPhraseBefore ? 'YES' : 'NO'}</span>
          </button>
        </div>

        {/* Importance slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <label className="text-white uppercase tracking-wider">
              CONVERSATION IMPORTANCE COEFFICIENT:
            </label>
            <span className="badge-brutal badge-yellow text-sm">
              [{input.importance} / 10]
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={input.importance}
            onChange={(e) => updateInput({ importance: Number(e.target.value) })}
            className="w-full h-3 appearance-none cursor-pointer accent-accent-yellow bg-black border-2 border-white"
          />
          <div className="flex justify-between text-xs font-mono text-text-muted font-bold">
            <span>1 — COULDN'T CARE LESS</span>
            <span>10 — MY LIFE DEPENDS ON THIS</span>
          </div>
        </div>

        {/* Time spent */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            HOW MUCH HAVE YOU ALREADY THOUGHT ABOUT THIS?
          </label>
          <div className="flex flex-col gap-3">
            {TIME_SPENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateInput({ timeAlreadySpent: opt.value as AnalysisInput['timeAlreadySpent'] })}
                className={`chip justify-start py-3.5 text-sm ${input.timeAlreadySpent === opt.value ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
