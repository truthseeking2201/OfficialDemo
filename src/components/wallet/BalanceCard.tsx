import { COIN_TYPES_CONFIG } from "@/config";
import { useMyAssets } from "@/hooks";

import arrowDown from "@/assets/icons/arrow-down.svg";

interface BalanceCardProps {
  className?: string;
}

export function BalanceCard({ className = "" }: BalanceCardProps) {
  const { assets } = useMyAssets();
  const ndlpAmount =
    assets.find((asset) => asset.coin_type === COIN_TYPES_CONFIG.NDLP_COIN_TYPE)
      ?.balance || 0;

  // Calculate equivalent USDC value (1:1 rate as per the example)
  const usdcEquivalent = ndlpAmount;

  // Format as dollar amount
  const formatDollar = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={`bg-black backdrop-blur-sm rounded-2xl p-6 ${className}`}>
      <h2 className="text-white text-2xl font-bold mb-6">Balance</h2>
      <div className="flex items-center gap-4">
        <img src="/coins/ndlp.png" alt="NDLP" className="w-10" />
        <div>
          <div>
            <div className="text-white/70 text-sm">You have</div>
            <div className="text-white text-3xl font-bold">
              {ndlpAmount} NDLP
            </div>
          </div>
          <div className="text-white/70 text-xs">1 NDLP = 1 USDC</div>
        </div>
      </div>

      <div className="ml-1 py-4">
        <img src={arrowDown} alt="Arrow Down" className="w-8 h-8" />
      </div>

      <div className="flex items-center gap-4">
        <img src="/coins/usdc.png" alt="USDC" className="w-10" />
        <div>
          <div className="text-white/70 text-sm">You will get</div>
          <div className="text-white text-3xl font-bold">
            {usdcEquivalent} USDC
          </div>
          <div className="text-white/70 text-xs">${usdcEquivalent}</div>
        </div>
      </div>
    </div>
  );
}
