import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import WithdrawForm from "./WithdrawForm";
import { WithdrawTimerCard } from "./WithdrawTimerCard";

import { showFormatNumber } from "../../../lib/number";
import { useCurrentAccount } from "../../../stubs/FakeWalletBridge";
import { useEstWithdrawVault, useWithdrawVault } from "../../../hooks/useWithdrawVault";
import { useMyAssets } from "../../../stubs/fakeQueries";
import { useWallet } from "../../../stubs/fakeQueries";
import { NDLP } from "../../../config/lp-config";
import { usePendingWithdrawal } from "../../../stubs/fakeQueries";

export default function WithdrawVaultSection() {
  const [balanceLp, setBalanceLp] = useState<number>(100000); // Default balance for offline mode
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);

  /**
   * HOOKS
   */
  const { openConnectWalletDialog } = useWallet();
  
  // Add console log for debugging
  useEffect(() => {
    console.log("Withdraw section - openConnectWalletDialog:", typeof openConnectWalletDialog);
  }, [openConnectWalletDialog]);
  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;
  const address = currentAccount?.address;
  const { refreshBalance } = useMyAssets();
  const { amountEst } = useEstWithdrawVault(1, NDLP);
  const { data: pendingWithdrawalData } = usePendingWithdrawal(NDLP.vault_id);

  /**
   * FUNCTION
   */
  const initData = useCallback(() => {
    if (pendingWithdrawalData) {
      setPendingWithdrawal(pendingWithdrawalData);
    } else {
      setPendingWithdrawal(null);
    }
  }, [pendingWithdrawalData]);

  const onSuccess = useCallback(() => {
    initData();
    refreshBalance();
  }, [initData, refreshBalance]);

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    if (isConnected) {
      initData();
    }
  }, [isConnected, initData]);

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
          <div className="relative">
            <Button
              variant="primary"
              size="xl"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Button clicked in withdraw section");
                if (typeof openConnectWalletDialog === 'function') {
                  openConnectWalletDialog();
                } else {
                  console.error("openConnectWalletDialog is not a function", openConnectWalletDialog);
                }
              }}
              className="w-full font-semibold text-lg"
            >
              <span>Connect Wallet</span>
              <ArrowRight
                size={16}
                className="ml-2"
              />
            </Button>
          </div>
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

          {pendingWithdrawal ? (
            <WithdrawTimerCard pendingWithdrawal={pendingWithdrawal} />
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