import { BillingProfile } from '@/forms/useOrgBillingSchema';
import { OrgRegistrationProfile } from '@/forms/useOrgProfileSchema';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface OrgRegistrationStore {
  selectedTierId?: string;
  setSelectedTierId: (tierId: string) => void;

  currentStep: number;
  setCurrentStep: (step: number) => void;

  // ✅ step 1
  showPlanPicker: boolean;
  setShowPlanPicker: (show: boolean) => void;
  seats: number;
  setSeats: (seats: number) => void;

  // ✅ step 2
  orgProfile?: OrgRegistrationProfile;
  setOrgProfile: (p: OrgRegistrationProfile) => void;

  // ✅ step 3
  billingProfile?: BillingProfile;
  setBillingProfile: (p: BillingProfile) => void;

  resetRegistrationState: () => void;
}

const useOrgRegistrationStore = create<OrgRegistrationStore>()(
  persist(
    devtools((set) => ({
      currentStep: 0,
      showPlanPicker: false,
      seats: 0,

      orgProfile: undefined,
      billingProfile: undefined,
      complianceProfile: undefined,

      setSelectedTierId: (selectedTierId: string) => set({ selectedTierId }),
      setCurrentStep: (step: number) => set({ currentStep: step }),
      setShowPlanPicker: (show: boolean) => set({ showPlanPicker: show }),
      setSeats: (seats: number) => set({ seats }),

      setOrgProfile: (orgProfile) => set({ orgProfile }),
      setBillingProfile: (billingProfile) => set({ billingProfile }),

      resetRegistrationState: () =>
        set({
          selectedTierId: undefined,
          currentStep: 0,
          showPlanPicker: false,
          seats: 0,
          orgProfile: undefined,
          billingProfile: undefined,
        }),
    })),
    {
      name: 'org-registration-store', // key in localStorage
    }
  )
);

export default useOrgRegistrationStore;
