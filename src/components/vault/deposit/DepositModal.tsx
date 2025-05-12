import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import SuccessIcon from "@/assets/images/deposit/success.png";
import { ExternalLink, X } from "lucide-react";
import { Loader } from "@/components/ui/loader";

import { formatNumber } from "@/lib/number";
import { truncateBetween } from "@/utils/truncate";

interface DepositModalProps {
  isOpen: boolean;
  depositStep: number;
  onOpenChange: () => void;
  onDeposit?: () => void;
  onDepositSuccess?: () => void;
  confirmData: {
    amount: number;
    apr: number;
    estReturn: number;
    ndlp: number;
    txHash: string;
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
    confirmData,
    depositSuccessData,
    loading,
  } = props;

  const { amount, apr, estReturn, ndlp } = confirmData;

  const totalValue = useMemo(() => {
    return amount + estReturn;
  }, [amount, estReturn]);

  const suiScanUrl = `https://suiscan.xyz/${
    import.meta.env.VITE_SUI_NETWORK
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
              <button
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 p-2 text-gray-400 hover:text-gray-600"
                onClick={onOpenChange}
              >
                <X size={20} className="text-white" />
              </button>
            </>
          )}
        </DialogHeader>
        <DialogDescription>
          {depositStep === 1 && (
            <div className="flex flex-col gap-2 p-4 border border-white/15 rounded-xl bg-white/5">
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Amount</span>
                <span className="font-mono text-lg">
                  {formatNumber(amount || 0)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">APR</span>
                <span className="font-mono text-lg">
                  {formatNumber(apr || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Est. Return</span>
                <span className="font-mono text-lg">
                  {formatNumber(estReturn || 0)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Total Value</span>
                <span className="font-mono text-lg">
                  ${formatNumber(totalValue || 0)} USDC
                </span>
              </div>
              <div className="border-t border-white/15 my-2" />
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">You’ll Receive</span>
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
                  <span className="font-mono text-lg">
                    {formatNumber(amount || 0)} USDC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">APR</span>
                  <span className="font-mono text-lg">
                    {formatNumber(apr || 0)}%
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
                    {formatNumber(ndlp || 0)} NDLP
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
                onClick={onOpenChange}
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
