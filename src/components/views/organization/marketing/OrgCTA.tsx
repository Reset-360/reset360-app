import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const OrgCTA = () => {
  const router = useRouter();

  return (
    <section id="org-register" className="py-24 gradient-hero overflow-hidden relative">

          <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          'radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }}
    />
      <div className="container  mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className=" max-w-4xl mx-auto rounded-3xl "
        >
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Deploy ADAPTS Across Your Organization?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Join forward-thinking organizations using Reset 360 to support
              employee mental wellness at scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/organization/register')}
                className="rounded-full"
              >
                Register Your Organization
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 hover:text-primary-foreground backdrop-blur-sm"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to Our Team
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrgCTA;
