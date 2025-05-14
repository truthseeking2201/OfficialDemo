import { useState, useEffect, useRef, useCallback } from "react";
import { useWithdrawMutation, useClaimMutation } from "@/stubs/fakeQueries";
import LpType from "@/types/lp.type";
import DataClaimType from "@/types/data-claim.types.d";
import { random } from "lodash";
import { NDLP } from "@/config/lp-config";
import { RATE_DENOMINATOR } from "@/config/vault-config";
import { getDecimalAmount, getBalanceAmount } from "@/lib/number";

export const useWithdrawVault = () => {
  const withdrawMutation = useWithdrawMutation();
  const claimMutation = useClaimMutation();

  const getRequestClaim = async (senderAddress: string): Promise<DataClaimType> => {
    try {
      // Check local storage for any active withdrawals
      const pendingWithdrawals = JSON.parse(localStorage.getItem('pendingWithdrawals') || '[]');
      const activeWithdrawal = pendingWithdrawals.find(w => w.senderAddress === senderAddress);
      
      if (!activeWithdrawal) {
        return null;
      }

      return {
        id: activeWithdrawal.id,
        timeUnlock: activeWithdrawal.unlockTime,
        status: "NEW",
        withdrawAmount: activeWithdrawal.amount,
        withdrawSymbol: NDLP.lp_symbol,
        receiveAmount: activeWithdrawal.amount * 0.995, // 0.5% fee
        receiveSymbol: NDLP.token_symbol,
        feeAmount: activeWithdrawal.amount * 0.005, // 0.5% fee
        feeSymbol: NDLP.token_symbol,
        configLp: NDLP,
      };
    } catch (error) {
      console.error("Error getting request claim:", error);
      return null;
    }
  };

  const withdraw = async (amountLp: number, fee: number, configLp: LpType) => {
    // Use withdraw mutation
    return withdrawMutation.mutateAsync({
      vaultId: configLp.vault_id,
      amount: amountLp
    });
  };

  const redeem = async (configLp: LpType) => {
    // Get pending withdrawals from localStorage
    const pendingWithdrawals = JSON.parse(localStorage.getItem('pendingWithdrawals') || '[]');
    const activeWithdrawal = pendingWithdrawals.find(w => w.vaultId === configLp.vault_id);
    
    if (!activeWithdrawal) {
      throw new Error("No pending withdrawal found");
    }

    // Use claim mutation
    return claimMutation.mutateAsync(activeWithdrawal.id);
  };

  return { getRequestClaim, withdraw, redeem };
};

// This hook estimates the withdrawal amount, fees, etc.
export const useEstWithdrawVault = (amountLp: number, configLp: LpType) => {
  const configVaultDefault = {
    withdraw: { fee_bps: "50", min: "0", total_fee: "0" }, // 0.5% fee
    rate: "1000000", // 1:1 rate
    lock_duration_ms: 86400000, // 24 hours in milliseconds
  };

  const amountEstDefault = {
    amount: 0,
    receive: 0,
    fee: 0,
    rateFee: 0,
  };
  
  const [configVault, setConfigVault] = useState(configVaultDefault);
  const [amountEst, setAmountEst] = useState(amountEstDefault);

  const getEstWithdraw = useCallback(() => {
    try {
      if (!Number(amountLp) || Number(amountLp) <= 0) {
        return setAmountEst(amountEstDefault);
      }
      
      const rawAmount = getDecimalAmount(amountLp, configLp.lp_decimals);
      const amount = rawAmount
        .times(configVault.rate)
        .dividedBy(RATE_DENOMINATOR);

      const fee = amount.times(configVault.withdraw.fee_bps).dividedBy(10000);
      const receiveAmount = amount.minus(fee);

      // convert amount to show
      const _receiveAmount =
        getBalanceAmount(receiveAmount, configLp.token_decimals)?.toNumber() ||
        0;
      const _fee =
        getBalanceAmount(fee, configLp.token_decimals)?.toNumber() || 0;

      setAmountEst({
        amount: amountLp,
        receive: _receiveAmount,
        fee: _fee,
        rateFee: Number(configVault.withdraw.fee_bps || 0),
      });
    } catch (error) {
      setAmountEst(amountEstDefault);
    }
  }, [configVault, amountLp, configLp.lp_decimals, configLp.token_decimals]);

  useEffect(() => {
    // Always use the default config
    setConfigVault(configVaultDefault);
  }, [configLp]);

  useEffect(() => {
    getEstWithdraw();
  }, [configVault, amountLp, getEstWithdraw]);

  return {
    configVault,
    amountEst,
  };
};