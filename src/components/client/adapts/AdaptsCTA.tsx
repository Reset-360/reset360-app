import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ClipboardList, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const AdaptsCTA = () => {
  const router = useRouter();

  const onTakeAssessment = () => {
    router.push('/adapts')
  }

  return (
    <Card className="backdrop-blur-sm bg-gradient-to-br from-card/90 to-primary/5 border-primary/20 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2 flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-primary" />
              Take Your ADAPTS Assessment
            </CardTitle>
            <CardDescription className="text-base">
              Anxiety Depression Assessment for Parents Teachers and Students
            </CardDescription>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          ADAPTS is a 50-item self-report questionnaire that measures the presence and frequency of depression and anxiety symptoms in children, youth, parents and teachers.
        </p>
         <p className="text-muted-foreground">
          Complete this comprehensive assessment to unlock customized recommendations.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            15-20 minutes
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            Science-backed
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Confidential
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          onClick={onTakeAssessment}
          className="w-full bg-violet-500 hover:bg-primary group"
        >
          Start Assessment
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};
