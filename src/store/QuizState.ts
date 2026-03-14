import { QUIZ_STORAGE } from '@/constants/storage-keys';
import { patchAssessmentProgress } from '@/services/adaptsService';
import { IAssessment } from '@/types/adapts';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type QuizState = {
  hasHydrated: boolean;
  hasStarted: boolean;
  hasPrevAttempts: boolean;

  assessment?: IAssessment;
  assessmentId?: string;

  answersDraft?: Record<number, number>;
  currentQuestionIndex: number;
  timeSpentSec: number;

  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: number | null;

  _saveTimer: any;

  hydrateFromAssessment: (assessment: any) => void;
  setHasStarted: (v: boolean) => void;
  setHasPrevAttempts: (v: boolean) => void;
  setHasHydrated: (v: boolean) => void;

  setAnswer: (path: number, value: any) => void;
  setCurrentQuestionIndex: (n: number) => void;

  scheduleAutosave: () => void;
  flushAutosave: () => Promise<void>;
  clearAutosaveTimer: () => void;

  resetQuiz: () => void;
};

const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set, get) => ({
        hasHydrated: false,
        hasStarted: false,
        hasPrevAttempts: false,

        answersDraft: [],

        currentQuestionIndex: 0,
        timeSpentSec: 0,

        isDirty: false,
        isSaving: false,
        lastSavedAt: null,

        _saveTimer: null as NodeJS.Timeout | null,

        setHasStarted: (v) => set({ hasStarted: v }),
        setHasPrevAttempts: (v) => set({ hasPrevAttempts: v }),

        hydrateFromAssessment: (assessment) => {
          set({
            assessment: assessment,
            assessmentId: assessment._id,

            answersDraft: assessment.answersDraft?.[0] || {},
            currentQuestionIndex: assessment.currentQuestionIndex || 0,
            timeSpentSec: assessment.timeSpentSec || 0,

            hasStarted: Object.keys(assessment.answersDraft?.[0] || {}).length > 0 ? true : false,
            hasPrevAttempts: false,

            isDirty: false,
            isSaving: false,
            lastSavedAt: Date.now(),
          });
        },

        setAnswer: (path: number, value: number) => {
          const state = get();
          const next = { ...(state.answersDraft || {}) };
          next[path] = value;

          set({ answersDraft: next, isDirty: true });
          get().scheduleAutosave();
        },

        setCurrentQuestionIndex: (n: number) => {
          set({ currentQuestionIndex: n, isDirty: true });
          get().scheduleAutosave();
        },

        clearAutosaveTimer: () => {
          const t = get()._saveTimer;
          if (t) clearTimeout(t);
          set({ _saveTimer: null });
        },

        scheduleAutosave: () => {
          const { assessment } = get();
          if (!assessment) return;

          get().clearAutosaveTimer();

          // Debounce: save 800ms after last change
          const timer = setTimeout(() => {
            get().flushAutosave();
          }, 800);

          set({ _saveTimer: timer });
        },

        flushAutosave: async () => {
          const {
            assessmentId,
            answersDraft,
            currentQuestionIndex,
            timeSpentSec,
            isDirty,
            isSaving,
          } = get();

          if (!assessmentId) return;
          if (!isDirty) return;
          if (isSaving) return;

          set({ isSaving: true });

          try {
            await patchAssessmentProgress(assessmentId!, {
              answersDraft,
              currentQuestionIndex,
              timeSpentSec,
            });

            set({
              isDirty: false,
              lastSavedAt: Date.now(),
            });
          } finally {
            set({ isSaving: false });
          }
        },

        resetQuiz: () =>
          set({
            currentQuestionIndex: 0,
            assessment: undefined,
            hasStarted: false,
            hasPrevAttempts: false,
          }),

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
