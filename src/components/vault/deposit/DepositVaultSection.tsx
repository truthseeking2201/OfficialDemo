import { Zap, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
    <div className="p-6 bg-black rounded-b-2xl">
      <div className="mb-6">
        <div className="flex justify-between">
          <div className="font-body text-075">Amount (USDC)</div>
          <div className="font-body text-075">
            Balance: {isConnected ? "1250.45 USDC" : "--"}
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
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm">
            MAX
          </button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-surface-075 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">You will get</div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-brand-orange-light flex items-center justify-center mr-2">
              <Zap
                size={12}
                className="text-surface-000"
              />
            </div>
            <span>--</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">Conversion Rate</div>
          <div>18.7%</div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">Transaction Fee</div>
          <div>--</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="font-caption text-075">Network</div>
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center mr-2">
              <span className="text-xs text-white font-bold">S</span>
            </div>
            <span>SUI</span>
          </div>
        </div>
      </div>

      <button
        className="btn btn-primary w-full flex items-center justify-center"
        onClick={isConnected ? handleDeposit : handleConnectWallet}
      >
        <span>{isConnected ? "Deposit" : "Connect Wallet"}</span>
        <ArrowRight
          size={16}
          className="ml-2"
        />
      </button>
    </div>
  );
}
