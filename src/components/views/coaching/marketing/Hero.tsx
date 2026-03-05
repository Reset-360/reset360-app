import React from 'react'

import { motion } from "framer-motion";
import { MapPin, Shield, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const badges = [
  { icon: Heart, label: "Personalized" },
  { icon: MapPin, label: "Location-based" },
  { icon: Shield, label: "Safe & Secure" },
  { icon: Clock, label: "Flexible" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src={'/images/coaching-hero-bg.jpg'}
          alt="Warm café coaching session"
          className="w-full h-full object-cover"
          layout="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="container  mx-auto relative z-10 py-20 px-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-3 mb-8">
              {badges.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm border border-primary/30"
                >
                  <badge.icon className="w-3.5 h-3.5" />
                  {badge.label}
                </motion.span>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground mb-6">
              Find the Right Mental Health Coach Near You —{" "}
              <span className="bg-gradient-to-r from-accent via-violet-400 to-violet-600 bg-clip-text text-transparent">Online or In Person</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-xl">
              Took the ADAPTS assessment? Get matched with a certified coach in
              your area. Choose a call session or meet at an accredited café near
              you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant={'default'} className="rounded-full">
                <MapPin className="w-5 h-5" />
                Find a Coach Near Me
              </Button>
              <Button
                variant="outline"
                className="text-primary-foreground border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-sm rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                Learn How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero