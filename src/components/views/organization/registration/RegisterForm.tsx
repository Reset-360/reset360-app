import { Button } from '@/components/ui/button';
import { IAdaptsPriceTier } from '@/types/settings';
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Check, ArrowRight } from 'lucide-react';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import ProgressHeader, { STEPS } from './ProgressHeader';
import ConfirmSeatsAndPlanForm from './confirm-plan/ConfirmSeatsAndPlanForm';
import OrganizationInfoForm from './org-profile/OrganizationInfoForm';
import LicenseAndBillingForm from './license-billing/LicenseAndBillingForm';
import { toast } from 'sonner';
import { registerOrganization } from '@/services/organizationService';
import { createPaymongoCheckout } from '@/services/paymentService';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

interface RegisterFormProps {
  tiers: IAdaptsPriceTier[];
}

const RegisterForm: React.FC<RegisterFormProps> = ({ tiers }) => {
  const router = useRouter()

  const seatFormRef = useRef<any>(null);
  const orgFormRef = useRef<any>(null);
  const billingFormRef = useRef<any>(null);

  const currentStep = useOrgRegistrationStore((s) => s.currentStep);
  const setCurrentStep = useOrgRegistrationStore((s) => s.setCurrentStep);
  const selectedTierId = useOrgRegistrationStore((s) => s.selectedTierId);
  const seats = useOrgRegistrationStore((s) => s.seats);
  const orgProfile = useOrgRegistrationStore((s) => s.orgProfile);
  const billingProfile = useOrgRegistrationStore((s) => s.billingProfile);
  const resetRegistrationState = useOrgRegistrationStore((s) => s.resetRegistrationState);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading]);


  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);    
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStepCta = () => {
    switch (currentStep) {
      case 0:
        return 'Continue to Organization Profile';
      case 1:
        return 'Continue to Licensing Setup';
      case 2:
        return 'Continue to Billing & Terms';
      default:
        return '';
    }
  };

  const handleNextStep = async () => {
    if (currentStep == 0) {
      await seatFormRef.current?.submitForm();
      if (seatFormRef.current?.isValid) {
        goNext();
      }
    } else if (currentStep == 1) {
      await orgFormRef.current?.submitForm();
      return;
    } else if (currentStep == 2) {
      console.log('submit here')
      await billingFormRef.current?.submitForm();
      handleRegister()
      return;
    }
  };

  const handleRegister = async () => {
    if (!orgProfile || !billingProfile || !selectedTierId || !seats) {
      toast.error('Missing required information in store');
      return
    }

    const payload = {
      name: orgProfile.orgName,
      email: orgProfile.adminEmail, // organization-level email can reuse admin email if not separate
      phone: orgProfile.adminPhone,
      address: billingProfile.billingAddress,
      profile: {
        selectedTierId: selectedTierId,
        seats: Number(seats),
        totalAmount: billingProfile.totalAmount,
        orgType: orgProfile.orgType,
        industry: orgProfile.industry,
        orgSize: orgProfile.orgSize,
        website: orgProfile.website,
        country: orgProfile.country,
        taxId: orgProfile.taxId,
        admin: {
          name: orgProfile.adminName,
          title: orgProfile.adminTitle,
          email: orgProfile.adminEmail,
          phone: orgProfile.adminPhone,
          password: 'SecurePass123', // or collected separately
        },
        billing: {
          intendedUse: billingProfile.intendedUse,
          contact: billingProfile.billingContact || orgProfile.adminName,
          email: billingProfile.billingEmail,
          address: billingProfile.billingAddress,
          vatId: billingProfile.vatId,
        },
        agreements: {
          tosAcceptedAt: billingProfile.agreeTos
            ? new Date().toISOString()
            : undefined,
          dpaAcceptedAt: billingProfile.agreeDpa
            ? new Date().toISOString()
            : undefined,
          privacyPolicyAcceptedAt: billingProfile.agreePrivacy
            ? new Date().toISOString()
            : undefined,
          acceptedByName: orgProfile.adminName,
          acceptedByEmail: orgProfile.adminEmail,
          acceptedByUser: undefined, // optional Mongo ObjectId
        },
        onboardingStatus: 'submitted',
      },
    };

    try {
      setLoading(true)

      const orgData = await registerOrganization(payload);
      const purchase = orgData.purchase;

      if (purchase) {
        createCheckoutUrl(purchase._id);
        console.log('Organization registered successfully:', orgData);
      }
    } catch (error) {
      setLoading(false)

      console.error('Error posting organization registration:', error);
      throw error;
    }
  };

  const createCheckoutUrl = async (purchaseId: string) => {
      try {
        setLoading(true)
        const paymongoCheckout = await createPaymongoCheckout(purchaseId);
        if (!paymongoCheckout) {
          toast.error('An error occurred while processing payment request. Please try again.');
          return;
        }
  
        const checkoutUrl = paymongoCheckout.checkoutUrl;
        
        // open paymongo checkout url
        router.replace(checkoutUrl);

         // reset registration state
        resetRegistrationState()
      } catch (error) {
        setLoading(false)

        console.log(error);
        toast.error('An error occurred when creating a payment intent');
      } finally {
        setLoading(false)
      }
    };

  return (
    <div className="py-8 px-4">
      { loading && (
        <div className="fixed inset-0 flex items-center justify-center h-screen bg-primary/30 z-99">
        <LoadingSpinner />
      </div>)}

      <div className="relative max-w-5xl mx-auto space-y-6">
        {/* Progress */}
        <ProgressHeader />

        {/* ===== STEP 1: Confirm Plan & Seats ===== */}
        {currentStep === 0 && (
          <ConfirmSeatsAndPlanForm tiers={tiers} formRef={seatFormRef} />
        )}

        {/* ===== STEP 2: Organization Profile ===== */}
        {currentStep === 1 && (
          <OrganizationInfoForm formRef={orgFormRef} goNext={goNext} />
        )}

        {/* ===== STEP 3: Licensing, Billing & Agreements ===== */}
        {currentStep === 2 && (
          <LicenseAndBillingForm
            tiers={tiers}
            formRef={billingFormRef}
            goNext={goNext}
          />
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {currentStep > 0 && (
            <Button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-accent transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          )}
          <Button
            type="button"
            onClick={handleNextStep}
            className="cta-button flex-1 flex items-center justify-center gap-2 text-base"
          >
            {currentStep < STEPS.length - 1 ? (
              <>
                {getStepCta()} <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Create Account & Continue to Payment{' '}
                <Check className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground pb-8">
          {currentStep < STEPS.length - 1
            ? 'Your progress is saved automatically'
            : '🔒 You will be redirected to PayMongo secure checkout to complete your payment'}
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
