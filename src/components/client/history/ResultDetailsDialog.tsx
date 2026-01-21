'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  defaultRiskProfile,
  IAssessment,
  TotalSubScaleScore,
  tScoreResult,
} from '@/types/adapts';
import React, { useEffect, useState } from 'react';
import RiskCard from '../adapts-results/RiskCard';
import { TScoreGauge } from '../adapts-results/TScoreGauge';
import MentalHealthRadialProfile from '../adapts-results/MentalHealthRadialProfile';
import { SubscaleSummary } from '../adapts-results/SubScaleSummary';
import useAuthStore from '@/store/AuthState';
import { estimateTscore, getQuestionsByType } from '@/utils/adaptsHelper';

interface ResultDetailsDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  assessment: IAssessment;
}

const ResultDetailsDialog: React.FC<ResultDetailsDialogProps> = ({
  open,
  onOpenChange,
  assessment,
}) => {
  const clientProfile = useAuthStore((s) => s.clientProfile);

  const completedAt = assessment?.submittedAt;
  const totalRating = assessment?.totalRating || 0;
  const subScaleScore = assessment?.subScales as TotalSubScaleScore;

  // 📝 Load questions based on profile
  const questions = getQuestionsByType(assessment.type);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-card w-[800px] max-w-none'>
        <DialogHeader>
          <DialogTitle>Result Details</DialogTitle>
          <DialogDescription>Assessment result details</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 max-h-[70vh] overflow-y-auto">
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

              <SubscaleSummary
                totalSubScaleScore={subScaleScore}
                questions={questions}
              />
            </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDetailsDialog;
