import Image from 'next/image';
import React from 'react';
import heroImage from '@/assets/hero-coaching.jpg';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden mb-16"
      data-aos="fade-up"
      data-aos-delay="0"
    >
      <div className="container mx-auto p-8 mt-24 md:p-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="100">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary text-white font-mono rounded-full text-sm font-semibold">
                Coach-First Mental Health Support
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="">End the Stigma.</span>
              <br />
              <span className="text-primary">
                Start the Support.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Reset360 connects you with mental health coaches instantly. No
              stigma, no judgment, just support. Address stress and anxiety
              early, on your terms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#adapts">
                <Button variant="default" size="lg" className="group font-mono">
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>

              <a href="#pricing">
                <Button variant="outline" size="lg" className="group w-full font-mono">
                  <MessageCircle />
                  Talk to a Coach Now
                </Button>
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={heroImage}
                alt="Mental health coach supporting a client in a welcoming environment"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-violet-100 p-6 rounded-2xl max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="text-accent-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    Instant Connection
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Get matched in seconds
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
