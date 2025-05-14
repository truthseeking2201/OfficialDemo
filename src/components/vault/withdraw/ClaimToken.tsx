import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RowItem } from "@/components/ui/row-item";
import { Badge } from "@/components/ui/badge";
import { IconErrorToast } from "@/components/ui/icon-error-toast";
import { IconCheckSuccess } from "@/components/ui/icon-check-success";
import { Loader } from "@/components/ui/loader";
import { Clock4 } from "lucide-react";
import Countdown, { zeroPad } from "react-countdown";
import AvgPaceIcon from "@/assets/images/avg-pace.png";

import { showFormatNumber } from "@/lib/number";
import { useCurrentAccount } from "@/stubs/FakeWalletBridge";
import { useToast } from "@/hooks/use-toast";
import DataClaimType from "@/types/data-claim.types.d";
import { useWithdrawVault } from "@/hooks/useWithdrawVault";
import { useClaimMutation } from "@/stubs/fakeQueries";

type Props = {
  data?: DataClaimType;
  onSuccess: () => void;
};

const ClaimToken = ({ data, onSuccess }: Props) => {
  const [isClaim, setIsClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * HOOKS
   */
  const currentAccount = useCurrentAccount();
  const address = currentAccount?.address;
  const { toast } = useToast();
  const { redeem } = useWithdrawVault();
  const claimMutation = useClaimMutation();

  /**
   * FUNCTION
   */
  const onClaim = useCallback(async () => {
    if (!data) return;
    
    setIsLoading(true);
    
    // Use our fake claim mutation
    claimMutation.mutate(
      data.id.toString(),
      {
        onSuccess: () => {
          onSuccess();
          toast({
            title: "Claim successful",
            variant: "default",
            duration: 5000,
          });
          setIsLoading(false);
        },
        onError: (error) => {
          toast({
            title: "Claim failed",
            description: error.message || "An error occurred during claim",
            variant: "destructive",
            duration: 5000,
          });
          setIsLoading(false);
        }
      }
    );
  }, [data, claimMutation, onSuccess, toast]);

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <div className="text-amber-600 text-sm font-mono font-medium">
        {zeroPad(hours)}
        <span className="ai-hiden">:</span>
        {zeroPad(minutes)}
        <span className="ai-hiden">:</span>
        {zeroPad(seconds)}
      </div>
    );
  };
  
  /**
   * LIFECYCLES
   */
  useEffect(() => {
    if (data) {
      // Check if the unlock time has passed
      const now = Date.now();
      setIsClaim(now >= data.timeUnlock);
    }
  }, [data]);

  /**
   * RENDER
   */
  if (!data) return null;
  
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="font-body text-gray-400 !font-medium">
          {isClaim
            ? "Your withdrawal is ready to claim:"
            : "Withdrawal in progress"}
        </div>
        <div className="flex items-center">
          <div className="font-mono font-bold text-2xl text-white">
            {showFormatNumber(data.withdrawAmount)} {data.withdrawSymbol}
          </div>
          {!isClaim && (
            <div className="ml-6 flex items-center bg-amber-600/10 p-2.5 rounded-full">
              <img
                src={AvgPaceIcon}
                alt="AvgPaceIcon"
                className="w-5 h-5 mr-2"
              />
              <Countdown
                date={data.timeUnlock}
                renderer={renderer}
                onComplete={onSuccess}
              />
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 p-4 border border-white/15 rounded-lg mt-5">
        <RowItem label="You'll Receive">
          {`${showFormatNumber(data.receiveAmount)} ${data.receiveSymbol}`}
        </RowItem>
        <RowItem
          label="Withdraw Fee"
          className="mt-3"
        >
          {`${showFormatNumber(data.feeAmount)} ${data.feeSymbol}`}
        </RowItem>
      </div>

      <Badge
        variant="warning"
        className="w-full p-4 rounded-xl block"
      >
        <div className="flex items-center">
          <Clock4 size={14} />{" "}
          <span className="text-sm text-white font-medium	ml-1.5 capitalize">
            Please wait to claim your previous withdrawal before initiating a
            new one
          </span>
        </div>
      </Badge>

      <Button
        variant="primary"
        size="xl"
        className="w-full font-semibold text-lg mt-5"
        onClick={onClaim}
        disabled={isLoading || !isClaim}
      >
        {isLoading && <Loader />} {isLoading ? "Waiting" : "Claim"}
      </Button>
    </div>
  );
};

export default ClaimToken;