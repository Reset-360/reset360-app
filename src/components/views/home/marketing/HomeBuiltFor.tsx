import { motion } from "framer-motion";
import { User, GraduationCap, HeartHandshake, ArrowRight } from "lucide-react";
import Link from 'next/link';

const audiences = [
  {
    icon: User,
    title: "For Individuals",
    description: "Gain insight into your emotional wellness and access guided support tailored to your needs.",
    link: "/adapts",
    cta: "Take ADAPTS",
    gradient: "from-primary/10 to-primary/5",
  },
  {
    icon: GraduationCap,
    title: "For Schools & Institutions",
    description: "Implement structured screening tools and track cohort-level progress across your organization.",
    link: "/organization",
    cta: "Explore Plans",
    gradient: "from-accent/10 to-accent/5",
  },
  {
    icon: HeartHandshake,
    title: "For Coaches",
    description: "Join a growing ecosystem and connect with individuals seeking professional support and guidance.",
    link: "/coaching/apply",
    cta: "Apply to Join",
    gradient: "from-primary/10 to-accent/5",
  },
];

const HomeBuiltFor = () => (
  <section className="py-24 bg-gradient-to-t from-background/10 to-accent/5">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
          Who It&apos;s For
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Built for <span className="text-primary">Different Needs</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {audiences.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className={`bg-gradient-to-br ${a.gradient} rounded-2xl p-8 border border-border/50 hover:shadow-elevated transition-shadow duration-300`}
          >
            <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-6 shadow-soft">
              <a.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">{a.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{a.description}</p>
            <Link
              href={a.link}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              {a.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeBuiltFor;
