import { motion } from 'framer-motion';
import { ShieldCheck, Package, BarChart3 } from 'lucide-react';

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Stigma-Free Mental Wellness Screening',
    description:
      'ADAPTS assessments are designed to feel empowering, not clinical. Employees engage willingly because the process is private, respectful, and focused on growth — not diagnosis.',
    gradient: 'from-primary/10 to-primary/5',
  },
  {
    icon: Package,
    title: 'Secure Bulk Seat Distribution',
    description:
      "Purchase seat credits in bulk and distribute unique access codes to employees, students, or members. No manual onboarding — just share a code and they're in.",
    gradient: 'from-accent/10 to-accent/5',
  },
  {
    icon: BarChart3,
    title: 'Centralized Analytics Dashboard',
    description:
      "Track participation rates, completion metrics, and cohort-level insights from one unified dashboard. Make data-driven decisions about your organization's wellness programs.",
    gradient: 'from-primary/10 to-accent/5',
  },
];

const OrgWhyChoose = () => {
  return (
    <section className="py-24 bg-gradient-to-t from-accent/10  via-accent/5 to-background">
      <div className="container  mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            The Problem We Solve
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Organizations Choose{' '}
            <span className="text-primary">Reset 360</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional wellness programs fail because they&apos;re invasive,
            complex, and hard to measure. We built something better.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`group bg-gradient-to-br relative flex flex-col ${reason.gradient} rounded-2xl p-8 border border-border/50 hover:shadow-elevated transition-shadow duration-300`}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center self-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgWhyChoose;
