'use client';

import { motion } from 'framer-motion';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface RestrictedAccessProps {
  feature?: 'adapts';
}

const RestrictedAccessComponent = ({ feature }: RestrictedAccessProps) => {
  const featureMessages: Record<string, string> = {
    adapts: 'ADAPTS is a client-only feature. Org members and Admins do not have access.',
  };

  const message =
    feature && featureMessages[feature]
      ? featureMessages[feature]
      : 'This feature is restricted based on your role.';

  return (
    <div className="min-h-screen bg-red-100 absolute top-0 left-0 right-0 z-50">
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-8"
          >
            <Lock className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
          >
            Restricted <span className="text-primary">Access</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground mb-6"
          >
            {message}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="rounded-full px-8"
            >
              Go Back
            </Button>
            <Button asChild className="rounded-full">
              <Link href="/">
                Return Home
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestrictedAccessComponent;