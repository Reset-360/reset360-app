'use client'

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const router = useRouter();

  const handlePayment = () => {
    // TODO: Integrate with payment provider

    router.replace('/adapts');
  };

  return (
    <div className="min-h-screen bg-[var(--gradient-bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="backdrop-blur-sm bg-gradient-to-br from-card/90 to-primary/5 border-primary/20 shadow-[var(--shadow-soft)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">ADAPTS Assessment</CardTitle>
            <CardDescription>
              Unlock your personalized wellness insights
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <span className="text-4xl font-bold text-foreground">₱50.00</span>
              <span className="text-muted-foreground ml-1">one-time</span>
            </div>

            <ul className="space-y-3">
              {[
                'Comprehensive 50-item self-report assessment to measure the presence and frequency of depression and anxiety symptoms',
                'Personalized insights & recommendations',
                'Detailed ADAPTS score breakdown',
                'Lifetime access to your results',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure payment processing</span>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              size="lg"
              onClick={handlePayment}
              className="w-full bg-primary hover:opacity-90 transition-opacity text-primary-foreground"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Payment
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Payment;
