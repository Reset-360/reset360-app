import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrgHero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-violet-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(258_90%_66%/0.3),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-foreground to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container relative z-10 py-20 mx-auto px-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-foreground text-sm font-medium backdrop-blur-sm border border-primary/30 mb-8"
            >
              <Building2 className="w-4 h-4" />
              For Organizations & Enterprises
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-primary-foreground mb-6">
              Enterprise Mental Wellness,{" "}
              <span className="text-accent">Simplified.</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 leading-relaxed max-w-2xl mx-auto">
              Deploy ADAPTS assessments across your organization, distribute seat
              codes instantly, and monitor progress from a centralized dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button                
                className="bg-primary text-primary-foreground rounded-full shadow-elevated hover:opacity-90 transition-opacity"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"                
                className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                View Plans
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrgHero;
