import { motion } from 'framer-motion';
import { ClipboardList, BarChart3, UserCheck, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Start with ADAPTS',
    description: `Take the ADAPTS assessment to screen for anxiety and depression symptoms.`,
  },
  {
    icon: BarChart3,
    step: '02',
    title: 'Receive Insights',
    description: `Get clear results showing symptom frequency and areas needing support.`,
  },
  {
    icon: UserCheck,
    step: '03',
    title: 'Connect With a Coach',
    description: `Optionally meet with a certified coach online or at partner locations.`,
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Deploy & Monitor',
    description: `Organizations can roll out ADAPTS, track participation, and view results on a dashboard.`,
  },
];

const HomeHowItWorks = () => (
  <section className="py-24 bg-gradient-to-b from-background/10 to-accent/5 ">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
          The Process
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          How Reset 360 Works
        </h2>
        <p className="text-muted-foreground text-lg">
          Simple. Structured. Actionable.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full border border-border/50">
              <div className="flex justify-between items-center">
                <div className="text-5xl font-display font-bold text-primary/15 mb-4">
                  {s.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {s.title}
              </h3>
              <p
                className="text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.description }}
              />
            </div>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeHowItWorks;
