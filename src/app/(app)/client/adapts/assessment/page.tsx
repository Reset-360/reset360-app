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
  getQuestionsByType,
  renderAssessmentType,
} from '@/utils/adaptsHelper';

import {
  IAssessment,
  Factor,
  Scores,
  SubmitAssessmentData,
  EAssessmentType,
} from '@/types/adapts';
import { QuestionSlide } from '@/components/client/adapts/QuestionSlide';
import ResumeAssessment from '@/components/client/adapts/ResumeAssessment';
import moment from 'moment';
import { QuestionStepper } from '@/components/client/adapts/QuestionStepper';
import {
  saveAssessmentResult,
  submitAssessmentResult,
} from '@/services/adaptsService';
import { dbDateFormat } from '@/constants/common';
import useEntitlementState from '@/store/EntitlementState';
import AnswersSummary from '@/components/client/adapts/AnswersSummary';
import Image from 'next/image';

const AssessmentPage: React.FC = () => {
  const router = useRouter();

  // 👤 Auth / profile
  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  // Entitlement : Get type of question based on Entitlement
  const currentEntitlement = useEntitlementState((s) => s.currentEntitlement);

  // 🧠 Quiz store: core state
  const assessment = useQuizStore((s) => s.assessment);
  const assessmentId = useQuizStore((s) => s.assessmentId);
  const currentQuestion = useQuizStore((s) => s.currentQuestionIndex);
  const answers = useQuizStore((s) => s.answersDraft);
  const hasHydrated = useQuizStore((s) => s.hasHydrated);
  const hasStarted = useQuizStore((s) => s.hasStarted);
  const hydrateFromAssessment = useQuizStore((s) => s.hydrateFromAssessment);

  // 🔧 Quiz store: setters
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const setCurrentQuestion = useQuizStore((s) => s.setCurrentQuestionIndex);

  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const resetEntitlement = useEntitlementState((s) => s.resetEntitlement);

  // 🚦 Local UI state
  const [redirecting, setRedirecting] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isResumed, setIsResumed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  // Only true if we detect existing progress on mount
  const [canPromptResume, setCanPromptResume] = useState(false);

  // 📝 Load questions based on profile
  const questions = useMemo(() => {
    return currentEntitlement && clientProfile
      ? getQuestionsByType(currentEntitlement.type)
      : [];
  }, [currentEntitlement, clientProfile]);

  // 📝 Load assessment type based on profile
  const assessmentType =
    currentEntitlement?.type ??
    (user && clientProfile
      ? getAssessmentType(user, clientProfile)
      : undefined);

  // 📊 Derived quiz metadata
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers || {}).length;
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

    if (hasHydrated && assessment?.submittedAt) {
      setRedirecting(true);
      router.replace('/client/adapts/result');
    }
  }, [user, assessment?.submittedAt, router, hasHydrated]);

  // 💾 Detect if we should show resume prompt on load.
  // Snapshot answeredCount once on hydration so subsequent answer changes
  // never re-trigger this effect and flip canPromptResume unexpectedly.
  useEffect(() => {
    if (!hasHydrated) return;

    const savedAnswerCount = Object.keys(answers || {}).length;

    if (hasStarted && savedAnswerCount > 0 && !assessment?.submittedAt) {
      setCanPromptResume(true);
    } else {
      setIsResumed(true);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]); // ✅ Only run once when store finishes hydrating

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
      const val = answers?.[q.id];
      if (typeof val === 'number') {
        base[q.factor] += val;
      }
    });

    return base;
  }, [answers, questions]);

  // 🔁 Resume handler
  const handleResume = useCallback(() => {
    if (!hasHydrated) return;
    setIsResumed(true);
  }, [hasHydrated]);

  // ◀️ Prev
  const handlePrev = useCallback(() => {
    if (currentQuestion === 0) return;
    setDirection(-1);
    setCurrentQuestion(Math.max(currentQuestion - 1, 0));
  }, [currentQuestion, setCurrentQuestion]);

  // ▶️ Next / Review Answers
  // FIX: Separated concerns — advancing questions vs. showing summary are now
  // mutually exclusive branches with explicit early returns.
  const handleNext = useCallback(() => {
    if (!user || !assessmentId) return;

    // On the last question and all questions answered → show summary
    if (isLast && isComplete) {
      setShowSummary(true);
      return; // ← early return prevents falling through to advance logic
    }

    // Not on last question → advance
    if (!isLast) {
      setDirection(1);
      setCurrentQuestion(Math.min(currentQuestion + 1, questions.length - 1));
    }
  }, [user, assessmentId, isLast, isComplete, currentQuestion, questions.length, setCurrentQuestion]);

  // ✅ Submit (called from AnswersSummary)
  const handleSubmit = useCallback(async () => {
    if (!user || !assessmentId || !isComplete || !clientProfile) return;

    const subScales = calculateSubscales();
    const totalRating = Object.values(answers || {}).reduce(
      (a, b) => a + b,
      0
    );
    const totalScore: Scores = calculateTotalScores(subScales);
    const tScore = estimateTscore(totalRating, clientProfile);

    const assessmentResult: SubmitAssessmentData = {
      totalRating,
      tScore: tScore.adjustedTScore,
      tScoreSummary: tScore,
      riskBand: tScore.riskBand,
      riskLevel: tScore.riskLevel,
      answers: answers || {},
      subScales,
      totalSubScalesScore: totalScore,
      submittedAt: moment().format(dbDateFormat),
    };

    const data = await submitAssessmentResult(assessmentId, assessmentResult);
    hydrateFromAssessment(data);

    if (data) {
      await router.replace('/client/adapts/result');
      resetEntitlement();
    }
  }, [
    user,
    assessmentId,
    isComplete,
    answers,
    calculateSubscales,
    clientProfile,
    router,
    hydrateFromAssessment,
    resetEntitlement,
  ]);

  // ✍️ Answer change handler with safe auto-advance
  // Auto-next moves to currentQuestion + 1 (not by question ID), only when:
  // - not already on the last question
  // - not all questions are already complete (avoid accidental summary skip)
  const handleAnswerChange = useCallback(
    (questionId: number, value: string) => {
      setAnswer(questionId, Number(value));

      const newAnsweredCount = Object.keys(answers || {}).length + 1;
      const willBeComplete = newAnsweredCount === totalQuestions;

      // If this answer completes the quiz, don't auto-advance — let the user
      // click "Review Answers" deliberately.
      if (willBeComplete) return;

      // Only advance if we're still on the question that was just answered
      // (guards against stale closures firing on an already-navigated slide)
      if (!isLast) {
        setDirection(1);
        setCurrentQuestion(Math.min(currentQuestion + 1, totalQuestions - 1));
      }
    },
    [setAnswer, answers, totalQuestions, isLast, currentQuestion, setCurrentQuestion]
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

  if (showSummary) {
    return <AnswersSummary questions={questions} onSubmit={handleSubmit} />;
  }

  const currentQuestionObj = questions[currentQuestion];
  const isCurrentAnswered =
    currentQuestionObj && answers?.[currentQuestionObj.id] != null;

  // 🧭 Main assessment UI
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/client/dashboard')}
            className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Header */}
      <div className="w-full px-4 pt-10 pb-6 space-y-4">
        <div className="text-center space-y-2 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-accent/5 flex items-center justify-center">
            <Image
              src={'/logo/logo_250.png'}
              width={32}
              height={32}
              alt="Reset 360 Logo"
            />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {renderAssessmentType(assessmentType as EAssessmentType)}
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
                answer={answers?.[q.id]}
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
          <div className="text-center">
            <Button
              onClick={handlePrev}
              size="lg"
              variant={'outline'}
              className="w-100 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          </div>

          <div className="text-center">
            <Button
              onClick={handleNext}
              // FIX: Button is disabled if current question is unanswered,
              // UNLESS we're on the last question where isComplete already gates
              // the summary transition. Prevents clicking through unanswered questions.
              disabled={!isCurrentAnswered}
              size="lg"
              variant={isComplete ? 'accent' : 'default'}
              className="w-100 flex items-center gap-2"
            >
              {isLast && isComplete ? 'Review Answers' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
