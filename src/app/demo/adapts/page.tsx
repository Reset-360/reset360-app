'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionSlide } from '@/components/client/adapts/QuestionSlide';
import { QuestionStepper } from '@/components/client/adapts/QuestionStepper';
import DemoQuestions from '@/constants/adapts/DemoQuestions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DemoTestIntro from '@/components/client/adapts/demo/DemoTestIntro';

const DemoAssessmentPage: React.FC = () => {
  const router = useRouter();

  const questions = DemoQuestions;
  const totalQuestions = questions.length;

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestionRef = useRef(currentQuestion);

  const answeredCount = Object.keys(answers).length;
  const isComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const isLast = currentQuestion === totalQuestions - 1;
  const currentQuestionObj = questions[currentQuestion];
  const isCurrentAnswered =
    currentQuestionObj && answers[currentQuestionObj.id] != null;

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  const progress = useMemo(() => {
    if (totalQuestions === 0) return 0;
    return (answeredCount / totalQuestions) * 100;
  }, [answeredCount, totalQuestions]);

  const handlePrev = useCallback(() => {
    if (currentQuestion === 0) return;
    setDirection(-1);
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (isLast && isComplete) {
      setShowSummary(true);
      return;
    }
    if (!isLast) {
      setDirection(1);
      setCurrentQuestion((prev) => Math.min(prev + 1, totalQuestions - 1));
    }
  }, [isLast, isComplete, totalQuestions]);

  const handleAnswerChange = useCallback(
    (questionId: number, value: string) => {
      setAnswers((prev) => {
        const updated = { ...prev, [questionId]: Number(value) };
        const newAnsweredCount = Object.keys(updated).length;
        const willBeComplete = newAnsweredCount === totalQuestions;

        const current = currentQuestionRef.current; // ← always fresh

        if (!willBeComplete && current < totalQuestions - 1) {
          setDirection(1);
          setCurrentQuestion(current + 1); // ← no stale closure
        }

        return updated;
      });
    },
    [totalQuestions]
  );

  const handleReset = useCallback(() => {
    setHasStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setDirection(1);
    setShowSummary(false);
  }, []);

  // 🚪 First-time start: show intro
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <DemoTestIntro onStart={() => setHasStarted(true)} />
      </div>
    );
  }

  if (showSummary) {
    // You can replace this with a proper DemoResult component
    return (
      <div className="fixed inset-0 z-[99999] bg-background  min-h-screen flex flex-col items-center justify-center px-4 gap-6 text-center">
        <Image
          src="/logo/logo_250.png"
          width={64}
          height={64}
          alt="Reset 360 Logo"
        />
        <h2 className="text-2xl font-bold text-primary">
          Thanks for trying the demo!
        </h2>
        <p className="text-muted-foreground max-w-md">
          You answered all {totalQuestions} questions. Sign up to get your full
          ADAPTS assessment and personalized results.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleReset}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => router.push('/')}>
            Back to Home
          </Button>
          <Button onClick={() => router.push('/register')}>
            Create an Account
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-2 lg:p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="w-full px-4 pt-10 pb-6 space-y-4">
        <div className="text-center space-y-2 flex flex-col items-center justify-center">
          <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-primary/50 to-accent/5 flex items-center justify-center">
            <Image
              src="/logo/logo_250.png"
              width={32}
              height={32}
              alt="Reset 360 Logo"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            Demo Mode
          </div>
          <h1 className="text-lg lg:text-3xl font-bold text-primary">
            ADAPTS Assessment Preview
          </h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {totalQuestions}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{answeredCount} answered</span>
            <span>{Math.max(totalQuestions - answeredCount, 0)} remaining</span>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="flex-1 flex items-center justify-center px-4 pb-8">
        <div className="w-full max-w-4xl">
          <QuestionStepper index={currentQuestion} direction={direction}>
            {questions.map((q) => (
              <QuestionSlide
                key={q.id}
                question={q}
                answer={answers[q.id]}
                isComplete={isComplete}
                onAnswerChange={handleAnswerChange}
              />
            ))}
          </QuestionStepper>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full px-4 pb-8">
        <div className="max-w-4xl mx-auto flex justify-center items-center gap-4">
          <Button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            size="lg"
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden lg:inline-block">Previous</span>
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            size="lg"
            variant={isComplete ? 'accent' : 'default'}
            className="flex-1 flex items-center gap-2"
          >
            {isLast && isComplete ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DemoAssessmentPage;
