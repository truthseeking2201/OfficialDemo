import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import WithdrawForm from "./WithdrawForm";
import { WithdrawTimerCard } from "./WithdrawTimerCard";
import { WithdrawInProgressView } from "./WithdrawInProgressView";

import { showFormatNumber } from "../../../lib/number";
import { useCurrentAccount } from "../../../stubs/FakeWalletBridge";
import { useEstWithdrawVault, useWithdrawVault } from "../../../hooks/useWithdrawVault";
import { useMyAssets } from "../../../stubs/fakeQueries";
import { useWallet } from "../../../stubs/fakeQueries";
import { NDLP } from "../../../config/lp-config";
import { usePendingWithdrawal } from "../../../stubs/fakeQueries";
import { useWithdrawStore } from "../../../store/withdrawStore";

export default function WithdrawVaultSection() {
  const [balanceLp, setBalanceLp] = useState<number>(100000); // Default balance for offline mode
  const [pendingWithdrawal, setPendingWithdrawal] = useState(null);

  /**
   * HOOKS
   */
  const { openConnectWalletDialog } = useWallet();
  const { pending } = useWithdrawStore();
  
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
    <div className="px-6 md:px-10 pt-6 pb-10 bg-black">
      {!isConnected && (
        <div>
          <p className="text-base text-white/60 text-center mb-5">
            Connect Wallet First to see your Funds
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={() => {
              console.log("Connect wallet clicked in withdraw section");
              openConnectWalletDialog();
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
      )}

      {isConnected && (
        <div>
          {/* Always show Balance */}
          <div className="mb-9">
            <div className="font-sans text-base text-zinc-400 mb-3">
              Total Balance
            </div>
            <div className="flex items-center">
              <img
                src="/coins/ndlp.png"
                alt="NDLP Token"
                className="w-6 h-6 fill-gradient-orange"
              />
              <div className="text-white font-ibmplex font-bold text-[40px] leading-none ml-2">
                {showFormatNumber(balanceLp)}
              </div>
            </div>
            <div className="font-sans text-xs text-neutral-400 leading-relaxed mt-3">
              1 {NDLP.lp_symbol} ≈ {showFormatNumber(amountEst.receive)}{" "}
              {NDLP.token_symbol}
            </div>
          </div>

          {/* Render the correct view based on state */}
          {pending && pending.vaultId === NDLP.vault_id ? (
            <WithdrawInProgressView onClaimSuccess={onSuccess} />
          ) : pendingWithdrawal ? (
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