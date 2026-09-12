// ============================================================
// INTERPRETATION ENGINE — Context-aware interpretation generator
// ============================================================
// Generates 8-15 interpretations based on input context.
// Probabilities always sum to ~100%.
// Mix of plausible and absurd interpretations.
// ============================================================

import type { AnalysisInput, Interpretation } from '../types';

interface InterpretationTemplate {
  text: string;
  baseWeight: number;
  isAbsurd: boolean;
  conditions?: (input: AnalysisInput) => boolean;
  weightModifier?: (input: AnalysisInput) => number;
}

const TEMPLATES: InterpretationTemplate[] = [
  // ---- Plausible ----
  {
    text: 'They genuinely mean exactly what they said.',
    baseWeight: 30,
    isAbsurd: false,
    weightModifier: (i) => i.deviationFromNormal === 'not_at_all' ? 15 : -10,
  },
  {
    text: 'They are mildly annoyed but don\'t want to start a conversation about it.',
    baseWeight: 18,
    isAbsurd: false,
    weightModifier: (i) => i.punctuation === '.' ? 10 : -5,
  },
  {
    text: 'They are busy and this was the fastest reply they could manage.',
    baseWeight: 15,
    isAbsurd: false,
    weightModifier: (i) => i.responseTime > 30 ? 8 : -3,
  },
  {
    text: 'They don\'t know what else to say and chose the path of least resistance.',
    baseWeight: 12,
    isAbsurd: false,
    weightModifier: (i) => i.exactMessage.length <= 5 ? 6 : -4,
  },
  {
    text: 'They are waiting for you to continue the conversation.',
    baseWeight: 8,
    isAbsurd: false,
  },
  {
    text: 'They are processing something emotionally and this was a placeholder response.',
    baseWeight: 7,
    isAbsurd: false,
    weightModifier: (i) => i.recentDisagreement ? 12 : -2,
  },
  {
    text: 'They are distracted by something completely unrelated to you.',
    baseWeight: 9,
    isAbsurd: false,
  },
  {
    text: 'They replied out of obligation rather than genuine engagement.',
    baseWeight: 6,
    isAbsurd: false,
    weightModifier: (i) => i.relationship === 'acquaintance' ? 8 : 0,
  },
  // ---- Mildly absurd ----
  {
    text: 'They are secretly furious but maintaining plausible deniability.',
    baseWeight: 4,
    isAbsurd: true,
    weightModifier: (i) => i.punctuation === '.' ? 6 : -2,
  },
  {
    text: 'Their phone is at 3% battery and they chose to spend it on you.',
    baseWeight: 3,
    isAbsurd: true,
  },
  {
    text: 'They typed a long response, deleted it, and sent this instead.',
    baseWeight: 5,
    isAbsurd: true,
    weightModifier: (i) => i.responseTime > 15 ? 5 : -2,
  },
  {
    text: 'Something completely unrelated happened and their emotional state has nothing to do with you.',
    baseWeight: 4,
    isAbsurd: true,
  },
  {
    text: 'They are testing you to see how you react.',
    baseWeight: 3,
    isAbsurd: true,
    weightModifier: (i) => i.relationship === 'crush' ? 6 : -1,
  },
  // ---- Very absurd ----
  {
    text: 'You are overthinking this.',
    baseWeight: 2,
    isAbsurd: true,
  },
  {
    text: 'The universe is testing you personally.',
    baseWeight: 0.5,
    isAbsurd: true,
  },
  {
    text: 'Mercury is in retrograde and communication is cosmically compromised.',
    baseWeight: 0.3,
    isAbsurd: true,
  },
  {
    text: 'They are communicating in code and you haven\'t cracked it yet.',
    baseWeight: 0.8,
    isAbsurd: true,
  },
  {
    text: 'An alternate version of them in a parallel universe sent this by accident.',
    baseWeight: 0.2,
    isAbsurd: true,
  },
  // ---- Conditional ----
  {
    text: 'They used a period. In texting, a period is basically a declaration of war.',
    baseWeight: 5,
    isAbsurd: true,
    conditions: (i) => i.punctuation === '.',
  },
  {
    text: 'The lack of emoji where one was expected is a deliberate emotional withdrawal.',
    baseWeight: 4,
    isAbsurd: true,
    conditions: (i) => !i.usedEmoji,
  },
  {
    text: 'ALL CAPS suggests they are either excited or having a breakdown. No in-between.',
    baseWeight: 5,
    isAbsurd: true,
    conditions: (i) => i.capitalization === 'allcaps',
  },
  {
    text: 'The lowercase response is a calculated move to appear casual while being anything but.',
    baseWeight: 4,
    isAbsurd: false,
    conditions: (i) => i.capitalization === 'lowercase',
  },
  {
    text: 'They were online after sending it, which means they chose to not elaborate. Deliberate silence.',
    baseWeight: 5,
    isAbsurd: false,
    conditions: (i) => i.onlineAfter === 'yes',
  },
  {
    text: 'Your relationship status of "complicated" means every message is a Rorschach test.',
    baseWeight: 4,
    isAbsurd: true,
    conditions: (i) => i.relationship === 'complicated',
  },
  {
    text: 'As your crush, every syllable they produce is worth approximately 10,000 hours of analysis.',
    baseWeight: 3,
    isAbsurd: true,
    conditions: (i) => i.relationship === 'crush',
  },
  {
    text: 'The "..." suggests they have more to say but are withholding it for dramatic effect.',
    baseWeight: 6,
    isAbsurd: false,
    conditions: (i) => i.punctuation === '...',
  },
  {
    text: 'The 👍 emoji is widely regarded as the most passive-aggressive response in digital communication.',
    baseWeight: 5,
    isAbsurd: true,
    conditions: (i) => i.emojiType === '👍',
  },
  {
    text: 'The 🙂 emoji is a mask. Nobody genuinely uses this emoji anymore.',
    baseWeight: 5,
    isAbsurd: true,
    conditions: (i) => i.emojiType === '🙂',
  },
];

export function generateInterpretations(input: AnalysisInput): Interpretation[] {
  // Filter templates: include unconditional + those whose conditions match
  const applicable = TEMPLATES.filter(t => {
    if (t.conditions) return t.conditions(input);
    return true;
  });

  // Calculate raw weights
  const weighted = applicable.map(t => {
    let weight = t.baseWeight;
    if (t.weightModifier) {
      weight += t.weightModifier(input);
    }
    return { ...t, weight: Math.max(0.1, weight) };
  });

  // Sort by weight descending
  weighted.sort((a, b) => b.weight - a.weight);

  // Take top 10-14
  const count = Math.min(weighted.length, 10 + Math.floor(input.importance / 3));
  const selected = weighted.slice(0, count);

  // Normalize probabilities to sum to 100
  const totalWeight = selected.reduce((sum, t) => sum + t.weight, 0);

  const interpretations: Interpretation[] = selected.map(t => ({
    text: t.text,
    probability: Math.round((t.weight / totalWeight) * 1000) / 10,
    isAbsurd: t.isAbsurd,
  }));

  // Adjust last entry to make sum exactly 100
  const currentSum = interpretations.reduce((s, i) => s + i.probability, 0);
  const diff = 100 - currentSum;
  if (interpretations.length > 0) {
    interpretations[interpretations.length - 1].probability =
      Math.round((interpretations[interpretations.length - 1].probability + diff) * 10) / 10;
  }

  return interpretations;
}
