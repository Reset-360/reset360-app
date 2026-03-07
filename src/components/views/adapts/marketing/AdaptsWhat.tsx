import { motion } from "framer-motion";

const frequencies = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "All the Time", value: 4 },
];

const AdaptsWhat = () => (
  <section className="py-24 bg-gradient-to-b from-accent/20  via-accent/5 to-background/10">
    <div className="container px-10 mx-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            About the Assessment
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            What is <span className="text-primary">ADAPTS</span>?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ADAPTS is a structured self-report assessment that helps map
            emotional and behavioral patterns in individuals and communities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-8 md:p-10 shadow-card border border-border/50 mb-8"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Each item measures symptom frequency using clear response categories:
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {frequencies.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary border border-border/50"
              >
                <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {f.value}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {f.label}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This format allows measurable scoring and structured reporting
            aligned with DSM-5 outlined symptom patterns.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground/70 italic"
        >
          ADAPTS may support diagnostic considerations or serve as a component
          in treatment planning.
        </motion.p>
      </div>
    </div>
  </section>
);

export default AdaptsWhat;
