'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CalendarCheck, RefreshCw } from 'lucide-react';

import useQuizStore from '@/store/QuizState';
import useAuthStore from '@/store/AuthState';

import { getQuestionsForProfile } from '@/utils/adaptsHelper';
import { Scores, TScoreResult } from '@/types/adapts';

import LoadingSpinner from '@/components/layout/LoadingSpinner';

import { EmotionalProfileHeader } from '@/components/client/adapts-results/EmotionalProfileHeader';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import useEntitlementStore from '@/store/EntitlementState';
import { estimateTscore } from '@/utils/adaptsScoreHelper';
import moment from 'moment';
import SelfHarmBanner from '@/components/client/adapts-results/SelfHarmBanner';
import RiskCard from '@/components/client/adapts-results/RiskCard';
import MentalHealthRadialProfile from '@/components/client/adapts-results/MentalHealthRadialProfile';
import SubscaleSummary from '@/components/client/adapts-results/SubScaleSummary';
import { RecommendationsList } from '@/components/client/adapts-results/RecommendationsList';

const ResultsPage = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);

  const assessment = useQuizStore((s) => s.assessment);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  const resetEntitlement = useEntitlementStore((s) => s.resetEntitlement);

  // 📝 Load questions based on profile
  const questions = useMemo(() => {
    return user && clientProfile
      ? getQuestionsForProfile(user, clientProfile)
      : [];
  }, [user, clientProfile]);

  const hasCompleted = assessment?.submittedAt ? true : false;
  const completedAt = assessment?.submittedAt;

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const [result, setResult] = useState<TScoreResult>();

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
    if (mounted && clientProfile && assessment && assessment?.answers) {
      const tScore = estimateTscore(
        assessment?.answers[0] as any,
        assessment?.type
      );
      console.log(tScore);
      setResult(tScore);
    }
  }, [mounted, clientProfile, assessment]);

  const onBackToHome = () => {
    // reset quiz state
    // reset entitlement state
    resetQuiz();
    resetEntitlement();

    router.replace('/client/dashboard');
  };

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

        {result ? (
          <div className="">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs text-foreground bg-primary/10 border border-primary/20 p-2 rounded-md">
                <CalendarCheck className="h-4 w-4 text-primary" />
                <span>
                  Completed on{' '}
                  {moment(completedAt).format('MMMM Do, YYYY HH:mm A')}
                </span>
              </div>
              
              {/* Self-harm banner (if flagged) */}
              {result.hasSelfHarmFlag && <SelfHarmBanner />}

              <div className="grid gap-6">
                {/* Overall risk level*/}
                <RiskCard result={result} />
                <MentalHealthRadialProfile
                  totalSubScaleScore={result.subscales}
                  questions={questions}
                />
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <SubscaleSummary
                  subscales={result.subscales}
                  elevatedSubscales={result.elevatedSubscales}
                />

                <RecommendationsList
                  recommendations={result.recommendations}
                  riskBand={result.riskBand}
                />
              </div>
            </div>
          </div>
        ) : (
          <Alert variant="destructive" className="mt-4 mx-auto max-w-md">
            <RefreshCw className="h-4 w-4" />
            <AlertTitle>Unable to load results</AlertTitle>
            <AlertDescription>
              Please try refreshing the page or check back later.
            </AlertDescription>
          </Alert>
        )}

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
