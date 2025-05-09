import { useState, useCallback } from "react";
import { useWallet } from "@/hooks/useWallet";
import suiWallet from "@/assets/images/sui-wallet.png";
import { Button } from "@/components/ui/button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useMyAssets } from "@/hooks/useMyAssets";
import { COIN_TYPES_CONFIG } from "@/config/coin-config";
import DepositModal from "@/components/vault/deposit/DepositModal";
import { formatNumber } from "@/lib/number";
import { FormattedNumberInput } from "@/components/ui/formatted-number-input";
import { AlertCircle } from "lucide-react";

const mockData = {
  amount: 1000,
  apr: 18.7,
  estReturn: 10.76,
  totalValue: 1010.76,
  youWillReceive: 1050,
  conversionRate: 1.05,
  ndlp: 1050,
  txHash:
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
};

export default function DepositVaultSection() {
  const [depositAmount, setDepositAmount] = useState("");
  const [conversionRate, setConversionRate] = useState<number | null>(1.05);
  const [error, setError] = useState<string>("");
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;

  const { openConnectWalletDialog } = useWallet();
  const { assets } = useMyAssets();

  const usdcCoin = assets.find(
    (asset) => asset.coin_type === COIN_TYPES_CONFIG.USDC_COIN_TYPE
  );

  const handleValidateDepositAmount = useCallback(
    (value: string) => {
      if (value && Number(value) < 1) {
        setError("Minimum amount is 1 USDC.");
        return;
      }

      if (value && Number(value) > Number(usdcCoin?.balance)) {
        setError("Not enough balance to deposit. Please top-up your wallet.");
        return;
      }

      setError("");
    },
    [usdcCoin?.balance]
  );

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
      setIsDepositModalOpen(true);
    } else {
      handleConnectWallet();
    }
  }, [isConnected, handleConnectWallet]);

  const handleCloseDepositDrawer = useCallback(() => {
    setIsDepositModalOpen(false);
  }, []);

  const handleSendRequestDeposit = useCallback(() => {
    // TODO: Handle deposit request
    console.log("Deposit request sent with amount:", depositAmount);
  }, [depositAmount]);

  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      <div className="mb-6">
        <div className="flex justify-between">
          <div className="font-body text-075 !font-medium">Amount (USDC)</div>
          <div className="font-body text-075">
            Balance:{" "}
            <span className="font-mono text-text-primary">
              {isConnected
                ? `${formatNumber(usdcCoin?.balance || 0)} USDC`
                : "--"}
            </span>
          </div>
        </div>
        <FormattedNumberInput
          value={depositAmount}
          onChange={setDepositAmount}
          onValidate={handleValidateDepositAmount}
          onMaxAmount={handleMaxAmount}
          placeholder="0.00"
          className="input-vault w-full font-heading-lg"
        />
        {error && (
          <div className="text-red-error text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
      </div>

      <div className="mb-6 p-4 border border-white/15 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="font-caption text-075">You will get</div>
          <div className="flex items-center">
            <img src="/coins/ndlp.png" alt="NDLP" className="w-6 h-6 mr-1" />
            <span className="font-mono font-bold text-lg">
              {conversionRate
                ? `${formatNumber(
                    Number(depositAmount || 0) * conversionRate
                  )} NDLP`
                : "--"}
            </span>
          </div>
        </div>
        <hr className="w-full border-t border-white/15" />

        <div className="flex justify-between items-center mb-3 mt-3">
          <div className="font-caption text-075">Conversion Rate</div>
          <div className="font-mono text-white">
            {conversionRate
              ? `1 USDC = ${formatNumber(conversionRate)} NDLP`
              : "Unable to fetch conversion rate. Please try again later."}
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

      <DepositModal
        isOpen={isDepositModalOpen}
        onOpenChange={handleCloseDepositDrawer}
        onDeposit={handleSendRequestDeposit}
        request={mockData}
      />
    </div>
  );
}
