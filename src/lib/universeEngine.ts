// ============================================================
// UNIVERSE ENGINE — Alternate universe generator
// ============================================================

import type { AnalysisInput, AlternateUniverse } from '../types';

interface UniverseTemplate {
  id: string;
  title: string;
  description: string;
  evidence: string;
  baseWeight: number;
  conditions?: (input: AnalysisInput) => boolean;
  weightModifier?: (input: AnalysisInput) => number;
}

const UNIVERSE_TEMPLATES: UniverseTemplate[] = [
  {
    id: 'A',
    title: 'Everything is fine',
    description: 'They literally meant exactly what they said. No subtext, no hidden meaning, no ulterior motive. Just a normal human being giving a normal human response.',
    evidence: 'The simplest explanation is usually correct. But where\'s the fun in that?',
    baseWeight: 40,
    weightModifier: (i) => i.deviationFromNormal === 'not_at_all' ? 15 : -10,
  },
  {
    id: 'B',
    title: 'They\'re annoyed',
    description: 'You said something mildly stupid and they are choosing peace over confrontation. This is actually mature of them.',
    evidence: 'Short reply + delayed response + you can feel it in your bones.',
    baseWeight: 20,
    weightModifier: (i) => i.recentDisagreement ? 15 : -5,
  },
  {
    id: 'C',
    title: 'They are secretly in love with you',
    description: 'Their brief response is an elaborate defense mechanism designed to hide overwhelming feelings. Obviously.',
    evidence: 'None whatsoever.',
    baseWeight: 6,
    weightModifier: (i) => i.relationship === 'crush' ? 10 : -3,
  },
  {
    id: 'D',
    title: 'Their phone is dying',
    description: 'Battery at 2%. They chose to spend their final electrons on you. That is either romantic or pragmatic.',
    evidence: 'Short response. No elaboration. Consistent with low-battery behavior.',
    baseWeight: 5,
  },
  {
    id: 'E',
    title: 'You are the problem',
    description: 'Plot twist: you are the one making this weird. They sent a perfectly normal message and you\'re here running it through an algorithm.',
    evidence: 'You are literally on a website called "Overthinking Calculator."',
    baseWeight: 18,
    weightModifier: (i) => {
      let mod = 0;
      if (i.timeAlreadySpent === 'reconstructed') mod += 10;
      if (i.importance >= 8) mod += 5;
      return mod;
    },
  },
  {
    id: 'F',
    title: 'They are going through something',
    description: 'Something unrelated to you is happening in their life. You are not the main character of their story right now.',
    evidence: 'People have their own lives. Shocking, we know.',
    baseWeight: 12,
  },
  {
    id: 'G',
    title: 'Autocorrect betrayed them',
    description: 'They typed a thoughtful, nuanced response. Autocorrect reduced it to this. Technology has failed us all.',
    evidence: 'Have you ever tried typing on a phone? Exactly.',
    baseWeight: 3,
  },
  {
    id: 'H',
    title: 'They\'re playing 4D chess',
    description: 'This response was carefully calculated to produce exactly this reaction in you. They are 7 moves ahead.',
    evidence: 'The response is suspiciously simple. Too simple.',
    baseWeight: 4,
    weightModifier: (i) => i.relationship === 'complicated' ? 8 : 0,
  },
  {
    id: 'I',
    title: 'A cosmic misunderstanding',
    description: 'In a parallel universe, this conversation went perfectly. Unfortunately, you are in this one.',
    evidence: 'Multiverse theory cannot be disproven.',
    baseWeight: 2,
  },
  {
    id: 'J',
    title: 'They replied from the future',
    description: 'Time-traveling version of them sent this reply knowing it would cause maximum confusion in your timeline.',
    evidence: 'The timing was suspicious. Very suspicious.',
    baseWeight: 1,
  },
];

export function generateUniverses(input: AnalysisInput): AlternateUniverse[] {
  const applicable = UNIVERSE_TEMPLATES.filter(t => {
    if (t.conditions) return t.conditions(input);
    return true;
  });

  const weighted = applicable.map(t => {
    let weight = t.baseWeight;
    if (t.weightModifier) weight += t.weightModifier(input);
    return { ...t, weight: Math.max(0.5, weight) };
  });

  weighted.sort((a, b) => b.weight - a.weight);

  // Take top 5-7
  const count = Math.min(weighted.length, 5 + Math.floor(input.importance / 5));
  const selected = weighted.slice(0, count);

  const total = selected.reduce((s, u) => s + u.weight, 0);

  const universes: AlternateUniverse[] = selected.map(u => ({
    id: u.id,
    title: u.title,
    probability: Math.round((u.weight / total) * 100),
    description: u.description,
    evidence: u.evidence,
  }));

  // Fix sum to 100%
  const sum = universes.reduce((s, u) => s + u.probability, 0);
  if (universes.length > 0) {
    universes[0].probability += (100 - sum);
  }

  return universes;
}
