import React from 'react';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/adapts';

const options = [
  { value: 0, label: 'NEVER' }, // 🚫
  { value: 1, label: 'RARELY' }, // 🌱
  { value: 2, label: 'SOMETIMES' }, // 🤔
  { value: 3, label: 'OFTEN' }, // 🔄
  { value: 4, label: 'ALL THE TIME' }, // ⏰
];

interface AnswerItemSummaryProps {
  question: Question;
  answer?: number;
}

const AnswerItemSummary: React.FC<AnswerItemSummaryProps> = ({
  question,
  answer,
}) => {
  return (
    <Card className="bg-card/80 p-4 flex space-y-0 gap-1">
      <div>
        <div className="text-xs text-muted-foreground">
          Question #{question.id}
        </div>
        <p className="text-lg">{question.question}</p>
      </div>

      {answer !== undefined ? (
        <div className="text-lg text-primary font-bold">
          {options[answer].label}
        </div>
      ) : null}
    </Card>
  );
};

export default AnswerItemSummary;
