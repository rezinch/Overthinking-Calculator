import { useEffect, useState } from 'react';

interface Props {
  score: number; // 0 - 100
  category: string;
}

export default function ScoreGauge({ score, category }: Props) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const increment = score / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start * 100) / 100);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  let strokeColor = '#00ff66'; // green
  if (score > 30) strokeColor = '#00f0ff'; // cyan
  if (score > 50) strokeColor = '#ffe600'; // yellow
  if (score > 75) strokeColor = '#ff2a85'; // pink
  if (score > 90) strokeColor = '#ff3344'; // red

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="brutal-panel p-8 sm:p-10 flex flex-col items-center justify-center text-center font-mono">
      <div className="brutal-header w-full -mt-8 -mx-8 sm:-mt-10 sm:-mx-10 mb-8">
        <span>OVERTHINKING INDEX</span>
        <span className="badge-brutal badge-cyan text-xs">CALCULATED</span>
      </div>

      <div className="relative w-60 h-60 flex items-center justify-center my-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#12141a"
            strokeWidth="16"
            fill="transparent"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={strokeColor}
            strokeWidth="16"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
            fill="transparent"
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xs text-text-muted font-bold tracking-widest uppercase mb-1">
            SCORE INDEX
          </span>
          <span
            className="text-5xl font-black font-mono tracking-tight"
            style={{ color: strokeColor }}
          >
            {displayScore.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="mt-4 px-6 py-3 bg-black border-2 border-white text-sm font-mono font-bold text-white shadow-[4px_4px_0px_#ffffff]">
        CLASSIFICATION: "{category}"
      </div>
    </div>
  );
}
