import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  Heart,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ERiskBand } from '@/types/adapts';

interface RecommendationsListProps {
  recommendations: string[];
  riskBand: ERiskBand;
}

export function RecommendationsList({
  recommendations,
  riskBand,
}: RecommendationsListProps) {
  const router = useRouter();

  const onBookSession = () => {
    router.replace('/client/book');
  };

  const onTryPractice = () => {
    router.replace('/client/calm-room');
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <p className="text-sm font-semibold text-foreground">
          Personalized Recommendations
        </p>
        <p className="text-xs text-muted-foreground">
          Next steps to support your emotional wellbeing
        </p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between gap-5">
        <ol className="space-y-3">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span
                className={cn(
                  'shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5',
                  riskBand === 'high'
                    ? 'bg-rose-100 text-rose-700'
                    : riskBand === 'moderate'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                )}
              >
                {i + 1}
              </span>
              {/* Render **bold** markdown in recommendations */}
              <span
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: rec.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-foreground font-semibold">$1</strong>'
                  ),
                }}
              />
            </li>
          ))}
        </ol>

        <div className="space-y-2.5 pt-5 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {onBookSession && (
              <Button
                onClick={onBookSession}
                className="flex-1"
                variant={riskBand === 'high' ? 'destructive' : 'default'}
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                Book a Session
              </Button>
            )}

            <Button
              onClick={onTryPractice}
              className="flex-1"
              variant={'accent'}
            >
              <Heart className="w-4 h-4 mr-2" />
              Step Into The Calm Room
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
            This assessment is not a clinical diagnosis. Please consult a
            qualified mental health professional for a full evaluation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
