import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  getIndividualPricing,
  getTierPricing,
} from '@/services/settingService';
import { IAdaptsPriceTier } from '@/types/settings';
import { formatCents } from '@/utils/formatHelper';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Starter',
    seats: 'Up to 50 seats',
    price: '₱60,000',
    period: 'one-time',
    features: [
      '50 ADAPTS seat codes',
      'Admin dashboard access',
      'Basic analytics',
      'Email support',
      '30-day code validity',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Growth',
    seats: 'Up to 200 seats',
    price: '₱200,000',
    period: 'one-time',
    features: [
      '200 ADAPTS seat codes',
      'Full analytics dashboard',
      'Cohort reporting',
      'CSV data export',
      'Priority support',
      '60-day code validity',
    ],
    cta: 'Choose Growth',
    popular: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    seats: 'Unlimited seats',
    price: 'Custom',
    period: 'annual',
    features: [
      'Unlimited seat codes',
      'Dedicated account manager',
      'Custom reporting',
      'API access',
      'SSO integration',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
    badge: 'Custom',
  },
];

const OrgPricing = () => {
  const router = useRouter();

  const setSelectedTierId = useOrgRegistrationStore(s => s.setSelectedTierId);

  const [tiers, setTiers] = useState<IAdaptsPriceTier[]>([]);
  const [baseAmount, setBaseAmount] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      const [settings, individual] = await Promise.all([
        getTierPricing(),
        getIndividualPricing(),
      ]);
      setTiers(settings);
      setBaseAmount(individual.unitAmount);
    };

    fetchSettings();
  }, []);

  const handleRegister = (tierId: string) => {
    setSelectedTierId(tierId)
    router.push('/organization/register')
  }

  if (!tiers.length) {
    return null;
  }

  return (
    <section
      id="org-pricing"
      className="py-24 bg-gradient-to-t from-accent/10  via-accent/5 to-background"
    >
      <div className="container  mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Plans That Scale With You
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Volume discounts built in. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 border transition-shadow flex flex-col justify-between ${
                i == 1
                  ? 'bg-card shadow-elevated border-primary/30 scale-105'
                  : 'bg-card  shadow-card border-border/50 hover:shadow-elevated'
              }`}
            >
              {i == 1 && (
                <span className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs tracking-wide">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-display font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {plan.minQty} - {plan.maxQty} seats
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-foreground">
                    ₱{formatCents(plan.unitAmount)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    / seat
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => handleRegister(plan.id)}
                className={`w-full rounded-full py-5 ${
                  i == 1
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                {`Choose ${plan.name}`}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgPricing;
