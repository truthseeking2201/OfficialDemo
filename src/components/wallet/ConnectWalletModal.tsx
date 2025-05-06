import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2, X } from "lucide-react";
import { useState } from "react";

import { useConnectWallet, useWallets } from "@mysten/dapp-kit";

interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnected?: () => void;
}

type WalletType = "Slush" | "Phantom";

const WALLETS = [
  {
    name: "Slush",
  },
  {
    name: "Phantom",
  },
];

export function ConnectWalletModal({
  open,
  onClose,
  onConnected,
}: ConnectWalletModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();

  const allowWallets = WALLETS.map((wallet) => {
    const foundWallet = wallets.find((w) => w.name === wallet.name);
    return {
      ...wallet,
      icon: foundWallet?.icon || null,
    };
  });

  const handleConnect = async (walletType: WalletType) => {
    try {
      setIsConnecting(true);
      setError(null);

      const foundWallet = wallets.find((wallet) => wallet.name === walletType);
      if (foundWallet) {
        connect(
          { wallet: foundWallet },
          {
            onSuccess: () => {
              setTimeout(() => {
                onClose();
                setConnectedWallet(null);
              }, 1000);
            },
            onError: (error) => {
              console.error("Failed to connect wallet:", error);
              setError(
                `Failed to connect to ${walletType} wallet. Please try again.`
              );
              setConnectedWallet(null);
            },
          }
        );
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(`Failed to connect to ${walletType} wallet. Please try again.`);
      setConnectedWallet(null);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-[#101112] border border-white/10 p-0 rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-0 relative">
          <button
            className="absolute right-6 top-6 rounded-full h-8 w-8 flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
            onClick={onClose}
            type="button"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-xl font-bold">
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-white/60">
            Choose a wallet to connect to Nodo AI Yield Vault
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-4">
          {error && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-500/10 border-red-500/20 text-red-400"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {allowWallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className={`w-full py-6 px-4 justify-start space-x-4 border-white/10 hover:bg-white/5 transition-all ${
                connectedWallet === wallet.name
                  ? "bg-[#4DA1F9]/10 border-[#4DA1F9]/30"
                  : ""
              }`}
              onClick={() => handleConnect(wallet.name as WalletType)}
              disabled={isConnecting}
            >
              <div className="h-10 w-10 rounded-full bg-[#4DA1F9] flex items-center justify-center">
                {wallet.icon && (
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-5 h-5"
                  />
                )}
              </div>
              <div className="text-left flex-1">
                <div className="font-medium">{wallet.name}</div>
                <div className="text-xs text-white/60">
                  Connect to your {wallet.name} Wallet
                </div>
              </div>
              {connectedWallet === wallet.name && isConnecting && (
                <Loader2 className="h-5 w-5 text-[#4DA1F9] animate-spin" />
              )}
            </Button>
          ))}
        </div>
        <div className="px-6 pb-6 pt-2 text-center">
          {isConnecting && !connectedWallet && (
            <div className="flex items-center justify-center mb-3 text-amber-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="text-sm">Connecting...</span>
            </div>
          )}
          <p className="text-xs text-white/60">
            By connecting your wallet, you agree to our{" "}
            <a href="#" className="text-amber-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
