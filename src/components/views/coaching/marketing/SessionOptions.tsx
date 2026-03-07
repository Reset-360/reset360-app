import { motion } from "framer-motion";
import { Phone, Coffee, Clock, Globe, Shield, Users, Smile, Building2 } from "lucide-react";
import onlineImg from "@/assets/online-session.jpg";
import cafeImg from "@/assets/cafe-session.jpg";
import Image from 'next/image';

const onlineFeatures = [
  { icon: Shield, text: "Private & confidential" },
  { icon: Clock, text: "Flexible schedule" },
  { icon: Globe, text: "Accessible anywhere" },
  { icon: Building2, text: "Ideal for busy professionals" },
];

const cafeFeatures = [
  { icon: Shield, text: "Neutral, safe environment" },
  { icon: Coffee, text: "Verified partner cafés" },
  { icon: Smile, text: "Comfortable and structured" },
  { icon: Users, text: "Great for face-to-face connection" },
];

const SessionOptions = () => {
  return (
    <section id='sessions' className="py-24 bg-gradient-to-b from-violet-100/10 via-violet-100 to-violet-200">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block text-center">
            Session Types
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Session, <span className="text-primary">Your Way</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose what works best for your lifestyle and comfort level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Online Session Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl overflow-hidden shadow-card border border-border/50 bg-card group hover:shadow-elevated transition-shadow"
          >
            <div className="h-56 relative overflow-hidden">
              <Image
                src={'/images/online-session.jpg'}
                alt="Online coaching session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                layout='fill'
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Online / Call Sessions
                </h3>
              </div>
              <div className="space-y-3">
                {onlineFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <f.icon className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cafe Session Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="rounded-3xl overflow-hidden shadow-card border border-border/50 bg-card group hover:shadow-elevated transition-shadow"
          >
            <div className="h-56 relative overflow-hidden">
              <Image
                src={'/images/cafe-session.jpg'}
                alt="Café coaching session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                layout='fill'
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Café Meetups
                </h3>
              </div>
              <div className="space-y-3">
                {cafeFeatures.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <f.icon className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SessionOptions;
