import { QUIZ_STORAGE } from '@/constants/storage-keys';
import { Scores, TotalSubScaleScore } from '@/types/adapts';
import { create } from 'zustand';

import { persist, devtools } from 'zustand/middleware';

interface QuizState {
  currentQuestion: number;
  answers: Record<number, number>;
  hasStarted: boolean;
  hasCompleted: boolean;
  totalRating: number;
  totalScore: Scores;  
  totalSubScaleScore: TotalSubScaleScore;
  completedAt?: string;
  startedAt?: string;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionId: number, value: number) => void;
  setHasStarted: (hasStarted: boolean) => void;
  setHasCompleted: (hasCompleted: boolean) => void;
  setStartedAt: (startedAt: string) => void;
  setCompletedAt: (completedAt: string) => void;
  setTotalRating: (rating: number) => void;
  setTotalSubScaleScore: (totalSubScaleScore: TotalSubScaleScore) => void;
  setTotalScore: (totalSubScore: Scores) => void;
  resetQuiz: () => void;
}

const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set) => ({
        hasHydrated: false,
        currentQuestion: 0,
        answers: {},
        hasStarted: false,
        hasCompleted: false,
        totalScore: {
          totalAnxietyScore: 0,
          totalMDDScore: 0,
        },
        totalRating: 0,
        totalSubScaleScore: {
          SoA: 0, // 🗣️ Social Anxiety
          PD: 0, // 💓 Panic Disorder
          SeA: 0, // 😰 Separation Anxiety
          GAD: 0, // 🤯 Generalized Anxiety Disorder
          OCD: 0, // 🔄 Obsessive-Compulsive Disorder
          MDD: 0, // 🌧️ Major Depressive Disorder
        },
        setCurrentQuestion: (index) => set({ currentQuestion: index }),
        setAnswer: (questionId, value) =>
          set((state) => ({
            answers: {
              ...state.answers,
              [questionId]: value,
            },
          })),
        setTotalSubScaleScore: (totalSubScaleScore: TotalSubScaleScore) => set({ totalSubScaleScore }),
        setTotalScore: (totalScore: Scores) => set({ totalScore }),
        setTotalRating: (totalRating: number) => set({ totalRating }),
        resetQuiz: () =>
          set({
            currentQuestion: 0,
            answers: {},
            hasStarted: false,
            hasCompleted: false,
            totalScore: {
              totalAnxietyScore: 0,
              totalMDDScore: 0,
            },
            totalRating: 0,
            startedAt: undefined,
            completedAt: undefined,
          }),
        setHasStarted: (hasStarted: boolean) => set({ hasStarted }),
        setHasCompleted: (v) => set({ hasCompleted: v }),
        setStartedAt: (v) => set({ startedAt: v }),
        setCompletedAt: (v) => set({ completedAt: v }),
        setHasHydrated: (v) => set({ hasHydrated: v }),
      }),
      {
        name: QUIZ_STORAGE,
        onRehydrateStorage: () => (state) => {
          // 🧊 Mark store as hydrated once persistence has loaded
          state?.setHasHydrated(true);
        },
      }
    )
  )
);

export default useQuizStore;
