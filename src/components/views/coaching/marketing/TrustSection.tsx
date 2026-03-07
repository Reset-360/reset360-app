import { motion } from "framer-motion";
import { Shield, UserCheck, Lock, Award } from "lucide-react";

const trustItems = [
  {
    icon: Award,
    title: "Certified Reset 360 Coaches",
    description: "Every coach undergoes rigorous certification and ongoing professional development.",
  },
  {
    icon: UserCheck,
    title: "Background-Checked Mentors",
    description: "All coaches pass comprehensive background verification for your safety.",
  },
  {
    icon: Lock,
    title: "Confidential & Secure",
    description: "Your sessions and personal data are encrypted and fully confidential.",
  },
  {
    icon: Shield,
    title: "ADAPTS-Integrated Matching",
    description: "Personalized coach matching powered by your ADAPTS assessment results.",
  },
];

const TrustSection = () => {
  return (
    <section id='trust' className="py-24 bg-gradient-to-b from-violet-100 via-violet-200 to-violet-100">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Trust & Safety
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">Your Safety</span> is Our Priority
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-display font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
