'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import useQuizStore from '@/store/QuizState';
import useAuthStore from '@/store/AuthState';

import LoadingSpinner from '@/components/layout/LoadingSpinner';
import TestIntro from '@/components/client/adapts/TestIntro';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import {
  calculateTotalScores,
  estimateTscore,
  getAssessmentType,
  getQuestionsForProfile,
} from '@/utils/adaptsHelper';

import { AssessmentData, Factor, Scores } from '@/types/adapts';
import { QuestionSlide } from '@/components/client/adapts/QuestionSlide';
import ResumeAssessment from '@/components/client/adapts/ResumeAssessment';
import moment from 'moment';
import { QuestionStepper } from '@/components/client/adapts/QuestionStepper';
import { saveAssessmentResult } from '@/services/adaptsService';

const dbDateFormat = 'YYYY-MM-DD HH:mm';

const AssessmentPage: React.FC = () => {
  const router = useRouter();

  // 👤 Auth / profile
  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  // 🧠 Quiz store: core state
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const answers = useQuizStore((s) => s.answers);
  const hasHydrated = useQuizStore((s) => s.hasHydrated);
  const hasStarted = useQuizStore((s) => s.hasStarted);
  const startedAt = useQuizStore((s) => s.startedAt);
  const hasCompleted = useQuizStore((s) => s.hasCompleted);

  // 🔧 Quiz store: setters
  const setHasStarted = useQuizStore((s) => s.setHasStarted);
  const setHasCompleted = useQuizStore((s) => s.setHasCompleted);
  const setCompletedAt = useQuizStore((s) => s.setCompletedAt);
  const setCurrentQuestion = useQuizStore((s) => s.setCurrentQuestion);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const setTotalScore = useQuizStore((s) => s.setTotalScore);
  const setTotalRating = useQuizStore((s) => s.setTotalRating);
  const setTotalSubScaleScore = useQuizStore((s) => s.setTotalSubScaleScore);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);

  // 🚦 Local UI state
  const [redirecting, setRedirecting] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isResumed, setIsResumed] = useState(false);

  // 👇 NEW: only true if we detect existing progress on mount
  const [canPromptResume, setCanPromptResume] = useState(false);

  // 📝 Load questions based on profile
  const questions = useMemo(() => {
    return user && clientProfile
      ? getQuestionsForProfile(user, clientProfile)
      : [];
  }, [user, clientProfile]);

  // 📊 Derived quiz metadata
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const isLast = totalQuestions > 0 && currentQuestion === totalQuestions - 1;

  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return (answeredCount / totalQuestions) * 100;
  }, [answeredCount, totalQuestions]);

  // 🛡️ Guard: auth + completed state
  useEffect(() => {
    if (hasHydrated && !user) {
      setRedirecting(true);
      router.replace('/login');
      return;
    }

    if (hasHydrated && hasCompleted) {
      setRedirecting(true);
      router.replace('/adapts/result');
    }
  }, [user, hasCompleted, router, hasHydrated]);

  // 💾 Detect if we should show resume prompt on load
  useEffect(() => {
    if (!hasHydrated) return;

    // If there are saved answers and the test is not completed,
    // this looks like a returning session ➜ allow resume prompt.
    if (hasStarted && answeredCount > 0 && !hasCompleted) {
      setCanPromptResume(true);
    } else {
      // Fresh session: treat as already "resumed" so we never show the prompt.
      setIsResumed(true);
    }
  }, [hasHydrated, hasCompleted, hasStarted]); // ⬅️ deliberately NOT depending on answeredCount

  // 🧮 Compute all subscale totals
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
      if (typeof val === 'number') {
        base[q.factor] += val;
      }
    });

    return base;
  }, [answers, questions]);

  // 🔁 Resume handler: just flip the flag, slider initial handles positioning
  const handleResume = useCallback(() => {
    if (!hasHydrated) return;
    setIsResumed(true);
  }, [hasHydrated]);

  // ▶️ Prev
  const handlePrev = useCallback(() => {
    if (currentQuestion === 0) return;
    setDirection(-1);
    setCurrentQuestion(Math.max(currentQuestion - 1, 0));
  }, [currentQuestion, setCurrentQuestion]);

  // ▶️ Next / Submit
  const handleNext = useCallback( async () => {
    if (!user) return
    
    // 👉 Move to next question
    if (!isLast) {
      setDirection(1);
      setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1));
      return;
    }

    // ✅ Submit when complete
    if (isComplete && clientProfile) {
      const subScales = calculateSubscales();
      const totalRating = Object.values(answers).reduce((a, b) => a + b, 0);
      const totalScore: Scores = calculateTotalScores(subScales);
      const tScore = estimateTscore(totalRating, clientProfile);
      const type = getAssessmentType(user, clientProfile)

      // 💾 Persist computed scores to store
      setTotalRating(totalRating);
      setTotalScore(totalScore);
      setTotalSubScaleScore(subScales);
      setCompletedAt(moment().format(dbDateFormat))

      const assessmentData: AssessmentData = {
        userId: user._id,
        type,
        totalRating,
        tScore: tScore.adjustedTScore,
        tScoreSummary: tScore,
        riskBand: tScore.riskBand,
        riskLevel: tScore.riskLevel,
        answers,
        subScales,
        totalSubScalesScore: totalScore,
        startedAt: startedAt ?? '',
        submittedAt: moment().format(dbDateFormat)
      }

      const data = await saveAssessmentResult(assessmentData);

      if (data) {
        setHasCompleted(true)
        router.replace('/adapts/result');
      }
    }
  }, [
    isLast,
    isComplete,
    answers,
    calculateSubscales,
    clientProfile,
    router,
    setTotalRating,
    setTotalScore,
    setTotalSubScaleScore,
    setHasCompleted,
  ]);

  // ✍️ Save answer handler
  const handleAnswerChange = useCallback(
    (questionId: number, value: string) => {
      setAnswer(questionId, Number(value));

      if (!hasStarted) {
        setHasStarted(true);
        setStartedAt(moment().format(dbDateFormat))
      }
    },
    [setAnswer, hasStarted, setHasStarted]
  );

  // ⏳ Loading / redirecting state
  if (redirecting || !hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // 🚪 First-time start: show intro
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <TestIntro />
      </div>
    );
  }

  // 🔂 Show resume prompt if user has progress but not done yet
  if (canPromptResume && !isResumed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <ResumeAssessment
          onResume={handleResume}
          onRestart={resetQuiz}
          questionsCompleted={answeredCount}
          totalQuestions={totalQuestions}
          progress={progress}
          lastAttemptDate={moment().toDate()}
        />
      </div>
    );
  }

  const currentQuestionObj = questions[currentQuestion];
  const isCurrentAnswered =
    currentQuestionObj && answers[currentQuestionObj.id] != null;

  // 🧭 Main assessment UI
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="w-full px-4 py-6 space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            ADAPTS Assessment
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{answeredCount} answered</span>
            <span>{Math.max(totalQuestions - answeredCount, 0)} remaining</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-4xl">
          <QuestionStepper index={currentQuestion} direction={direction}>
            {questions.map((q) => (
              <QuestionSlide
                key={q.id}
                question={q}
                answer={answers[q.id]}
                isComplete={isComplete}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </QuestionStepper>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full px-4 pb-8">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
          {/* <div className="text-center">
            <Button
              onClick={handlePrev}
              // disabled={currentQuestion !== 0}
              size="lg"
              variant={'outline'}
              className="w-100 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          </div> */}

          <div className="text-center">
            <Button
              onClick={handleNext}
              disabled={!isCurrentAnswered && !isLast}
              size="lg"
              variant={isComplete ? 'accent' : 'default'}
              className="w-100 flex items-center gap-2"
            >
              {isLast && isComplete ? 'Submit Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
