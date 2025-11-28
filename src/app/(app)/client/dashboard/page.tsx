'use client';

import useAuthStore from '@/store/AuthState';
import { formatName } from '@/utils/formatHelper';
import { AdaptsCTA } from '@/components/client/adapts/AdaptsCTA';
import useQuizStore from '@/store/QuizState';
import DashboardResult from '@/components/client/adapts-results/DashboardResult';

export default function ClientDashboardPage() {
  const profile = useAuthStore((state) => state.clientProfile);
  const hasCompleted = useQuizStore((s) => s.hasCompleted);

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
