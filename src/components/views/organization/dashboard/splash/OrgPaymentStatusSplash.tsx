'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, CircleEllipsis, Sparkles, SquareArrowRight, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import { axios } from '@/lib/axios';
import { EPurchaseStatus } from '@/types/payment';
import useAuthStore from '@/store/AuthState';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

interface OrgPaymentStatusSplashProps {
  purchaseId?: string
}

const OrgPaymentStatusSplash: React.FC<OrgPaymentStatusSplashProps> = ({ purchaseId }) => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<EPurchaseStatus | null>(null);
  const [progress, setProgress] = useState(0);
  const redirectDelay = 10000;

  useEffect(() => {
    const fetchPurchase = async () => {
      const { data: purchase } = await axios.get(`/purchases/${purchaseId}`);
      setStatus(purchase.status);
      setLoading(false)
    };

    if (purchaseId) {
      fetchPurchase();
    } else {
      router.replace('/organizations')
    }
  }, [purchaseId]);

  useEffect(() => {
    if (status !== EPurchaseStatus.Paid) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / redirectDelay) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= redirectDelay) {
        clearInterval(interval);
        router.replace('/login');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [status, router]);

  // Switch config
  let title, description, subText, color, icon, showProgress, redirectPath, bg;

  switch (status) {
    case EPurchaseStatus.Paid:
      bg = 'bg-primary';
      title = 'Payment Successful!';
      description =
        'Thank you for your purchase. The ADAPTS assessment plan for your organization is now active. Kindly log in to manage your organization’s account and retrieve your assessment codes.';
      subText = 'Redirecting you to login...';
      color = 'text-primary';
      icon = <CheckCircle className="w-12 h-12 text-primary-foreground" />;
      showProgress = true;
      redirectPath = '/login';
      break;

    case EPurchaseStatus.Cancelled:
      bg = 'bg-red-500';
      title = 'Payment Failed';
      description =
        'Unfortunately, your payment could not be processed. Your ADAPTS assessment remains locked.';
      subText = 'Please try again or contact support for assistance.';
      color = 'text-destructive';
      icon = <XCircle className="w-12 h-12 text-primary-foreground" />;
      showProgress = false;
      redirectPath = '/login';
      break;

    default: // Pending as default
      bg = 'bg-amber-500';
      title = 'Payment Pending';
      description =
        'Your payment is still being verified. Your ADAPTS assessment plan will unlock once the transaction is confirmed.';
      subText = 'Please wait while we complete the process...';
      color = 'text-warning';
      icon = <CircleEllipsis className="w-12 h-12 text-primary-foreground" />;
      showProgress = false;
      redirectPath = '/login';
      break;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon / Animation */}
        <div className="relative mb-8">
          <div
            className={cn(
              'w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-primary/30',
              bg
            )}
          >
            {icon}
          </div>
          {status === EPurchaseStatus.Paid && (
            <>
              <Sparkles
                className="absolute top-0 right-1/4 w-6 h-6 text-accent animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <Sparkles
                className="absolute bottom-0 left-1/4 w-5 h-5 text-primary animate-bounce"
                style={{ animationDelay: '0.5s' }}
              />
              <Sparkles
                className="absolute top-1/2 right-0 w-4 h-4 text-accent animate-bounce"
                style={{ animationDelay: '0.8s' }}
              />
            </>
          )}
        </div>

        {/* Message */}
        <h1 className={`text-3xl font-bold mb-3 ${color}`}>{title}</h1>
        <p className="text-muted-foreground mb-2">{description}</p>
        <p className="text-xs text-muted-foreground mb-8">{subText}</p>

        {/* Progress Bar (only for success) */}
        {showProgress && (
          <div className="w-full max-w-xs mx-auto space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Starting in{' '}
              {Math.ceil(
                (redirectDelay - (progress / 100) * redirectDelay) / 1000
              )}
              s
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center py-8">
        <Button
          onClick={() => router.replace(redirectPath)}
          className="w-100 mx-auto"
        >
          {status === EPurchaseStatus.Paid
            ? 'Click here if not redirected automatically'
            : 'Click here to return to home'} <SquareArrowRight />{' '}
        </Button>
        </div>
      </div>
    </div>
  );
};

export default OrgPaymentStatusSplash;
