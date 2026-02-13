'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/PageFooter';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import OrganizationHowItWorks from '@/components/views/how-it-works/OrganizationHowItWorks';
import { Building2 } from 'lucide-react';
import React, { useEffect } from 'react';
import AOS from 'aos';

const OrganizationPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <main id="top" className="min-h-screen">
      <Header />
      <div className="">
        <div className="container max-w-4xl mx-auto px-4 pt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold font-main mb-3 text-foreground">
              Organization Registration
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Register your organization to purchase and manage ADAPTS
              assessment seat codes in bulk
            </p>
          </div>
        </div>
      </div>

      <OrganizationHowItWorks />
      <Footer />
    </main>
  );
};

export default OrganizationPage;
