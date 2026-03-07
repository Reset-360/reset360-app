import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, Share2 } from 'lucide-react';
import Link from 'next/link';

const nextSteps = [
  { icon: MapPin, text: 'Connect with a certified coach' },
  { icon: Share2, text: 'Share results with a professional' },
  { icon: Building2, text: 'Deploy ADAPTS across your organization' },
];

const AdaptsNextSteps = () => (
  <section className="py-24 bg-gradient-to-t from-background/80 via-background/10 to-background">
    <div className="container mx-auto px-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            What&apos;s Next
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Insight is Just the{' '}
            <span className="text-primary">Beginning</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            After completing ADAPTS, you may:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {nextSteps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">{s.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/coaching/find">
            <Button variant="default" className="rounded-full">
              <MapPin className="w-5 h-5 mr-2" />
              Find a Coach
            </Button>
          </Link>
          <Link href="/organization">
            <Button variant="outline" className="rounded-full">
              <Building2 className="w-5 h-5 mr-2" />
              Organizations
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AdaptsNextSteps;
