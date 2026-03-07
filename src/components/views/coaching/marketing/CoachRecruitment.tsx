import { motion } from "framer-motion";
import { ArrowRight, Users, Briefcase, TrendingUp, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Users, title: "Help People", desc: "Make a real impact on mental wellness in your community" },
  { icon: Briefcase, title: "Build Your Practice", desc: "Access clients, tools, and a trusted brand to grow with" },
  { icon: TrendingUp, title: "Flexible Income", desc: "Set your own schedule and earn on your terms" },
  { icon: Shield, title: "Full Support", desc: "Training, certification, and ongoing mentorship included" },
];

const CoachRecruitment = () => {
  return (
    <section className="py-24 bg-gradient-to-t from-primary/20 via-primary/10 to-primary/5">
      <div className="container px-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          {/* <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-accent" />
          </div> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Become a Reset 360{" "}
            <span className="text-primary">Coach</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Help People. Build Your Practice. Grow With Us.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-14">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display font-bold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant={'default'} className='rounded-full'>
            Apply as a Coach
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button className='rounded-full' variant="outline">
            Learn How It Works
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CoachRecruitment;
