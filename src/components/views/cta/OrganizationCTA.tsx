import { Button } from '@/components/ui/button';
import React from 'react';

const OrganizationCTA = () => {
  return (
    <section>
      {/* Gradient CTA Banner */}
      <div
        className="py-20 px-6 text-center"
        style={{ background: 'var(--cta-gradient)' }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Want ADAPTS for Your School or Organization?
          </h2>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Empower your community with stigma-free mental wellness assessments.
            Purchase seat codes in bulk, distribute them effortlessly, and track
            progress, all from one dashboard.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-base font-semibold bg-white hover:bg-white/90 shadow-lg"
            style={{ color: 'hsl(270 70% 50%)' }}
          >
            Get Started for Your Organization →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OrganizationCTA;
