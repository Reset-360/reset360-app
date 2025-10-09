
import {
  CheckCircle,
  Brain,
  Users,
  DollarSign,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'ADAPTS Assessment',
    description:
      'Catch early signs of stress and anxiety with our advanced assessment screening tool.',
    color: 'primary',
  },
  {
    icon: Sparkles,
    title: 'AI Match Making',
    description:
      'ADAPTS results connect you to the perfect coach instantly personalized for you.',
    color: 'accent',
  },
  {
    icon: Users,
    title: 'Coaches on Call',
    description:
      'Talk to someone who listens without judgment, whenever you need support.',
    color: 'primary',
  },
  {
    icon: CheckCircle,
    title: 'Early Intervention',
    description:
      'Address issues at the first signs of stress or anxiety—before they grow.',
    color: 'accent',
  },
  {
    icon: DollarSign,
    title: 'Affordable Care',
    description:
      'No high barriers of cost or long wait times. Support that fits your budget.',
    color: 'primary',
  },
  {
    icon: Shield,
    title: 'Stigma-Free',
    description:
      'Feels like a conversation, not a diagnosis. No judgment, just genuine support.',
    color: 'accent',
  },
];

const Features = () => {
  return (
    <section
      id='features'
      className="pb-16 relative overflow-hidden"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The <span className="text-primary">Reset360</span> Difference
          </h2>
          <p className="text-xl text-muted-foreground">
            Unlike therapy that often carries stigma, Reset360 puts coaches
            first for accessible, judgment-free support
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isAccent = feature.color === 'accent';

            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-smooth bg-card border-border hover:border-primary/50 group flex flex-row md:flex-col"
                data-aos="fade-right" data-aos-delay={100 * index}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    isAccent ? 'bg-accent/10' : 'bg-primary/10'
                  } group-hover:scale-110 transition-smooth`}
                >
                  <Icon
                    className={`w-7 h-7 ${isAccent ? 'text-accent' : 'text-primary'}`}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground font-roboto mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
