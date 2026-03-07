import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import Link from 'next/link';

const CoachCTA = () => (
  <section className="py-24 gradient-hero relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }}
    />

    <div className="container relative z-10 px-0 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
          Ready to Join Reset 360?
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-10">
          If you are already certified through an ERC track, you may proceed
          with your coach application.
        </p>

        <Link href={'/coaching/apply'}>
          <Button
            variant="outline"
            className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
          >
            <Compass className="w-5 h-5 mr-2" />
            Apply as a Coach
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CoachCTA;
