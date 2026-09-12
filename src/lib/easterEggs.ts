// ============================================================
// EASTER EGGS — Hidden triggers and special messages
// ============================================================

import type { AnalysisInput } from '../types';

interface EasterEgg {
  check: (input: AnalysisInput, score: number, analysisCount: number) => boolean;
  message: string;
}

const EASTER_EGGS: EasterEgg[] = [
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === 'okay.' || i.whatHappened.toLowerCase().includes("replied 'okay'") || i.whatHappened.toLowerCase().includes('replied okay') || i.whatHappened.toLowerCase().includes("replied \"okay\""),
    message: 'Ah. The classic.',
  },
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === 'k' || i.exactMessage.toLowerCase().trim() === 'k.',
    message: 'One letter. Maximum emotional damage.',
  },
  {
    check: (_i, score) => score > 99 && score < 100,
    message: 'Congratulations. You have achieved enlightenment.',
  },
  {
    check: (_i, score) => score === 100,
    message: 'Maximum human overthinking achieved.',
  },
  {
    check: (_i, _s, count) => count >= 3,
    message: 'You have analyzed multiple messages now. This is becoming a pattern.',
  },
  {
    check: (i) => i.timeAlreadySpent === 'reconstructed',
    message: 'You reconstructed the entire conversation. We are both impressed and concerned.',
  },
  {
    check: (i) => i.importance >= 10 && i.relationship === 'crush',
    message: 'Maximum emotional investment detected. Please proceed with extreme caution.',
  },
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === '👍' || i.emojiType === '👍',
    message: 'The thumbs up. Destroyer of relationships. Ender of conversations.',
  },
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === 'lol',
    message: 'Did they actually laugh? We may never know.',
  },
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === 'sure',
    message: '"Sure" — the word that launched a thousand overthinking sessions.',
  },
  {
    check: (i) => i.exactMessage.toLowerCase().trim() === "we'll see" || i.exactMessage.toLowerCase().trim() === 'we will see',
    message: 'Ah yes, "we\'ll see." The ultimate non-answer since the dawn of human communication.',
  },
  {
    check: (i) => i.responseTime >= 1440, // 24 hours
    message: 'They took over 24 hours to reply. At this point, the message was delivered via carrier pigeon.',
  },
];

export function detectEasterEgg(
  input: AnalysisInput,
  score: number,
  analysisCount: number
): string | null {
  for (const egg of EASTER_EGGS) {
    if (egg.check(input, score, analysisCount)) {
      return egg.message;
    }
  }
  return null;
}

export function checkRepeatAnalysis(phrase: string, history: string[]): string | null {
  const normalized = phrase.toLowerCase().trim();
  const matches = history.filter(h => h.toLowerCase().trim() === normalized);
  if (matches.length >= 1) {
    return 'You have already analyzed this. This is now part of the problem.';
  }
  return null;
}
