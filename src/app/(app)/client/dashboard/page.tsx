'use client';

import useAuthStore from '@/store/AuthState';
import { formatName } from '@/utils/formatHelper';
import { AdaptsCTA } from '@/components/client/adapts/AdaptsCTA';
import useQuizStore from '@/store/QuizState';
import DashboardResult from '@/components/client/adapts-results/DashboardResult';
import { useEffect, useState } from 'react';
import {
  getActiveAssessmentByUserId,
  getAdaptsEntitlementByUserId,
  getAssessmentByUserId,
  getLatestAssessment,
} from '@/services/adaptsService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { first } from 'lodash';
import { IAssessment } from '@/types/adapts';
import { dbDateFormat } from '@/constants/common';
import moment from 'moment';
import useEntitlementState from '@/store/EntitlementState';
import {
  EEntitlementStatus,
  IAssessmentEntitlement,
} from '@/types/entitlement';

/**
 * 1. Fetch user assessments
 * 1.1 Check if user has entitlements, to allow the test to be taken
 * 2. if theres a completed assessment result, mark state as hasCompleted
 * 3. Show the latest assessment result
 *
 * @returns
 */
export default function ClientDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((state) => state.clientProfile);

  // 🔧 Quiz store: setters + getters
  const assessment = useQuizStore((s) => s.assessment);
  const hydrateFromAssessment = useQuizStore((s) => s.hydrateFromAssessment);

  // Entitlement store
  const setEntitlements = useEntitlementState((s) => s.setEntitlements);
  const setCurrentEntitlement = useEntitlementState(
    (s) => s.setCurrentEntitlement
  );
  const setHasAvailableRedeemedCode = useEntitlementState(
    (s) => s.setHasAvailableRedeemedCode
  );

  const [isLoading, setLoading] = useState(true);
  const [latestAssessment, setLatestAssessment] = useState<
    IAssessment | undefined
  >();

  useEffect(() => {
    const fetchEntitlement = async () => {
      if (!user?._id) return;

      try {
        const entitlements = await getAdaptsEntitlementByUserId(user._id);

        const match = entitlements.find(
          (e: IAssessmentEntitlement) =>
            (e.attemptsUsed < e.maxAttempts &&
              e.source === 'ORG_BULK_CODE' &&
              e.status === EEntitlementStatus.AVAILABLE) ||
            e.status === EEntitlementStatus.IN_USE
        );

        if (match) {
          setCurrentEntitlement(match);
          setHasAvailableRedeemedCode(true);
        }

        setEntitlements(entitlements);
      } catch (error) {
        console.error('Failed to fetch entitlement:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchActiveAssessment = async () => {
      if (!user?._id) return;

      try {
        const data = await getActiveAssessmentByUserId(user._id);

        if (data) {
          hydrateFromAssessment(data);
        }
      } catch (error) {
        console.error('Failed to fetch assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestAssessment = async () => {
      if (!user?._id) return;

      try {
        const data = await getLatestAssessment(user._id);

        if (data) {
          setLatestAssessment(data);
        }
      } catch (error) {
        console.error('Failed to fetch assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntitlement();
    fetchActiveAssessment();
    fetchLatestAssessment();
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

      {latestAssessment && (
        <>
          <DashboardResult assessment={latestAssessment} />
          <hr className="border-t border-purple-200 my-6" />
        </>
      )}

      <AdaptsCTA showDetails={latestAssessment ? false : true} />
    </div>
  );
}
