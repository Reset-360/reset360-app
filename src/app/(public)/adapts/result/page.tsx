'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import useQuizStore from '@/store/QuizState';
import useAuthStore from '@/store/AuthState';

import { estimateTscore, getQuestionsForProfile } from '@/utils/adaptsHelper';
import { defaultRiskProfile, Scores, TotalSubScaleScore, tScoreResult } from '@/types/adapts';

import LoadingSpinner from '@/components/layout/LoadingSpinner';

import { TScoreGauge } from '@/components/client/adapts-results/TScoreGauge';
import RiskCard from '@/components/client/adapts-results/RiskCard';
import { EmotionalProfileHeader } from '@/components/client/adapts-results/EmotionalProfileHeader';
import { SubscaleSummary } from '@/components/client/adapts-results/SubScaleSummary';
import { RecommendationsList } from '@/components/client/adapts-results/RecommendationsList';
import MentalHealthRadialProfile from '@/components/client/adapts-results/MentalHealthRadialProfile';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import useEntitlementStore from '@/store/EntitlementState';

const ResultsPage = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  const assessment = useQuizStore((s) => s.assessment)
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const resetEntitlement = useEntitlementStore((s) => s.resetEntitlement);

  const hasCompleted = assessment?.submittedAt ? true : false;
  const completedAt = assessment?.submittedAt
  const totalRating = assessment?.totalRating || 0
  const totalSubScaleScore = assessment?.totalSubScalesScore as Scores
  const subScaleScore = assessment?.subScales as TotalSubScaleScore

  // 📝 Load questions based on profile
  const questions = useMemo(() => {
    return user && clientProfile
      ? getQuestionsForProfile(user, clientProfile)
      : [];
  }, [user, clientProfile]);

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [estimatedTScore, setEstimatedTScore] =
    useState<tScoreResult>(defaultRiskProfile);

  useEffect(() => setMounted(true), []);

  // 🔐 Redirect if not logged in or has not attempted/completed assessment
  useEffect(() => {
    if (mounted && (!user || !hasCompleted || !assessment)) {
      setRedirecting(true);

      if (!user) {
        router.replace('/login');
      } else if (!assessment) {
        router.replace('/client/dashboard');
      } else {
        router.replace('/adapts');
      }
    }
  }, [mounted, user, hasCompleted, assessment, router]);

  useEffect(() => {
    if (mounted && clientProfile) {
      const tScore = estimateTscore(totalRating, clientProfile!);
      setEstimatedTScore(tScore);
    }
  }, [mounted, clientProfile]);

  
  const onBackToHome = () => {
    // reset quiz state
    // reset entitlement state
    resetQuiz();
    resetEntitlement();

    router.replace('/client/dashboard')
  }

  if (!mounted || redirecting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <EmotionalProfileHeader />

        <div className="grid gap-6 lg:grid-cols-2">
          <RiskCard
            riskLevel={estimatedTScore.riskLevel}
            description={estimatedTScore.description}
            completedAt={completedAt}
          />

          <TScoreGauge
            score={estimatedTScore.adjustedTScore}
            riskLevel={estimatedTScore.riskLevel}
            tScoreCategory={estimatedTScore.tScoreCategory}
          />
        </div>

        {assessment && (
          <>
            <MentalHealthRadialProfile totalSubScaleScore={subScaleScore} questions={questions} />
            <SubscaleSummary totalSubScaleScore={subScaleScore} questions={questions} />
          </>
        )}

        <RecommendationsList
          recommendations={estimatedTScore.recommendations}
          riskLevel={estimatedTScore.riskLevel}
        />

        <div className="flex flex-col">
          <Button
            onClick={onBackToHome}
            variant={'link'}
            className="flex-1 h-12 text-slate-900"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* ⚠️ Disclaimer */}
        <p className="text-[11px] text-muted-foreground text-center max-w-3xl mx-auto">
          This assessment is for informational and educational purposes only. It
          does not provide a diagnosis and does not replace consultation with a
          licensed mental health professional.
        </p>
      </div>
    </div>
  );
};

export default ResultsPage;
