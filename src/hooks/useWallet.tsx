import { create } from "zustand";
interface WalletState {
  isConnectWalletDialogOpen: boolean;
  setIsConnectWalletDialogOpen: (isConnectWalletDialogOpen: boolean) => void;
}

const useWalletStore = create<WalletState>((set) => ({
  isConnectWalletDialogOpen: false,
  setIsConnectWalletDialogOpen: (isConnectWalletDialogOpen: boolean) =>
    set({ isConnectWalletDialogOpen }),
}));

export const useWallet = () => {
  const { isConnectWalletDialogOpen, setIsConnectWalletDialogOpen } =
    useWalletStore((state) => state);

  return {
    isConnectWalletDialogOpen,
    openConnectWalletDialog: () => setIsConnectWalletDialogOpen(true),
    closeConnectWalletDialog: () => setIsConnectWalletDialogOpen(false),
  };
};
