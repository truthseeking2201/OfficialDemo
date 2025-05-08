import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";

interface ConnectedWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectedWalletDialog({ open, onClose }: ConnectedWalletDialogProps) {
  const { address, balance, disconnect } = useWallet();
  const [copied, setCopied] = React.useState(false);
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Format wallet address for display
  const formatFullAddress = (address: string) => {
    if (!address) return '';
    return `0x${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#14151A] border-none text-white sm:max-w-md p-0 rounded-xl">
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 w-10 h-10 rounded-full flex items-center justify-center">
                <div className="text-black">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.97 8.28L16.15 4.46C15.76 4.07 15.21 3.89 14.66 3.96C14.1 4.03 13.61 4.34 13.31 4.81L13.06 5.23C12.66 5.93 12.99 6.8 13.74 7.11C14.03 7.24 14.29 7.45 14.44 7.73L15.75 9.9C15.95 10.26 15.84 10.69 15.5 10.93L15.3 11.06C14.89 11.35 14.33 11.16 14.14 10.7L14.12 10.66C13.95 10.27 13.67 9.94 13.32 9.7L11.72 8.68C11.5 8.53 11.24 8.45 10.98 8.45C10.73 8.45 10.49 8.5 10.27 8.6L5.15 11.25C4.45 11.61 4 12.33 4 13.12V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V9.6C20 9.12 19.53 8.76 19.07 8.87L18.5 9.01C18.21 9.08 17.9 8.85 17.9 8.55V8.23C17.9 8.1 17.97 7.98 18.09 7.92L19.2 7.37C19.59 7.17 19.91 7.79 19.97 8.28ZM12 17C11.45 17 11 16.55 11 16C11 15.45 11.45 15 12 15C12.55 15 13 15.45 13 16C13 16.55 12.55 17 12 17ZM15 17C14.45 17 14 16.55 14 16C14 15.45 14.45 15 15 15C15.55 15 16 15.45 16 16C16 16.55 15.55 17 15 17ZM9 17C8.45 17 8 16.55 8 16C8 15.45 8.45 15 9 15C9.55 15 10 15.45 10 16C10 16.55 9.55 17 9 17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-bold">Connected Wallet</h2>
            </div>
            <Button
              variant="ghost"
              className="rounded-full p-2 h-auto hover:bg-white/10"
              onClick={onClose}
            >
              <RefreshCw size={20} className="text-white" />
            </Button>
          </div>

          {/* Wallet Address */}
          <div className="p-6 border-b border-white/10">
            <p className="text-gray-400 mb-2">Wallet Address</p>
            <div className="flex items-center justify-between bg-[#1E1F25] rounded-lg p-4">
              <span className="text-lg font-mono">{formatFullAddress(address || '')}</span>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-white/10 p-2 h-auto"
                onClick={handleCopyAddress}
              >
                <Copy size={20} className="text-white" />
              </Button>
            </div>
          </div>

          {/* Balance */}
          <div className="p-6 border-b border-white/10">
            <p className="text-gray-400 mb-2">Balance</p>
            <div className="space-y-2">
              {/* USDC Balance */}
              <div className="flex items-center justify-between bg-[#1E1F25] rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">$</span>
                  </div>
                  <span className="font-medium">USDC</span>
                </div>
                <span className="font-medium">{balance?.usdc.toFixed(2)}</span>
              </div>

              {/* NDLP Balance */}
              <div className="flex items-center justify-between bg-[#1E1F25] rounded-lg p-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-300 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                  </div>
                  <span className="font-medium">NDLP</span>
                </div>
                <span className="font-medium">{balance?.receiptTokens.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Disconnect Button */}
          <div className="p-6">
            <Button
              onClick={handleDisconnect}
              className="w-full bg-[#F5EBD7] text-black hover:bg-[#F5EBD7]/90 h-12 rounded-xl font-medium"
            >
              <LogOut size={18} className="mr-2" /> Disconnect
            </Button>
          </div>

          {/* Footer */}
          <div className="p-6 pt-2 flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Secure Connection</span>
            </div>
            <div>Last checked: {formattedTime}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
