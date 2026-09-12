import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Terminal, CheckSquare } from 'lucide-react';
import type { AnalysisInput } from '../../types';
import Step1WhatHappened from './Step1WhatHappened';
import Step2MessageDetails from './Step2MessageDetails';
import Step3Context from './Step3Context';
import { runAnalysis } from '../../lib/analysisOrchestrator';

const DEFAULT_INPUT: AnalysisInput = {
  whatHappened: '',
  exactMessage: '',
  responseTime: 5,
  punctuation: 'none',
  capitalization: 'normal',
  usedEmoji: false,
  emojiType: undefined,
  deviationFromNormal: 'not_at_all',
  onlineAfter: 'no_idea',
  relationship: 'friend',
  whatHappenedBefore: '',
  recentDisagreement: false,
  usuallyFastReplier: false,
  usedPhraseBefore: false,
  importance: 5,
  timeAlreadySpent: '10_min',
};

const STEP_TITLES = [
  '01 // WHAT_HAPPENED',
  '02 // MESSAGE_FORENSICS',
  '03 // CONTEXT_VECTORS',
];

export default function AnalysisForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<AnalysisInput>(DEFAULT_INPUT);
  const [formStartTime] = useState(Date.now());

  const updateInput = (partial: Partial<AnalysisInput>) => {
    setInput(prev => ({ ...prev, ...partial }));
  };

  const handleSubmit = () => {
    const timeOnForm = (Date.now() - formStartTime) / 1000;
    const result = runAnalysis(input);

    navigate(`/loading`, {
      state: {
        resultId: result.id,
        spentTooLong: timeOnForm > 300,
      }
    });
  };

  const canProceed = () => {
    if (step === 0) return input.whatHappened.trim().length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-bg-primary brutal-grid font-sans text-text-primary flex flex-col">
      {/* Header */}
      <div className="border-b-2 border-white bg-black px-6 py-4 flex items-center justify-between font-mono text-xs font-bold">
        <button onClick={() => navigate('/')} className="btn-ghost">
          <ArrowLeft className="w-4 h-4" />
          <span>CANCEL_ANALYSIS</span>
        </button>
        <div className="flex items-center gap-2 text-accent-cyan">
          <Terminal className="w-4 h-4" />
          <span>FORM_ENTRY // PHASE {step + 1} OF 3</span>
        </div>
      </div>

      {/* Main Centered Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 py-12">
        {/* Progress Bar Container */}
        <div className="w-full max-w-4xl pb-6">
          <div className="flex items-center justify-between font-mono text-xs font-bold mb-3">
            <span className="text-text-muted">FORM PROGRESS</span>
            <span className="text-accent-cyan">{STEP_TITLES[step]}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-3 border-2 border-white transition-all duration-200 ${
                  i <= step ? 'bg-accent-cyan' : 'bg-black'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Panel Container */}
        <div className="w-full max-w-4xl">
        <div className="brutal-panel p-8 sm:p-12 space-y-8">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Step1WhatHappened input={input} updateInput={updateInput} />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Step2MessageDetails input={input} updateInput={updateInput} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <Step3Context input={input} updateInput={updateInput} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t-2 border-white mt-10">
            <button
              onClick={() => setStep(s => s - 1)}
              className={`btn-ghost text-xs ${step === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            {step < 2 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="btn-primary text-sm px-8 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>NEXT STEP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary text-sm px-10 py-4"
              >
                <CheckSquare className="w-5 h-5" />
                <span>OVERTHINK THIS NOW</span>
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
