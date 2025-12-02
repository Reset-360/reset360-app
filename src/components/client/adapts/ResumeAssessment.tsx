'use client'

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  Home,
  Play,
  RotateCcw,
} from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import moment from 'moment';
import { useRouter } from 'next/navigation';

type ResumeAssessmentProps = {
  onResume: () => void;
  onRestart: () => void;
  progress: number;
  questionsCompleted: number;
  totalQuestions: number;
  lastAttemptDate: Date;
};

const ResumeAssessment: React.FC<ResumeAssessmentProps> = ({
  onResume,
  onRestart,
  progress,
  questionsCompleted,
  totalQuestions,
  lastAttemptDate,
}) => {
  const router = useRouter()

  const onBackToHome = () => {
    router.replace('/client/dashboard')
  }

  return (
      <Card className="w-full max-w-3xl p-8 shadow-[var(--shadow-lavender)] border-2 border-primary/20 backdrop-blur-sm bg-card/95">
        {/* Alert Icon & Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-full bg-primary/10 text-primary animate-pulse">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-1">
              Incomplete Assessment Detected
            </h2>
            <p className="text-muted-foreground">
              You have an unfinished attempt that can be resumed
            </p>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="bg-lavender-light rounded-lg p-6 mb-6 border border-primary/10">
          <h3 className="font-semibold text-lg text-foreground mb-4">
            ADAPTS Screening
          </h3>

          {/* Progress Section */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-primary/10">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Questions</p>
              <p className="font-semibold text-foreground">
                {questionsCompleted} of {totalQuestions}
              </p>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground mb-1">Last Attempt</p>
              <p className="font-semibold text-foreground">
                {moment(lastAttemptDate).format('MMM DD YYYY hh:mm A')}
              </p>
            </div>
          </div>
        </div>

        {/* Information Message */}
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground leading-relaxed">
            <strong className="text-accent">Note:</strong> Restarting will
            discard your current progress and begin a fresh attempt. All
            previous answers will be lost. If you wish to continue from where
            you left off, please select{' '}
            <strong>Resume Assessment</strong>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onResume}
            variant={'default'}
            className="flex-1 h-12"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume Assessment
          </Button>

          <Button
            onClick={onRestart}
            variant="outline"
            className="flex-1 sm:flex-initial h-12 text-base  border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start Over
          </Button>
        </div>

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
      </Card>
  );
};

export default ResumeAssessment;
