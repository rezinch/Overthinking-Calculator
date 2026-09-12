import type { AnalysisInput } from '../../types';

interface Props {
  input: AnalysisInput;
  updateInput: (partial: Partial<AnalysisInput>) => void;
}

const EXAMPLES = [
  'She replied "okay."',
  'He saw my message but didn\'t reply.',
  'She said "we\'ll see".',
  'He replied with "k".',
  'She liked my message but didn\'t say anything.',
  'They replied with 👍.',
  'He said "sure".',
  'She took 3 hours to reply "lol".',
];

export default function Step1WhatHappened({ input, updateInput }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <span className="badge-brutal badge-cyan mb-3 inline-block">
          STEP 01 // INTERACTION INPUT
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">What happened?</h2>
        <p className="text-text-secondary text-sm font-mono mt-2">
          Describe the interaction that is taking up an absurd amount of your mental bandwidth.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
          DESCRIPTION / MESSAGE TEXT
        </label>
        <textarea
          className="input-field text-lg font-mono"
          placeholder='e.g., "She replied okay."'
          value={input.whatHappened}
          onChange={(e) => updateInput({ whatHappened: e.target.value })}
          rows={4}
          autoFocus
        />
      </div>

      <div className="space-y-3 pt-2">
        <span className="text-xs font-mono font-bold text-accent-yellow uppercase tracking-wider block">
          OR SELECT A CLASSIC SCENARIO:
        </span>
        <div className="flex flex-wrap gap-3">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => updateInput({
                whatHappened: example,
                exactMessage: example.match(/"([^"]+)"/)?.[1] || '',
              })}
              className={`chip text-sm ${input.whatHappened === example ? 'active' : ''}`}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
