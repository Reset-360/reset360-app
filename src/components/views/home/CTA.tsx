import { ArrowRight, Heart } from "lucide-react";
import Pricing from './packages/Pricing';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import OrganizationHowItWorks from './how-it-works/OrganizationHowItWorks';

const CTA = () => {
  const router = useRouter()

  const handleStartOrganization = () => {
    router.push('/organizations')
  }

  return (
    <section id='organization' className="pt-24 pb-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      <div className="container mx-auto px-4 relative z-10 pb-10">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground" data-aos='fade-up'>
          <div className="inline-flex items-center gap-2 mb-6">
            <Heart className="w-8 h-8 fill-current animate-float" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-main">
            Want ADAPTS for Your School or Organization?
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Empower your community with stigma-free mental wellness assessments. 
            Purchase seat codes in bulk, distribute them effortlessly, and 
            track progress — all from one dashboard. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="accent" 
              size="lg" 
              className="group bg-violet-600 hover:bg-accent-light shadow-accent text-lg"
              onClick={handleStartOrganization}
            >
              Get Started For Your Organization
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <OrganizationHowItWorks />
      <Pricing />
    </section>
  );
};

export default CTA;
