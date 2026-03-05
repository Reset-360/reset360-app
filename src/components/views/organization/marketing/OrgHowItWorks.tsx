import { motion } from 'framer-motion';
import { Building, CreditCard, Send, LineChart } from 'lucide-react';

const steps = [
  {
    icon: Building,
    step: '01',
    title: 'Create Organization Account',
    description:
      'Register your organization in minutes. Set up your admin profile, company details, and team structure.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Purchase Seat Credits',
    description:
      'Choose a plan that fits your team size. Buy seat credits in bulk with volume discounts for larger organizations.',
  },
  {
    icon: Send,
    step: '03',
    title: 'Distribute Secure Access Codes',
    description:
      'Generate unique, single-use access codes and distribute them to your team via email, Slack, or your internal systems.',
  },
  {
    icon: LineChart,
    step: '04',
    title: 'Monitor Analytics & Insights',
    description:
      "Track real-time participation, view cohort-level reports, and export data to measure your program's impact.",
  },
];

const OrgHowItWorks = () => {
  return (
    <section id="org-how" className="py-24 bg-gradient-to-b from-accent/10  via-accent/5 to-background">
      <div className="container  mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Deploy in <span className="text-primary">Four Steps</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Enterprise-grade deployment made simple. Get your entire
            organization assessed in under an hour.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-display font-bold text-primary/15 mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
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
};

export default OrgHowItWorks;
