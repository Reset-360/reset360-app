import LoadingSpinner from '@/components/layout/LoadingSpinner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { redeemSeatCode } from '@/services/adaptsService';
import useAuthStore from '@/store/AuthState';
import useEntitlementState from '@/store/EntitlementState';
import useQuizStore from '@/store/QuizState';
import { EAssessmentType } from '@/types/adapts';
import { EEntitlementStatus } from '@/types/entitlement';
import { renderAssessmentType, getAssessmentType } from '@/utils/adaptsHelper';

import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Sparkles,
  Ticket,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const AdaptsCTA = ({ latestAssessment }: { latestAssessment: any }) => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);
  const clientProfile = useAuthStore((s) => s.clientProfile);
  const hasPrevAttempts = useQuizStore((s) => s.hasPrevAttempts);

  // Entitlement state
  const currentEntitlement = useEntitlementState((s) => s.currentEntitlement);
  const addEntitlement = useEntitlementState((s) => s.addEntitlement);
  const setCurrentEntitlement = useEntitlementState(
    (s) => s.setCurrentEntitlement
  );
  const hasAvailableRedeemedCode = useEntitlementState(
    (s) => s.hasAvailableRedeemedCode
  );

  const setHasAvailableRedeemedCode = useEntitlementState(
    (s) => s.setHasAvailableRedeemedCode
  );

  const [seatCode, setSeatCode] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (user && clientProfile) {
      setLoading(false);
    }
  }, [user, clientProfile]);

  const handleRedeemCode = async () => {
    if (!user?._id || !clientProfile?._id) return;

    if (!seatCode.trim()) {
      setError('Please enter a seat code');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const type = getAssessmentType(user, clientProfile);

      const redeemData = {
        userId: user._id,
        code: seatCode,
        type,
      };

      const { entitlement } = await redeemSeatCode(redeemData);

      if (entitlement) {
        setHasAvailableRedeemedCode(true);

        setCurrentEntitlement(entitlement);
        addEntitlement(entitlement);

        // router.push('/client/adapts/assessment');
      }
    } catch (error: any) {
      console.log(error);

      const msg = error?.code || 'Invalid seat code. Please try again.';
      setError(msg);
    } finally {
      setIsValidating(false);
    }
  };

  const onTakeAssessment = () => {
    if (
      currentEntitlement?.status == EEntitlementStatus.AVAILABLE ||
      currentEntitlement?.status == EEntitlementStatus.IN_USE
    ) {
      router.push('/client/adapts/assessment');
    } else {
      router.push('/client/adapts/payment');
    }
  };

  const hasCode = hasAvailableRedeemedCode;
  const assessmentType =
    currentEntitlement?.type ??
    (user && clientProfile
      ? getAssessmentType(user, clientProfile)
      : undefined);

  console.log('type', assessmentType);

  //  Assigned assessment callout
  const assessmentTypeInfo = (
    <div className="rounded-md bg-primary/[0.04] border border-primary/10 p-4">
      <p className="text-xs text-muted-foreground mb-1">
        Based on your profile, your assigned assessment is:
      </p>
      <p className="text-base font-bold text-primary">
        {renderAssessmentType(assessmentType as EAssessmentType)}
      </p>
    </div>
  );

  if (isLoading) {
    return (
      <Card className="flex items-center justify-center xl:w-1/2 h-80">
        <LoadingSpinner />
      </Card>
    );
  }

  return (
    <Card className="mb-6 xl:w-1/2">
      <CardHeader className="py-0 mb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg lg:text-2xl flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-primary" />
              Take Your ADAPTS Assessment
            </CardTitle>
            {!hasCode && (
              <CardDescription className="text-xs mt-2">
                Anxiety Depression Assessment for Parents Teachers and Students
              </CardDescription>
            )}
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className={hasCode ? 'mb-4' : 'space-y-4'}>
        {hasCode ? (
          <>
            <div className="flex flex-col justify-center items-center py-4">
              <div className="text-md p-0 font-semibold text-accent flex gap-2 items-center">
                <CheckCircle className="w-5 h-5 text-accent" />
                Seat Code Accepted
              </div>
              <p className="text-muted-foreground text-xs mb-3 ">
                Your access has been successfully activated.
              </p>
            </div>

            {assessmentTypeInfo}
          </>
        ) : !latestAssessment ? (
          <>
            <p className="text-muted-foreground text-sm">
              ADAPTS is a 50‑item questionnaire that helps explore experiences
              with anxiety and depression. Completing it offers guidance to
              support emotional well‑being.
            </p>

            {assessmentTypeInfo}

            <div className="flex flex-wrap gap-2 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                5-15 minutes
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
                Science-backed
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Confidential
              </span>
            </div>
          </>
        ) : (
          <div className="mb-2">{assessmentTypeInfo}</div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 ">
        {!hasCode && (
          <div className="w-full space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Ticket className="w-6 h-6 text-primary" />
              Have a seat code?
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your code"
                value={seatCode}
                onChange={(e) => {
                  setSeatCode(e.target.value);
                  setError('');
                }}
                className="flex-1"
              />
              <Button
                variant="accent"
                onClick={handleRedeemCode}
                disabled={isValidating}
              >
                {isValidating ? 'Validating...' : 'Redeem'}
              </Button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}

            <div className="relative w-full mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dashed" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="text-muted-foreground px-2 bg-b">Or</span>
              </div>
            </div>
          </div>
        )}

        <Button
          size="lg"
          onClick={onTakeAssessment}
          className="w-full bg-violet-500 hover:bg-primary group"
        >
          Start Assessment
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        {!hasPrevAttempts ? (
          <div className="text-xs text-gray-700">
            Once the <span className="font-bold">ADAPTS screening</span> has been
            started, the {' '}
            <span className="font-bold">assessment type</span> and {' '}
            <span className="font-bold">demographic information</span>{' '}
            associated with your profile can no longer be modified. If you
            require assistance, please contact support.
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
};
