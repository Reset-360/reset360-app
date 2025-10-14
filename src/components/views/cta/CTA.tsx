import { ArrowRight, Heart } from "lucide-react";
import Pricing from '../packages/Pricing';
import { Button } from '../../ui/button';

const CTA = () => {
  return (
    <section id='start' className="pt-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground" data-aos='fade-up'>
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-8 h-8 fill-current animate-float" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-main">
            Ready to Reset Your Mental Wellness?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Join thousands who have found stigma-free support with Reset360. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="accent" 
              size="lg" 
              className="group bg-violet-600 hover:bg-accent-light shadow-accent text-lg"
            >
              Take ADAPTS Assessment Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            OR
          </p>
        </div>
      </div>

      <Pricing />
    </section>
  );
};

export default CTA;
