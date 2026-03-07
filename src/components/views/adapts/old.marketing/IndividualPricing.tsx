import { getIndividualPricing } from '@/services/settingService';
import { ArrowRight, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatCents } from '@/utils/formatHelper';
import { Badge } from '@/components/ui/badge';

const individualFeatures = [
  'Get the right ADAPTS test automatically, tailored to your profile.',
  'Results saved to your profile',
  'Detailed score analysis',
  'Secure & confidential',
];

const tests = ['Adapts-T', 'Adapts-P', 'Adapts-C', 'Adapts-S'];

const IndividualPricing = () => {
  const router = useRouter();

  const [baseAmount, setBaseAmount] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      const individual = await getIndividualPricing();
      setBaseAmount(individual.unitAmount);
    };

    fetchSettings();
  }, []);

  const handleStartJourney = () => {
    router.push('/adapts/payment');
  };

  return (
    <Card
      id="adapts-individuals"
      className="mt-20 max-w-5xl scroll-mt-[150px] mx-auto"
      data-aos="fade-up"
      data-aos-delay={200}
    >
      <h2 className="text-sm uppercase tracking-widest text-muted-foreground text-center">
        ADAPTS Individual Assessment
      </h2>
      <div className="mx-auto group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center">
          {/* Left: Info */}
          <div className="flex-1 p-8 lg:px-0">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Single Assessment
            </h3>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm mb-4">
              Measuring what matters: anxiety and depression, empowering individuals and schools to build stronger support systems.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tests.map((test) => (
                <Badge key={test} className="test-option text-xs">
                  {test}
                </Badge>
              ))}
            </div>
            <ul className="space-y-2">
              {individualFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Check className="w-4 h-4 text-accent flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {/* Right: Price + CTA */}
          <div className="flex flex-col items-center md:items-end gap-4 md:min-w-[180px]">
            <div className="text-center md:text-right">
              <div className="flex items-baseline gap-1 justify-center md:justify-end pt-4">
                <span className="text-muted-foreground text-lg">₱</span>
                <span className="text-5xl text-foreground font-bold text">
                  {formatCents(baseAmount)}
                </span>
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                one-time payment
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg px-3 py-2 border border-border/50 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground">1 attempt only</strong>
              </span>
            </div>
            <div
              className="text-center mt-2 xl:mt-16 w-full px-8 md:px-0"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <Button
                variant="default"
                size="lg"
                onClick={handleStartJourney}
                className="flex w-full md:w-auto"
              >
                Start Your Journey
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">🔒 Secure payment</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IndividualPricing;
