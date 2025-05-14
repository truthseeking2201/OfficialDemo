import SuccessIcon from "../../../assets/images/deposit/success.png";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Loader } from "../../../components/ui/loader";
import { ExternalLink } from "lucide-react";
import { toast } from "../../../components/ui/sonner";

import { formatNumber } from "../../../lib/number";
import { formatAmount } from "../../../lib/utils";
import { truncateBetween } from "../../../utils/truncate";

interface DepositModalProps {
  isOpen: boolean;
  depositStep: number;
  onOpenChange: () => void;
  onDeposit?: () => void;
  onDepositSuccess?: () => void;
  onDone?: () => void;
  confirmData: {
    amount: number;
    apr: number;
    ndlp: number;
    conversionRate: number;
  };
  loading: boolean;
  depositSuccessData: any;
}

const DepositModal = (props: DepositModalProps) => {
  const {
    isOpen,
    depositStep,
    onOpenChange,
    onDeposit,
    onDone,
    confirmData,
    depositSuccessData,
    loading,
  } = props;

  const { amount, apr, ndlp, conversionRate } = confirmData;

  const suiScanUrl = `https://suiscan.xyz/${
    import.meta.env.VITE_SUI_NETWORK || 'mainnet'
  }/tx/${depositSuccessData?.digest}`;

  const handleDeposit = () => {
    onDeposit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent hideIconClose>
        <DialogHeader>
          {depositStep === 1 && (
            <>
              <DialogTitle>Confirm Your Deposit</DialogTitle>
            </>
          )}
        </DialogHeader>
        <DialogDescription>
          {depositStep === 1 && (
            <div className="flex flex-col gap-2 p-4 border border-white/15 rounded-xl bg-white/5">
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Amount</span>
                <span className="font-mono text-lg text-white">
                  {formatNumber(amount || 0)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">APR</span>
                <span className="font-mono text-lg text-white">
                  {formatNumber(apr || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">
                  Conversation Rate
                </span>
                <span className="font-mono text-lg text-white">
                  1 USDC = {formatAmount({ amount: conversionRate })} NDLP
                </span>
              </div>
              <div className="border-t border-white/15 my-2" />
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">You'll Receive</span>
                <div className="font-mono font-bold text-lg flex items-center gap-1">
                  <img
                    src="/coins/ndlp.png"
                    alt="NDLP"
                    className="w-6 h-6 mr-1"
                  />
                  {formatNumber(ndlp || 0)} NDLP
                </div>
              </div>
            </div>
          )}
          {depositStep === 2 && (
            <div className="flex flex-col gap-2">
              <img
                src={SuccessIcon}
                alt="Success"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="text-center text-xl font-bold my-4">
                Deposit Successful!
              </h3>
              <div className="text-center text-base mb-2 text-[#9CA3AF]">
                Your deposit of {formatNumber(amount || 0)} USDC to Nodo AI
                Vault was successful.
              </div>
              <div className="flex flex-col gap-2 p-4 border border-white/15 rounded-lg bg-white/5">
                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">Amount</span>
                  <span className="font-mono text-lg text-white">
                    {formatNumber(amount || 0)} USDC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">APR</span>
                  <span className="font-mono text-lg text-white">
                    {formatNumber(apr || 0)}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">
                    Conversation Rate
                  </span>
                  <span className="font-mono text-lg text-white">
                    1 USDC = {formatAmount({ amount: conversionRate })} NDLP
                  </span>
                </div>

                <div className="flex justify-between p-2 border border-orange-500/20 rounded-lg bg-orange-500/10 mt-2">
                  <div className="font-mono font-bold text-xs flex items-center gap-1">
                    <img
                      src="/coins/ndlp.png"
                      alt="NDLP"
                      className="w-6 h-6 mr-1"
                    />
                    NDLP Received
                  </div>
                  <span className="font-mono font-bold text-lg text-[#FFA822]">
                    {formatAmount({
                      amount: ndlp,
                    })}{" "}
                    NDLP
                  </span>
                </div>

                <div className="flex justify-center gap-2 mt-2">
                  <ExternalLink size={16} className="text-[#9CA3AF]" />
                  <a
                    href={suiScanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9CA3AF] hover:text-white transition duration-300"
                  >
                    Tx Hash:{" "}
                    {truncateBetween(depositSuccessData?.digest || "", 6, 6)}
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
          {depositStep === 1 && (
            <div className="flex gap-2 w-full">
              <Button
                onClick={onOpenChange}
                variant="outline"
                size="lg"
                className="w-full bg-white/5"
              >
                Back
              </Button>
              <Button
                onClick={handleDeposit}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                Confirm Deposit
              </Button>
            </div>
          )}
          {depositStep === 2 && (
            <div className="w-full">
              <Button
                onClick={() => {
                  // Show toast notification when deposit is completed
                  toast("Deposit successful", {
                    description: `Your ${formatNumber(amount || 0)} USDC deposit has been confirmed.`,
                    data: { variant: "success" }
                  });
                  onDone();
                }}
                size="lg"
                variant="primary"
                className="w-full"
              >
                Done
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;