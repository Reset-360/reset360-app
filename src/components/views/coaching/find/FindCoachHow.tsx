import { motion } from "framer-motion";
import { Search, CalendarCheck, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Find a Coach",
    description:
      "Browse coaches based on location, specialization, or availability.",
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Choose Your Session",
    description:
      "Book an online session or meet in an accredited partner location.",
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Start Your Conversation",
    description:
      "Connect with your coach and begin your journey toward better mental wellness.",
  },
];

const FindCoachHow = () => (
  <section className="py-24 bg-background">
    <div className="container max-w-4xl mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">
          Simple Process
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display">
          How Coaching Works on{" "}
          <span className="text-primary">Reset 360</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Connector line */}
        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-px bg-border" />

        <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 relative z-10">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default FindCoachHow;
