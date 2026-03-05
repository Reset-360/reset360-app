import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ADAPTSSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-violet-100 via-violet-20 to-violet-300">
      <div className="container px-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-card rounded-3xl p-10 md:p-14 shadow-elevated border border-primary/20 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-1 gradient-hero" />

          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Already Completed ADAPTS?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            We&apos;ll use your assessment results to match you with the right coach
            automatically — tailored to your unique needs and goals.
          </p>
          <Button variant={'default'} className="rounded-full">
            Continue With My Results
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ADAPTSSection;
