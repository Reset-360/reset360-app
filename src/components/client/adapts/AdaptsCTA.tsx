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
import { EEntitlementStatus } from '@/types/entitlement';
import clsx from 'clsx';
import { ArrowRight, ClipboardList, Sparkles, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AdaptsCTA = () => {
  const router = useRouter();

  const user = useAuthStore((s) => s.user);

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

  const handleRedeemCode = async () => {
    if (!user?._id) return;

    if (!seatCode.trim()) {
      setError('Please enter a seat code');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      const redeemData = {
        userId: user._id,
        code: seatCode,
      };

      const { entitlement } = await redeemSeatCode(redeemData);

      if (entitlement) {
        setHasAvailableRedeemedCode(true);

        setCurrentEntitlement(entitlement);
        addEntitlement(entitlement);

        router.push('/adapts');
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
      router.push('/adapts');
    } else {
      router.push('/adapts/payment');
    }
  };

  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-card/90 to-primary/5 border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-primary" />
              Take Your ADAPTS Assessment
            </CardTitle>
            <CardDescription className="text-base">
              Anxiety Depression Assessment for Parents Teachers and Students
            </CardDescription>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          ADAPTS is a 50-item self-report questionnaire that measures the
          presence and frequency of depression and anxiety symptoms in children,
          youth, parents and teachers.
        </p>
        <p className="text-muted-foreground">
          Complete this comprehensive assessment to unlock customized
          recommendations.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            15-20 minutes
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Science-backed
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Confidential
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        {/* Seat Code Redemption */}
        <div
          className={clsx(
            hasAvailableRedeemedCode && 'hidden',
            'w-full space-y-2'
          )}
        >
          <div className={clsx('w-full space-y-2')}>
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
          </div>

          {/* Divider */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="text-muted-foreground px-2 bg-b">Or</span>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={onTakeAssessment}
          className="w-full bg-violet-500 hover:bg-primary group"
        >
          Start Assessment
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
