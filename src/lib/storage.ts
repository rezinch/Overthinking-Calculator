// ============================================================
// STORAGE — localStorage helpers for history & stats
// ============================================================

import type { AnalysisResult, HistoryEntry, UserStats } from '../types';

const HISTORY_KEY = 'overthinking_history';
const RESULTS_KEY = 'overthinking_results';

// ---- History ----

export function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(result: AnalysisResult): void {
  const history = getHistory();
  const entry: HistoryEntry = {
    id: result.id,
    timestamp: result.timestamp,
    phrase: result.input.exactMessage || result.input.whatHappened,
    score: result.overthinkingIndex,
    category: result.scoreCategory,
  };
  history.unshift(entry); // newest first
  // Keep max 50 entries
  if (history.length > 50) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
  localStorage.removeItem(RESULTS_KEY);
}

// ---- Full Results (for reopening) ----

export function saveResult(result: AnalysisResult): void {
  try {
    const results = getAllResults();
    results[result.id] = result;
    // Keep max 50
    const keys = Object.keys(results);
    if (keys.length > 50) {
      delete results[keys[0]];
    }
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  } catch {
    // Storage full — silently fail
  }
}

export function getResult(id: string): AnalysisResult | null {
  try {
    const results = getAllResults();
    return results[id] || null;
  } catch {
    return null;
  }
}

function getAllResults(): Record<string, AnalysisResult> {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ---- Stats ----

export function getUserStats(): UserStats {
  const history = getHistory();

  if (history.length === 0) {
    return {
      totalAnalyses: 0,
      averageScore: 0,
      mostOverthoughtPhrase: 'N/A',
      mostDangerousPunctuation: 'N/A',
      mostSuspiciousResponseTime: 0,
      totalScenariosImagined: 0,
      totalHoursWasted: 0,
    };
  }

  const avgScore = history.reduce((s, h) => s + h.score, 0) / history.length;

  // Find most overthought phrase (highest score)
  const sorted = [...history].sort((a, b) => b.score - a.score);
  const topPhrase = sorted[0]?.phrase || 'N/A';

  // Approximate stats from history
  const totalScenarios = history.reduce((s, h) => {
    return s + Math.floor(h.score / 10) + 3;
  }, 0);

  const totalMinutes = history.length * 12; // ~12 min per analysis session
  const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

  return {
    totalAnalyses: history.length,
    averageScore: Math.round(avgScore * 10) / 10,
    mostOverthoughtPhrase: topPhrase,
    mostDangerousPunctuation: '.',
    mostSuspiciousResponseTime: 43,
    totalScenariosImagined: totalScenarios,
    totalHoursWasted: totalHours,
  };
}

// ---- Helpers ----

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function getAnalysisCount(): number {
  return getHistory().length;
}

export function getPreviousPhrases(): string[] {
  return getHistory().map(h => h.phrase);
}
