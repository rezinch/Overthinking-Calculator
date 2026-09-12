import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Terminal, ShieldAlert, Check } from 'lucide-react';

const ANALYSIS_STEPS = [
  'PARSING_MESSAGE_PAYLOAD',
  'MEASURING_PUNCTUATION_DENSITY',
  'EVALUATING_RESPONSE_LATENCY_CURVE',
  'COMPARING_CAPITALIZATION_BASELINE',
  'QUERYING_HISTORICAL_PATTERNS',
  'CALCULATING_AMBIGUITY_INDEX',
  'DETECTING_UNNECESSARY_ASSUMPTIONS',
  'SIMULATING_ALTERNATIVE_MODELS',
  'CONSULTING_NON_ESSENTIAL_STATISTICS',
  'MEASURING_USER_ATTACHMENT',
  'RECONSTRUCTING_HYPOTHETICAL_VECTORS',
  'COMPUTING_OVERTHINKING_COEFFICIENT',
  'RUNNING_EMOTIONAL_SIMULATION',
  'EXECUTING_14291_WHAT_IFS',
];

const SYSTEM_MESSAGES = [
  'Punctuation appears suspicious.',
  'Lowercase detected.',
  'Situation becoming unnecessarily complicated.',
  'User has provided too much context.',
  'Analysis may now be making things worse.',
  'Please remain calm.',
];

export default function AnalysisLoader() {
  const navigate = useNavigate();
  const location = useLocation();
  const resultId = location.state?.resultId;
  const spentTooLong = location.state?.spentTooLong;

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [systemMsgIndex, setSystemMsgIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!resultId) {
      navigate('/analyze');
      return;
    }

    const totalSteps = ANALYSIS_STEPS.length;
    const stepDuration = 180;

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < totalSteps) {
          setCompletedSteps((completed) => [...completed, prev]);
          const newProgress = Math.round(((prev + 1) / totalSteps) * 100);
          setProgress(newProgress);

          if (prev % 3 === 1 && prev / 3 < SYSTEM_MESSAGES.length) {
            setSystemMsgIndex(Math.floor(prev / 3));
          }

          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            navigate(`/results/${resultId}`, { replace: true });
          }, 300);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(stepInterval);
  }, [resultId, navigate]);

  return (
    <div className="min-h-screen bg-bg-primary brutal-grid flex flex-col items-center justify-center p-6 font-mono text-white">
      <div className="w-full max-w-xl brutal-panel overflow-hidden space-y-6">
        {/* Terminal Header */}
        <div className="brutal-header">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span>SYSTEM_FORENSICS // ENGINE</span>
          </div>
          <span className="badge-brutal badge-cyan text-xs">{progress}% COMPLETE</span>
        </div>

        <div className="p-8 space-y-6">
          {/* Progress Bar */}
          <div className="meter-bg">
            <div className="meter-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* System Warning Box */}
          {systemMsgIndex !== null && (
            <div className="p-4 bg-black border-2 border-white text-accent-yellow flex items-center gap-3 text-xs font-bold shadow-[4px_4px_0px_#ffe600]">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>SYSTEM WARNING: {SYSTEM_MESSAGES[systemMsgIndex]}</span>
            </div>
          )}

          {spentTooLong && (
            <div className="p-4 bg-black border-2 border-white text-accent-red flex items-center gap-3 text-xs font-bold shadow-[4px_4px_0px_#ff3344]">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>ALERT: Form took over 5 minutes. Metascore amplified.</span>
            </div>
          )}

          {/* Checklist */}
          <div className="space-y-2.5 max-h-64 overflow-y-auto text-xs pr-2 font-bold">
            {ANALYSIS_STEPS.map((stepText, idx) => {
              const isDone = completedSteps.includes(idx);
              const isCurrent = currentStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${
                    isDone
                      ? 'text-text-secondary'
                      : isCurrent
                      ? 'text-accent-cyan'
                      : 'text-text-muted opacity-30'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 text-accent-green flex-shrink-0" />
                  ) : isCurrent ? (
                    <span className="w-4 h-4 inline-block text-accent-cyan animate-pulse">{"\u25B6"}</span>
                  ) : (
                    <span className="w-4 h-4 inline-block text-text-muted">·</span>
                  )}
                  <span className="truncate">{stepText}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
