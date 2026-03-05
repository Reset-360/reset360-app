import { motion } from "framer-motion";
import { Coffee, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CafeAccreditation = () => {
  return (
    <section id='cafe' className="py-24 bg-gradient-to-t from-violet-100 via-violet-100 to-violet-200">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Own a Café?{" "}
            <span className="text-primary">Partner With Reset 360</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Become a safe, accredited meeting venue for coaching sessions.
            Increase weekday traffic and be part of a mental wellness movement.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Coffee, title: "Safe Venue", desc: "Become an accredited meeting space" },
              { icon: TrendingUp, title: "More Traffic", desc: "Increase weekday foot traffic" },
              { icon: Heart, title: "Wellness Partner", desc: "Join the mental wellness movement" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 flex flex-col items-center"
              >
                <item.icon className="w-6 h-6 text-primary mb-3 text-center" />
                <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <Button variant={'default'} className='rounded-full'>
            Apply for Café Accreditation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CafeAccreditation;
