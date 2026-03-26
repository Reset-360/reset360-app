import { cn } from '@/lib/utils';

function SubscaleBar({
  percentOfMax,
  isElevated,
}: {
  percentOfMax: number;
  isElevated: boolean;
}) {
  const color =
    percentOfMax >= 75
      ? 'bg-rose-500'
      : percentOfMax >= 55
        ? 'bg-amber-600'
        : percentOfMax >= 35
          ? 'bg-yellow-400'
          : 'bg-emerald-500';

  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700',
          color,
          isElevated && 'ring-0'
        )}
        style={{ width: `${percentOfMax}%` }}
      />
    </div>
  );
}

export default SubscaleBar;
