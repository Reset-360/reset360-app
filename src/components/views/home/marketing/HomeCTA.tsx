import { motion } from "framer-motion";
import { ArrowRight, Compass, Building, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const paths = [
  { icon: ArrowRight, label: "I'm an Individual", cta: "Take ADAPTS", link: "/adapts" },
  { icon: Compass, label: "I Need a Coach", cta: "Find Support", link: "/coaching/find" },
  { icon: Building, label: "I Represent an Organization", cta: "Explore Plans", link: "/organization" },
  { icon: HeartHandshake, label: "I'm a Coach", cta: "Apply to Join", link: "/" },
];

const HomeCTA = () => (
  <section className="py-24 gradient-hero relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)",
        backgroundSize: "32px 32px",
      }}
    />
    <div className="container relative z-10 mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
          Choose Your Path
        </h2>
        <p className="text-primary-foreground/80 text-lg">
          Start your mental wellness journey today.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {paths.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Button
              asChild
              variant="outline"
              className="w-full h-auto flex flex-col items-center gap-3 py-8 px-6 rounded-2xl bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground backdrop-blur-sm transition-all"
            >
              <Link href={p.link}>
                <p.icon className="w-6 h-6" />
                <span className="text-sm font-medium opacity-80">{p.label}</span>
                <span className="text-base font-bold">{p.cta}</span>
              </Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HomeCTA;
