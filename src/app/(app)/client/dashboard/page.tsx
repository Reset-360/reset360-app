'use client';

import useAuthStore from '@/store/AuthState';
import { formatName } from '@/utils/formatHelper';
import { AdaptsCTA } from '@/components/client/adapts/AdaptsCTA';
import useQuizStore from '@/store/QuizState';
import DashboardResult from '@/components/client/adapts-results/DashboardResult';
import { useEffect, useState } from 'react';
import { getAssessmentByUserId } from '@/services/adaptsService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { first } from 'lodash';
import { AssessmentData } from '@/types/adapts';
import { dbDateFormat } from '@/constants/common';
import moment from 'moment';

/**
 * 1. Fetch user assessments
 * 2. if theres a completed assessment result, mark state as hasCompleted
 * 3. Show the latest assessment result
 *
 * @returns
 */
export default function ClientDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((state) => state.clientProfile);
  
  const hasCompleted = useQuizStore((s) => s.hasCompleted);

  // 🔧 Quiz store: setters
  const setHasStarted = useQuizStore((s) => s.setHasStarted);
  const setHasCompleted = useQuizStore((s) => s.setHasCompleted);
  const setStartedAt = useQuizStore((s) => s.setStartedAt);
  const setCompletedAt = useQuizStore((s) => s.setCompletedAt);
  const setCurrentQuestion = useQuizStore((s) => s.setCurrentQuestion);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const setTotalScore = useQuizStore((s) => s.setTotalScore);
  const setTotalRating = useQuizStore((s) => s.setTotalRating);
  const setTotalSubScaleScore = useQuizStore((s) => s.setTotalSubScaleScore);
  const resetQuiz = useQuizStore((s) => s.resetQuiz);
  
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!user?._id) return;

      try {
        const data = await getAssessmentByUserId(user._id);

        if (data.length ) {
          const result = first(data) as AssessmentData;
          console.log(result)

          setHasCompleted(true)
          setCompletedAt(moment(result.submittedAt).format(dbDateFormat));
          setStartedAt(moment(result.startedAt).format(dbDateFormat));
          setTotalRating(result.totalRating)
        }
      } catch (error) {
        console.error('Failed to fetch assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [user?._id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-10 px-5">
      <h2 className="text-3xl font-main font-bold text-gray-800 mb-4">
        Hello{' '}
        <span className="text-primary capitalize">
          {formatName(profile?.firstName ?? '')},
        </span>
      </h2>
      <p className="text-gray-600 mb-8">
        Here’s a quick overview of your recent activity and progress.
      </p>

      {hasCompleted ? <DashboardResult /> : <AdaptsCTA />}
    </div>
  );
}
