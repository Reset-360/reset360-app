import { motion } from 'framer-motion';
import { ArrowRight, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const FindCoachCTA = () => (
  <section className="py-24 gradient-hero relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }}
    />
    <div className="container max-w-2xl text-center mx-auto px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground font-display mb-4">
          Start Your Support Journey
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-3 leading-relaxed">
          If you&apos;ve already taken the ADAPTS assessment, you can use your
          results to help guide your coaching journey.
        </p>
        <p className="text-primary-foreground/70 text-base mb-8">
          Find the right coach and book your first session today.
        </p>

        <Link href={'#marketplace'}>
          <Button
            variant="outline"
            className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
          >
            <Pin className="w-5 h-5 mr-2" />
            Find a Coach Near Me
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default FindCoachCTA;
