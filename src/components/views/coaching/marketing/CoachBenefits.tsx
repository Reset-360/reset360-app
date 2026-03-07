import { motion } from "framer-motion";
import { Handshake, Users2, MessageCircle, Zap, Users, MapPin } from "lucide-react";

const benefits = [
  {
    icon: Handshake,
    title: "Personalized Guidance",
    description: "Work with certified coaches trained through structured ERC programs.",
  },
  {
    icon: Users2,
    title: "Flexible Sessions",
    description: "Choose online sessions or meet in accredited partner locations.",
  },
  {
    icon: MessageCircle,
    title: "Safe & Supportive Conversations",
    description: "Discuss challenges openly in a judgment-free environment.",
  },
  {
    icon: Zap,
    title: "Action-Oriented Growth",
    description: "Develop practical strategies to support emotional and mental wellbeing.",
  },
  {
    icon: Users,
    title: "Community & Accountability",
    description: "Stay motivated with ongoing guidance and encouragement.",
  },
  {
    icon: MapPin,
    title: "Support When You Need It",
    description: "Find coaches based on location, specialization, and availability.",
  },
];

const CoachBenefits = () => (
  <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-3xl mx-auto"
      >
        <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Benefits of Coaching
          </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Turn insight into <span className="text-primary">meaningful support</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Reset 360 coaching connects you with certified mental wellness coaches who help you process insights and take practical steps forward.
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

export default CoachBenefits;
