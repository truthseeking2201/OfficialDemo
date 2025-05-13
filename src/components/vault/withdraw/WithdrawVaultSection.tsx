import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WithdrawForm from "./WithdrawForm";
import ClaimToken from "./ClaimToken";

import { showFormatNumber, getBalanceAmountForInput } from "@/lib/number";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  useEstWithdrawVault,
  useWithdrawVault,
} from "@/hooks/useWithdrawVault";
import { useMyAssets, useWallet } from "@/hooks";
import { NDLP } from "@/config/lp-config";
import { getBalanceToken } from "@/use_case/withdraw_vault_use_case";

import DataClaimType from "@/types/data-claim.types.d";

export default function WithdrawVaultSection() {
  const count = useRef<string>("0");
  const [balanceLp, setBalanceLp] = useState<number>(0);
  const [dataClaim, setDataClaim] = useState<DataClaimType>();

  /**
   * HOOKS
   */
  const { openConnectWalletDialog } = useWallet();
  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;
  const address = currentAccount?.address;
  const { refreshBalance } = useMyAssets();
  const { amountEst } = useEstWithdrawVault(1, NDLP);
  const { getRequestClaim } = useWithdrawVault();

  /**
   * FUNCTION
   */
  const initBalance = async () => {
    try {
      if (!address) return;
      const balance_raw = await getBalanceToken({
        owner: address,
        coinType: NDLP.lp_coin_type,
      });
      const balance = getBalanceAmountForInput(
        balance_raw,
        NDLP.lp_decimals,
        2
      );
      setBalanceLp(balance);
    } catch (error) {
      console.log("-----error", error);
      setBalanceLp(0);
    }
  };

  const initDataClaim = async () => {
    try {
      const res = await getRequestClaim(address);
      setDataClaim(res);
    } catch (error) {
      setDataClaim(null);
    }
  };

  const onSuccess = useCallback(() => {
    initDataClaim();
    initBalance();
    refreshBalance();
  }, []);

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    if (count.current !== address && address) {
      initBalance();
      initDataClaim();
    }
    count.current = address;
  }, [address]);

  /**
   * RENDER
   */
  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      {!isConnected && (
        <div>
          <p className="text-base text-white/60 text-center mb-5">
            Connect Wallet First to see your Funds
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={openConnectWalletDialog}
            className="w-full font-semibold text-lg"
          >
            <span>Connect Wallet</span>
            <ArrowRight
              size={16}
              className="ml-2"
            />
          </Button>
        </div>
      )}

      {isConnected && (
        <div>
          {/* Balance */}
          <div className="mb-9">
            <div className="font-sans text-base text-zinc-400 mb-3">
              Total Balance
            </div>
            <div className="flex items-center">
              <img
                src={NDLP.lp_image}
                alt="NODOAIx Token"
                className="w-[36px] h-[36px]"
              />
              <div className="text-white font-sans font-medium text-[40px] leading-[40px] ml-2">
                {showFormatNumber(balanceLp)}
              </div>
            </div>
            <div className="font-sans text-sm text-white/60 mt-3">
              1 {NDLP.lp_symbol} ≈ {showFormatNumber(amountEst.receive)}{" "}
              {NDLP.token_symbol}
            </div>
          </div>

          {dataClaim ? (
            <ClaimToken
              data={dataClaim}
              onSuccess={onSuccess}
            />
          ) : (
            <WithdrawForm
              balanceLp={balanceLp}
              lpData={NDLP}
              onSuccess={onSuccess}
            />
          )}
        </div>
      )}
    </div>
  );
}
