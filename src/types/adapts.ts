export enum EAssessmentType {
  ADAPTS_S = 'ADAPTS-S',
  ADAPTS_P = 'ADAPTS-P',
  ADAPTS_T = 'ADAPTS-T',
  ADAPTS_C = 'ADAPTS-C',
}

export enum ERiskBand {
  low = 'low',
  moderate = 'moderate',
  high = 'high',
}

export enum ERiskLevel {
  low = 'Low Risk',
  moderate = 'Moderate Risk',
  high = 'High Risk',
}

// 🏷️ Define all possible factor values
export type RCADSFactor =
  | 'MDD' // 🌧️ Major Depressive Disorder
  | 'SoA' // 🗣️ Social Anxiety
  | 'PD' // 💓 Panic Disorder
  | 'SeA' // 😰 Separation Anxiety
  | 'GAD' // 🤯 Generalized Anxiety Disorder
  | 'OCD'; // 🔄 Obsessive-Compulsive Disorder
  
export const ALL_FACTORS: RCADSFactor[] = [
  "MDD",
  "SoA",
  "PD",
  "SeA",
  "GAD",
  "OCD",
];

export type FactorResult = {
  rawScore: number; // 0–3 scale sum
  tScore: number; // Normed T-score
  maxRawScore: number; // Maximum possible raw score for this subscale
  percentOfMax: number; // rawScore / maxRawScore as 0–100 (for display)
  isBorderlineClinical: boolean; // T >= 65
  isClinical: boolean; // T >= 70
};

// 📝 Define the Question type
export interface Question {
  id: number; // 🔢 Unique identifier
  question: string; // 💬 The text of the question
  factor: RCADSFactor; // 🎯 Which subscale this question belongs to
}

// 📊 Define SubScaleScores type (mapping factor → score)
export type SubScaleScores = Record<RCADSFactor, FactorResult>;

// 🧮 Type for quiz scores
export interface Scores {
  totalAnxietyScore: number; // 😰 Sum of anxiety-related factors
  totalMDDScore: number; // 🌧️ Sum of depression-related factors
}

// 🎯 Interface for subscale scores
export interface TotalSubScaleScore {
  SoA: number; // 🗣️ Social Anxiety
  PD: number; // 💓 Panic Disorder
  SeA: number; // 😰 Separation Anxiety
  GAD: number; // 🤯 Generalized Anxiety Disorder
  OCD: number; // 🔄 Obsessive-Compulsive Disorder
  MDD: number; // 🌧️ Major Depressive Disorder
}

export type TScoreResult = {
  /** Full per-subscale breakdown */
  subscales: Record<RCADSFactor, FactorResult>;

  /** Sum of all subscale raw scores */
  totalRawScore: number;

  /** T-score for the total */
  totalTScore: number;

  /** TotalAnxiety, TotalMDD Summary */
  totalSubScalesScore: Scores

  /**
   * The single T-score driving risk classification.
   * = max(worst subscale T, total T)
   * Ensures a spike on one subscale is never masked by a low total.
   */
  effectiveTScore: number;

  /** Subscales at or above borderline clinical threshold */
  elevatedSubscales: RCADSFactor[];

  /** Risk classification */
  riskLevel: ERiskLevel;
  riskBand: ERiskBand;
  tScoreCategory: string;
  description: string;
  recommendations: string[];

  /** True if self-harm item (Q32 in all forms) was endorsed at any level */
  hasSelfHarmFlag: boolean;

  /**
   * True for Student and Young Adult (published norms exist).
   * False for Parent and Teacher (approximate norms — replace when n >= 200).
   */
  isNormValidated: boolean;
  normNote?: string;
};

export interface IAssessment {
  _id: string;
  userId?: string; // assuming MongoDB ObjectId stored as string
  entitlementId?: string;
  type: EAssessmentType; // type of assessment
  totalRating: number; // overall rating score
  tScore: number; // adjusted T-score
  tScoreSummary: tScoreResultSummary;
  subscales: SubScaleScores; // replace `any` with a more specific type if known
  startedAt?: string; // depending on how you store dates
  lastActivityAt?: string; // formatted date string

  effectiveTScore: number;
  totalRawScore: number;
  totalTScore: number;
  elevatedSubscales: string[]; // or a more specific type if you know the subscale identifiers
  riskBand: ERiskBand; // could be an enum if values are fixed
  riskLevel: ERiskLevel; // likewise, consider an enum
  tScoreCategory: string; // category label, could be enum
  subScales: SubScaleScores; // adjust if you have a defined subscale type
  normNote: string | null;
  isNormValidated: boolean;
  hasSelfHarmFlag: boolean;
  totalSubScalesScore: Scores;
  answers: Record<number, number>; // or more specific type if answers have a known shape
  submittedAt: string; // formatted date string
}

export interface StartAssessmentData {
  userId: string;
  type: EAssessmentType;
  assessmentId?: string;
}

export type tScoreResultSummary = {
  effectiveTScore: number;
  totalRawScore: number;
  totalTScore: number;
  elevatedSubscales: string[]; // or a more specific type if you know the subscale identifiers
  riskBand: ERiskBand; // could be an enum if values are fixed
  riskLevel: ERiskLevel; // likewise, consider an enum
  tScoreCategory: string; // category label, could be enum
  subScales: SubScaleScores; // adjust if you have a defined subscale type
  normNote: string | null;
  isNormValidated: boolean;
  hasSelfHarmFlag: boolean;
  totalSubScalesScore: Scores;
  answers: Record<number, number>; // or more specific type if answers have a known shape
  submittedAt: string; // formatted date string
};

export interface IElevatedArea {
  factor: RCADSFactor;
  label: string;
  description: string;
  group: string;
  rawScore: number;
  maxScore: number;
  percentage: number; // for display bar only — not used for elevation logic
  tScore: number; // ← add
  isClinical: boolean; // ← add
  isBorderlineClinical: boolean; // ← add
  riskBand: ERiskBand;
  riskLevel: ERiskLevel;
  summary: string;
}

export interface ITopElevatedAreasResult {
  primary: IElevatedArea | null;
  secondary: IElevatedArea | null;
  all: IElevatedArea[];
  headline: string;
}
