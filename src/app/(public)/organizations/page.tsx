'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/PageFooter';
import { Building2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import RegisterForm from '@/components/views/organization/registration/RegisterForm';
import {
  getIndividualPricing,
  getTierPricing,
} from '@/services/settingService';

const OrganizationPage = () => {
  const [tiers, setTiers] = useState([]);
  const [baseAmount, setBaseAmount] = useState(0);

  useEffect(() => {
    const fetchSettings = async () => {
      const [settings, individual] = await Promise.all([
        getTierPricing(),
        getIndividualPricing(),
      ]);
      setTiers(settings);
      setBaseAmount(individual.unitAmount);
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main id="top" className="">
      <Header />
      <div className="mt-16">
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center bg-primary text-white w-16 h-16 rounded-full mb-4">
            <Building2 className="h-8 w-8 " />
          </div>
          <h1 className="text-4xl font-bold font-main text-foreground mb-3">
            Organization Registration
          </h1>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Secure bulk seat management for ADAPTS Assessments
          </p>
        </div>
      </div>

      <div className="container mx-auto">
        <RegisterForm tiers={tiers ?? []} />
      </div>

      <Footer />
    </main>
  );
};

export default OrganizationPage;
