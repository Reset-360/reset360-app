import { motion } from "framer-motion";
import { Lock, BarChart3, Users, Shield, Building } from "lucide-react";

const items = [
  { icon: Lock, text: "Secure and confidential data handling" },
  { icon: BarChart3, text: "Frequency-based symptom measurement" },
  { icon: Users, text: "Age-appropriate assessment versions" },
  { icon: Shield, text: "Non-clinical, stigma-aware framework" },
  { icon: Building, text: "Scalable for individual and institutional use" },
];

const HomeTrust = () => (
  <section className="py-24 bg-gradient-warm">
    <div className="container mx-auto px-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Trust & Structure
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built with structure.{" "}
            <span className="text-primary">Designed with care.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 bg-card rounded-xl px-5 py-4 shadow-soft border border-border/50"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HomeTrust;
