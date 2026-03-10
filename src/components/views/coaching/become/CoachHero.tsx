import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

const CoachHero = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5" />
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    />

    <div className="container relative z-10 py-24 px-10 mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8"
        >
          <HeartHandshake className="w-10 h-10 text-accent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-accent font-semibold tracking-widest uppercase text-sm mb-4"
        >
          Join Our Network
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
        >
          Become a Certified{' '}
          <span className="bg-gradient-to-r from-accent via-violet-400 to-violet-600 bg-clip-text text-transparent">
            Mental Wellness Coach
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Join the Reset 360 ecosystem and support individuals, students, and
          communities through structured mental wellness coaching.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm text-muted-foreground/70 mb-10 italic max-w-xl mx-auto"
        >
          To coach on Reset 360, practitioners must complete an ERC-certified
          coaching track, ensuring every coach on the platform is trained in
          responsible, structured mental health support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/coaching/apply">
            <Button className="rounded-full">
              Apply as a Coach
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="#tracks">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary/30 hover:bg-primary/5"
            >
              View Certification Tracks
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Credibility bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-2xl mx-auto mt-16 text-center"
      >
        <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 shadow-soft">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <p className="text-sm text-muted-foreground">
            All Reset 360 coaches are trained through{' '}
            <span className="font-semibold text-foreground">
              ERC-certified programs
            </span>{' '}
            to ensure ethical, structured, and responsible mental wellness
            support.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CoachHero;
