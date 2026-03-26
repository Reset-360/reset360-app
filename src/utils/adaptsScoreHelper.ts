import {
  ALL_FACTORS,
  EAssessmentType,
  ERiskBand,
  ERiskLevel,
  FactorResult,
  RCADSFactor,
  Scores,
  TScoreResult,
} from '@/types/adapts';
import { getQuestionsByType } from './adaptsHelper';
import { getRecommendations } from './adaptsRecommendations';

// =============================================================================
// adaptsScoreHelper.ts
//
// Consolidated RCADS-based T-score scoring for all ADAPTS form types.
//
// RESPONSE SCALE (0–3):
//   0 = Never  1 = Sometimes  2 = Often  3 = Always
//
// NORM SOURCES:
//   Student     — Chorpita et al. (2000), RCADS community norms, ages 8–18
//   Young Adult — Saez-Flores et al. (2018), RCADS-YA college norms, ages 18–25
//   Parent      — Approximate adult community norms (Löwe et al. 2008,
//                 Remes et al. 2016). NOT clinically validated for this form.
//                 Replace with collected internal norms once n ≥ 200.
//   Teacher     — Same as Parent. Same caveat applies.
//
// ITEM COUNTS PER SUBSCALE (all 50-item forms):
//   MDD = 13, GAD = 6, PD = 9, SoA = 9, SeA = 4, OCD = 6  → Scored = 47
//
// CLINICAL CUTOFFS (standard RCADS convention):
//   T ≥ 70 → Clinical range
//   T 65–69 → Borderline clinical range
//   T < 65 → Non-clinical range
// =============================================================================

// ── Constants ─────────────────────────────────────────────────────────────────

const ITEM_MIN = 0;
const ITEM_MAX = 3;

const T_CLINICAL = 70;
const T_BORDERLINE = 65;

type FactorNorm = { mean: number; sd: number };
type NormTable = Record<RCADSFactor | 'Total', FactorNorm>;

// ── Norm tables ───────────────────────────────────────────────────────────────

/**
 * RCADS community norms — children/adolescents, mixed sex, ages 8–18.
 * Source: Chorpita, Yim, Moffitt, Umemoto & Francis (2000).
 */
const STUDENT_NORMS: NormTable = {
  MDD: { mean: 6.37, sd: 5.26 },
  GAD: { mean: 5.71, sd: 4.26 },
  PD: { mean: 3.22, sd: 4.0 },
  SoA: { mean: 8.36, sd: 6.23 },
  SeA: { mean: 2.61, sd: 3.14 },
  OCD: { mean: 3.53, sd: 3.57 },
  Total: { mean: 29.68, sd: 19.03 },
};

/**
 * RCADS-YA norms — young adults, mixed sex, ages 18–25.
 * Source: Saez-Flores et al. (2018), college student sample.
 */
const YOUNG_ADULT_NORMS: NormTable = {
  MDD: { mean: 7.1, sd: 5.8 },
  GAD: { mean: 6.2, sd: 4.7 },
  PD: { mean: 3.5, sd: 4.2 },
  SoA: { mean: 9.1, sd: 6.5 },
  SeA: { mean: 1.8, sd: 2.9 },
  OCD: { mean: 3.8, sd: 3.9 },
  Total: { mean: 31.5, sd: 20.4 },
};

/**
 * Approximate adult general population norms.
 * Used for Parent and Teacher forms until internal norms are collected (n >= 200).
 * Derived from: Löwe et al. (2008), Remes et al. (2016), adult community samples.
 *
 * WARNING: Replace these values with your own collected means and standard
 * deviations once you have sufficient response data per form type. Log raw
 * subscale scores to your database now so you can compute these later.
 */
const ADULT_PLACEHOLDER_NORMS: NormTable = {
  MDD: { mean: 7.5, sd: 6.0 },
  GAD: { mean: 6.5, sd: 5.0 },
  PD: { mean: 3.8, sd: 4.5 },
  SoA: { mean: 9.0, sd: 6.8 },
  SeA: { mean: 2.0, sd: 3.0 },
  OCD: { mean: 4.0, sd: 4.0 },
  Total: { mean: 32.8, sd: 21.0 },
};

/** Item counts per subscale — same across all 50-item forms */
const FACTOR_ITEM_COUNTS: Record<RCADSFactor, number> = {
  MDD: 13,
  GAD: 6,
  PD: 9,
  SoA: 9,
  SeA: 4,
  OCD: 6,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getNormsForForm(formType: EAssessmentType): NormTable {
  switch (formType) {
    case EAssessmentType.ADAPTS_S:
      return STUDENT_NORMS;
    case EAssessmentType.ADAPTS_C:
      return YOUNG_ADULT_NORMS;
    case EAssessmentType.ADAPTS_P:
    case EAssessmentType.ADAPTS_T:
      return ADULT_PLACEHOLDER_NORMS;
  }
}

/**
 * T = 50 + 10 x ((raw - mean) / sd)
 * Clamped to 20–80 to prevent extreme values from small/outlier samples.
 */
function calcTScore(rawScore: number, norm: FactorNorm): number {
  if (norm.sd === 0) return 50;
  const t = 50 + 10 * ((rawScore - norm.mean) / norm.sd);
  return Math.round(Math.min(80, Math.max(20, t)));
}

function buildFactorResult(
  factor: RCADSFactor,
  rawScore: number,
  norm: FactorNorm
): FactorResult {
  const maxRawScore = FACTOR_ITEM_COUNTS[factor] * ITEM_MAX;
  const tScore = calcTScore(rawScore, norm);
  return {
    rawScore,
    tScore,
    maxRawScore,
    percentOfMax: Math.round((rawScore / maxRawScore) * 100),
    isBorderlineClinical: tScore >= T_BORDERLINE,
    isClinical: tScore >= T_CLINICAL,
  };
}

function getTScoreCategory(tScore: number): string {
  if (tScore >= T_CLINICAL) return 'Clinical range (T >= ' + T_CLINICAL + ')';
  if (tScore >= T_BORDERLINE)
    return (
      'Borderline clinical range (T = ' +
      T_BORDERLINE +
      '-' +
      (T_CLINICAL - 1) +
      ')'
    );
  return 'Non-clinical range (T < ' + T_BORDERLINE + ')';
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Compute RCADS-based T-scores for all subscales and derive risk classification.
 *
 * @param answers        Map of { questionId: responseValue } where values are 0–3
 *                       (0 = Never, 1 = Sometimes, 2 = Often, 3 = Always)
 * @param clientProfile  Used to fetch the correct question set
 * @param adaptsType     "ADAPTS_S" | "ADAPTS_C" | "ADAPTS_P" | "ADAPTS_T"
 *
 * @returns TScoreResult with per-subscale breakdown, total score, risk band,
 *          tailored recommendations, and self-harm flag.
 */
export function estimateTscore(
  answers: Record<number, number>,
  adaptsType: EAssessmentType
): TScoreResult {
  const questions = getQuestionsByType(adaptsType);

  const norms = getNormsForForm(adaptsType);
  const isNormValidated =
    adaptsType === EAssessmentType.ADAPTS_S ||
    adaptsType === EAssessmentType.ADAPTS_C;
  const normNote = isNormValidated
    ? undefined
    : 'Scores for this form are based on approximate adult population references and should be interpreted as relative indicators, not clinically validated T-scores. Validated norms will be applied once sufficient response data has been collected (n >= 200 per form type).';

  // ── 1. Clamp raw responses to 0–3 ─────────────────────────────────────────
  const clampedAnswers: Record<number, number> = {};
  for (const q of questions) {
    const value = answers[q.id] ?? 0;
    clampedAnswers[q.id] = Math.max(ITEM_MIN, Math.min(value, ITEM_MAX));
  }

  // ── 2. Sum raw scores per subscale ────────────────────────────────────────
  const rawByFactor: Record<RCADSFactor, number> = {
    MDD: 0,
    GAD: 0,
    PD: 0,
    SoA: 0,
    SeA: 0,
    OCD: 0,
  };
  for (const q of questions) {
    const factor = q.factor as RCADSFactor;
    if (factor in rawByFactor) {
      rawByFactor[factor] += clampedAnswers[q.id];
    }
  }

  // ── 3. Build per-subscale results ─────────────────────────────────────────
  const subscales = {} as Record<RCADSFactor, FactorResult>;
  for (const factor of ALL_FACTORS) {
    subscales[factor] = buildFactorResult(
      factor,
      rawByFactor[factor],
      norms[factor]
    );
  }

  // ── 4. Total score ────────────────────────────────────────────────────────
  const totalRawScore = ALL_FACTORS.reduce((sum, f) => sum + rawByFactor[f], 0);
  const totalTScore = calcTScore(totalRawScore, norms['Total']);

  // ── 5. Self-harm flag ─────────────────────────────────────────────────────
  // Q32 is the self-harm item across all four form types.
  // Falls back to keyword match in case question ordering ever changes.
  const selfHarmQuestion =
    questions.find((q) => q.id === 32) ??
    questions.find((q) => q.question.toLowerCase().includes('harm'));
  const hasSelfHarmFlag = selfHarmQuestion
    ? (clampedAnswers[selfHarmQuestion.id] ?? 0) > 0
    : false;

  // ── 6. Effective T-score and elevated subscales ───────────────────────────
  const worstSubscaleTScore = Math.max(
    ...ALL_FACTORS.map((f) => subscales[f].tScore)
  );
  const effectiveTScore = Math.max(worstSubscaleTScore, totalTScore);
  const elevatedSubscales = ALL_FACTORS.filter(
    (f) => subscales[f].isBorderlineClinical
  );

  // ── 7. Risk band ──────────────────────────────────────────────────────────
  let riskLevel: ERiskLevel;
  let riskBand: ERiskBand;

  if (hasSelfHarmFlag || effectiveTScore >= T_CLINICAL) {
    riskLevel = ERiskLevel.high;
    riskBand = ERiskBand.high;
  } else if (effectiveTScore >= T_BORDERLINE) {
    riskLevel = ERiskLevel.moderate;
    riskBand = ERiskBand.moderate;
  } else {
    riskLevel = ERiskLevel.low;
    riskBand = ERiskBand.low;
  }

  // ── 8. Recommendations (from adaptsRecommendations.ts) ───────────────────
  const { description, recommendations } = getRecommendations(
    adaptsType,
    riskBand,
    elevatedSubscales,
    hasSelfHarmFlag
  );

  // ── 9. Compute for TotalSubScalesScore (TotalAnxiety, TotalMDD) ───────────────────
  const totalSubScalesScore: Scores = {
    totalAnxietyScore:
      rawByFactor.GAD +
      rawByFactor.PD +
      rawByFactor.SoA +
      rawByFactor.SeA +
      rawByFactor.OCD,
    totalMDDScore: rawByFactor.MDD,
  };


  const tScoreCategory = getTScoreCategory(
    hasSelfHarmFlag ? T_CLINICAL : effectiveTScore
  );

  return {
    subscales,
    totalRawScore,
    totalTScore,
    totalSubScalesScore,
    effectiveTScore,
    elevatedSubscales,
    riskLevel,
    riskBand,
    tScoreCategory,
    description,
    recommendations,
    hasSelfHarmFlag,
    isNormValidated,
    normNote,
  };
}
