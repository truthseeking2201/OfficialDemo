import { useState, useCallback } from "react";
import { useWallet } from "@/hooks/useWallet";
import suiWallet from "@/assets/images/sui-wallet.png";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useMyAssets } from "@/hooks/useMyAssets";
import { COIN_TYPES_CONFIG } from "@/config/coin-config";
import { formatNumber } from "@/utils/format";
import { FormattedNumberInput } from "@/components/ui/formatted-number-input";

export default function DepositVaultSection() {
  const [depositAmount, setDepositAmount] = useState("");
  const [conversionRate, setConversionRate] = useState<number | null>(1.05);
  const [error, setError] = useState<string>("");
  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;

  const { openConnectWalletDialog } = useWallet();
  const { assets } = useMyAssets();

  const usdcCoin = assets.find(
    (asset) => asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE
  );

  const handleValidateDepositAmount = useCallback((value: string) => {
    if (value && Number(value) < 1) {
      setError("Minimum amount is 1 USDC.");
      return;
    }

    if (value && Number(value) > Number(usdcCoin?.balance)) {
      setError("Not enough balance to deposit. Please top-up your wallet.");
      return;
    }

    setError("");
  }, [usdcCoin?.balance]);

  const handleMaxAmount = useCallback(() => {
    handleValidateDepositAmount(usdcCoin?.balance.toFixed(2));
    setDepositAmount(usdcCoin?.balance.toFixed(2));
  }, [usdcCoin?.balance, handleValidateDepositAmount]);

  const handleConnectWallet = useCallback(() => {
    openConnectWalletDialog();
  }, [openConnectWalletDialog]);

  const handleDeposit = useCallback(() => {
    if (isConnected) {
      // TODO: Handle deposit
    } else {
      handleConnectWallet();
    }
  }, [isConnected, handleConnectWallet]);

  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      <div className="mb-6">
        <div className="flex justify-between">
          <div className="font-body text-075">Amount (USDC)</div>
          <div className="font-body text-075">
            Balance:{" "}
            <span className="font-mono">
              {isConnected ? `${formatNumber(usdcCoin?.balance || 0)} USDC` : "--"}
            </span>
          </div>
        </div>
        <div className="relative mb-2 mt-2">
          <FormattedNumberInput
            value={depositAmount}
            onChange={setDepositAmount}
            onValidate={handleValidateDepositAmount}
            placeholder="0.00"
            className="input-vault w-full font-heading-lg"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex rounded-full mx-auto bg-gradient-to-tr from-[#0090FF] via-[#FF6D9C] to-[#FB7E16] p-px hover:opacity-70 transition-all duration-300">
            <button 
              onClick={handleMaxAmount}
              className="bg-[#202124] border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm font-medium"
            >
              MAX
            </button>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-1">
            {error}
          </div>
        )}
      </div>

      <div className="mb-6 p-4 border border-white/15 rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">You will get</div>
          <div className="flex items-center">
            <img src="/coins/ndlp.png" alt="NDLP" className="w-6 h-6 mr-1" />
            <span className="font-mono font-bold text-lg">
              {conversionRate ? `${formatNumber(Number(depositAmount || 0) * conversionRate)} NDLP` : "--"}
            </span>
          </div>
        </div>
        <hr className="w-full border-t border-white/15" />

        <div className="flex justify-between items-center mb-3 mt-3">
          <div className="font-caption text-075">Conversion Rate</div>
          <div className="font-mono text-white">
            {conversionRate ? `1 USDC = ${formatNumber(conversionRate)} NDLP` : "Unable to fetch conversion rate. Please try again later."}
          </div>
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
        disabled={!!error}
      >
        {isConnected ? "Deposit" : "Connect Wallet"}
      </Button>
    </div>
  );
}
