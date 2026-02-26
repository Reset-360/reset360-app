import { ORG_STORAGE } from '@/constants/storage-keys';
import { IOrganization, IOrgSeatBatch } from '@/types/organization';
import { IPurchase } from '@/types/payment';
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface OrgState {
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  organization?: IOrganization;
  setOrganization: (org: IOrganization) => void;

  purchase?: IPurchase;
  setPurchase: (purchase: IPurchase) => void;

  seatBatch?: IOrgSeatBatch;
  setSeatBatch: (batch: IOrgSeatBatch) => void;

  resetOrgData: () => void;
}

export const useOrgStore = create<OrgState>()(
  devtools(
    persist(
      (set) => ({
        hasHydrated: false,

        setOrganization: (org: IOrganization) => set(() => ({ organization: org })),
        setPurchase: (purchase: IPurchase) => set(() => ({ purchase })),
        setSeatBatch: (batch: IOrgSeatBatch) => set(() => ({ seatBatch: batch })),

        resetOrgData: () =>
          set({
            organization: undefined,
            purchase: undefined,
            seatBatch: undefined,
          }),

        setHasHydrated: (v: boolean) => set({ hasHydrated: v }),
      }),
      {
        name: ORG_STORAGE,
        onRehydrateStorage: () => (state) => {
          // 🧊 Mark store as hydrated once persistence has loaded
          state?.setHasHydrated(true);
        },
      }
    )
  )
);