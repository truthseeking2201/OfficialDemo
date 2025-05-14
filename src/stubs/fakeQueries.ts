import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { random } from 'lodash';
import useFakeStore from './fakeStore';
import { COIN_TYPES_CONFIG } from "../config";

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

// Withdraw mutation
export const useWithdrawMutation = () => {
  const queryClient = useQueryClient();
  const withdraw = useFakeStore(state => state.withdraw);
  
  return useMutation({
    mutationFn: async (params: { vaultId: string, amount: number }) => {
      const withdrawalId = await withdraw(params.vaultId, params.amount);
      return { success: true, withdrawalId };
    },
    onSuccess: () => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['vaultBalance'] });
      queryClient.invalidateQueries({ queryKey: ['vaultActivity'] });
      queryClient.invalidateQueries({ queryKey: ['pendingWithdrawal'] });
    },
    onError: (error) => {
      console.error('Withdrawal failed:', error);
    },
  });
};

// Claim mutation
export const useClaimMutation = () => {
  const queryClient = useQueryClient();
  const claim = useFakeStore(state => state.claim);
  
  return useMutation({
    mutationFn: async (withdrawalId: string) => {
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
  
  // Use the wallet context directly for more reliability
  const context = React.useContext(require('./FakeWalletBridge').FakeWalletContext);
  
  // Create a custom open function for debugging
  const openDialogFunction = React.useCallback(() => {
    console.log("Opening wallet dialog directly from context");
    if (context) {
      context.openConnectWalletDialog();
    } else {
      console.error("Wallet context is null");
    }
  }, [context]);
  
  return {
    isConnected: !!account?.address,
    address: account?.address || null,
    balance: usdcAsset?.balance || 0,
    isConnectWalletDialogOpen: false,
    openConnectWalletDialog: openDialogFunction,
    closeConnectWalletDialog: () => {},
  };
};

// Import these at the top of the file
import React from 'react';
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