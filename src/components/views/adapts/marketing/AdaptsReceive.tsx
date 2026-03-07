import { motion } from "framer-motion";
import { FileCheck, BarChart, Lock, ShieldCheck, Fingerprint } from "lucide-react";

const features = [
  { icon: FileCheck, text: "Automatically assigned ADAPTS version based on profile" },
  { icon: BarChart, text: "Detailed symptom frequency breakdown" },
  { icon: Lock, text: "Results securely stored in your account" },
  { icon: ShieldCheck, text: "Confidential processing" },
  { icon: Fingerprint, text: "One assessment attempt per purchase" },
];

const AdaptsReceive = () => (
  <section className="py-24 bg-gradient-to-b from-background via-primary/20 to-primary/30">
    <div className="container mx-auto px-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Your Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What You <span className="text-primary">Receive</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-5 bg-card rounded-xl p-5 shadow-soft border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{f.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AdaptsReceive;
