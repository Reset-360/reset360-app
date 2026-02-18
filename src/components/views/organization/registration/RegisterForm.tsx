import { Button } from '@/components/ui/button';
import { IAdaptsPriceTier } from '@/types/settings';
import React, { useRef } from 'react';
import { ChevronLeft, Check, ArrowRight } from 'lucide-react';
import useOrgRegistrationStore from '@/store/OrgRegistrationState';
import ProgressHeader, { STEPS } from './ProgressHeader';
import ConfirmSeatsAndPlanForm from './confirm-plan/ConfirmSeatsAndPlanForm';
import OrganizationInfoForm from './org-profile/OrganizationInfoForm';
import LicenseAndBillingForm from './license-billing/LicenseAndBillingForm';

interface RegisterFormProps {
  tiers: IAdaptsPriceTier[];
}

const RegisterForm: React.FC<RegisterFormProps> = ({ tiers }) => {
  const seatFormRef = useRef<any>(null);
  const orgFormRef = useRef<any>(null);
  const billingFormRef = useRef<any>(null);
  const complianceFormRef = useRef<any>(null);

  const currentStep = useOrgRegistrationStore((s) => s.currentStep);
  const setCurrentStep = useOrgRegistrationStore((s) => s.setCurrentStep);

  const goNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };
  const goBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
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
      await billingFormRef.current?.submitForm();
      return;
    }
  };

  const handleRegister = () => {
    console.log('Register org');
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
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
            goNext={handleRegister}
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
            : 'You will be redirected to PayMongo secure checkout to complete your payment'}
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
