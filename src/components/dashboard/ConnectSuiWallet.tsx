import {
  ConnectButton,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Wallet, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ConnectSuiWallet = () => {
  const account = useCurrentAccount();
  const { data: balance } = useSuiClientQuery("getBalance", {
    owner: account?.address || "",
  });

  const handleProgrammaticConnect = () => {
    const connectButton = document.getElementById("hidden-connect-button");
    if (connectButton) {
      connectButton.click();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance: string) => {
    return (Number(balance) / 1e9).toFixed(2);
  };

  return (
    <div className="flex gap-4">
      <ConnectButton style={{ display: "none" }} id="hidden-connect-button" />

      {account ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-nova/10 hover:bg-nova/20 text-white flex items-center gap-2 border border-nova/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>{formatAddress(account.address)}</span>
                {balance && (
                  <span className="text-nova font-medium">
                    {formatBalance(balance.totalBalance)} SUI
                  </span>
                )}
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-nodo-darker border border-white/10">
            <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
              View on Explorer
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={handleProgrammaticConnect}
          className="bg-nova hover:bg-nova/90 text-white flex items-center gap-2"
        >
          Connect Wallet <Wallet className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ConnectSuiWallet;
