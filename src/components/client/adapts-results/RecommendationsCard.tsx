import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type RecommendationsCardProps = {
  recommendations?: string[];
};

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({
  recommendations,
}) => {
  const onBookSession = () => {};

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Recommended next steps
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          These suggestions are based on your overall pattern and are meant to
          support your emotional health and safety.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations && recommendations.length > 0 && (
          <ul className="space-y-2 text-sm">
            {recommendations.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {onBookSession && (
          <div className="pt-2">
            <Button
              size="sm"
              className="flex items-center gap-1"
              onClick={onBookSession}
            >
              Talk to a coach about these results
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
