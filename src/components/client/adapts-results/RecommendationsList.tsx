import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Calendar, ArrowRight } from 'lucide-react';
import {
  getRiskAccentClasses,
  getRiskTextColor,
} from '@/utils/adaptsResultHelper';
import useQuizStore from '@/store/QuizState';
import { useRouter } from 'next/navigation';

interface RecommendationsListProps {
  recommendations: string[];
  riskLevel: string;
}

export function RecommendationsList({
  recommendations,
  riskLevel,
}: RecommendationsListProps) {
  const router = useRouter();

  const riskTextColor = getRiskTextColor(riskLevel);
  const riskAccent = getRiskAccentClasses(riskLevel);

  const resetQuiz = useQuizStore((s) => s.resetQuiz)

  const handleRetake = () => {
    resetQuiz()
    router.replace('/adapts')
  }

  return (
    <Card className={`p-6 border-2 ${riskAccent}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${riskTextColor}`}>
          <Lightbulb className={`w-6 h-6`} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">
            Personalized Recommendations
          </h3>
          <p className="text-sm text-muted-foreground">
            Next steps to support your emotional wellbeing
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => {
          // Parse bold text in recommendations (text wrapped in **)
          const parts = recommendation.split(/(\*\*.*?\*\*)/g);

          return (
            <div key={index} className="flex gap-3 group">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full ${riskTextColor} flex items-center justify-center font-semibold text-sm`}
              >
                {index + 1}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm leading-relaxed">
                  {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <strong
                          key={i}
                          className="font-semibold text-foreground"
                        >
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-3">
        <Button className="flex-1 gap-2">
          <Calendar className="w-4 h-4" />
          Book a Session
        </Button>
        {/* <Button variant="outline" className="flex-1 gap-2" onClick={handleRetake}>
          Retake ADAPTS
          <ArrowRight className="w-4 h-4" />
        </Button> */}
      </div>
    </Card>
  );
}
