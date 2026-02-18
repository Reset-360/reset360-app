import React from 'react';

import {
  Building2,
  Shield,
  Check,
  CreditCard,
  ShoppingCart,
} from 'lucide-react';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';

export const STEPS = [
  { number: 1, title: 'Confirm Plan & Seats', icon: ShoppingCart },
  { number: 2, title: 'Organization Profile', icon: Building2 },
  { number: 3, title: 'Billing & Agreements', icon: CreditCard },
];

const ProgressHeader = () => {
  const currentStep = useOrgRegistrationStore((s) => s.currentStep);

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-1">
          {STEPS.map((step, i) => (
            <button
              key={i}
              type="button"
              // onClick={() => setCurrentStep(i)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                i === currentStep
                  ? 'text-primary'
                  : i < currentStep
                    ? 'text-primary/70'
                    : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < currentStep
                    ? 'bg-primary text-primary-foreground'
                    : i === currentStep
                      ? 'step-circle'
                      : 'bg-muted text-muted-foreground border border-border'
                }`}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span className="hidden md:inline">{step.title}</span>
            </button>
          ))}
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground text-center">
          Step {currentStep + 1} of {STEPS.length} — {STEPS[currentStep].title}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressHeader;
