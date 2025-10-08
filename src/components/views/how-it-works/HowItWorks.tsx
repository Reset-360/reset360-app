
import { ArrowRight, ClipboardCheck, Sparkles, MessageCircle, TrendingUp } from "lucide-react";
import { Button } from '@/components/ui/button';

const steps = [
  {
    icon: ClipboardCheck,
    title: "Take the ADAPTS Assessment",
    description: "Quick 5-minute assessment to understand your mental wellness needs",
    color: "primary"
  },
  {
    icon: Sparkles,
    title: "Get Matched Instantly",
    description: "AI analyzes your results and connects you with the perfect coach",
    color: "accent"
  },
  {
    icon: MessageCircle,
    title: "Book Your First Appointment",
    description: "Connect with your matched coach and choose a time that works for you.",
    color: "primary"
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "See your growth and celebrate wins with ongoing support",
    color: "accent"
  }
];

const HowItWorks = () => {
  return (
    <section id='how-it-works' className="pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 ">
          <h2 className="text-3xl font-bold mb-2">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Get the support you need in four simple steps
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isAccent = step.color === "accent";
              
              return (
                <div 
                  key={index}
                  className="relative"
                  data-aos="fade-right" data-aos-delay={100 * index}
                >
                  {/* Step number and icon */}
                  <div className="relative mb-6">
                    <div className={`relative w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                      isAccent 
                        ? 'bg-accent/10 shadow-accent' 
                        : 'bg-primary/10 shadow-glow'
                    } relative z-10`}>
                      <Icon className={`w-12 h-12 ${isAccent ? 'text-accent' : 'text-primary'}`} />

                      {/* Step number badge */}
                      <div className={`md:hidden absolute -top-2 -left-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md ${
                        isAccent ? 'gradient-accent' : 'gradient-primary'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Step number badge */}
                    <div className={`hidden md:flex absolute -top-2 -right-2 w-10 h-10 rounded-full items-center justify-center text-white font-bold shadow-md ${
                      isAccent ? 'gradient-accent' : 'gradient-primary'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-16" data-aos="fade-up" data-aos-delay={800}>
            <Button variant="default" size="lg" className="group">
              Start Your Journey
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
