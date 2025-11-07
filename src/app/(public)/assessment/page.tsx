'use client';

import useQuizStore from '@/store/QuizState';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useAuthStore from '@/store/AuthState';

const questions = [
  'I feel overwhelmed by daily responsibilities',
  'I have difficulty managing stress',
  'I struggle to maintain healthy relationships',
  'I experience physical symptoms of anxiety or tension',
  'I find it hard to stay motivated',
  'I have trouble sleeping or resting properly',
  'I feel disconnected from my goals and values',
  'I struggle with maintaining a positive outlook',
  'I have difficulty setting and maintaining boundaries',
  'I feel supported in my personal growth journey',
];

const options = [
  { value: 'never', label: 'NEVER' },
  { value: 'rarely', label: 'RARELY' },
  { value: 'sometimes', label: 'SOMETIMES' },
  { value: 'often', label: 'OFTEN' },
  { value: 'all-the-time', label: 'ALL THE TIME' },
];

const AssessmentPage = () => {
  const router = useRouter();

  const user = useAuthStore(s => s.user)
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const answers = useQuizStore((state) => state.answers);
  const setCurrentQuestion = useQuizStore((state) => state.setCurrentQuestion);
  const setAnswer = useQuizStore((state) => state.setAnswer);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswer(currentQuestion, value);
    setCurrentQuestion(currentQuestion + 1);

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Assessment complete - navigate to results
        router.push('/results');
      }
    }, 300);
  };

  const handleBack = () => {
    if (user) {
      router.replace('/client/dashboard')
    } else {
      router.replace('/')
    }
  }

  return (
    <div className="absolute inset-0 min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex flex-col">
      {/* Header */}
      <header className="p-6 border-b bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="p-6 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {questions[currentQuestion]}
            </h1>
          </div>

          <RadioGroup
            value={answers[currentQuestion] || ""}
            onValueChange={handleAnswerChange}
            className="space-y-4"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all cursor-pointer bg-card/50 backdrop-blur-sm hover:bg-card/80"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className="flex-1 cursor-pointer text-lg font-medium"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="lg"
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              size="lg"
              disabled={!answers[currentQuestion]}
              className="gap-2"
            >
              {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentPage;
