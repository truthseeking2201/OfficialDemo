import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { random } from 'lodash';
import useFakeStore from './fakeStore';
import { COIN_TYPES_CONFIG } from "../config";
import React from 'react';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Replace useMyAssets hook
export const useMyAssets = () => {
  const { assets, refreshBalance } = useFakeStore();

  return {
    assets,
    isLoading: false,
    refreshBalance,
  };
};

// Replace useVaultBalance hook
export const useVaultBalance = (vaultId: string) => {
  const vaultBalances = useFakeStore(state => state.vaultBalances);
  
  return {
    data: vaultBalances[vaultId] || 0,
    isLoading: false,
  };
};

// Replace useVaultActivity hook
export const useVaultActivity = (vaultId: string) => {
  const activity = useFakeStore(state => state.activity);
  
  // Filter activity for this vault
  const vaultActivity = activity.filter(item => item.vaultId === vaultId);
  
  return {
    data: vaultActivity,
    isLoading: false,
  };
};

// Replace usePendingWithdrawal hook
export const usePendingWithdrawal = (vaultId: string) => {
  const pendingWithdrawals = useFakeStore(state => state.pendingWithdrawals);
  
  // Find pending withdrawal for this vault
  const pendingWithdrawal = pendingWithdrawals.find(item => item.vaultId === vaultId);
  
  return {
    data: pendingWithdrawal,
    isLoading: false,
  };
};

// Deposit mutation
export const useDepositMutation = () => {
  const queryClient = useQueryClient();
  const deposit = useFakeStore(state => state.deposit);
  
  return useMutation({
    mutationFn: async (params: { vaultId: string, amount: number, lockupPeriod: number }) => {
      await deposit(params.vaultId, params.amount, params.lockupPeriod);
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger refetches
      queryClient.invalidateQueries({ queryKey: ['vaultBalance'] });
      queryClient.invalidateQueries({ queryKey: ['vaultActivity'] });
      queryClient.invalidateQueries({ queryKey: ['coinObjects'] });
    },
    onError: (error) => {
      console.error('Deposit failed:', error);
    },
  });
};

// Withdraw mutation - modified for more reliability
export const useWithdrawMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: { vaultId: string, amount: number }) => {
      console.log('[WITHDRAW] Starting withdrawal mutation:', params);
      
      // Explicit check for offline/demo mode
      const isOfflineMode = 
        import.meta.env.VITE_OFFLINE === '1' || 
        window.location.search.includes('demo=true');
      
      if (isOfflineMode) {
        console.log('[WITHDRAW] Running in offline/demo mode');
        // Simulate processing delay
        await delay(random(800, 1200));
        
        // Return success response
        return { 
          success: true, 
          withdrawalId: `offline-withdrawal-${Date.now()}`,
          message: 'Withdrawal processed in offline mode'
        };
      }
      
      try {
        // Get the withdraw function from the store
        const withdraw = useFakeStore.getState().withdraw;
        
        // Simulate network delay
        await delay(random(600, 1000));
        
        // Call the withdraw function
        const withdrawalId = await withdraw(params.vaultId, params.amount);
        console.log('[WITHDRAW] Withdrawal successful:', withdrawalId);
        
        return { 
          success: true, 
          withdrawalId,
          message: 'Withdrawal processed successfully'
        };
      } catch (error) {
        console.error('[WITHDRAW] Error during withdrawal:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[WITHDRAW] Withdrawal mutation completed successfully:', data);
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['vaultBalance'] });
      queryClient.invalidateQueries({ queryKey: ['vaultActivity'] });
      queryClient.invalidateQueries({ queryKey: ['pendingWithdrawal'] });
    },
    onError: (error) => {
      console.error('[WITHDRAW] Withdrawal mutation failed:', error);
    },
  });
};

// Claim mutation
export const useClaimMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (withdrawalId: string) => {
      // For demo mode
      if (import.meta.env.VITE_OFFLINE === '1' || window.location.search.includes('demo=true')) {
        await delay(random(800, 1200));
        return { success: true };
      }
      
      // Get claim function from store
      const claim = useFakeStore.getState().claim;
      
      // Process claim
      await claim(withdrawalId);
      return { success: true };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['vaultBalance'] });
      queryClient.invalidateQueries({ queryKey: ['vaultActivity'] });
      queryClient.invalidateQueries({ queryKey: ['pendingWithdrawal'] });
      queryClient.invalidateQueries({ queryKey: ['coinObjects'] });
    },
    onError: (error) => {
      console.error('Claim failed:', error);
    },
  });
};

// Hook to replace useWallet
export const useWallet = () => {
  const account = useCurrentAccount();
  const assets = useFakeStore(state => state.assets);
  const usdcAsset = assets.find(
    (asset) => asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE
  );
  
  // Use the wallet modal from FakeWalletBridge
  const { open } = useWalletModal();
  
  return {
    isConnected: !!account?.address,
    address: account?.address || null,
    balance: usdcAsset?.balance || 0,
    isConnectWalletDialogOpen: false,
    openConnectWalletDialog: open,
    closeConnectWalletDialog: () => {},
  };
};

// Import these at the top of the file
import { useCurrentAccount, useWalletModal } from './FakeWalletBridge';

// Sign transaction hook (fake)
export const useSignTransaction = () => {
  return useMutation({
    mutationFn: async () => {
      // Simulate signing delay
      await delay(random(800, 1500));
      return { success: true, signature: 'fake-signature' };
    },
  });
};