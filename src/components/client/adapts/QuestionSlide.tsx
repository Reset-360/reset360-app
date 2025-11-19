'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/adapts';

const options = [
  { value: 0, label: 'NEVER' },        // 🚫
  { value: 1, label: 'RARELY' },       // 🌱
  { value: 2, label: 'SOMETIMES' },    // 🤔
  { value: 3, label: 'OFTEN' },        // 🔄
  { value: 4, label: 'ALL THE TIME' }, // ⏰
];

interface QuestionSlideProps {
  question: Question;
  answer?: number;
  isComplete: boolean;
  onAnswerChange: (questionId: number, value: string) => void;
}

const QuestionSlideComponent: React.FC<QuestionSlideProps> = ({
  question,
  answer,
  isComplete,
  onAnswerChange,
}) => {
  return (
    <div className="keen-slider__slide flex items-center justify-center">
      <Card className="w-full p-8 md:p-12 bg-primary/10 shadow border-border/40">
        <div className="space-y-8">

          {/* 🔢 Question header */}
          <div className="flex gap-4">
            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
              {question.id}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold pt-2">
              {question.question}
            </h3>
          </div>

          {/* 🗳 Radio options */}
          <RadioGroup
            value={answer != null ? String(answer) : ''}
            onValueChange={(v) => onAnswerChange(question.id, v)}
            className="grid grid-cols-1 md:grid-cols-5 gap-3"
          >
            {options.map((opt) => {
              const id = `q${question.id}-${opt.value}`;
              return (
                <div key={opt.value}>
                  <RadioGroupItem
                    id={id}
                    value={String(opt.value)}
                    disabled={isComplete}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={id}
                    className="flex items-center justify-center rounded-sm bg-card px-4 py-4 text-sm font-medium cursor-pointer hover:bg-primary/20 peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white transition"
                  >
                    {opt.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

        </div>
      </Card>
    </div>
  );
};

// 🚀 Memoized for huge performance gains
export const QuestionSlide = React.memo(QuestionSlideComponent);
