import { Card, CardContent } from '@/components/ui/card';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';
import { IAssessment, RCADSFactor, TScoreResult } from '@/types/adapts';
import clsx from 'clsx';
import moment from 'moment';
import { getRiskConfig } from './HistoryClient';

function LatestSummaryCard({ result, assessment }: { result: TScoreResult, assessment: IAssessment }) {
  const config = getRiskConfig(result.riskBand);
  const elevated = result.elevatedSubscales ?? [];
  const submittedAt = assessment.submittedAt
    ? moment(assessment.submittedAt).format('MMMM D, YYYY [at] h:mm A')
    : '—';

  return (
    <Card className={clsx('border p-5 mb-8', config.statCard)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Most Recent Assessment
            </p>
            <p className="text-xs text-muted-foreground">{submittedAt}</p>
          </div>
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full',
              config.badgeClass
            )}
          >
            {config.icon}
            {config.label}
          </span>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          {result.description ?? ''}
        </p>

        {elevated.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs text-muted-foreground mr-1">
              Areas of concern:
            </span>
            {elevated.map((f) => (
              <span
                key={f}
                className="text-xs px-2 py-0.5 rounded-full bg-background border border-border text-foreground/70"
              >
                {FACTOR_META[f as RCADSFactor]?.label ?? f}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LatestSummaryCard;
