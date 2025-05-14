import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PendingWithdrawal {
  id: string;            // tx digest or uuid
  vaultId: string;       // e.g. "USDC-NDLP-VAULT"
  amountNdlp: number;    // 12
  feeUsd: number;        // 0.06
  conversionRate: number;// 0.995
  createdAt: number;     // Date.now()
  cooldownEnd: number;   // createdAt + 24 h (ms)
  recipient: string;     // wallet addr
}

interface WithdrawStore {
  pending?: PendingWithdrawal;
  setPending: (p: PendingWithdrawal) => void;
  clearPending: () => void;
}

export const useWithdrawStore = create<WithdrawStore>()(
  persist(
    (set) => ({
      pending: undefined,
      setPending: (p) => set({ pending: p }),
      clearPending: () => set({ pending: undefined }),
    }),
    { name: 'withdraw-store' }   // localStorage key
  )
);