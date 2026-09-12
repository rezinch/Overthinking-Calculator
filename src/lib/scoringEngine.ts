// ============================================================
// SCORING ENGINE — Deterministic Overthinking Index Calculator
// ============================================================
// Same inputs → same score, always. No randomness.
// Weights are intentionally exaggerated for comedic effect.
// ============================================================

import type { AnalysisInput, ScoringBreakdown } from '../types';

// ---- Factor Weights (sum to 1.0) ----
const WEIGHTS = {
  responseDelay: 0.15,
  punctuation: 0.12,
  capitalization: 0.08,
  messageBrevity: 0.10,
  emoji: 0.08,
  deviation: 0.15,
  relationship: 0.10,
  importance: 0.08,
  timeSpent: 0.10,
  onlineAfter: 0.04,
};

// ---- Individual scoring functions ----

function scoreResponseDelay(minutes: number): number {
  if (minutes <= 1) return 5;
  if (minutes <= 3) return 10;
  if (minutes <= 5) return 20;
  if (minutes <= 10) return 35;
  if (minutes <= 15) return 45;
  if (minutes <= 30) return 60;
  if (minutes <= 60) return 75;
  if (minutes <= 120) return 85;
  if (minutes <= 240) return 92;
  return Math.min(100, 92 + (minutes - 240) * 0.02);
}

function scorePunctuation(p: string): number {
  switch (p) {
    case 'none': return 40; // ambiguous
    case '.': return 75;    // the dreaded period
    case '!': return 15;    // enthusiastic
    case '?': return 30;    // curious, not threatening
    case '...': return 90;  // maximum suspicion
    default: return 40;
  }
}

function scoreCapitalization(c: string): number {
  switch (c) {
    case 'lowercase': return 65; // cold, distant
    case 'normal': return 15;    // nothing to see
    case 'allcaps': return 80;   // alarming
    default: return 15;
  }
}

function scoreMessageBrevity(message: string): number {
  const len = message.trim().length;
  if (len === 0) return 50;
  if (len === 1) return 95;  // "k"
  if (len <= 3) return 85;   // "ok", "yes"
  if (len <= 5) return 75;   // "okay", "sure"
  if (len <= 10) return 55;
  if (len <= 20) return 35;
  if (len <= 50) return 20;
  return 10; // long message = probably fine
}

function scoreEmoji(usedEmoji: boolean, emojiType?: string): number {
  if (!usedEmoji) return 55; // no emoji = ambiguous
  switch (emojiType) {
    case '🙂': return 70;    // passive aggressive smile
    case '😂': return 15;    // genuinely amused
    case '❤️': return 5;     // you're fine
    case '👍': return 80;    // the worst emoji
    case '😭': return 25;    // dramatic but engaged
    default: return 30;
  }
}

function scoreDeviation(d: string): number {
  switch (d) {
    case 'not_at_all': return 5;
    case 'slightly': return 35;
    case 'very': return 70;
    case 'extremely': return 95;
    default: return 5;
  }
}

function scoreRelationship(r: string): number {
  switch (r) {
    case 'stranger': return 10;
    case 'acquaintance': return 20;
    case 'friend': return 35;
    case 'close_friend': return 50;
    case 'crush': return 90;
    case 'partner': return 75;
    case 'complicated': return 95;
    default: return 35;
  }
}

function scoreImportance(importance: number): number {
  // 1-10 scale, map to 0-100
  return Math.min(100, (importance / 10) * 100);
}

function scoreTimeSpent(t: string): number {
  switch (t) {
    case '1_min': return 10;
    case '10_min': return 35;
    case '1_hour': return 65;
    case 'several_hours': return 85;
    case 'reconstructed': return 100;
    default: return 10;
  }
}

function scoreOnlineAfter(o: string): number {
  switch (o) {
    case 'no_idea': return 30;
    case 'no': return 10;
    case 'yes': return 90;
    default: return 30;
  }
}

// ---- Main Scoring Function ----

export function calculateBreakdown(input: AnalysisInput): ScoringBreakdown {
  return {
    responseDelay: scoreResponseDelay(input.responseTime),
    punctuationAmbiguity: scorePunctuation(input.punctuation),
    capitalizationRisk: scoreCapitalization(input.capitalization),
    messageBrevity: scoreMessageBrevity(input.exactMessage),
    emojiAnalysis: scoreEmoji(input.usedEmoji, input.emojiType),
    deviationScore: scoreDeviation(input.deviationFromNormal),
    relationshipAmplifier: scoreRelationship(input.relationship),
    importanceScore: scoreImportance(input.importance),
    timeSpentScore: scoreTimeSpent(input.timeAlreadySpent),
    onlineAfterScore: scoreOnlineAfter(input.onlineAfter),
  };
}

export function calculateOverthinkingIndex(breakdown: ScoringBreakdown): number {
  const weighted =
    breakdown.responseDelay * WEIGHTS.responseDelay +
    breakdown.punctuationAmbiguity * WEIGHTS.punctuation +
    breakdown.capitalizationRisk * WEIGHTS.capitalization +
    breakdown.messageBrevity * WEIGHTS.messageBrevity +
    breakdown.emojiAnalysis * WEIGHTS.emoji +
    breakdown.deviationScore * WEIGHTS.deviation +
    breakdown.relationshipAmplifier * WEIGHTS.relationship +
    breakdown.importanceScore * WEIGHTS.importance +
    breakdown.timeSpentScore * WEIGHTS.timeSpent +
    breakdown.onlineAfterScore * WEIGHTS.onlineAfter;

  // Clamp to 0-100 with 2 decimal places
  return Math.round(Math.min(100, Math.max(0, weighted)) * 100) / 100;
}

export function getScoreCategory(score: number): string {
  if (score <= 20) return 'Completely normal.';
  if (score <= 40) return 'Minor overthinking.';
  if (score <= 60) return 'Concerning.';
  if (score <= 80) return 'Professional overthinker.';
  if (score <= 95) return 'Terminally analytical.';
  return 'You need to go outside.';
}

export function getClassification(score: number): { key: string; label: string } {
  if (score <= 20) return { key: 'NORMAL', label: 'NORMAL' };
  if (score <= 40) return { key: 'MILDLY_CONCERNING', label: 'MILDLY CONCERNING' };
  if (score <= 60) return { key: 'OVERTHINKING', label: 'OVERTHINKING' };
  if (score <= 80) return { key: 'SEVERE_OVERTHINKING', label: 'SEVERE OVERTHINKING' };
  return { key: 'ABSOLUTE_CINEMA', label: 'ABSOLUTE CINEMA' };
}
