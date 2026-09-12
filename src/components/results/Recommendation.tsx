import { getRecommendationEmoji } from '../../lib/recommendationEngine';

interface Props {
  recommendation: string;
  score: number;
}

export default function Recommendation({ recommendation, score }: Props) {
  const emoji = getRecommendationEmoji(score);

  return (
    <div className="brutal-panel-green p-8 sm:p-10">
      <div className="brutal-header -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>ACTION PROTOCOL // RECOMMENDATION</span>
        <span>REC_CODE_09</span>
      </div>

      <div className="flex items-start gap-5 p-6 bg-black border-2 border-white">
        <span className="text-4xl flex-shrink-0">{emoji}</span>
        <div className="space-y-2">
          <p className="text-lg font-bold text-white leading-relaxed font-sans">
            "{recommendation}"
          </p>
          <p className="text-xs text-text-muted font-mono pt-1">
            * Disclaimer: Algorithmic advice provided strictly for speculative entertainment purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
