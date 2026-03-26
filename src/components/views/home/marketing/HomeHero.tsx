import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const HomeHero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <Image
        layout="fill"
        src={'/images/home-hero.png'}
        alt="Supportive wellness session"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/30" />
    </div>

    <div className="container relative z-10 py-24 px-10 mx-auto">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm border border-primary/30 mb-8"
          >
            Mental Wellness Ecosystem
          </motion.span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
            Mental Wellness.{' '}
            <span
              className="text-primary bg-clip-text"
              style={{
                WebkitTextFillColor: 'transparent',
                background:
                  'linear-gradient(135deg, hsl(258 90% 76%), hsl(25 95% 63%))',
                WebkitBackgroundClip: 'text',
              }}
            >
              Assessed. Guided. Supported.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-xl">
            Reset 360 is a structured mental wellness platform that combines
            evidence-based assessment, guided coaching, and scalable
            organization tools — all in one ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2">
              <Link href="/adapts">
                <Button className="rounded-full">
                  Start ADAPTS
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/demo/adapts" target='_blank'>
                <Button className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground">
                  See Demo
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
            <Link href="/coaching/find">
              <Button
                variant="outline"
                className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                <Compass className="w-5 h-5 mr-2" />
                Find a Coach
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HomeHero;
