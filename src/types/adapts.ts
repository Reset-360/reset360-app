// 🏷️ Define all possible factor values
export type Factor =
  | "MDD"   // 🌧️ Major Depressive Disorder
  | "SoA"   // 🗣️ Social Anxiety
  | "PD"    // 💓 Panic Disorder
  | "SeA"   // 😰 Separation Anxiety
  | "GAD"   // 🤯 Generalized Anxiety Disorder
  | "OCD";  // 🔄 Obsessive-Compulsive Disorder

// 📝 Define the Question type
export interface Question {
  id: number;        // 🔢 Unique identifier
  question: string;  // 💬 The text of the question
  factor: Factor;    // 🎯 Which subscale this question belongs to
}

// 📊 Define SubScaleScores type (mapping factor → score)
export type SubScaleScores = Record<Factor, number>;

// 🧮 Type for quiz scores
export interface Scores {
  totalAnxietyScore: number; // 😰 Sum of anxiety-related factors
  totalMDDScore: number;     // 🌧️ Sum of depression-related factors
}

// 🎯 Interface for subscale scores
export interface TotalSubScaleScore {
  SoA: number; // 🗣️ Social Anxiety
  PD: number;  // 💓 Panic Disorder
  SeA: number; // 😰 Separation Anxiety
  GAD: number; // 🤯 Generalized Anxiety Disorder
  OCD: number; // 🔄 Obsessive-Compulsive Disorder
  MDD: number; // 🌧️ Major Depressive Disorder
}

export const defaultRiskProfile = {
  adjustedTScore: 0,
  tScoreCategory: "T < 65", // 📊 Default T-score band
  riskLevel: "Low Risk",    // ✅ Overall risk level
  riskBand: "low",          // 🟢 Risk band identifier
  description:
    "Your responses fall within typical emotional ranges. You appear to have a stable emotional baseline with manageable stress levels.",

  recommendations: [
    "Maintain your routine and continue using healthy coping habits.",
    "Use **Reset360’s self-regulation tools** to stay grounded during stressful or emotionally triggering moments.",
    "Consider a **Growth-Focused Coaching Session** to enhance resilience, self-awareness, and proactive emotional skills.",
    "Re-take the ADAPTS assessment every 4–6 weeks to monitor changes in emotional well-being.",
    "If you experience shifts or spikes, book a **quick-check coaching session** for guidance.",
  ],
};

export type tScoreResult = {
  adjustedTScore: number,
  tScoreCategory: string;
  riskLevel: string;
  riskBand: string;
  description: string;
  recommendations: string[];
};