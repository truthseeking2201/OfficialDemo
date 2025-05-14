import { useCallback, useState, useEffect } from "react";
import { ClockIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Alert } from "../../../components/ui/alert";
import { useClaimWithdrawal } from "../../../hooks/useClaimWithdrawal";
import { useWithdrawStore } from "../../../store/withdrawStore";
import { showFormatNumber } from "../../../lib/number";
import { Countdown } from "../../../components/ui/Countdown";
import { toast } from "../../../components/ui/use-toast";
import { WalletSignatureDialog } from "../../../components/wallet/WalletSignatureDialog";

interface WithdrawInProgressViewProps {
  onClaimSuccess: () => void;
}

export const WithdrawInProgressView = ({ onClaimSuccess }: WithdrawInProgressViewProps) => {
  const { pending, clearPending } = useWithdrawStore();
  const claimMutation = useClaimWithdrawal();
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [countdownEnded, setCountdownEnded] = useState(false);
  
  // Calculate amount user will receive - moved before conditional return
  const receiveAmount = pending ? pending.amountNdlp * pending.conversionRate - pending.feeUsd : 0;

  const handleClaim = useCallback(async () => {
    if (!pending || Date.now() < pending.cooldownEnd || claimMutation.isPending) {
      return;
    }
    
    // Open signature dialog
    setIsSignatureDialogOpen(true);
  }, [pending, claimMutation.isPending]);
  
  const handleSignatureComplete = useCallback(async () => {
    if (!pending) return;
    
    setIsSignatureDialogOpen(false);
    
    try {
      await claimMutation.mutateAsync({ id: pending.id });
      clearPending();
      toast({
        title: "Funds claimed successfully",
        description: "Your funds have been credited to your wallet",
        variant: "default",
      });
      onClaimSuccess();
    } catch (error) {
      toast({
        title: "Claim failed",
        description: error.message || "An error occurred during claim",
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [pending, claimMutation, clearPending, onClaimSuccess]);
  
  useEffect(() => {
    if (!pending) return;
    
    const checkCountdown = () => {
      if (Date.now() >= pending.cooldownEnd) {
        setCountdownEnded(true);
      }
    };
    
    // Check immediately
    checkCountdown();
    
    // Setup interval to check countdown status
    const interval = setInterval(checkCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [pending]);
  
  if (!pending) {
    return null;
  }

  return (
    <div className="space-y-6 lg:space-y-8 text-white">
      {/* Header row with withdrawal label, NDLP amount, and countdown badge */}
      <div className="flex items-baseline justify-between mt-10">
        <span className="text-neutral-400 text-[18px] font-medium">Withdrawal in progress</span>
        <div className="flex items-center gap-4">
          <span className="text-[32px] font-extrabold text-white tracking-wider">{pending.amountNdlp.toLocaleString()} NDLP</span>
          {!countdownEnded && (
            <div className="inline-flex items-center gap-1 rounded-xl bg-amber-900/60 px-3 py-[3px]">
              <ClockIcon className="w-4 h-4 text-amber-400" />
              <span className="text-[14px] tabular-nums">
                <Countdown target={pending.cooldownEnd} />
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Summary card */}
      <div className="rounded-2xl bg-white/5 border border-white/15 p-6 w-full">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-neutral-400">You'll Receive</span>
          <span className="text-right text-white">
            {showFormatNumber(receiveAmount)} USDC
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-400">Withdraw Fee</span>
          <span className="text-right text-white">
            0.5%
          </span>
        </div>
      </div>

      {/* Warning bar */}
      <Alert
        variant="brown"
        className="rounded-xl bg-amber-900/40 py-3 px-4 flex items-center gap-2 text-amber-200 text-sm"
      >
        <ClockIcon className="mt-0.5 h-4 w-4" />
        Please wait to claim your previous withdrawal before initiating a new one.
      </Alert>

      {/* Claim button */}
      <Button
        className="w-full rounded-xl h-14 text-[18px] font-semibold transition-opacity duration-150"
        disabled={Date.now() < pending.cooldownEnd || claimMutation.isPending}
        onClick={handleClaim}
        variant="default"
        style={{
          backgroundColor: Date.now() < pending.cooldownEnd ? 'rgba(82, 82, 82, 0.6)' : undefined,
          color: Date.now() < pending.cooldownEnd ? 'rgba(229, 229, 229, 0.6)' : undefined,
          cursor: Date.now() < pending.cooldownEnd ? 'not-allowed' : 'pointer',
          opacity: Date.now() < pending.cooldownEnd ? '0.6' : '1'
        }}
      >
        {claimMutation.isPending ? 'Claiming…' : 'Claim'}
      </Button>
      
      {/* Wallet signature dialog */}
      <WalletSignatureDialog
        open={isSignatureDialogOpen}
        onComplete={handleSignatureComplete}
        transactionType="withdraw"
        amount={receiveAmount.toString()}
        vaultName="NODO AI Vault"
      />
    </div>
  );
};