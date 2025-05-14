import React, { useState, useEffect } from 'react';
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { useToast } from "../../../hooks/use-toast";
import { toast } from "../../../components/ui/sonner";
import { useWalletModal } from "../../../stubs/FakeWalletBridge";
import { useClaimMutation } from "../../../stubs/fakeQueries";

interface WithdrawTimerCardProps {
  pendingWithdrawal: {
    id: string;
    amount: number;
    unlockTime: number;
  };
}

export const WithdrawTimerCard: React.FC<WithdrawTimerCardProps> = ({ pendingWithdrawal }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const { toast } = useToast();
  const { open: openWalletModal } = useWalletModal();
  const claimMutation = useClaimMutation();

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const remaining = Math.max(0, pendingWithdrawal.unlockTime - now);
      setTimeRemaining(remaining);
    };

    // Calculate initially
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Clean up interval
    return () => clearInterval(interval);
  }, [pendingWithdrawal]);

  // Format time remaining as hh:mm:ss
  const formatTimeRemaining = () => {
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle claim button click
  const handleClaim = async () => {
    try {
      // Simulate wallet signature modal
      openWalletModal();
      
      // Wait a bit to simulate wallet interaction
      setTimeout(async () => {
        try {
          // Execute claim
          await claimMutation.mutateAsync(pendingWithdrawal.id);
          
          // Show success toast
          toast({
            title: "Claim successful",
            description: `You have successfully claimed ${pendingWithdrawal.amount} USDC from your withdrawal.`,
            variant: "default",
          });
          
          // Show custom toast notification
          toast("Claim successful", {
            description: `Your ${pendingWithdrawal.amount} USDC withdrawal has been claimed.`,
            data: { variant: "success" }
          });
        } catch (error) {
          toast({
            title: "Claim failed",
            description: "Failed to claim your withdrawal. Please try again.",
            variant: "destructive",
          });
        }
      }, 1500);
    } catch (error) {
      // Handle errors
      console.error("Claim error:", error);
      toast({
        title: "Claim failed",
        description: "Failed to claim your withdrawal. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Withdrawal in Progress</h3>
            <div className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              {formatTimeRemaining()}
            </div>
          </div>
          
          <div className="flex flex-col space-y-3 bg-black/20 p-4 rounded-lg border border-white/5">
            <div className="flex justify-between">
              <span className="text-white/60">Amount</span>
              <span className="font-medium">{pendingWithdrawal.amount} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Network Fee</span>
              <span className="font-medium">{(pendingWithdrawal.amount * 0.005).toFixed(2)} USDC (0.5%)</span>
            </div>
            <div className="border-t border-white/10 my-1"></div>
            <div className="flex justify-between">
              <span className="text-white/60">You will receive</span>
              <span className="font-medium">{(pendingWithdrawal.amount * 0.995).toFixed(2)} USDC</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Button 
              className="w-full gradient-bg-nova hover:shadow-neon-nova"
              disabled={timeRemaining > 0}
              onClick={handleClaim}
              aria-label={timeRemaining > 0 ? "Claim available after cooldown period" : "Claim your withdrawal"}
            >
              {timeRemaining > 0 ? "Claim Available Soon" : "Claim"}
            </Button>
            
            {timeRemaining > 0 && (
              <p className="text-xs text-white/60 text-center mt-2">
                Your withdrawal will be available to claim in {formatTimeRemaining()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};