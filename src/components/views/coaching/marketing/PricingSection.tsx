import { motion } from "framer-motion";
import { Check, Leaf, Sprout, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    icon: Leaf,
    name: "Starter",
    emoji: "🌿",
    price: "₱1,500",
    period: "1 Session",
    features: [
      "1 Session (1 Hour)",
      "One-on-one coaching",
      "Call or café option",
      "Valid for 30 days",
    ],
    cta: "Book 1 Session",
    popular: false,
  },
  {
    icon: Sprout,
    name: "Growth",
    emoji: "🌱",
    price: "₱5,400",
    period: "4 Sessions",
    features: [
      "4 Sessions (4 Hours)",
      "Structured progression",
      "Priority scheduling",
      "Progress tracking",
    ],
    cta: "Book 4 Sessions",
    popular: true,
    badge: "Save 10%",
  },
  {
    icon: TreePine,
    name: "Deep Reset",
    emoji: "🌳",
    price: "₱9,600",
    period: "8 Sessions",
    features: [
      "8 Sessions (8 Hours)",
      "Full coaching journey",
      "Priority matching",
      "Personalized action roadmap",
    ],
    cta: "Start Full Journey",
    popular: false,
    badge: "Best Value",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-t from-violet-100 via-violet-20 to-violet-300">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose the plan that fits your journey. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 border transition-shadow ${
                plan.popular
                  ? "bg-card shadow-elevated border-primary/30 scale-105"
                  : "bg-card shadow-card border-border/50 hover:shadow-elevated"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-6 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide">
                  {plan.badge}
                </span>
              )}
              <div className="text-3xl mb-3">{plan.emoji}</div>
              <h3 className="text-xl font-display font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">{plan.period}</p>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-foreground">
                  {plan.price}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${
                  plan.popular
                    ? "bg-violet-600 text-primary-foreground hover:opacity-90"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-muted-foreground"
        >
          Looking for team or organization plans?{" "}
          <a href="#" className="text-primary font-semibold underline underline-offset-4 hover:text-forest transition-colors">
            Contact us for Organizations
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
