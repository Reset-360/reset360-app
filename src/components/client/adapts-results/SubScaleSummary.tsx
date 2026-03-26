import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { FactorResult, RCADSFactor } from '@/types/adapts';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import SeverityPill from './SeverityPill';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';
import SubscaleBar from './SubscaleBar';

type SubscaleSummaryProps = {
  subscales: Record<RCADSFactor, FactorResult>;
  elevatedSubscales: RCADSFactor[];
  showColumn?: boolean;
};

const FACTOR_ORDER: RCADSFactor[] = ['MDD', 'GAD', 'PD', 'SoA', 'SeA', 'OCD'];

export const SubscaleSummary: React.FC<SubscaleSummaryProps> = ({
  subscales,
  elevatedSubscales,
  showColumn = false,
}) => {
  // All subscales sorted by percentOfMax descending for overview
  const sortedSubscales = useMemo(
    () =>
      [...FACTOR_ORDER].sort(
        (a, b) => subscales[b].percentOfMax - subscales[a].percentOfMax
      ),
    [subscales]
  );

  return (
    <Card className="">
      <CardHeader className="pb-3">
        <p className="text-sm font-semibold text-foreground">
          Subscale Overview
        </p>
        <p className="text-xs text-muted-foreground">
          Each area reflects a cluster of emotional patterns from your
          responses.
        </p>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-2 gap-3',
            showColumn && 'grid-cols-1 sm:grid-cols-1'
          )}
        >
          {sortedSubscales.map((f) => {
            const sub = subscales[f];
            const isElevated = elevatedSubscales.includes(f);
            return (
              <div
                key={f}
                className={cn(
                  'rounded-xl border p-3.5 transition-colors',
                  isElevated
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-border bg-muted/20'
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {FACTOR_META[f].label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                      {FACTOR_META[f].description}
                    </p>
                  </div>
                  <SeverityPill percentOfMax={sub.percentOfMax} />
                </div>
                <SubscaleBar
                  percentOfMax={sub.percentOfMax}
                  isElevated={isElevated}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscaleSummary;
