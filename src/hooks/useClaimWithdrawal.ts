import { useMutation } from '@tanstack/react-query';
import { fakeClaimWithdrawal } from '../stubs/fakeClaimWithdrawal';

export const useClaimWithdrawal = () =>
  useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      if (import.meta.env.VITE_OFFLINE === '1' || window.location.search.includes('demo=true')) {
        return fakeClaimWithdrawal(id);
      }
      // In a real implementation, this would call the actual API
      throw new Error('Online mode claim not implemented');
    }
  });