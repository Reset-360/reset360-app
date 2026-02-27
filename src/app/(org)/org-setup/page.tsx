'use client';

import { useRoleRedirect } from '@/hooks/useRoleRedirect';
import useAuthStore from '@/store/AuthState';
import { useOrgStore } from '@/store/OrgState';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrgSeatCodeGenerationSplash from '../../../components/organization/splash/OrgSeatCodeGenerationSplash';
import { generateSeatCodesBatch } from '@/services/organizationService';
import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { useLogout } from '@/hooks/useLogout';
import { getUser } from '@/services/authService';
import OrgSeatInactiveTabSplash from '@/components/organization/splash/OrgSeatInactiveTabSplash';

const REDIRECT_SECONDS = 10;

const OrgSetupPage = () => {
  const router = useRouter();
  const { redirectByRole } = useRoleRedirect();
  const logout = useLogout();

  const user = useAuthStore((s) => s.user);
  const hasUserHydrated = useAuthStore((s) => s.hasHydrated);
  const { seatBatch, setSeatBatch, organization, hasHydrated } = useOrgStore(
    (state) => state
  );

  const [loading, setLoading] = useState(true);
  const [seatsIssued, setSeatsIssued] = useState(0);
  const [isInactiveTab, setIsInactiveTab] = useState(false);
  const [allowGeneration, setAllowGeneration] = useState(false);

  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (hasHydrated && allowGeneration) {
      if (!organization) {
        router.replace('/');
      } else {
        setLoading(false);

        if (seatBatch && seatBatch.status === 'DONE') {
          setCountdown(5);
          setSeatsIssued(seatBatch.seatsIssued);
          setDone(true);
        }
      }
    }
  }, [hasHydrated, organization, seatBatch, allowGeneration]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const auth = await getUser(); // e.g. API call to validate token/session
        if (!auth) {
          logout('/');
        } else {
          setAllowGeneration(true);
        }
      } catch (err) {
        // If error, also clear user
        logout('/');
      }
    };

    // Run check only if hydration is complete
    if (hasUserHydrated) {
      if (!user) {
        // Explicitly handle case: hydrated but no user
        router.replace('/');
      } else {
        checkUser();
      }
    }
  }, [user, hasUserHydrated]);

  useEffect(() => {
    if (!hasHydrated || !seatBatch || !allowGeneration) return;

    const cancelledRef = { current: false };
    const channel = new BroadcastChannel('org-setup');

    // Announce this tab is active
    channel.postMessage({ type: 'ACTIVE' });

    channel.onmessage = (event) => {
      if (event.data.type === 'ACTIVE') {
        cancelledRef.current = true;
        setIsInactiveTab(true);
      }
    };

    const run = async () => {
      let currentBatch = seatBatch;
      while (
        !cancelledRef.current &&
        currentBatch.seatsIssued < currentBatch.totalSeats
      ) {
        const remainingSeats =
          currentBatch.totalSeats - currentBatch.seatsIssued;
        const capQty = remainingSeats > 50 ? 50 : remainingSeats;

        // ⏱ Add delay before each request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check again before firing request
        if (cancelledRef.current) break;

        const res = await generateSeatCodesBatch({
          batchId: currentBatch._id,
          quantity: capQty,
        });

        // Add second guard rail to prevent successive requests
        if (cancelledRef.current) break;

        setSeatBatch(res.batch);
        setSeatsIssued(res.seatsIssued);
        currentBatch = res.batch;

        if (res.batch.status === 'DONE') break;
      }

      if (!cancelledRef.current) {
        setDone(true);
      }
    };

    run();

    return () => {
      cancelledRef.current = true;
      channel.close();
    };
  }, [hasHydrated, seatBatch, allowGeneration]);

  useEffect(() => {
    if (!done) return;
    if (countdown <= 0) {
      // Replace with your actual dashboard route
      redirectByRole(user?.role);
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [done, countdown]);

  if (loading || !hasHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (isInactiveTab) {
    return <OrgSeatInactiveTabSplash />;
  }

  if (!seatBatch) return null;

  return (
    <OrgSeatCodeGenerationSplash
      seatsIssued={seatsIssued ?? 0}
      totalSeats={seatBatch?.totalSeats ?? 0}
      status={seatBatch?.status}
      countdown={countdown}
    />
  );
};

export default OrgSetupPage;
