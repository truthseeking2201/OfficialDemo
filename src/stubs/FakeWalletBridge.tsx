import React, { createContext, useContext, useState, useEffect } from 'react';
import { random } from 'lodash';
import phantomWallet from "@/assets/images/phantom-wallet.png";
import suiWallet from "@/assets/images/sui-wallet.png";
import { AlertCircle, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Fake Transaction implementation to replace @mysten/sui/transactions
export class Transaction {
  // Mock implementation for tracking objects and operations
  private objects: Record<string, any> = {};
  private operations: any[] = [];

  // Mocked methods
  object(objectId: string) {
    this.objects[objectId] = { id: objectId };
    return objectId;
  }

  splitCoins(primaryCoin: string, amounts: any[]) {
    this.operations.push({ 
      type: 'splitCoins', 
      primaryCoin, 
      amounts 
    });
    // Return a new coin identifier for each amount requested
    return amounts.map((_, index) => `split-coin-${index}-${Date.now()}`);
  }

  mergeCoins(primaryCoin: string, coinsToMerge: string[]) {
    this.operations.push({ 
      type: 'mergeCoins', 
      primaryCoin, 
      coinsToMerge 
    });
    return primaryCoin;
  }

  moveCall(params: any) {
    this.operations.push({ 
      type: 'moveCall', 
      ...params 
    });
    return { success: true };
  }

  // Mock for any other methods that might be needed
  pure = {
    u64: (value: number) => ({ type: 'u64', value }),
    bool: (value: boolean) => ({ type: 'bool', value }),
    string: (value: string) => ({ type: 'string', value }),
  };
}

// Type definitions to match @mysten/dapp-kit API
export type WalletName = 'Sui Wallet' | 'Phantom' | 'Suiet' | 'Ethos';

interface FakeAccount {
  address: string;
}

interface FakeWallet {
  name: string;
  icon: string;
  displayName: string;
  extensionUrl: string;
}

interface FakeWalletState {
  connected: boolean;
  walletName: WalletName | null;
  address: string | null;
}

interface FakeWalletContextType extends FakeWalletState {
  openConnectWalletDialog: () => void;
  closeConnectWalletDialog: () => void;
  disconnect: () => void;
  isConnectWalletDialogOpen: boolean;
}

// Create context
const FakeWalletContext = createContext<FakeWalletContextType | null>(null);

// Helpers
const WALLETS: FakeWallet[] = [
  {
    displayName: "Sui",
    name: "Slush",
    icon: suiWallet,
    description: "Connect to your Sui Wallet",
    extensionUrl:
      "https://chromewebstore.google.com/detail/slush-%E2%80%94-a-sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil",
  },
  {
    displayName: "Phantom",
    name: "Phantom",
    icon: phantomWallet,
    description: "Connect to your Phantom Wallet",
    extensionUrl: "https://phantom.app/download",
  },
];

// Generate deterministic address
const HEX = '0123456789abcdef';
const generateRandomAddress = () => {
  const prefix = '0x';
  const body = Array.from({ length: 40 }, () => 
    HEX[Math.floor(Math.random() * 16)]
  ).join('');
  return `${prefix}${body}`;
};

// FakeWalletProvider component
export const FakeWalletProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // State
  const [walletState, setWalletState] = useState<FakeWalletState>({
    connected: false,
    walletName: null,
    address: null,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Connect and disconnect functions
  const connectWallet = (walletName: WalletName) => {
    setWalletState({
      connected: true,
      walletName,
      address: generateRandomAddress(),
    });
  };

  const disconnectWallet = () => {
    setWalletState({
      connected: false,
      walletName: null,
      address: null,
    });
  };

  // Context value
  const contextValue: FakeWalletContextType = {
    ...walletState,
    openConnectWalletDialog: () => setIsDialogOpen(true),
    closeConnectWalletDialog: () => setIsDialogOpen(false),
    disconnect: disconnectWallet,
    isConnectWalletDialogOpen: isDialogOpen,
  };

  return (
    <FakeWalletContext.Provider value={contextValue}>
      {children}
      <ConnectWalletModal 
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        onConnected={(walletName) => {
          connectWallet(walletName);
          setIsDialogOpen(false);
        }}
      />
    </FakeWalletContext.Provider>
  );
};

// Hook implementations that mirror @mysten/dapp-kit API
export const useCurrentAccount = (): FakeAccount | null => {
  const context = useContext(FakeWalletContext);
  if (!context) {
    throw new Error('useCurrentAccount must be used within FakeWalletProvider');
  }
  return context.connected && context.address ? { address: context.address } : null;
};

export const useWalletModal = () => {
  const context = useContext(FakeWalletContext);
  if (!context) {
    throw new Error('useWalletModal must be used within FakeWalletProvider');
  }
  return {
    open: context.openConnectWalletDialog,
    disconnect: context.disconnect,
  };
};

export const useSignAndExecuteTransaction = () => {
  return {
    mutateAsync: async (options: any, callbacks?: any) => {
      // Generate fake digest
      const digest = '0x' + Array.from({ length: 64 }, () => 
        '0123456789abcdef'[Math.floor(Math.random() * 16)]
      ).join('');

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, random(600, 1000)));

      // Call success callback if provided
      if (callbacks?.onSuccess) {
        callbacks.onSuccess({ digest });
      }

      return { digest };
    }
  };
};

export const useSuiClient = () => {
  return {
    waitForTransaction: async ({ digest, options }: any) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, random(200, 400)));
      
      return {
        digest,
        events: [
          {
            type: 'vault::DepositEvent',
            parsedJson: {
              amount: 1000,
              lp: 995 // Assuming 0.5% fee
            }
          }
        ]
      };
    }
  };
};

// Mutations that mirror @mysten/dapp-kit API
export const useConnectWallet = () => {
  const context = useContext(FakeWalletContext);
  if (!context) {
    throw new Error('useConnectWallet must be used within FakeWalletProvider');
  }
  
  return {
    mutate: (params: any, options: any) => {
      setTimeout(() => {
        options.onSuccess?.();
      }, random(600, 1000));
    },
  };
};

export const useDisconnectWallet = () => {
  const context = useContext(FakeWalletContext);
  if (!context) {
    throw new Error('useDisconnectWallet must be used within FakeWalletProvider');
  }
  
  return {
    mutate: () => {
      context.disconnect();
    },
  };
};

export const useWallets = () => {
  return WALLETS.map(wallet => ({
    name: wallet.name,
    accounts: [],
    chains: [],
    features: {},
    icon: wallet.icon,
  }));
};

// ConnectWalletModal component (mimics the original one)
interface ConnectWalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnected?: (walletName: WalletName) => void;
}

function ConnectWalletModal({
  open,
  onClose,
  onConnected,
}: ConnectWalletModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const handleConnect = async (selectedWallet: FakeWallet) => {
    try {
      setIsConnecting(true);
      setError(null);
      setConnectedWallet(selectedWallet.name);
      
      // Simulate connection delay
      setTimeout(() => {
        if (onConnected) {
          onConnected(selectedWallet.displayName as WalletName);
        }
        setIsConnecting(false);
      }, random(600, 1000));
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError(
        `Failed to connect to ${selectedWallet.displayName} wallet. Please try again.`
      );
      setConnectedWallet(null);
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className="sm:max-w-[425px] bg-[#101112] border border-white/10 p-0 rounded-2xl"
        hideIconClose
        style={{
          boxShadow:
            "0px 10px 15px -3px rgba(255, 255, 255, 0.10), 0px 4px 6px -4px rgba(255, 255, 255, 0.10)",
        }}
      >
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
        <div className="p-6 space-y-4 font-sans">
          {error && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-500/10 border-red-500/20 text-red-400"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {WALLETS.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className={`w-full h-[56px] py-6 px-2 justify-start space-x-4 border-white/10 hover:bg-white/5 transition-all ${
                connectedWallet === wallet.name
                  ? "bg-[#4DA1F9]/10 border-[#4DA1F9]/30"
                  : ""
              }`}
              onClick={() => handleConnect(wallet)}
              disabled={isConnecting}
            >
              <div className="h-10 w-10 rounded-full flex items-center justify-center">
                {wallet.icon && <img src={wallet.icon} alt={wallet.name} />}
              </div>
              <div className="text-left flex-1">
                <div className="font-medium text-md">{wallet.displayName}</div>
                <div className="text-xs text-white/60">
                  Connect to your {wallet.displayName} Wallet
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