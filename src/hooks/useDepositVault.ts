import { COIN_TYPES_CONFIG } from "../config";
import { RATE_DENOMINATOR, VAULT_CONFIG } from "../config/vault-config";
import { UserCoinAsset } from "../types/coin.types";
import { useCurrentAccount, Transaction } from "../stubs/FakeWalletBridge";
import { useMergeCoins } from "./useMergeCoins";
import { useGetVaultConfig } from "./useVault";
import { random } from "lodash";

export const useDepositVault = () => {
  const account = useCurrentAccount();

  // Simplified implementation using fake data
  const deposit = async (
    coin: UserCoinAsset,
    amount: number,
    onDepositSuccessCallback?: (data: any) => void
  ) => {
    try {
      if (!account?.address) {
        throw new Error("No account connected");
      }

      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, random(600, 1000)));
      
      // Generate a fake transaction digest
      const digest = '0x' + Array.from({ length: 64 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');
      
      // Calculate LP amount based on rate (roughly 1:1 with a small fee)
      const fee = amount * 0.005; // 0.5% fee
      const netAmount = amount - fee;
      const lpAmount = netAmount;
      
      // Prepare success data
      const depositData = {
        digest,
        depositAmount: amount,
        depositLpAmount: lpAmount,
        transactionTime: Date.now(),
      };
      
      // Call the success callback
      onDepositSuccessCallback?.(depositData);
      
      return depositData;
    } catch (error) {
      console.error("Error in deposit:", error);
      throw error;
    }
  };

  return {
    deposit,
  };
};

export const useCalculateNDLPReturn = (
  amount: number,
  usdcDecimals: number,
  ndlpDecimals: number
) => {
  const { vaultConfig } = useGetVaultConfig();
  const vaultRate = +vaultConfig?.rate || 1000000;

  if (!amount || !vaultConfig || !usdcDecimals || !ndlpDecimals) {
    return 0;
  }

  const rawAmount = amount * 10 ** usdcDecimals;
  const fee = (rawAmount * +vaultConfig.deposit.fields.fee_bps) / 10000;
  const net_amount = rawAmount - fee;

  const lp = (net_amount * RATE_DENOMINATOR) / vaultRate;

  const ndlpAmountWillGet = lp / Math.pow(10, ndlpDecimals);

  return Number(ndlpAmountWillGet).toFixed(2);
};

// calculate the rate of 1 USDC = ? NDLP
export const useUSDCLPRate = (isReverse = false) => {
  const { vaultConfig } = useGetVaultConfig();

  if (!vaultConfig) {
    return 1;
  }

  const vaultRate = +vaultConfig?.rate;

  const rate = vaultRate / RATE_DENOMINATOR;

  const usdcRate = isReverse ? rate : 1 / rate;

  return usdcRate;
};
