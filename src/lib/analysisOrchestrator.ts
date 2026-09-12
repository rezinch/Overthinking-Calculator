// ============================================================
// ANALYSIS ORCHESTRATOR — Assembles the full analysis result
// ============================================================

import type { AnalysisInput, AnalysisResult, EvidenceFactor, GraphPoint, VerdictData } from '../types';
import { calculateBreakdown, calculateOverthinkingIndex, getScoreCategory, getClassification } from './scoringEngine';
import { generateInterpretations } from './interpretationEngine';
import { getRecommendation } from './recommendationEngine';
import { generateTimeline } from './timelineEngine';
import { generateUniverses } from './universeEngine';
import { generateFlags } from './flagsEngine';
import { detectEasterEgg, checkRepeatAnalysis } from './easterEggs';
import { generateId, getAnalysisCount, getPreviousPhrases, addToHistory, saveResult } from './storage';

export function runAnalysis(input: AnalysisInput): AnalysisResult {
  // 1. Scoring
  const breakdown = calculateBreakdown(input);
  const overthinkingIndex = calculateOverthinkingIndex(breakdown);
  const scoreCategory = getScoreCategory(overthinkingIndex);

  // 2. Interpretations
  const interpretations = generateInterpretations(input);

  // 3. Evidence factors
  const evidence: EvidenceFactor[] = [
    { label: 'Response time', score: breakdown.responseDelay, icon: '⏱️' },
    { label: 'Punctuation ambiguity', score: breakdown.punctuationAmbiguity, icon: '✏️' },
    { label: 'Capitalization risk', score: breakdown.capitalizationRisk, icon: '🔤' },
    { label: 'Message brevity', score: breakdown.messageBrevity, icon: '📏' },
    { label: 'Emoji analysis', score: breakdown.emojiAnalysis, icon: '😶' },
    { label: 'Context deviation', score: breakdown.deviationScore, icon: '📊' },
    { label: 'Relationship amplifier', score: breakdown.relationshipAmplifier, icon: '💫' },
    { label: 'Emotional investment', score: breakdown.importanceScore, icon: '❤️‍🔥' },
    { label: 'Time already spent', score: breakdown.timeSpentScore, icon: '⏳' },
    { label: 'Online-after behavior', score: breakdown.onlineAfterScore, icon: '🟢' },
  ];

  // 4. Flags
  const { greenFlags, redFlags } = generateFlags(input);

  // 5. Timeline
  const timeline = generateTimeline(input);

  // 6. Alternate universes
  const alternateUniverses = generateUniverses(input);

  // 7. Overthinking graph
  const graphData = generateGraph(input, overthinkingIndex);

  // 8. Verdict
  const classification = getClassification(overthinkingIndex);
  const verdict: VerdictData = {
    mainExplanation: interpretations.length > 0
      ? interpretations[0].text
      : 'They meant what they said.',
    alternativeCount: interpretations.length - 1,
    classification: classification.key as VerdictData['classification'],
    classificationLabel: classification.label,
  };

  // 9. Recommendation
  const recommendation = getRecommendation(overthinkingIndex);

  // 10. Easter eggs
  const analysisCount = getAnalysisCount();
  const phrase = input.exactMessage || input.whatHappened;
  const repeatEgg = checkRepeatAnalysis(phrase, getPreviousPhrases());
  const easterEgg = repeatEgg || detectEasterEgg(input, overthinkingIndex, analysisCount);

  // 11. Assemble result
  const result: AnalysisResult = {
    id: generateId(),
    timestamp: Date.now(),
    input,
    overthinkingIndex,
    scoreCategory,
    scoring: breakdown,
    interpretations,
    evidence,
    greenFlags,
    redFlags,
    timeline,
    alternateUniverses,
    graphData,
    verdict,
    recommendation,
    easterEgg,
    summary: phrase.length > 40 ? phrase.substring(0, 37) + '...' : phrase,
  };

  // 12. Persist
  saveResult(result);
  addToHistory(result);

  return result;
}

function generateGraph(input: AnalysisInput, finalScore: number): GraphPoint[] {
  const points: GraphPoint[] = [];
  const now = new Date();

  // Work backwards
  let thinkingMinutes = 1;
  switch (input.timeAlreadySpent) {
    case '1_min': thinkingMinutes = 1; break;
    case '10_min': thinkingMinutes = 10; break;
    case '1_hour': thinkingMinutes = 60; break;
    case 'several_hours': thinkingMinutes = 180; break;
    case 'reconstructed': thinkingMinutes = 360; break;
  }

  const totalMinutes = input.responseTime + thinkingMinutes + 5;

  // Generate ~8-10 data points
  const steps = 8;
  const interval = totalMinutes / steps;

  for (let i = 0; i <= steps; i++) {
    const minutesAgo = totalMinutes - (i * interval);
    const time = new Date(now.getTime() - minutesAgo * 60 * 1000);
    const timeStr = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    // Exponential growth curve
    const progress = i / steps;
    const level = Math.round(Math.min(finalScore, 5 + (finalScore - 5) * Math.pow(progress, 1.5)));

    let label: string | undefined;
    if (i === 0) label = 'Message sent';
    if (i === Math.floor(steps * 0.3)) label = 'Waiting...';
    if (i === Math.floor(steps * 0.6)) label = 'Reply received';
    if (i === steps) label = 'Opened this website';

    points.push({ time: timeStr, level, label });
  }

  return points;
}
