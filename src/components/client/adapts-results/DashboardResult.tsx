'use client';

import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/AuthState';

import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CalendarCheck, RefreshCw } from 'lucide-react';

import { getQuestionsByType } from '@/utils/adaptsHelper';
import { IAssessment, TScoreResult } from '@/types/adapts';

import LoadingSpinner from '@/components/layout/LoadingSpinner';

import RiskCard from '@/components/client/adapts-results/RiskCard';
import { SubscaleSummary } from '@/components/client/adapts-results/SubScaleSummary';
import { RecommendationsList } from '@/components/client/adapts-results/RecommendationsList';
import MentalHealthRadialProfile from '@/components/client/adapts-results/MentalHealthRadialProfile';
import { estimateTscore } from '@/utils/adaptsScoreHelper';
import SelfHarmBanner from './SelfHarmBanner';
import moment from 'moment';

const DashboardResult = ({ assessment }: { assessment: IAssessment }) => {
  const clientProfile = useAuthStore((s) => s.clientProfile);

  const completedAt = assessment?.submittedAt;

  // 📝 Load questions based on profile
  const questions = getQuestionsByType(assessment.type);

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);

  const [result, setResult] = useState<TScoreResult>();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && clientProfile && assessment?.answers) {
      // Compute Score
      // const tScore = estimateTscore(totalRating, clientProfile!, assessment.answers[0] as any);
      const tScore = estimateTscore(
        assessment.answers[0] as any,
        assessment.type
      );

      setResult(tScore);
    }
  }, [mounted, clientProfile]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!result) {
    return (
      <Alert variant="destructive" className="mt-4">
        <RefreshCw className="h-4 w-4" />
        <AlertTitle>Unable to load results</AlertTitle>
        <AlertDescription>
          Please try refreshing the page or check back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <div className="space-y-6">
        <div className="flex md:inline-flex items-center gap-2 text-xs text-foreground bg-primary/10 border border-primary/20 p-2 rounded-md">
          <CalendarCheck className="h-4 w-4 text-primary" />
          <span>
            Completed on {moment(completedAt).format('MMMM Do, YYYY HH:mm A')}
          </span>
        </div>

        {/* Self-harm banner (if flagged) */}
        {result.hasSelfHarmFlag && <SelfHarmBanner />}

        <div className="grid gap-6 lg-grid-cols-1 xl:grid-cols-2">
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
  );
};

export default DashboardResult;
