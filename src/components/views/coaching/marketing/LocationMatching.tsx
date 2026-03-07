import { motion } from "framer-motion";
import { Search, Filter, Zap } from "lucide-react";

const filters = [
  "Within 10km",
  "Stress",
  "Leadership",
  "Students",
  "Burnout",
  "Available Today",
  "This Week",
];

const LocationMatching = () => {
  return (
    <section className="py-24 bg-gradient-sage">
      <div className="container px-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block text-center md:text-left">
              Smart Matching
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Location-Based Coach Matching
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our smart matching system connects you to the nearest available
              coach in your region — just like booking a ride, but for emotional
              support. Structured, safe, and never random.
            </p>
            <div className="space-y-4">
              {[
                { icon: Search, text: "Search by your current location or ZIP code" },
                { icon: Filter, text: "Filter by specialty, distance, and availability" },
                { icon: Zap, text: "Instant matching with certified coaches" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl p-8 shadow-elevated border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex-1 bg-muted rounded-full px-5 py-3 text-muted-foreground text-sm">
                Enter your location or ZIP code...
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 font-medium">
              Popular Filters
            </p>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <span
                  key={filter}
                  className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  {filter}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMatching;
