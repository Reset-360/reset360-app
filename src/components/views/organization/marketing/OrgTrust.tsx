import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, ServerCog } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Data Privacy Protected",
    description:
      "Individual assessment results are never shared with employers. Only aggregated, anonymized insights are surfaced to admins.",
  },
  {
    icon: Eye,
    title: "No Clinical Diagnosis Labeling",
    description:
      "ADAPTS is a wellness screening tool — not a diagnostic instrument. No employee is labeled, categorized, or flagged.",
  },
  {
    icon: Lock,
    title: "Secure Role-Based Access",
    description:
      "Admins see only what they need. Role-based permissions ensure sensitive data stays protected at every level.",
  },
  {
    icon: ServerCog,
    title: "Encrypted Data Handling",
    description:
      "All data is encrypted in transit and at rest. We follow industry best practices for security and compliance.",
  },
];

const OrgTrust = () => {
  return (
    <section className="py-24">
      <div className="container  mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            Security & Confidentiality
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built for Trust.{" "}
            <span className="text-primary">Designed for Compliance.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schools and enterprises need more than features — they need
            guarantees. Here`&apos;s how we protect your people and your data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h4 className="font-display font-bold text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrgTrust;
