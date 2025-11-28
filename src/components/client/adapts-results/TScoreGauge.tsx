import { Card } from '@/components/ui/card';
import { getRiskTextColor } from '@/utils/adaptsResultHelper';
import RiskIcon from './RiskIcon';

interface TScoreGaugeProps {
  score: number;
  riskLevel: string;
  tScoreCategory: string;
}

const ticks = [
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 65, label: '65' },
  { value: 70, label: '70' },
  { value: 80, label: '80+' },
];

export function TScoreGauge({
  score,
  riskLevel,
  tScoreCategory,
}: TScoreGaugeProps) {
  const position = score > 98 ? 98 : score;

  return (
    <Card className="p-6 w-full h-full">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <RiskIcon riskLevel={riskLevel} />
            <h3 className="text-lg font-semibold">Your T-Score</h3>
          </div>
          <div className="md:w-[70%]">
            <p className="text-xs text-muted-foreground">
              T scores show how your results compare to a reference group. They
              help us understand whether your scores are typical, elevated, or
              high.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 text-center">
          <p className={`text-6xl font-bold ${getRiskTextColor(riskLevel)}`}>
            {score}
          </p>
          <div className="text-sm font-bold text-gray-700">
            {tScoreCategory}
          </div>
        </div>
      </div>

      {/* Gauge + ticks live in the same relative container so they share the x-axis */}
      <div className="h-13">
        <div className="relative">
          {/* Gauge bar */}
          <div
            className="h-8 rounded-full overflow-hidden z-2"
            style={{
              background: `linear-gradient(
                to right,
                #10b981 0%,   /* emerald-500 */
                #10b981 40%,  
                #f59e0b 60%,  /* amber-500 */
                #ef4444 80%,  /* red-500 */
                #ef4444 100%
              )`,
            }}
          />

          {/* Score indicator */}
          <div
            className="absolute top-0 bottom-4 w-[2px] bg-foreground shadow-lg transition-all duration-500"
            style={{ left: `${position}%` }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded shadow-md border border-border text-xs font-semibold whitespace-nowrap">
              {score}
            </div>
          </div>

          {/* Tick marks + labels */}
          <div className="relative">
            {ticks.map((tick) => (
              <div
                key={tick.label}
                className="absolute left-0 w-[1px] h-[10px] bg-foreground shadow-lg transition-all duration-500 text-xs text-muted-foreground"
                style={{ left: `${tick.value}%` }}
              >
                <div className="h-2 w-px bg-muted-foreground mx-auto mb-1" />
                <span>{tick.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
