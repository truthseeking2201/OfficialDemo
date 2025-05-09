import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RowItem } from "@/components/ui/row-item";
import { Badge } from "@/components/ui/badge";
import { IconErrorToast } from "@/components/ui/icon-error-toast";
import { IconCheckSuccess } from "@/components/ui/icon-check-success";
import { Loader } from "@/components/ui/loader";
import { Clock4 } from "lucide-react";

import { showFormatNumber } from "@/lib/number";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { getBalanceToken } from "@/use_case/withdraw_vault_use_case";
import { useToast } from "@/components/ui/use-toast";
import DataClaimType from "@/types/data-claim-type";

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

  /**
   * FUNCTION
   */
  const onClaim = useCallback(() => {
    setIsLoading(true);
    try {
      // TODO
      console.log("-------onClaim");
      onSuccess();
      toast({
        title: "Claim successful",
        variant: "success",
        duration: 5000,
        icon: (
          <IconCheckSuccess
            size={14}
            className="h-6 w-6"
          />
        ),
      });
      // size={14}
      // className="h-6 w-6"
    } catch (error) {
      console.log(error);
      toast({
        title: "Claim failed",
        description: error?.message || error,
        variant: "error",
        duration: 5000,
        icon: <IconErrorToast />,
      });
    }
    setIsLoading(false);
  }, []);

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    setIsClaim(true);
  }, [data]);

  /**
   * RENDER
   */
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
          {!isClaim && <div className="ml-6">TODO</div>}
        </div>
      </div>

      <div className="mb-5 p-4 border border-white/15 rounded-lg mt-5">
        <RowItem label="You’ll  Receive">
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
