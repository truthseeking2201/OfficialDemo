import { useCallback } from "react";
import { ClockIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Alert } from "../../../components/ui/alert";
import { useClaimWithdrawal } from "../../../hooks/useClaimWithdrawal";
import { useWithdrawStore, PendingWithdrawal } from "../../../store/withdrawStore";
import { showFormatNumber } from "../../../lib/number";
import { Countdown } from "../../../components/ui/Countdown";
import { toast } from "../../../components/ui/use-toast";

interface WithdrawInProgressViewProps {
  onClaimSuccess: () => void;
}

export const WithdrawInProgressView = ({ onClaimSuccess }: WithdrawInProgressViewProps) => {
  const { pending, clearPending } = useWithdrawStore();
  const claimMutation = useClaimWithdrawal();
  
  if (!pending) {
    return null;
  }

  const handleClaim = useCallback(async () => {
    if (!pending || Date.now() < pending.cooldownEnd || claimMutation.isPending) {
      return;
    }
    
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

  // Calculate amount user will receive
  const receiveAmount = pending.amountNdlp * pending.conversionRate - pending.feeUsd;

  return (
    <div className="space-y-6 text-white">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Withdrawal in progress</h3>
        <div className="flex items-center gap-2 rounded-full bg-[#3b250a] px-3 py-1">
          <ClockIcon className="h-4 w-4 text-amber-400" />
          <Countdown target={pending.cooldownEnd} />
        </div>
      </div>

      {/* Big NDLP amount */}
      <p className="text-5xl font-semibold tracking-wide">
        {showFormatNumber(pending.amountNdlp)}&nbsp;
        <span className="text-gradient-ndlp">NDLP</span>
      </p>

      {/* Summary card */}
      <div className="rounded-lg border border-neutral-700 p-5 space-y-2">
        <div className="flex justify-between text-sm">
          <span>You'll&nbsp;Receive</span>
          <span className="font-medium">
            {showFormatNumber(receiveAmount)}&nbsp;USDC
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Withdraw&nbsp;Fee</span>
          <span className="font-medium">
            {showFormatNumber(pending.feeUsd)}&nbsp;USDC&nbsp;
            <span className="opacity-60">(0.5%)</span>
          </span>
        </div>
      </div>

      {/* Warning bar */}
      <Alert
        variant="brown"
        className="text-sm leading-5 flex items-start gap-2"
      >
        <ClockIcon className="mt-0.5 h-4 w-4" />
        Please wait to claim your previous withdrawal before initiating a new one.
      </Alert>

      {/* Claim button */}
      <Button
        size="lg"
        className="w-full text-base"
        disabled={Date.now() < pending.cooldownEnd || claimMutation.isPending}
        onClick={handleClaim}
      >
        {claimMutation.isPending ? 'Claiming…' : 'Claim'}
      </Button>
    </div>
  );
};