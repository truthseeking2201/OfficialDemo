import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VaultData } from "@/types/vault";
import { useWallet } from "@/hooks/useWallet";
import { Clock, Wallet, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { NodoConnectWalletButton } from "../wallet/NodoConnectWalletButton";

interface SimplifiedDepositDrawerProps {
  open: boolean;
  onClose: () => void;
  vault: VaultData;
}

export function SimplifiedDepositDrawer({ open, onClose, vault }: SimplifiedDepositDrawerProps) {
  const { balance, deposit, isConnected } = useWallet();
  const [amount, setAmount] = useState<string>("0.00");
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  // Cooldown period in hours - for MVP this is fixed
  const cooldownPeriod = 24;
  const totalBalance = "200.00";
  const amountNum = parseFloat(amount || "0");
  const depositFee = "0.5%";

  // Deposit mutation
  const depositMutation = useMutation({
    mutationFn: async (params: { vaultId: string; amount: number }) => {
      return await deposit(params.vaultId, params.amount, cooldownPeriod);
    },
    onSuccess: (data) => {
      toast({
        title: "Deposit Successful",
        description: `${(parseFloat(amount) * 0.98).toFixed(2)} NODOAIx Tokens have been added to your wallet.`,
        variant: "default",
        duration: 5000,
      });

      window.dispatchEvent(new CustomEvent('deposit-success', {
        detail: { amount: parseFloat(amount), vaultId: vault.id }
      }));

      onClose();
    },
    onError: () => {
      toast({
        title: "Deposit Failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Handle tab change
  const handleTabChange = (tab: 'deposit' | 'withdraw') => {
    setActiveTab(tab);
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmount(value);
    }
  };

  // Handle max click
  const handleMaxClick = () => {
    setAmount(String(balance.usdc));
  };

  // Handle deposit button click
  const handleDepositClick = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    depositMutation.mutate({
      vaultId: vault.id,
      amount: parseFloat(amount)
    });
  };

  // If the dialog is not open, don't render anything
  if (!open) return null;

  // Forced check to ensure wallet connection state is respected
  const walletConnected = isConnected === true;

  // Render wallet connect UI if user is not connected
  if (!walletConnected) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-[460px] p-6 bg-black rounded-2xl border-none">
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FDEBCF]/20 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-[#FDEBCF]" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Connect Wallet First to see your Funds</h3>
              <p className="text-sm text-white/60 max-w-[280px]">
                You need to connect your wallet to deposit funds
              </p>
            </div>

            <NodoConnectWalletButton
              variant="default"
              size="lg"
              className="w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[460px] p-0 bg-black rounded-2xl border-none">
        {/* Tab Navigation */}
        <div className="flex w-full rounded-t-2xl overflow-hidden">
          <button
            onClick={() => handleTabChange('deposit')}
            className={`flex-1 py-4 px-3 flex justify-center items-center gap-2 ${
              activeTab === 'deposit' ? 'bg-black' : 'bg-white/10'
            }`}
          >
            <span className="text-xl">+</span>
            <span className="text-white">Deposit</span>
          </button>
          <button
            onClick={() => handleTabChange('withdraw')}
            className={`flex-1 py-4 px-3 flex justify-center items-center gap-2 ${
              activeTab === 'withdraw' ? 'bg-white/5' : 'bg-white/10'
            }`}
          >
            <span className="text-xl">↗</span>
            <span className="text-gray-200">Withdraw</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-5">
          {/* Total Balance Section */}
          <div className="space-y-2">
            <div className="text-gray-200">Total Balance</div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-orange-500 to-yellow-500"></div>
              <div className="text-5xl font-mono text-white">{totalBalance}</div>
            </div>
            <div className="text-gray-400 text-sm">1 NDLP ≈ 1 USDC</div>
          </div>

          {/* Deposit Amount Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-gray-200">Deposit Amount (USDC)</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xs text-white">L</span>
                </div>
                <div className="text-white">Balance: {balance.usdc} USDC</div>
              </div>
            </div>

            <div className="relative">
              <Input
                value={amount}
                onChange={handleAmountChange}
                className="bg-gray-800 border-none h-16 rounded-lg font-mono text-white text-3xl pl-4 pr-24"
              />
              <Button
                onClick={handleMaxClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 rounded-full text-xs bg-gradient-to-r from-orange-500 to-orange-400"
              >
                MAX
              </Button>
            </div>
          </div>

          {/* Deposit Summary Section */}
          <div className="space-y-4">
            <div className="text-white text-lg font-medium">Deposit Summary</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="text-gray-300">Amount</div>
                <div className="text-white">--</div>
              </div>
              <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                <div className="text-gray-300">To Receive</div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center z-10">
                      <span className="text-xs text-white">L</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-xs text-white">H</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-gray-300">Deposit fee</div>
                <div className="text-white">{depositFee}</div>
              </div>
            </div>
          </div>

          {/* Cooldown Warning */}
          <div className="bg-[#704214] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-yellow-500" />
              <div className="text-white font-medium">24-Hour Cooldown Period</div>
            </div>
            <p className="text-gray-300 text-sm">
              After confirming your deposit, there will be a 24-hour cooldown period if you wish to withdraw.
            </p>
          </div>

          {/* Deposit Button */}
          <Button
            onClick={handleDepositClick}
            disabled={depositMutation.isPending || amountNum <= 0}
            className="w-full h-14 rounded-lg text-xl font-medium bg-[#f8e7cb] text-black hover:bg-[#f1dfc0]"
          >
            {depositMutation.isPending ? "Processing..." : "Deposit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
