import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Users, Lightbulb, Eye, Lock, Users2, MessageCircle, Zap, MapPin, Handshake } from "lucide-react";

const adaptsBenefits = [
  { icon: Lightbulb, text: "Gain self-awareness" },
  { icon: Eye, text: "Early detection" },
  { icon: Brain, text: "Evidence-based assessment" },
  { icon: Users, text: "Designed for all ages" },
  { icon: Zap, text: "Clear insights" },
  { icon: Lock, text: "Confidential results" },
];

const coachingBenefits = [
  { icon: Handshake, text: "Personalized guidance" },
  { icon: Users2, text: "Flexible online or in-person sessions" },
  { icon: Brain, text: "Certified ERC coaches" },
  { icon: MessageCircle, text: "Judgment-free conversations" },
  { icon: Zap, text: "Action-oriented growth" },
  { icon: MapPin, text: "Find support near you" },
];

const HomeBenefits = () => (
  <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
    <div className="container mx-auto px-10">
      {/* ADAPTS Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Understand Your Mental Wellness
            <br />
            <span className="text-primary">ADAPTS</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gain structured insight into emotional patterns and symptom frequency through a 15-minute assessment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          {adaptsBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button
            className="rounded-full"
            asChild
          >
            <a href="/adapts">Learn about ADAPTS</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Coaching Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Turn Insight into Support
            <br />
            <span className="text-primary">Coaching</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work with certified coaches to translate insight into practical growth and support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          {coachingBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <benefit.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{benefit.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button
            className="rounded-full"
            asChild
          >
            <a href="/coaching">Learn about Coaching</a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HomeBenefits;
