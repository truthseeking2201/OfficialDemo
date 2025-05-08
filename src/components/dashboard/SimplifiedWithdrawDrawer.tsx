import React, { useCallback, useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { UserInvestment } from "@/types/vault";
import { X, ArrowRight, Clock, CheckCircle, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { useWallet } from "@/hooks/useWallet";
import { NodoConnectWalletButton } from "../wallet/NodoConnectWalletButton";

interface SimplifiedWithdrawDrawerProps {
  open: boolean;
  onClose: () => void;
  investment?: UserInvestment | null;
}

export function SimplifiedWithdrawDrawer({ open, onClose, investment }: SimplifiedWithdrawDrawerProps) {
  const { isConnected } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [step, setStep] = useState<'amount' | 'confirmation' | 'success'>('amount');
  const [validationError, setValidationError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Cooldown period in hours
  const cooldownPeriod = 24;

  // Handle Escape key press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add event listener for Escape key
  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open, handleKeyDown]);

  // Reset state when drawer is opened
  useEffect(() => {
    if (open && investment) {
      setStep('amount');
      setAmount(investment.currentValue.toString());
      setValidationError("");
      setIsProcessing(false);
    }
  }, [open, investment]);

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmount(value);
      validateAmount(value);
    }
  };

  // Validate withdraw amount
  const validateAmount = (value: string) => {
    if (!value || !investment) {
      setValidationError("");
      return;
    }

    const numVal = parseFloat(value);
    if (isNaN(numVal) || numVal <= 0) {
      setValidationError("Please enter a valid amount");
    } else if (numVal > investment.currentValue) {
      setValidationError("Exceeds available balance");
    } else {
      setValidationError("");
    }
  };

  // Handle max click
  const handleMaxClick = () => {
    if (!investment) return;
    setAmount(investment.currentValue.toString());
    validateAmount(investment.currentValue.toString());
  };

  // Handle review click
  const handleReviewClick = () => {
    setStep('confirmation');
  };

  // Handle confirm withdrawal
  const handleConfirmWithdraw = () => {
    if (!amount || !investment || parseFloat(amount) <= 0 || parseFloat(amount) > investment.currentValue) return;

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      setShowConfetti(true);

      // Fire withdraw success event
      window.dispatchEvent(new CustomEvent('withdraw-success', {
        detail: {
          amount: parseFloat(amount),
          investmentId: investment.vaultId
        }
      }));

      // Show success toast
      toast({
        title: "Withdrawal Initiated",
        description: `Your withdrawal of $${parseFloat(amount).toFixed(2)} will be processed after the cooldown period.`,
        variant: "default",
        duration: 5000,
      });
    }, 1500);
  };

  // Handle close after success
  const handleCloseAfterSuccess = () => {
    onClose();
    // Reset the drawer state
    setTimeout(() => {
      setStep('amount');
      if (investment) {
        setAmount(investment.currentValue.toString());
      }
    }, 300);
  };

  // Formatting functions
  const formatCurrency = (value?: number) => {
    if (value === undefined) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  const amountNum = parseFloat(amount || "0");
  const isAmountValid = investment && amount !== "" && !isNaN(amountNum) && amountNum > 0 && amountNum <= investment.currentValue;
  const gasFeeNative = 0.006;
  const gasFeeUsd = 0.02;

  // If the drawer is not open, don't render anything
  if (!open) return null;

  // Forced check to ensure wallet connection state is respected
  // This is the key fix - we check isConnected at the very beginning of the component execution
  const walletConnected = isConnected === true;

  // Render wallet connect UI if user is not connected
  if (!walletConnected) {
    return (
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
        modal={true}
      >
        <DrawerContent
          className="sm:max-w-[400px] p-0 overflow-hidden"
        >
          <div className="pt-6 pb-4 px-5">
            <div className="flex justify-between items-center mb-4">
              <DrawerHeader className="p-0">
                <DrawerTitle className="text-lg font-bold text-white">
                  Withdraw Funds
                </DrawerTitle>
                <DrawerDescription className="text-xs text-white/60">
                  Connect your wallet to access your funds
                </DrawerDescription>
              </DrawerHeader>
              <DrawerClose asChild>
                <button
                  className="rounded-full h-7 w-7 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="sr-only">Close</span>
                </button>
              </DrawerClose>
            </div>

            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#FDEBCF]/20 flex items-center justify-center">
                <Wallet className="w-8 h-8 text-[#FDEBCF]" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">Connect Wallet First to see your Funds</h3>
                <p className="text-sm text-white/60 max-w-[280px]">
                  You need to connect your wallet to view your balance and make withdrawals
                </p>
              </div>

              <NodoConnectWalletButton
                variant="default"
                size="lg"
                className="w-full"
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // If user is connected but no investment is provided
  if (!investment) {
    return (
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) onClose();
        }}
        modal={true}
      >
        <DrawerContent
          className="sm:max-w-[400px] p-0 overflow-hidden"
        >
          <div className="pt-6 pb-4 px-5">
            <div className="flex justify-between items-center mb-4">
              <DrawerHeader className="p-0">
                <DrawerTitle className="text-lg font-bold text-white">
                  Withdraw Funds
                </DrawerTitle>
                <DrawerDescription className="text-xs text-white/60">
                  No investment found
                </DrawerDescription>
              </DrawerHeader>
              <DrawerClose asChild>
                <button
                  className="rounded-full h-7 w-7 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={onClose}
                >
                  <X className="h-3.5 w-3.5" />
                  <span className="sr-only">Close</span>
                </button>
              </DrawerClose>
            </div>

            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-xl font-bold text-white">No Investment Selected</h3>
                <p className="text-sm text-white/60 max-w-[280px]">
                  Please select an investment to withdraw from
                </p>
              </div>

              <Button
                onClick={onClose}
                className="w-full h-[42px] rounded-lg font-medium text-white bg-gradient-to-r from-[#FF8800] to-[#FFA822]"
              >
                Close
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      modal={true}
    >
      <DrawerContent
        className="sm:max-w-[400px] p-0 overflow-hidden"
      >
        <div className="pt-6 pb-4 px-5">
          <div className="flex justify-between items-center mb-4">
            <DrawerHeader className="p-0">
              <DrawerTitle className="text-lg font-bold text-white">
                {step === 'amount' && `Withdraw from ${investment.vaultId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
                {step === 'confirmation' && "Confirm Withdrawal"}
                {step === 'success' && "Withdrawal Initiated!"}
              </DrawerTitle>
              <DrawerDescription className="text-xs text-white/60">
                {step === 'amount' && "Enter your withdrawal amount"}
                {step === 'confirmation' && "Confirm your withdrawal details"}
                {step === 'success' && `Your withdrawal will be processed after a ${cooldownPeriod}-hour cooldown`}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerClose asChild>
              <button
                className="rounded-full h-7 w-7 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => {
                  if (step !== 'success') {
                    onClose();
                  }
                }}
              >
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Close</span>
              </button>
            </DrawerClose>
          </div>

          {/* Amount Step */}
          {step === 'amount' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <Label htmlFor="amount" className="text-xs font-medium text-[#9CA3AF]">Withdraw Amount</Label>
                  <div className="text-[#9CA3AF] text-xs">
                    Available: <span className="font-mono text-[#E5E7EB]">{formatCurrency(investment.currentValue)}</span>
                  </div>
                </div>
                <div className="relative">
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="font-mono text-right text-[#E5E7EB] border-[#28304B] focus-visible:ring-1 focus-visible:ring-[#F59E0B] focus-visible:border-[#F59E0B] bg-[#202124] h-10 rounded-lg shadow-inner text-base pr-16"
                    placeholder="$0"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleMaxClick}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 px-2 py-0 text-[10px] text-[#F59E0B] bg-[#F59E0B]/15 hover:bg-[#F59E0B]/20 rounded-full"
                  >
                    MAX
                  </Button>
                </div>
                {validationError && (
                  <p className="text-red-500 text-xs">{validationError}</p>
                )}
                <div className="text-xs text-[#9CA3AF] font-mono tracking-tight">
                  Gas ≈ {gasFeeNative} SUI (${gasFeeUsd})
                </div>
              </div>

              {/* Investment Summary */}
              <div className="bg-white/[0.02] rounded-[12px] p-3 border border-white/[0.06]">
                <h3 className="text-xs font-medium text-[#E5E7EB] mb-1.5">Investment Summary</h3>
                <div className="h-px bg-white/[0.06] mb-1.5"></div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <div className="text-[10px] text-[#9CA3AF]">Principal</div>
                    <div className="font-mono text-[11px] text-[#E5E7EB]">
                      {formatCurrency(investment.principal)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-[10px] text-[#9CA3AF]">Current Value</div>
                    <div className="font-mono text-[11px] text-[#E5E7EB]">
                      {formatCurrency(investment.currentValue)}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="text-[10px] text-[#9CA3AF]">Total Profit</div>
                    <div className="font-mono text-[11px] text-green-500">
                      +{formatCurrency(investment.profit)}
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.06] my-1.5"></div>

                  <div className="flex justify-between">
                    <div className="text-[10px] text-[#9CA3AF]">Remaining After</div>
                    <div className="font-mono font-semibold text-[11px] text-[#E5E7EB]">
                      {formatCurrency(investment.currentValue - amountNum)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooldown Period Notice */}
              <div className="bg-black/30 rounded-lg p-2.5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock size={14} className="text-white/70" />
                  <div className="text-xs font-medium text-white">Cooldown Period</div>
                </div>
                <p className="text-[10px] text-white/70">
                  After confirming your withdrawal, there will be a {cooldownPeriod}-hour cooldown period before funds are released.
                </p>
              </div>

              <Button
                onClick={handleReviewClick}
                disabled={!isAmountValid}
                className={`w-full h-[42px] rounded-lg font-mono text-sm text-white bg-gradient-to-r from-[#FF8800] to-[#FFA822] hover:shadow-[0_4px_12px_-2px_rgba(255,136,0,0.4)] transition-all duration-300 ${
                  isAmountValid ? 'opacity-100' : 'opacity-70 cursor-not-allowed bg-[#1F2937] text-[#6B7280]'
                }`}
                style={{ transition: "transform 80ms cubic-bezier(.22,1,.36,1), box-shadow 300ms ease-out" }}
              >
                Review Withdrawal
              </Button>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-3 border border-white/10">
                <h3 className="text-xs font-medium text-white mb-1.5">Withdrawal Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70">Amount</span>
                    <span className="text-xs font-medium text-white">{formatCurrency(amountNum)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70">Vault</span>
                    <span className="text-xs font-medium text-white">
                      {investment.vaultId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70">NODOAIx Impact</span>
                    <span className="text-xs font-medium text-[#FFA822]">-{Math.floor(amountNum * 0.8)} tokens</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-1.5 mt-1.5">
                    <span className="text-xs text-white/70">Gas Fee</span>
                    <span className="text-xs font-medium text-white">{gasFeeNative} SUI (${gasFeeUsd})</span>
                  </div>
                </div>
              </div>

              {/* Cooldown Period Notice in Confirmation */}
              <div className="bg-[#FFA82233] rounded-lg p-2.5 border border-[#FFA822]/30">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#FFA822]" />
                  <div className="text-xs font-medium text-white">{cooldownPeriod}-Hour Cooldown Period</div>
                </div>
                <p className="text-[10px] text-white/70 mt-1">
                  This withdrawal will be processed after a {cooldownPeriod}-hour cooldown period.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => setStep('amount')}
                  variant="outline"
                  className="w-full h-[40px] rounded-lg font-medium"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleConfirmWithdraw}
                  disabled={isProcessing}
                  className="w-full h-[40px] rounded-lg font-medium text-white bg-gradient-to-r from-[#FF8800] to-[#FFA822] hover:shadow-[0_4px_12px_-2px_rgba(255,136,0,0.4)] transition-all duration-300"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock size={14} />
                      </motion.div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Confirm Withdrawal"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Success Step */}
          {step === 'success' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center py-4">
                {/* Confetti Effect */}
                {showConfetti && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Confetti animation would go here */}
                  </div>
                )}

                {/* Success Icon */}
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-3">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">Withdrawal Initiated!</h3>
                <p className="text-xs text-white/60 text-center mb-3">
                  Your withdrawal has been queued for processing
                </p>

                <div className="w-full bg-white/5 rounded-lg p-3 border border-white/10 mb-3">
                  <div className="flex flex-col items-center">
                    <div className="text-[#FFA822] text-xs mb-1">Withdrawal Amount</div>
                    <div className="text-xl font-bold text-white mb-2">{formatCurrency(amountNum)}</div>

                    <div className="w-full px-3 py-2 bg-black/20 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#FFA822]" />
                        <span className="text-xs text-white/70">Cooldown Period:</span>
                      </div>
                      <span className="text-xs font-medium text-white">{cooldownPeriod} hours</span>
                    </div>

                    <div className="w-full mt-2 px-3 py-2 bg-black/20 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-white/70">Estimated Completion:</span>
                      </div>
                      <span className="text-xs font-medium text-white">
                        {new Date(Date.now() + cooldownPeriod * 60 * 60 * 1000).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCloseAfterSuccess}
                className="w-full h-[42px] rounded-lg font-mono text-sm text-white bg-gradient-to-r from-[#FF8800] to-[#FFA822] hover:shadow-[0_4px_12px_-2px_rgba(255,136,0,0.4)] transition-all duration-300"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
