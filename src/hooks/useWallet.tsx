import { useConnectWallet, useCurrentAccount } from "../stubs/FakeWalletBridge";
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
  const account = useCurrentAccount();

  const { isConnectWalletDialogOpen, setIsConnectWalletDialogOpen } =
    useWalletStore((state) => state);

  return {
    isConnected: !!account?.address,
    isConnectWalletDialogOpen,
    openConnectWalletDialog: () => setIsConnectWalletDialogOpen(true),
    closeConnectWalletDialog: () => setIsConnectWalletDialogOpen(false),
  };
};
