'use client';

import React, { useEffect, useState } from 'react';
import useAuthStore from '@/store/AuthState';

import { estimateTscore, getQuestionsByType } from '@/utils/adaptsHelper';
import { defaultRiskProfile, IAssessment, Scores, TotalSubScaleScore, tScoreResult } from '@/types/adapts';

import LoadingSpinner from '@/components/layout/LoadingSpinner';

import { TScoreGauge } from '@/components/client/adapts-results/TScoreGauge';
import RiskCard from '@/components/client/adapts-results/RiskCard';
import { SubscaleSummary } from '@/components/client/adapts-results/SubScaleSummary';
import { RecommendationsList } from '@/components/client/adapts-results/RecommendationsList';
import MentalHealthRadialProfile from '@/components/client/adapts-results/MentalHealthRadialProfile';

const DashboardResult = ({ assessment } : { assessment : IAssessment }) => {
  const clientProfile = useAuthStore((s) => s.clientProfile);
  
  const hasCompleted = assessment?.submittedAt ? true : false;
  const completedAt = assessment?.submittedAt
  const totalRating = assessment?.totalRating || 0
  const totalSubScaleScore = assessment?.totalSubScalesScore as Scores
  const subScaleScore = assessment?.subScales as TotalSubScaleScore

  // 📝 Load questions based on profile
  const questions = getQuestionsByType(assessment.type)

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);

  const [estimatedTScore, setEstimatedTScore] =
    useState<tScoreResult>(defaultRiskProfile);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && clientProfile) {
      const tScore = estimateTscore(totalRating, clientProfile!);
      setEstimatedTScore(tScore);
    }
  }, [mounted, clientProfile]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6 items-stretch justify-stretch">
            <div className="flex-1">
              <RiskCard
                riskLevel={estimatedTScore.riskLevel}
                description={estimatedTScore.description}
                completedAt={completedAt}
              />
            </div>
            <div className="flex-1">
              <TScoreGauge
                score={estimatedTScore.adjustedTScore}
                riskLevel={estimatedTScore.riskLevel}
                tScoreCategory={estimatedTScore.tScoreCategory}
              />
            </div>
          </div>

          <MentalHealthRadialProfile
            totalSubScaleScore={subScaleScore}
            questions={questions}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SubscaleSummary
            totalSubScaleScore={subScaleScore}
            questions={questions}
          />

          <RecommendationsList
            recommendations={estimatedTScore.recommendations}
            riskLevel={estimatedTScore.riskLevel}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardResult;
