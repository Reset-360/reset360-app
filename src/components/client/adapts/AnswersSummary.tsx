'use client';

import useQuizStore from '@/store/QuizState';
import { Question } from '@/types/adapts';
import React from 'react';
import AnswerItemSummary from './AnswerItemSummary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AnswersSummaryProps {
  questions: Question[];
  onSubmit: () => void;
}

const AnswersSummary: React.FC<AnswersSummaryProps> = ({
  questions,
  onSubmit,
}) => {
  const router = useRouter();
  const answers = useQuizStore((s) => s.answersDraft);

  return (
    <div className="min-h-screen bg-background">
      <header className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/client/dashboard')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Header */}
      <div className="max-w-4xl mx-auto py-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-accent/5 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-violet-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-violet-600">
            Answers Summary
          </h1>
          <p className="text-sm text-muted-foreground">
            Review your responses to all questions. Once ready, submit to
            finalize and view your assessment results.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {questions.map((question: Question) => (
          <AnswerItemSummary
            key={question.id}
            question={question}
            answer={answers?.[question.id]}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto flex justify-center text-center p-8">
        <Button
          onClick={onSubmit}
          size="lg"
          className="w-100 flex items-center gap-2"
        >
          Submit
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnswersSummary;
