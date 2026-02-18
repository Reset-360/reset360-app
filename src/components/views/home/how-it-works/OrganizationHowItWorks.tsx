import {
  ArrowRight,
  Building2,
  CreditCard,
  Share2,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

const steps = [
  {
    icon: Building2,
    title: 'Register Your Organization',
    description: 'Create an account to manage your seat codes and team',
    color: 'primary',
  },
  {
    icon: CreditCard,
    title: 'Purchase Seat Codes',
    description: 'Choose a tier, pay securely, and generate codes instantly',
    color: 'accent',
  },
  {
    icon: Share2,
    title: 'Distribute & Track',
    description:
      'Distribute codes instantly and monitor activity—purchase histories stay organized.',
    color: 'primary',
  },
  {
    icon: BarChart3,
    title: 'View Results & Analytics',
    description:
      'Access individual results and general analytics of completed assessments',
    color: 'accent',
  },
];

const OrganizationHowItWorks = () => {
  const router = useRouter();

  const handleStartJourney = () => {
    router.push('/login');
  };

  return (
    <div id="how-it-works" className="pb-20 relative overflow-hidden px-4">
      <Card className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-3xl text-foreground font-main font-bold mb-2">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in 4 simple steps
          </p>
        </div>

        <div className="mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                  data-aos="fade-right"
                  data-aos-delay={200 * index}
                >
                  <div className="text-foreground text-sm font-bold mb-2">
                    {index + 1}
                  </div>

                  <div className="w-24 h-24 mb-4 rounded-full flex items-center justify-center shadow-md bg-gradient-to-r from-violet-700 to-violet-500">
                    <Icon className={`w-12 h-12 text-white`} />
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3 text-foreground font-main">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OrganizationHowItWorks;
