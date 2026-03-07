import { motion } from 'framer-motion';
import { MapPin, Users, CalendarCheck, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    step: '01',
    title: 'Enter Your Location',
    description: 'Type your ZIP code or region to find coaches near you.',
  },
  {
    icon: Users,
    step: '02',
    title: 'Get Matched',
    description:
      'We show nearby certified Reset 360 coaches based on location, specialization, and availability.',
  },
  {
    icon: CalendarCheck,
    step: '03',
    title: 'Choose Your Session',
    description:
      'Pick a video/call session or meet at an accredited café — whatever suits you best.',
  },
  {
    icon: CreditCard,
    step: '04',
    title: 'Book & Begin',
    description:
      'Secure payment, instant confirmation, and a session reminder to keep you on track.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-t from-violet-100/10 via-violet-100 to-violet-200">
      <div className="container mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wide uppercase text-sm mb-3 block">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Like Booking a Ride, But for{' '}
            <span className="text-primary">Emotional Support</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our smart matching system connects you to the nearest available
            coach — simple, structured, and designed around you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-shadow duration-300 h-full border border-border/50">
                <div className="flex justify-between">
                  <div className="text-5xl font-display font-bold text-primary/15 mb-4">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
