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
  Factor,
  Question,
  SubScaleScores,
  tScoreResult,
} from '@/types/adapts';

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
 * 📊 Estimate a T-score and provide a risk band with recommendations.
 *
 * @param totalRating - Raw total score from the assessment
 * @param clientProfile - User info for age/sex adjustments
 * @returns {tScoreResult} - { tScoreCategory,  riskBand, riskLevel, description, recommendations }
 */
export function estimateTscore(
  totalRating: number,
  clientProfile: IClient
): tScoreResult {
  // 📊 Normative constants (replace with real data in production)
  const mean = 100;
  const standardDeviation = 15;

  // 🧮 Base T-score formula: T = 50 + 10 * ((Raw - Mean) / SD)
  const baseTScore = 50 + 10 * ((totalRating - mean) / standardDeviation);

  // 👶 Age adjustment (binary cutoff at 18 for now)
  const age = computeAge(clientProfile.birthDate);
  const ageAdjustment = age >= 18 ? 10 : 5;

  // 🚻 Sex adjustment (applies if Male/Female, else 0)
  const sexAdjustment = ['Female', 'Male'].includes(clientProfile.gender)
    ? 5
    : 0;

  // 🎯 Final adjusted T-score
  const adjustedTScore = Math.round(baseTScore + ageAdjustment + sexAdjustment);

  // 🎨 Categorize into T-score ranges
  let tScoreCategory;
  let riskLevel;
  let riskBand;
  let description;
  let recommendations: string[] = [];

  if (adjustedTScore >= 70) {
    tScoreCategory = 'T > 70';
    riskBand = ERiskBand.high;
    riskLevel = ERiskLevel.high;
    description =
      'Your responses reflect significantly elevated emotional distress, which may impact daily functioning or relationships.';
    recommendations = [
      'Book a **1:1 Mental Health Coaching Session** for guided support and personalized strategies.',
      'Schedule an **ADAPTS Debrief Session** with a certified coach to interpret your results and identify root causes.',
      'Consider enrolling in a **4- or 8-week Coaching Package** to build long-term emotional regulation skills.',
      'Start practicing the **Reset360 grounding and self-regulation tools** daily to stabilize your emotional baseline.',
      'If you feel overwhelmed, reach out to trusted support people or seek urgent professional help if necessary.',
    ];
  } else if (adjustedTScore >= 65) {
    tScoreCategory = 'T = 65–69';
    riskLevel = ERiskLevel.moderate;
    riskBand = ERiskBand.moderate;
    description =
      'Your emotional indicators are moderately elevated, suggesting recurring stress patterns or difficulty regulating certain emotional triggers.';

    recommendations = [
      'Book an **ADAPTS Debrief Session** to explore your emotional patterns and learn targeted coping tools.',
      'Try a **1:1 Coaching Session** to work on stress management, grounding, and emotional regulation.',
      'Use the **Reset360 micro-regulation tools** (breathing, grounding, reframing) when symptoms arise.',
      'Track your emotional patterns to see what triggers spikes or dips.',
      'Join a coaching package if your symptoms persist or begin affecting day-to-day functioning.',
    ];
  } else {
    tScoreCategory = 'T < 65';
    riskLevel = ERiskLevel.low;
    riskBand = ERiskBand.low;
    description =
      'Your responses fall within typical emotional ranges. You appear to have a stable emotional baseline with manageable stress levels.';

    recommendations = [
      'Maintain your routine and continue using healthy coping habits.',
      'Use **Reset360’s self-regulation tools** to stay grounded during stressful or emotionally triggering moments.',
      'Consider a **Growth-Focused Coaching Session** to enhance resilience, self-awareness, and proactive emotional skills.',
      'Re-take the ADAPTS assessment every 4–6 weeks to monitor changes in emotional well-being.',
      'If you experience shifts or spikes, book a **quick-check coaching session** for guidance.',
    ];
  }

  return {
    tScoreCategory,
    riskLevel,
    riskBand,
    adjustedTScore,
    description,
    recommendations,
  };
}

/**
 * 🧮 Calculate total anxiety and depression scores from factor subscales.
 *
 * @param subScaleScores - 🧱 Object mapping each factor to its total score:
 *   - SoA: 🗣️ Social Anxiety
 *   - PD: 💓 Panic Disorder
 *   - SeA: 😰 Separation Anxiety
 *   - GAD: 🤯 Generalized Anxiety
 *   - OCD: 🔄 Obsessive-Compulsive
 *   - MDD: 🌧️ Major Depressive Disorder
 *
 * @returns {Object} - 🎯 Aggregated totals:
 *   - totalAnxietyScore: 😰 Combined anxiety-related score (SoA + PD + SeA + GAD + OCD)
 *   - totalMDDScore: 🌧️ Depression score (MDD only)
 */
export function calculateTotalScores(subScaleScores: SubScaleScores) {
  // 🔍 Safely extract each factor score, defaulting to 0 if missing
  const {
    SoA = 0, // 🗣️ Social Anxiety
    PD = 0, // 💓 Panic Disorder
    SeA = 0, // 😰 Separation Anxiety
    GAD = 0, // 🤯 Generalized Anxiety
    OCD = 0, // 🔄 Obsessive-Compulsive
    MDD = 0, // 🌧️ Major Depressive Disorder
  } = subScaleScores;

  // 😰 Total anxiety score = sum of all anxiety-related factors
  const totalAnxietyScore = SoA + PD + SeA + GAD + OCD;

  // 🌧️ Total depression score = MDD factor only
  const totalMDDScore = MDD;

  // 📦 Return combined scores for downstream use (reports, UI, etc.)
  return { totalAnxietyScore, totalMDDScore };
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
): Record<Factor, number> {
  const counts: Record<Factor, number> = {
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
  factorCounts: Record<Factor, number>,
  maxPerItem = 4
): Record<Factor, number> {
  const maxScores: Record<Factor, number> = {
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
      return "Student Wellness Self-Assessment";

    case EAssessmentType.ADAPTS_P:
      return "Parent Wellness Self-Assessment";

    case EAssessmentType.ADAPTS_T:
      return "Teacher Wellness Self-Assessment";

    case EAssessmentType.ADAPTS_C:
      return "College & Young Adult Self-Assessment";

    default:
      return "General Wellness Assessment";
  }
}

export const getAssessmentLabel = (segment?: EClientSegment) => {
  switch (segment) {
    case EClientSegment.STUDENT:
      return "You will take ADAPTS-S (Student Assessment).";
    case EClientSegment.PARENT:
      return "You will take ADAPTS-P (Parent Assessment).";
    case EClientSegment.TEACHER:
      return "You will take ADAPTS-T (Teacher Assessment).";
    case EClientSegment.INDIVIDUAL:
      return "You will take ADAPTS-C (College / Young Adult Assessment).";
    default:
      return "This helps us assign the correct ADAPTS assessment for you.";
  }
};

export const getSegmentLabel = (segment?: EClientSegment) => {
  switch (segment) {
    case EClientSegment.STUDENT:
      return "Student";
    case EClientSegment.PARENT:
      return "Parent";
    case EClientSegment.TEACHER:
      return "Teacher";
    case EClientSegment.INDIVIDUAL:
      return "College / Young Adult";
    default:
      return "";
  }
};