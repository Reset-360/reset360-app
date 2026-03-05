import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Accept coaching sessions through the platform",
  "Connect with individuals seeking support",
  "Offer online or in-person sessions",
  "Build a meaningful coaching practice",
];

const CoachAfterCert = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          After <span className="text-primary">Certification</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Once certified through an ERC program, you may apply to become a coach
          on Reset 360. Approved coaches can:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50 shadow-soft"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground font-medium">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CoachAfterCert;
