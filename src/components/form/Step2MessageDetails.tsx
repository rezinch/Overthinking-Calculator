import type { AnalysisInput } from '../../types';

interface Props {
  input: AnalysisInput;
  updateInput: (partial: Partial<AnalysisInput>) => void;
}

const PUNCTUATION_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: '.', label: '.' },
  { value: '!', label: '!' },
  { value: '?', label: '?' },
  { value: '...', label: '...' },
] as const;

const CAPITALIZATION_OPTIONS = [
  { value: 'lowercase', label: 'lowercase' },
  { value: 'normal', label: 'Normal' },
  { value: 'allcaps', label: 'ALL CAPS' },
] as const;

const EMOJI_OPTIONS = ['🙂', '😂', '❤️', '👍', '😭', 'Other'] as const;

const DEVIATION_OPTIONS = [
  { value: 'not_at_all', label: 'Not at all' },
  { value: 'slightly', label: 'Slightly' },
  { value: 'very', label: 'Very' },
  { value: 'extremely', label: 'EXTREMELY' },
] as const;

const ONLINE_OPTIONS = [
  { value: 'no_idea', label: 'No idea' },
  { value: 'no', label: 'No' },
  { value: 'yes', label: 'Yes' },
] as const;

const RELATIONSHIP_OPTIONS = [
  { value: 'stranger', label: 'Stranger' },
  { value: 'acquaintance', label: 'Acquaintance' },
  { value: 'friend', label: 'Friend' },
  { value: 'close_friend', label: 'Close friend' },
  { value: 'crush', label: 'Crush' },
  { value: 'partner', label: 'Partner' },
  { value: 'complicated', label: 'Complicated' },
] as const;

export default function Step2MessageDetails({ input, updateInput }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <span className="badge-brutal badge-yellow mb-3 inline-block">
          STEP 02 // FORENSIC PARAMETERS
        </span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Message Forensics</h2>
        <p className="text-text-secondary text-sm font-mono mt-2">
          Specify exact textual telemetry, capitalization, and latency numbers.
        </p>
      </div>

      <div className="space-y-8">
        {/* Exact message */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-2">
            WHAT EXACTLY DID THEY SAY?
          </label>
          <input
            type="text"
            className="input-field font-mono text-lg"
            placeholder='e.g., "okay."'
            value={input.exactMessage}
            onChange={(e) => updateInput({ exactMessage: e.target.value })}
          />
        </div>

        {/* Response time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <label className="text-white uppercase tracking-wider">
              HOW LONG DID THEY TAKE TO REPLY?
            </label>
            <span className="badge-brutal badge-cyan text-sm">
              {input.responseTime < 60
                ? `${input.responseTime} MIN`
                : `${Math.floor(input.responseTime / 60)}H ${input.responseTime % 60}M`
              }
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="480"
            step="1"
            value={input.responseTime}
            onChange={(e) => updateInput({ responseTime: Number(e.target.value) })}
            className="w-full h-3 appearance-none cursor-pointer accent-accent-cyan bg-black border-2 border-white"
          />
          <div className="flex justify-between text-xs font-mono text-text-muted font-bold">
            <span>INSTANT</span>
            <span>2 HOURS</span>
            <span>8 HOURS+</span>
          </div>
        </div>

        {/* Punctuation */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            DID THEY USE PUNCTUATION?
          </label>
          <div className="flex flex-wrap gap-3">
            {PUNCTUATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateInput({ punctuation: opt.value as AnalysisInput['punctuation'] })}
                className={`chip text-base font-bold ${input.punctuation === opt.value ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Capitalization */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            CAPITALIZATION STYLE
          </label>
          <div className="flex flex-wrap gap-3">
            {CAPITALIZATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateInput({ capitalization: opt.value as AnalysisInput['capitalization'] })}
                className={`chip ${input.capitalization === opt.value ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Emoji */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            DID THEY USE AN EMOJI?
          </label>
          <div className="flex flex-wrap gap-3 mb-3">
            <button
              type="button"
              onClick={() => updateInput({ usedEmoji: false, emojiType: undefined })}
              className={`chip ${!input.usedEmoji ? 'active' : ''}`}
            >
              NO
            </button>
            <button
              type="button"
              onClick={() => updateInput({ usedEmoji: true })}
              className={`chip ${input.usedEmoji ? 'active' : ''}`}
            >
              YES
            </button>
          </div>
          {input.usedEmoji && (
            <div className="flex flex-wrap gap-3 pt-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => updateInput({ emojiType: emoji })}
                  className={`chip text-lg ${input.emojiType === emoji ? 'active' : ''}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Deviation */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            WAS THIS DIFFERENT FROM THEIR NORMAL REPLIES?
          </label>
          <div className="flex flex-wrap gap-3">
            {DEVIATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateInput({ deviationFromNormal: opt.value as AnalysisInput['deviationFromNormal'] })}
                className={`chip ${input.deviationFromNormal === opt.value ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Relationship */}
        <div>
          <label className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-3">
            HOW WELL DO YOU KNOW THIS PERSON?
          </label>
          <div className="flex flex-wrap gap-3">
            {RELATIONSHIP_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateInput({ relationship: opt.value as AnalysisInput['relationship'] })}
                className={`chip ${input.relationship === opt.value ? 'active' : ''}`}
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
