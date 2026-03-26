'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CalendarCheck, RefreshCw } from 'lucide-react';
import { IAssessment, TScoreResult } from '@/types/adapts';
import React, { useEffect, useState } from 'react';
import RiskCard from '../adapts-results/RiskCard';
import MentalHealthRadialProfile from '../adapts-results/MentalHealthRadialProfile';
import { SubscaleSummary } from '../adapts-results/SubScaleSummary';
import useAuthStore from '@/store/AuthState';
import { getQuestionsByType } from '@/utils/adaptsHelper';
import { estimateTscore } from '@/utils/adaptsScoreHelper';
import moment from 'moment';

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

  // 📝 Load questions based on profile
  const questions = getQuestionsByType(assessment.type);

  // 🟢 Track whether component mounted (hydration finished)
  const [mounted, setMounted] = useState(false);

  const [result, setResult] = useState<TScoreResult>();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && clientProfile && assessment) {
      const tScore = estimateTscore(
        assessment.answers[0] as any,
        assessment.type
      );

      setResult(tScore);
    }
  }, [mounted, clientProfile, assessment]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card w:auto lg:w-[800px] max-w-none">
        <DialogHeader>
          <DialogTitle>Result Details</DialogTitle>
          <DialogDescription>Assessment result details</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 max-h-[70vh] overflow-y-auto">
          <div className="inline-flex items-center gap-2 text-xs text-foreground bg-primary/10 border border-primary/20 p-2 rounded-md">
            <CalendarCheck className="h-4 w-4 text-primary" />
            <span>
              Completed on {moment(completedAt).format('MMMM Do, YYYY HH:mm A')}
            </span>
          </div>

          {result ? (
            <>
              <RiskCard result={result} />

              <MentalHealthRadialProfile
                totalSubScaleScore={result.subscales}
                questions={questions}
              />

              <SubscaleSummary
                subscales={result.subscales}
                elevatedSubscales={result.elevatedSubscales}
                showColumn
              />
            </>
          ) : (
            <Alert variant="destructive" className="mt-4">
              <RefreshCw className="h-4 w-4" />
              <AlertTitle>Unable to load results</AlertTitle>
              <AlertDescription>
                Please try refreshing the page or check back later.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDetailsDialog;
