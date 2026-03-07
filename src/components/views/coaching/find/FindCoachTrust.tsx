import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Image from 'next/image';

const tracks = [
  { 
    name: "Mentora", 
    desc: "Mental Health & Wellbeing Coaching",
    image: "/images/tracks/mentora.png"
  },
  { 
    name: "Thought", 
    desc: "Mental Health First Responders",
    image: "/images/tracks/thought.png"
  },
  { 
    name: "David", 
    desc: "Peer Mental Health Coaching",
    image: "/images/tracks/david.png"
  },
  { 
    name: "BEA", 
    desc: "Autism & ADHD Support Coaching",
    image: "/images/tracks/bea.png"
  },
  { 
    name: "Vessel", 
    desc: "Socio-Emotional Learning Coaching",
    image: "/images/tracks/vessel.png"
  },
  { 
    name: "Tiwala", 
    desc: "Recovery Coaching",
    image: "/images/tracks/tiwala.png"
  },
];
const FindCoachTrust = () => (
  <section className="py-24 bg-gradient-warm">
    <div className="container max-w-4xl mx-auto px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-5">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
          Certified and{" "}
          <span className="text-primary">Structured</span> Coaching
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          All coaches on Reset 360 complete certification through ERC training
          programs. These programs ensure coaches follow structured and ethical
          mental wellness practices.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {tracks.map((track, i) => (
          <motion.div
            key={track.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i }}
            className="bg-card rounded-xl border border-border/50 p-4 shadow-soft flex flex-col items-center justify-center text-center gap-2"
          >
            <Image
                              src={track.image}
                              alt={track.name}
                              width={100}
                              height={100}
                              className='object-cover'
                            />
            
            <p className="text-xs text-muted-foreground mt-1">{track.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        This ensures every coach on the platform is properly trained to provide
        responsible support.
      </motion.p>
    </div>
  </section>
);

export default FindCoachTrust;
