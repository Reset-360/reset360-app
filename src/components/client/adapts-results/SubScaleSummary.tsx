import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity } from 'lucide-react';
import { normalizeTo100 } from '@/utils/adaptsResultHelper';
import {
  getFactorItemCounts,
  getMaxScoresPerFactor
} from '@/utils/adaptsHelper';
import { Factor, Question } from '@/types/adapts';
import { FACTOR_META } from '@/constants/adapts/FactorMeta';

type SubscaleSummaryProps = {
  totalSubScaleScore: Record<Factor, number>;
  questions: Question[];
};

export const SubscaleSummary: React.FC<SubscaleSummaryProps> = ({
  totalSubScaleScore,
  questions,
}) => {
  const factorCounts = getFactorItemCounts(questions);
  const maxFactorScore = getMaxScoresPerFactor(factorCounts);

  return (
    <Card className="bg-primary/10 border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Subscale overview
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Each subscale reflects a cluster of emotional patterns. Higher scores
          suggest stronger presence of that pattern.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-5 md:grid-cols-2">
          {(Object.keys(totalSubScaleScore) as Factor[]).map((key) => {
            const meta = FACTOR_META[key];
            const score = totalSubScaleScore[key];
            const maxScore = maxFactorScore[key];
            const miniPercent = normalizeTo100(score, maxScore);

            return (
              <div
                key={key}
                className="bg-white rounded-md border border-border/60 p-3 space-y-2"
              >
                <div className="flex items-center justify-between gap-2 md:flex-wrap">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{meta.label}</span>
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {meta.group === 'anxiety'
                        ? 'Anxiety related'
                        : 'Mood related'}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[11px] px-2 py-0.5">
                    Score: {Math.ceil(miniPercent)}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {meta.description}
                </p>
                <Progress value={miniPercent} className="h-1.5" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
