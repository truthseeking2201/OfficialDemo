import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SuccessIcon from "@/assets/images/deposit/success.png";
import { ExternalLink } from "lucide-react";
import { formatNumber } from "@/lib/number";
import { truncateBetween } from "@/utils/truncate";

const DepositModal = (props: any) => {
  const { isOpen, onOpenChange, onDeposit, request } = props;
  const [step, setStep] = useState<number>(1);

  const handleDeposit = () => {
    console.log("Deposit clicked");
    onDeposit();
    setStep(2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent hideIconClose={step === 2}>
        <DialogHeader>
          {step === 1 && (
            <>
              <DialogTitle>Confirm Your Deposit</DialogTitle>
              <DialogTrigger className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Close</span>
              </DialogTrigger>
            </>
          )}
        </DialogHeader>
        <DialogDescription>
          {step === 1 && (
            <div className="flex flex-col gap-2 p-4 border border-white/15 rounded-lg bg-white/5">
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Amount</span>
                <span className="font-mono text-lg">
                  {formatNumber(request.amount || 0)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">APR</span>
                <span className="font-mono text-lg">
                  {formatNumber(request.apr || 0)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Est. Return</span>
                <span className="font-mono text-lg">
                  {formatNumber(request.estReturn || 0)} USDC
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">Total Value</span>
                <span className="font-mono text-lg">
                  ${formatNumber(request.totalValue || 0)} USDC
                </span>
              </div>
              <div className="border-t border-white/15 my-2" />
              <div className="flex justify-between">
                <span className="text-base text-[#9CA3AF]">You’ll Receive</span>
                <div className="font-mono font-bold text-lg flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                  </div>
                  {formatNumber(request.ndlp || 0)} NDLP
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-2">
              <img
                src={SuccessIcon}
                alt="Success"
                className="w-16 h-16 mx-auto"
              />
              <h3 className="text-center text-2xl font-bold mb-4">
                Deposit Successful!
              </h3>
              <div className="text-center text-lg mb-2 text-[#9CA3AF]">
                Your deposit of {formatNumber(request.amount || 0)} USDC to Nodo
                AI Vault was successful.
              </div>
              <div className="flex flex-col gap-2 p-4 border border-white/15 rounded-lg bg-white/5">
                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">Amount</span>
                  <span className="font-mono text-lg">
                    {formatNumber(request.amount || 0)} USDC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base text-[#9CA3AF]">APR</span>
                  <span className="font-mono text-lg">
                    {formatNumber(request.apr || 0)}%
                  </span>
                </div>

                <div className="flex justify-between p-2 border border-orange-500/20 rounded-lg bg-orange-500/10 mt-2">
                  <div className="font-mono font-bold text-xs flex items-center gap-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 flex items-center justify-center mr-2">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    NDLP Received
                  </div>
                  <span className="font-mono text-lg text-[#FFA822]">
                    {formatNumber(request.ndlp || 0)} NDLP
                  </span>
                </div>

                <div className="flex justify-center gap-2 mt-2">
                  <ExternalLink size={16} className="text-[#9CA3AF]" />
                  <a
                    href="https://etherscan.io/tx/0x1234567890abcdef"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9CA3AF] hover:text-white transition duration-300"
                  >
                    Tx Hash: {truncateBetween(request.txHash || "", 6, 6)}
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogDescription>
        <DialogFooter>
          {step === 1 && (
            <div className="flex gap-2 w-full">
              <Button
                onClick={onOpenChange}
                variant="outline"
                className="w-full"
              >
                Back
              </Button>
              <Button
                onClick={handleDeposit}
                variant="primary"
                className="w-full"
              >
                Confirm Deposit
              </Button>
            </div>
          )}
          {step === 2 && (
            <div className="w-full">
              <Button
                onClick={onOpenChange}
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
