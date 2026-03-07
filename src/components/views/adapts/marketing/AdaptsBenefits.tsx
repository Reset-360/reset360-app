import { motion } from "framer-motion";
import { Lightbulb, Eye, Brain, Users, Zap, Lock } from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    title: "Gain Self-Awareness",
    description: "Identify patterns in anxiety and depression symptoms across daily life.",
  },
  {
    icon: Eye,
    title: "Early Detection & Insight",
    description: "Recognize potential areas of concern before they escalate.",
  },
  {
    icon: Brain,
    title: "Structured & Evidence-Based",
    description: "A 50-item assessment aligned with recognized psychological frameworks.",
  },
  {
    icon: Users,
    title: "Designed for All Ages",
    description: "Versions for students, parents, teachers, and young adults.",
  },
  {
    icon: Zap,
    title: "Clear, Actionable Results",
    description: "Receive structured insights that help guide next steps.",
  },
  {
    icon: Lock,
    title: "Confidential & Secure",
    description: "Your results are stored privately and securely within your Reset 360 profile.",
  },
];

const AdaptsBenefits = () => (
  <section id='benefits' className="py-24 bg-gradient-to-b from-background to-secondary/20">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
          Benefits of ADAPTS
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Understand your emotional patterns with <span className="text-gradient-primary">clarity</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          ADAPTS is designed to help individuals, educators, and organizations better understand
          emotional and behavioral patterns through structured assessment.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 shadow-card transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
              <benefit.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AdaptsBenefits;
