import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/useWallet";
import { ConnectedWalletDialog } from './ConnectedWalletDialog';
import { ConnectWalletModal } from './ConnectWalletModal';

interface NodoConnectWalletButtonProps {
  variant?: 'default' | 'outline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function NodoConnectWalletButton({
  variant = 'default',
  size = 'md',
  className = '',
  onClick
}: NodoConnectWalletButtonProps) {
  const { isConnected, address } = useWallet();
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Handle button click
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!isConnected) {
      // Open wallet selection modal
      setIsConnectModalOpen(true);
    } else {
      // If wallet is connected, open the wallet dialog
      setIsWalletDialogOpen(true);
    }
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Get button size class
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'lg':
        return 'py-3 px-6 text-lg';
      case 'md':
      default:
        return 'py-2 px-4 text-base';
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={`font-semibold rounded-lg transition-all whitespace-nowrap ${getSizeClass()} ${isConnected ? 'bg-black/30 backdrop-blur-sm border border-white/10 hover:bg-black/40' : 'bg-[#FDEBCF] text-black hover:bg-[#FDEBCF]/90'} ${className}`}
      >
        {isConnected ? formatAddress(address || '') : 'Connect Wallet'}
      </Button>

      {/* Connected Wallet Dialog */}
      <ConnectedWalletDialog
        open={isWalletDialogOpen}
        onClose={() => setIsWalletDialogOpen(false)}
      />

      {/* Connect Wallet Modal */}
      <ConnectWalletModal
        open={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
    </>
  );
}
