import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import RiskIcon from './RiskIcon';
import { ERiskBand, TScoreResult } from '@/types/adapts';
import { cn } from '@/lib/utils';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';
import SubscaleBar from './SubscaleBar';
import SeverityPill from './SeverityPill';
import ModerateElevatedAreas from './ModerateElevatedAreas';
import { RISK_CONFIG } from '@/constants/adapts/RiskConfig';

type RiskCardProps = {
  result: TScoreResult;
};

const RiskCard: React.FC<RiskCardProps> = ({ result }) => {
  const riskBand = result.riskBand as ERiskBand;
  const config = RISK_CONFIG[result.riskBand as ERiskBand];

  return (
    <Card className={cn('border', config.cardClass)}>
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <RiskIcon
              riskLevel={result.riskLevel}
              className={cn('w-5 h-5', config.iconClass)}
            />
            <span className="text-base font-semibold text-foreground">
              Overall Emotional Risk Level
            </span>
          </div>
          <Badge
            variant="outline"
            className={cn('text-xs font-semibold', config.badgeClass)}
          >
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {result.description}
        </p>

        {/* Elevated areas — rendered differently per risk band */}
        {riskBand === 'moderate' && result.elevatedSubscales.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-3">
              Areas showing elevation
            </p>
            <ModerateElevatedAreas result={result} />
          </div>
        )}

        {riskBand === 'high' &&
          !result.hasSelfHarmFlag &&
          result.elevatedSubscales.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-3">
                Areas of highest concern
              </p>
              <div className="space-y-2">
                {result.elevatedSubscales.slice(0, 2).map((f) => (
                  <div
                    key={f}
                    className="rounded-xl border border-rose-200 bg-rose-50/80 p-3.5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-rose-900">
                          {FACTOR_META[f].label}
                        </p>
                        <p className="text-xs text-rose-700 mt-0.5">
                          {FACTOR_META[f].description}
                        </p>
                      </div>
                      <SeverityPill
                        percentOfMax={result.subscales[f].percentOfMax}
                      />
                    </div>
                    <SubscaleBar
                      percentOfMax={result.subscales[f].percentOfMax}
                      isElevated={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        {riskBand === 'low' && (
          <div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-2.5 mt-5">
            <p className="text-xs text-emerald-800">
              No areas showed a significant elevation in this assessment. 
              Keep checking in with yourself regularly. It’s a way of caring for your wellbeing and staying attuned to how you’re feeling over time.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskCard;
