import { motion } from "framer-motion";
import { Heart, Calendar, BookOpen, Globe } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Help People Grow",
    desc: "Provide structured mental wellness support to individuals and communities.",
  },
  {
    icon: Calendar,
    title: "Flexible Coaching Opportunities",
    desc: "Offer sessions online or in accredited partner locations.",
  },
  {
    icon: BookOpen,
    title: "Structured Coaching Framework",
    desc: "Use proven coaching methodologies backed by ERC training programs.",
  },
  {
    icon: Globe,
    title: "Join a Growing Ecosystem",
    desc: "Work alongside educators, mental health advocates, and community leaders.",
  },
];

const CoachWhyJoin = () => (
  <section id='join' className="py-24 bg-gradient-warm">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Why Join <span className="text-primary">Reset 360</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-display font-bold text-foreground mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CoachWhyJoin;
