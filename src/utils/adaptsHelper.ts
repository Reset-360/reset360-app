import { EUserRole, IUser } from '@/types/user';
import { EClientSegment, IClient } from '@/types/client';

import StudentQuestions from '@/constants/adapts/StudentQuestions';
import ParentQuestions from '@/constants/adapts/ParentQuestions';
import TeacherQuestions from '@/constants/adapts/TeacherQuestions';
import YoungAdultQuestions from '@/constants/adapts/YoungAdultQuestions';

import moment from 'moment';
import {
  EAssessmentType,
  ERiskBand,
  ERiskLevel,
  RCADSFactor,
  IElevatedArea,
  ITopElevatedAreasResult,
  Question,
  TScoreResult,
} from '@/types/adapts';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';

/**
 * 🎂 Compute age from birthdate using Moment.js
 *
 * @param {string|Date} birthdate - The user's birthdate (string or Date object)
 * @returns {number} - Age in years
 */
export function computeAge(birthdate: Date) {
  // 📅 Normalize the input date with moment
  const normalizedDate = moment(birthdate, moment.ISO_8601, true);

  // ❌ Handle invalid date
  if (!normalizedDate.isValid()) {
    throw new Error('Invalid birthdate format');
  }

  // ⏳ Calculate age in years
  const age = moment().diff(normalizedDate, 'years');

  return age;
}

/**
 * 🎯 Returns the appropriate set of questions based on user role and client segment.
 *
 * @param {Object} user - The current user object
 * @param {Object} clientProfile - The client profile object
 * @returns {Array} questions - The selected set of questions
 */
export function getQuestionsForProfile(user: IUser, clientProfile: IClient) {
  // 📝 Default to student questions
  let questions = StudentQuestions;

  // 👤 Check if user exists, has a profile, and role is CLIENT
  if (user && clientProfile && user?.role === EUserRole.CLIENT) {
    // 🔀 Switch based on client segment type
    switch (clientProfile.segment) {
      case EClientSegment.PARENT:
        questions = ParentQuestions; // 👪 Parent-specific questions
        break;
      case EClientSegment.TEACHER:
        questions = TeacherQuestions; // 📚 Teacher-specific questions
        break;
      case EClientSegment.INDIVIDUAL:
        questions = YoungAdultQuestions; // 🧑 Young adult-specific questions
        break;
      default:
        // ❓ Fallback remains StudentQuestions
        break;
    }
  }

  return questions;
}

/**
 * 🎯 Returns the appropriate set of questions based type
 *
 * @param {Object} type - EAssessment type
 * @returns {Array} questions - The selected set of questions
 */
export function getQuestionsByType(type: EAssessmentType) {
  // 📝 Default to student questions
  let questions = StudentQuestions;

  // 🔀 Switch based on client segment type
  switch (type) {
    case EAssessmentType.ADAPTS_P:
      questions = ParentQuestions; // 👪 Parent-specific questions
      break;
    case EAssessmentType.ADAPTS_T:
      questions = TeacherQuestions; // 📚 Teacher-specific questions
      break;
    case EAssessmentType.ADAPTS_C:
      questions = YoungAdultQuestions; // 🧑 Young adult-specific questions
      break;
    default:
      // ❓ Fallback remains StudentQuestions
      break;
  }

  return questions;
}

/**
 * 🎯 Returns the appropriate assessment type based on user role and client segment.
 *
 * @param {Object} user - The current user object
 * @param {Object} clientProfile - The client profile object
 * @returns {string} assessmentType - The selected assessment type code
 */
export function getAssessmentType(
  user: IUser,
  clientProfile: IClient
): EAssessmentType {
  // 📝 Default to student assessment type
  let assessmentType = EAssessmentType.ADAPTS_S;

  // 👤 Check if user exists, has a profile, and role is CLIENT
  if (user && clientProfile && user?.role === EUserRole.CLIENT) {
    // 🔀 Switch based on client segment type
    switch (clientProfile.segment) {
      case EClientSegment.PARENT:
        assessmentType = EAssessmentType.ADAPTS_P; // 👪 Parent-specific assessment
        break;
      case EClientSegment.TEACHER:
        assessmentType = EAssessmentType.ADAPTS_T; // 📚 Teacher-specific assessment
        break;
      case EClientSegment.INDIVIDUAL:
        assessmentType = EAssessmentType.ADAPTS_C; // 🧑 College/young adult-specific assessment
        break;
      default:
        // ❓ Fallback remains ADAPTS-S
        break;
    }
  }

  return assessmentType;
}

/**
 * 🎯 Identify the factor (e.g., MDD, GAD, OCD) for the given question ID
 *
 * @param {Array} questions - List of question objects with factors
 * @param questionId - 🆔 Unique identifier of the question
 */
export function getQuestionFactorById(
  questions: Question[],
  questionId: number
) {
  // 🔍 Find the question object that matches the given ID
  const question = questions.find((q) => q.id === questionId);

  // 📝 Return its factor if found, otherwise undefined
  return question?.factor;
}

/**
 * 🧮 Count how many items belong to each factor.
 *
 * @returns Record<FactorKey, number>
 *   e.g. { MDD: 14, SoA: 11, ... }
 */
export function getFactorItemCounts(
  questions: Question[]
): Record<RCADSFactor, number> {
  const counts: Record<RCADSFactor, number> = {
    SoA: 0,
    PD: 0,
    SeA: 0,
    GAD: 0,
    OCD: 0,
    MDD: 0,
  };

  questions.forEach((q) => {
    counts[q.factor] += 1;
  });

  return counts;
}

/**
 * 🎯 Given item counts and a max option value (4),
 * compute the max possible score per factor.
 */
export function getMaxScoresPerFactor(
  factorCounts: Record<RCADSFactor, number>,
  maxPerItem = 3
): Record<RCADSFactor, number> {
  const maxScores: Record<RCADSFactor, number> = {
    SoA: factorCounts.SoA * maxPerItem,
    PD: factorCounts.PD * maxPerItem,
    SeA: factorCounts.SeA * maxPerItem,
    GAD: factorCounts.GAD * maxPerItem,
    OCD: factorCounts.OCD * maxPerItem,
    MDD: factorCounts.MDD * maxPerItem,
  };

  return maxScores;
}

/**
 * 🖼️ Render a readable assessment type label
 *
 * @param {EAssessmentType} type - The assessment type enum
 * @returns {string} - Human-friendly label
 */
export function renderAssessmentType(type: EAssessmentType): string {
  switch (type) {
    case EAssessmentType.ADAPTS_S:
      return 'Student Wellness Self-Assessment';

    case EAssessmentType.ADAPTS_P:
      return 'Parent Wellness Self-Assessment';

    case EAssessmentType.ADAPTS_T:
      return 'Teacher Wellness Self-Assessment';

    case EAssessmentType.ADAPTS_C:
      return 'College & Young Adult Self-Assessment';

    default:
      return 'General Wellness Assessment';
  }
}

export const getAssessmentLabel = (segment?: EClientSegment) => {
  switch (segment) {
    case EClientSegment.STUDENT:
      return 'You will take ADAPTS-S (Student Assessment).';
    case EClientSegment.PARENT:
      return 'You will take ADAPTS-P (Parent Assessment).';
    case EClientSegment.TEACHER:
      return 'You will take ADAPTS-T (Teacher Assessment).';
    case EClientSegment.INDIVIDUAL:
      return 'You will take ADAPTS-C (College / Young Adult Assessment).';
    default:
      return 'This helps us assign the correct ADAPTS assessment for you.';
  }
};

export const getSegmentLabel = (segment?: EClientSegment) => {
  switch (segment) {
    case EClientSegment.STUDENT:
      return 'Student';
    case EClientSegment.PARENT:
      return 'Parent';
    case EClientSegment.TEACHER:
      return 'Teacher';
    case EClientSegment.INDIVIDUAL:
      return 'College / Young Adult';
    default:
      return '';
  }
};

function getRiskFromTScore(tScore: number): {
  riskBand: ERiskBand;
  riskLevel: ERiskLevel;
} {
  if (tScore >= 70)
    return { riskBand: ERiskBand.high, riskLevel: ERiskLevel.high };
  if (tScore >= 65)
    return { riskBand: ERiskBand.moderate, riskLevel: ERiskLevel.moderate };
  return { riskBand: ERiskBand.low, riskLevel: ERiskLevel.low };
}

export function buildFactorSummary(
  label: string,
  description: string,
  riskBand: ERiskBand
): string {
  const base = description.toLowerCase();

  if (riskBand === ERiskBand.high) {
    return `Your responses indicate a higher level of ${base}`;
  }

  if (riskBand === ERiskBand.moderate) {
    return `Your responses suggest a moderate level of ${base}`;
  }

  return `Your responses suggest a lower level of ${base}`;
}

/**
 * getTopElevatedAreas
 *
 * Given assessment responses and a pre-computed T-score result,
 * this function identifies and ranks the six RCADS factors (MDD, GAD, PD, SoA, SeA, OCD)
 * by their T-scores. It builds metadata for each factor, including risk band,
 * risk level, and a summary description.
 *
 * - Elevation is determined by T-score (not raw percentage).
 * - Results are sorted by descending T-score, with raw score as a tiebreaker.
 * - The function highlights the top one or two clinically elevated areas (T ≥ 65).
 * - Returns a structured result containing:
 *   • primary and secondary elevated factors (or null if none),
 *   • all factors ranked by T-score,
 *   • a headline string summarizing the findings.
 *
 * This ensures consistent identification of the most clinically relevant
 * areas for display and reporting.
 */
export function getTopElevatedAreas(
  tScoreResult: TScoreResult // pass the already-computed result in
): ITopElevatedAreasResult {
  const factors: RCADSFactor[] = ['MDD', 'GAD', 'PD', 'SoA', 'SeA', 'OCD'];

  const all: IElevatedArea[] = factors.map((factor) => {
    const subscale = tScoreResult.subscales[factor];
    const meta = FACTOR_META[factor];

    // Elevation is now driven by T-score, not raw percentage
    const { riskBand, riskLevel } = getRiskFromTScore(subscale.tScore);

    return {
      factor,
      label: meta.label,
      description: meta.description,
      group: meta.group,
      rawScore: subscale.rawScore,
      maxScore: subscale.maxRawScore,
      percentage: subscale.percentOfMax, // kept for display bar only
      tScore: subscale.tScore, // source of truth for elevation
      isClinical: subscale.isClinical,
      isBorderlineClinical: subscale.isBorderlineClinical,
      riskBand,
      riskLevel,
      summary: buildFactorSummary(meta.label, meta.description, riskBand),
    };
  });

  // Sort by T-score descending (not percentage) — consistent with estimateTscore
  const sorted = [...all].sort((a, b) => {
    if (b.tScore !== a.tScore) return b.tScore - a.tScore;
    return b.rawScore - a.rawScore; // tiebreak on raw score
  });

  // Only flag as "elevated" if actually at or above borderline clinical (T ≥ 65)
  const elevatedOnly = sorted.filter((a) => a.isBorderlineClinical);
  const truePrimary = elevatedOnly[0] ?? null;
  const trueSecondary = elevatedOnly[1] ?? null;

  let headline = 'No elevated areas identified.';
  if (truePrimary && trueSecondary) {
    headline = `Top elevated areas: ${truePrimary.label} and ${trueSecondary.label}.`;
  } else if (truePrimary) {
    headline = `Top elevated area: ${truePrimary.label}.`;
  }

  return {
    primary: truePrimary, // null if nothing clinically elevated
    secondary: trueSecondary,
    all: sorted, // all 6 subscales ranked by T-score
    headline,
  };
}
