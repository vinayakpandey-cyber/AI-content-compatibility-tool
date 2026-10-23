export interface ReadingStats {
  wordCount: number;
  readingTimeMinutes: number;
  readabilityLevel: string;
  sentenceComplexity: string;
}

export interface AudienceBreakdown {
  painPointCoverage: number;
  vocabularySuitability: number;
  valuePropositionClarity: number;
  callToActionEffectiveness: number;
  empathyRelatability: number;
}

export interface AudienceAlignment {
  score: number;
  personaVerdict: string;
  breakdown: AudienceBreakdown;
  keyStrengths: string[];
  frictionPoints: string[];
  unaddressedQuestions: string[];
}

export interface DetectedKeyword {
  term: string;
  count: number;
  densityPercent: number;
  searchIntent: string; // Informational, Transactional, Commercial, Navigational
  status: string; // Optimal, Underused, Overused
  recommendation: string;
}

export interface MissingSemanticEntity {
  entity: string;
  importance: string; // Critical, Recommended, Nice-to-have
  contextSuggestion: string;
}

export interface PlacementAudit {
  hookPresence: boolean;
  headerPresence: boolean;
  conclusionPresence: boolean;
  keywordStuffingRisk: string; // Low, Moderate, High
}

export interface KeywordOptimization {
  score: number;
  summary: string;
  detectedKeywords: DetectedKeyword[];
  missingSemanticEntities: MissingSemanticEntity[];
  placementAudit: PlacementAudit;
}

export interface EmotionalVectors {
  trustAndAuthority: number;
  persuasiveness: number;
  urgency: number;
  empathyAndWarmth: number;
  clarityVersusJargon: number;
}

export interface ToneArcItem {
  section: string;
  detectedTone: string;
  impact: string; // Positive, Neutral, Warning
  note: string;
}

export interface SentimentAnalysis {
  score: number;
  primarySentiment: string;
  polarity: string; // Positive, Neutral, Negative, Mixed
  sentimentScoreRaw: number; // -1 to 1
  emotionalVectors: EmotionalVectors;
  toneArc: ToneArcItem[];
  riskFlags: string[];
}

export interface GeoMetrics {
  factAndDataDensity: number;
  informationGain: number;
  snippetQuotability: number;
  semanticStructure: number;
  hallucinationResistance: number;
}

export interface SimulatedAiSearchCard {
  query: string;
  aiAnswerSummary: string;
  citationMentionType: string; // Primary Source, Footnote Reference, Excluded
}

export interface GoldenCitationSnippet {
  quoteText: string;
  whyCitable: string;
}

export interface LlmVisibilityAndGEO {
  citationProbabilityScore: number;
  verdict: string;
  metrics: GeoMetrics;
  simulatedAiSearchCard: SimulatedAiSearchCard;
  topTriggerQueries: string[];
  goldenCitationSnippets: GoldenCitationSnippet[];
  aiVisibilityBlockers: string[];
}

export interface ActionableRecommendation {
  id: string;
  category: string; // Audience, Keyword, Sentiment, AI Citation
  priority: string; // High, Medium, Low
  title: string;
  issue: string;
  recommendation: string;
  currentSnippet: string;
  suggestedSnippet: string;
}

export interface AuditResult {
  overallScore: number;
  letterGrade: string;
  executiveSummary: string;
  readingStats: ReadingStats;
  audienceAlignment: AudienceAlignment;
  keywordOptimization: KeywordOptimization;
  sentimentAnalysis: SentimentAnalysis;
  llmVisibilityAndGEO: LlmVisibilityAndGEO;
  actionableRecommendations: ActionableRecommendation[];
}

export interface RewriteResult {
  optimizedContent: string;
  changesMade: string[];
  projectedScoreImprovement: string;
  keyTakeaway: string;
}

export interface ContentPreset {
  id: string;
  title: string;
  category: string;
  audience: string;
  keywords: string;
  brandTone: string;
  contentType: string;
  content: string;
}
