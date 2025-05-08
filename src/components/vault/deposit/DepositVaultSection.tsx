import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import suiWallet from "@/assets/images/sui-wallet.png";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";

export default function WithdrawVaultSection() {
  const [depositAmount, setDepositAmount] = useState("");
  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;
  const address = currentAccount?.address;

  /**
   * FUNCTION
   */
  const handleDeposit = () => {
    if (isConnected) {
      // setIsDepositDrawerOpen(true);
    } else {
      // handleConnectWallet();
    }
  };

  const handleConnectWallet = () => {
    // Open the connect wallet modal
    // setIsConnectWalletModalOpen(true);
  };

  /**
   * LIFECYCLES
   */

  /**
   * RENDER
   */
  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      <div className="mb-6">
        <div className="flex justify-between">
          <div className="font-body text-075">Amount (USDC)</div>
          <div className="font-body text-075">
            Balance:{" "}
            <span className="font-mono">
              {isConnected ? "1250.45 USDC" : "--"}
            </span>
          </div>
        </div>
        <div className="relative mb-2 mt-2">
          <input
            type="text"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="0.00"
            className="input-vault w-full font-heading-lg"
          />
          {/* background: linear-gradient(90deg, #0090FF -29.91%, #FF6D9C 44.08%, #FB7E16 100%); */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex rounded-full mx-auto bg-gradient-to-tr from-[#0090FF] via-[#FF6D9C] to-[#FB7E16] p-px hover:opacity-70 transition-all duration-300">
            <button className="bg-[#202124] border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm font-medium">
              MAX
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 border border-white/15 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">You will get</div>
          <div className="flex items-center">
            <img src="/coins/ndlp.png" alt="NDLP" className="w-6 h-6 mr-1" />
            <span className="font-mono font-bold text-lg">710.00 NDLP</span>
          </div>
        </div>
        <hr className="w-full border-t border-white/15" />

        <div className="flex justify-between items-center mb-3 mt-3">
          <div className="font-caption text-075">Conversion Rate</div>
          <div className="font-mono text-white">1 USDC = 1.05 NDLP</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-caption text-075">Network</div>
          <div className="flex items-center">
            <img src={suiWallet} className="w-5 h-5 mr-2" />
            <span className="font-mono">SUI</span>
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        size="xl"
        onClick={isConnected ? handleDeposit : handleConnectWallet}
        className="w-full font-semibold text-lg"
      >
        {isConnected ? "Deposit" : "Connect Wallet"}
      </Button>
    </div>
  );
}
