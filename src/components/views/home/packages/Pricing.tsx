import React, { useEffect, useState } from 'react';
import PricingCard from './PricingCard';
import { getIndividualPricing, getTierPricing } from '@/services/settingService';

const Pricing = () => {
  const [tiers, setTiers] = useState([]);
  const [baseAmount, setBaseAmount] = useState(0)

  useEffect(() => {
    const fetchSettings = async () => {
      const [settings, individual] = await Promise.all([getTierPricing(), getIndividualPricing()])
      setTiers(settings);
      setBaseAmount(individual.unitAmount)
    };

    fetchSettings();
  }, []);

  if (!tiers.length) {
    return null;
  }

  return (
    <section
      id="pricing"
      data-aos="fade-up"
      className="px-6 pt-0 pb-20 text-white"
    >
      <div className="max-w-6xl text-center mx-auto">
        <h2 className="text-3xl font-bold mb-4 font-main">
          Organization Plans
        </h2>
        <p className="max-w-2xl mb-8 opacity-90 leading-tighternone mx-auto mb-10">
          Choose from a range of packages we have. The more seats you buy, the
          more you save.
        </p>

        <div className="grid gap-2 md:grid-cols-3">
          {tiers.map((tier: any, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              active={index == 1}
              discount={baseAmount - tier.unitAmount}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
