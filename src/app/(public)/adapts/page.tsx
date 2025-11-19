'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKeenSlider } from 'keen-slider/react';

import useQuizStore from '@/store/QuizState';
import useAuthStore from '@/store/AuthState';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import TestIntro from '@/components/client/adapts/TestIntro';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import {
  calculateTotalScores,
  estimateTscore,
  getQuestionsForProfile,
} from '@/utils/adaptsHelper';

import { Factor, Scores } from '@/types/adapts';
import { QuestionSlide } from '@/components/client/adapts/QuestionSlide';

const AssessmentPage: React.FC = () => {
  const router = useRouter();

  // 🧑‍💻 Pull minimal state from Zustand using shallow selection to prevent rerenders
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const answers = useQuizStore((s) => s.answers);
  const hasStarted = useQuizStore((s) => s.hasStarted);
  const hasCompleted = useQuizStore((s) => s.hasCompleted);
  const setHasStarted = useQuizStore((s) => s.setHasStarted);
  const setHasCompleted = useQuizStore((s) => s.setHasCompleted);
  const setCurrentQuestion = useQuizStore((s) => s.setCurrentQuestion);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const setTotalScore = useQuizStore((s) => s.setTotalScore);
  const setTotalRating = useQuizStore((s) => s.setTotalRating);
  const setTotalSubScaleScore = useQuizStore((s) => s.setTotalSubScaleScore);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);

  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => setMounted(true), []);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (mounted && !user) {
      setRedirecting(true);
      router.replace('/login');
    }

    if (user && hasCompleted) {
      setRedirecting(true);
      router.replace('/adapts/result');
    }
  }, [mounted, user, router]);

  // 📝 Load questions based on profile
  const questions = useMemo(() => {
    return user && clientProfile
      ? getQuestionsForProfile(user, clientProfile)
      : [];
  }, [user, clientProfile]);

  // 🎛 Keen slider setup
  const [sliderRef, slider] = useKeenSlider({
    initial: 0,
    drag: false,
    slideChanged(s) {
      setCurrentQuestion(s.track.details.rel);
    },
  });

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;
  const isLast = currentQuestion === questions.length - 1;

  const progress = useMemo(() => {
    return (answeredCount / questions.length) * 100;
  }, [answeredCount, questions.length]);

  // 🧮 Compute all subscale totals on demand
  const calculateSubscales = useCallback(() => {
    const base: Record<Factor, number> = {
      SoA: 0,
      PD: 0,
      SeA: 0,
      GAD: 0,
      OCD: 0,
      MDD: 0,
    };

    questions.forEach((q) => {
      const val = answers[q.id];
      if (typeof val === 'number') base[q.factor] += val;
    });

    return base;
  }, [answers, questions]);

  // 📝 Save answer handler (optimized)
  const handleAnswerChange = useCallback(
    (questionId: number, value: string) => {
      setAnswer(questionId, Number(value));

      if (!hasStarted) setHasStarted(true);
    },
    [setAnswer, hasStarted, setHasStarted]
  );

  // ▶️ Next / Submit
  const handleNext = useCallback(() => {
    if (!isLast) {
      slider.current?.next();
      return;
    }

    if (isComplete) {
      // 🧮 Compute everything on submit
      const subScales = calculateSubscales();
      const totalRating = Object.values(answers).reduce((a, b) => a + b, 0);
      const totalScore: Scores = calculateTotalScores(subScales);
      const tScore = estimateTscore(totalRating, clientProfile!);

      // Save computed scores on store
      setTotalRating(totalRating);
      setTotalScore(totalScore);
      setTotalSubScaleScore(subScales);
      setHasCompleted(true)

      console.log('🧩 Answers:', answers);
      console.log('📊 Subscales:', subScales);
      console.log('🏁 Total Rating:', totalRating);
      console.log('🏁 Total Scores:', totalScore);
      console.log('🧮 T Score:', tScore);

      router.replace('/adapts/result');
    }
  }, [
    isLast,
    isComplete,
    slider,
    answers,
    calculateSubscales,
    clientProfile,
    router,
  ]);

  const handleReset = () => resetQuiz();

  if (!mounted || redirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <TestIntro />
      </div>
    );
  }

  // 🧭 Main UI
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="w-full px-4 py-6 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            ADAPTS Assessment
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{answeredCount} answered</span>
            <span>{questions.length - answeredCount} remaining</span>
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div
          ref={sliderRef}
          className="keen-slider w-full max-w-4xl will-change-transform"
        >
          {questions.map((q) => (
            <QuestionSlide
              key={q.id}
              question={q}
              answer={answers[q.id]}
              isComplete={isComplete}
              onAnswerChange={handleAnswerChange}
            />
          ))}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="w-full px-4 pb-8">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
          {/* ◀️ Prev button  */}
          {/* <div>
                  <Button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0 || isComplete}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                </div> */}

          {/* ▶️ Next / Submit Results + Reset Test*/}
          <div className="text-center">
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion + 1] == null && !isLast}
              size="lg"
              variant={isComplete ? 'accent' : 'default'}
              className="w-100 flex items-center gap-2"
            >
              {isLast && isComplete ? 'Submit Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" /> 
            </Button>
            {/* {!isComplete && ( */}
            <Button
              onClick={handleReset}
              size="sm"
              variant={'link'}
              className="text-gray-500 text-sm text-xs"
            >
              Reset ADAPTS
            </Button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
