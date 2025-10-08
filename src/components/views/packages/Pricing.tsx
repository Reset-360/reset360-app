import React from 'react';
import PricingCard from './PricingCard';

const Pricing = () => {
  return (
    <section
      id="pricing"
      data-aos="fade-up"
      className="px-6 pt-10 pb-20 flex flex-col items-center justify-center text-white"
    >
      <div className="max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-4">Choose Your Subscription Plan</h2>
        <p className="max-w-2xl text-xl md:text-2xl mb-8 opacity-90 leading-tighternone mx-auto mb-10">
          Choose from a range of personalized coaching packages designed to
          support your growth journey.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <PricingCard
            title="Reset Start"
            description="Perfect for individuals beginning their emotional growth journey by taking an ADAPTS assessment."
            price="10000"
          />

          <PricingCard
            title="Reset Go"
            description="Includes ADAPTS assessment and 3 personalized coaching sessions."
            price="199900"
          />

          <PricingCard
            title="Reset Always"
            description="Comprehensive 6-session program with progress tracking and feedback."
            price="299900"
            active
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
