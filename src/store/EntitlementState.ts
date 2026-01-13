import { ENTITLEMENT_STORAGE } from '@/constants/storage-keys';
import { IAssessmentEntitlement } from '@/types/entitlement';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EntitlementState {
  hasHydrated: boolean;

  entitlements: IAssessmentEntitlement[];
  currentEntitlement: IAssessmentEntitlement | undefined;
  hasAvailableRedeemedCode: boolean;

  addEntitlement: (entitlement: IAssessmentEntitlement) => void;

  setEntitlements: (entitlements: IAssessmentEntitlement[]) => void;
  setCurrentEntitlement: (entitlement: IAssessmentEntitlement) => void;
  setHasAvailableRedeemedCode: (hasAvail: boolean) => void;

  resetEntitlement: () => void;
  setHasHydrated: (v: boolean) => void;
}

const useEntitlementStore = create<EntitlementState>()(
  persist(
    (set) => ({
      hasHydrated: false,

      entitlements: [],
      currentEntitlement: undefined,
      hasAvailableRedeemedCode: false,

      addEntitlement: (entitlement) =>
        set((state) => ({
          entitlements: [...state.entitlements, entitlement],
        })),
      setEntitlements: (entitlements) => set({ entitlements }),

      setCurrentEntitlement: (currentEntitlement) =>
        set({ currentEntitlement }),

      setHasAvailableRedeemedCode: (hasAvailableRedeemedCode) =>
        set({ hasAvailableRedeemedCode }),

      resetEntitlement: () =>
        set({
          entitlements: [],
          hasAvailableRedeemedCode: false,
          currentEntitlement: undefined,
        }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: ENTITLEMENT_STORAGE,
      onRehydrateStorage: () => (state) => {
        // 🧊 Mark store as hydrated once persistence has loaded
        state?.setHasHydrated(true);
      },
    }
  )
)


export default useEntitlementStore;
