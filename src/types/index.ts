// ============================================================
// OVERTHINKING CALCULATOR — Type Definitions
// ============================================================

export interface AnalysisInput {
  // Step 1
  whatHappened: string;

  // Step 2
  exactMessage: string;
  responseTime: number; // in minutes
  punctuation: 'none' | '.' | '!' | '?' | '...';
  capitalization: 'lowercase' | 'normal' | 'allcaps';
  usedEmoji: boolean;
  emojiType?: string;
  deviationFromNormal: 'not_at_all' | 'slightly' | 'very' | 'extremely';
  onlineAfter: 'no_idea' | 'no' | 'yes';
  relationship: 'stranger' | 'acquaintance' | 'friend' | 'close_friend' | 'crush' | 'partner' | 'complicated';

  // Step 3
  whatHappenedBefore: string;
  recentDisagreement: boolean;
  usuallyFastReplier: boolean;
  usedPhraseBefore: boolean;
  importance: number; // 1-10
  timeAlreadySpent: '1_min' | '10_min' | '1_hour' | 'several_hours' | 'reconstructed';
}

export interface ScoringBreakdown {
  responseDelay: number;        // 0-100
  punctuationAmbiguity: number; // 0-100
  capitalizationRisk: number;   // 0-100
  messageBrevity: number;       // 0-100
  emojiAnalysis: number;        // 0-100
  deviationScore: number;       // 0-100
  relationshipAmplifier: number;// 0-100
  importanceScore: number;      // 0-100
  timeSpentScore: number;       // 0-100
  onlineAfterScore: number;     // 0-100
}

export interface Interpretation {
  text: string;
  probability: number; // percentage
  isAbsurd: boolean;
}

export interface EvidenceFactor {
  label: string;
  score: number; // 0-100
  icon: string;
}

export interface Flag {
  text: string;
  type: 'green' | 'red';
}

export interface TimelineEvent {
  time: string;
  label: string;
  description: string;
  isCritical?: boolean;
}

export interface AlternateUniverse {
  id: string;
  title: string;
  probability: number;
  description: string;
  evidence: string;
}

export interface GraphPoint {
  time: string;
  level: number;
  label?: string;
}

export interface VerdictData {
  mainExplanation: string;
  alternativeCount: number;
  classification: 'NORMAL' | 'MILDLY_CONCERNING' | 'OVERTHINKING' | 'SEVERE_OVERTHINKING' | 'ABSOLUTE_CINEMA';
  classificationLabel: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  input: AnalysisInput;
  overthinkingIndex: number; // 0-100
  scoreCategory: string;
  scoring: ScoringBreakdown;
  interpretations: Interpretation[];
  evidence: EvidenceFactor[];
  greenFlags: Flag[];
  redFlags: Flag[];
  timeline: TimelineEvent[];
  alternateUniverses: AlternateUniverse[];
  graphData: GraphPoint[];
  verdict: VerdictData;
  recommendation: string;
  easterEgg: string | null;
  summary: string; // short summary for history
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  phrase: string;
  score: number;
  category: string;
}

export interface UserStats {
  totalAnalyses: number;
  averageScore: number;
  mostOverthoughtPhrase: string;
  mostDangerousPunctuation: string;
  mostSuspiciousResponseTime: number;
  totalScenariosImagined: number;
  totalHoursWasted: number;
}
