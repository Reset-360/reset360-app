import { QUIZ_STORAGE } from '@/constants/storage-keys';
import { create } from 'zustand';

import { persist, devtools } from 'zustand/middleware';

interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  setCurrentQuestion: (index: number) => void;
  setAnswer: (questionIndex: number, value: string) => void;
}

const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set) => ({
        currentQuestion: 0,
        answers: {},
        setCurrentQuestion: (index) => set({ currentQuestion: index }),
        setAnswer: (questionIndex, value) =>
          set((state) => ({
            answers: {
              ...state.answers,
              [questionIndex]: value,
            },
          })),
      }),
      {
        name: QUIZ_STORAGE,
      }
    )
  )
);

export default useQuizStore;
