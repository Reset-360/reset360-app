import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getIndividualPricing } from '@/services/settingService';
import { formatCents } from '@/utils/formatHelper';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/AuthState';
import { EUserRole } from '@/types/user';

const included = [
  'Full 50-item structured assessment',
  'Automated scoring analysis',
  'Symptom frequency breakdown',
  'Secure result storage',
  'One assessment attempt',
];

const AdaptsPricing = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const onPayment = () => {
    if (user) {
      if (user.role == EUserRole.CLIENT) {
        router.push('/client/adapts/payment');
      } else {
        router.push('/restricted?feature=adapts');
      }
    } else {
      router.push('/login');
    }
  };

  const [baseAmount, setBaseAmount] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      const individual = await getIndividualPricing();
      setBaseAmount(individual.unitAmount);
    };

    fetchSettings();
  }, []);

  return (
    <section
      id="pricing"
      className="py-24 bg-gradient-to-b from-primary/20 via-primary/0 to-background"
    >
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-primary">Simple, Transparent</span> Pricing
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="max-w-md mx-auto"
        >
          <div className="relative bg-card rounded-3xl p-10 shadow-elevated border border-primary/20 text-center overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-cta" />

            <h3 className="text-lg font-display font-semibold text-muted-foreground mb-2">
              Single ADAPTS Assessment
            </h3>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl font-display font-bold text-foreground">
                ₱{formatCents(baseAmount)}
              </span>
              <span className="text-muted-foreground text-sm">.00</span>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              One-time payment
            </p>

            <div className="space-y-3 mb-10 text-left">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={onPayment}
              variant="default"
              className="rounded-full"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <div className="flex items-center justify-center gap-2 mt-5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              Secure payment. Private results.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdaptsPricing;
