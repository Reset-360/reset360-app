import { motion } from "framer-motion";
import { Brain, Users, Briefcase, ArrowRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const pillars = [
  {
    icon: Brain,
    title: "ADAPTS Assessment",
    description: "A structured screening tool measuring anxiety and depression symptoms across age groups. Designed for clarity, early awareness, and informed next steps.",
    image: '/images/pillar-adapts.png',
    link: "/adapts",
    cta: "Learn About ADAPTS",
  },
  {
    icon: Users,
    title: "Coaching Marketplace",
    description: "Connect with certified mental health coaches near you or online. Book structured sessions aligned with your assessment results.",
    image: '/images/pillar-coaching.png',
    link: "/",
    cta: "Find a Coach",
  },
  {
    icon: Briefcase,
    title: "Organization Solutions",
    description: "Deploy ADAPTS across schools, teams, and enterprises. Manage bulk seat codes and monitor progress from a centralized dashboard.",
    image: '/images/pillar-org.png',
    link: "/organization",
    cta: "For Organizations",
  },
];

const HomeWhatIs = () => (
  <section className="py-24 bg-gradient-warm">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
          The Platform
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          A Complete Mental Wellness{" "}
          <span className="text-primary">Ecosystem</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Reset 360 connects individuals, educators, families, coaches, and organizations through a structured system designed to promote clarity, growth, and measurable progress.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-muted-foreground/80 max-w-xl mx-auto mb-16"
      >
        Whether you&apos;re seeking personal insight or deploying wellness tools at scale, Reset 360 provides the framework to move forward with confidence.
      </motion.p>

      <div className="text-center mb-14">
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
          The Three Pillars of Reset 360
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                layout="fill" 
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-primary/90 flex items-center justify-center">
                <pillar.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-display text-xl font-bold text-foreground mb-3">
                {pillar.title}
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                {pillar.description}
              </p>
              <Link
                href={pillar.link}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
              >
                {pillar.cta}
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeWhatIs;
