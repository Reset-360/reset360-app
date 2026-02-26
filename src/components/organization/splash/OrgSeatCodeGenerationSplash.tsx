import * as React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, SquareArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

type Props = {
  title?: string;
  subtitle?: string;
  seatsIssued: number;
  totalSeats: number;
  status?: 'QUEUED' | 'GENERATING' | 'DONE' | 'FAILED';
  countdown: number;
};

export default function OrgSeatCodeGenerationSplash({
  title = 'Generating seat codes…',
  subtitle = 'Please keep this window open.',
  seatsIssued,
  totalSeats,
  status = 'GENERATING',
  countdown = 10,
}: Props) {
  const router = useRouter();

  const safeTotal = Math.max(1, totalSeats || 0);
  const clampedIssued = Math.min(Math.max(0, seatsIssued || 0), safeTotal);
  const percent = Math.round((clampedIssued / safeTotal) * 100);

  const isDone = status === 'DONE' || clampedIssued >= safeTotal;
  const isFailed = status === 'FAILED';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary/30" />
          <div className="h-2 w-2 rounded-full bg-primary/30" />
          <div className="h-2 w-8 rounded-full bg-primary" />
        </div>

        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
            {isDone ? 'Seat codes generated' : 'Generating seat codes'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isDone ? `All seat codes are ready. Redirecting in ${countdown}s...` : 'Please wait while we are setting up things for you...'}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-2.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground">{percent}%</span>
            </div>
            <Progress value={percent} className="h-1.5" />
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/60 px-5 py-4">
            <span className="text-sm text-muted-foreground">Generated</span>
            <span className="text-lg font-semibold tabular-nums text-foreground">
              {clampedIssued}
              <span className="text-muted-foreground font-normal">
                {' '}
                / {safeTotal}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-muted/60 px-5 py-4">
            <span className="text-sm text-muted-foreground">Status</span>
            {isDone ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                DONE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                IN PROGRESS
              </span>
            )}
          </div>

          <div className="flex items-center">
            {isDone ? (
              <Button
                variant={'default'}
                className="w-100 mx-auto"
                onClick={() => router.replace('/org/dashboard')}
              >
                Go to Dashboard <SquareArrowRight />{' '}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
