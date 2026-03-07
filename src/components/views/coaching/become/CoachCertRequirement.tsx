import { motion } from "framer-motion";
import { ShieldCheck, ArrowDown } from "lucide-react";

const CoachCertRequirement = () => (
  <section id='requirements' className="py-24 bg-background">
    <div className="container mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-accent" />
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Certification <span className="text-primary">Requirement</span>
        </h2>

        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          To maintain the quality and integrity of the Reset 360 platform, all
          coaches must be certified under an{" "}
          <span className="font-semibold text-foreground">ERC training program</span>.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          These programs provide structured methodologies for different areas of
          mental wellness support.
        </p>

        <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-soft mt-8 space-y-4">
          <p className="text-foreground font-medium">
            Already certified under an ERC track?
          </p>
          <p className="text-sm text-muted-foreground">
            You may proceed directly to the coach application.
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span className="text-sm font-semibold">
              Not yet? Explore certification tracks below.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CoachCertRequirement;
