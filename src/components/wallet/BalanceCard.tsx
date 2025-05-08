import React from 'react';
import { useWallet } from '@/hooks/useWallet';
import { ChevronDown, DollarSign } from 'lucide-react';

interface BalanceCardProps {
  className?: string;
}

export function BalanceCard({ className = '' }: BalanceCardProps) {
  const { balance } = useWallet();

  // NDLP tokens (receipt tokens from the vault)
  const ndlpAmount = balance?.receiptTokens || 0;

  // Calculate equivalent USDC value (1:1 rate as per the example)
  const usdcEquivalent = ndlpAmount;

  // Format as dollar amount
  const formatDollar = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className={`bg-black/80 backdrop-blur-sm rounded-3xl p-6 ${className}`}>
      <h2 className="text-white text-2xl font-bold mb-8">Balance</h2>

      {/* NDLP Balance Section */}
      <div className="flex items-center mb-2">
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 flex items-center justify-center mr-4">
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
        <div>
          <div className="text-gray-400 text-sm">You have</div>
          <div className="text-white text-3xl font-bold">{ndlpAmount} NDLP</div>
        </div>
      </div>

      <div className="text-gray-400 text-sm ml-[72px] mb-4">1 NDLP = 1 USDC</div>

      {/* Arrow Divider */}
      <div className="flex justify-center my-6">
        <ChevronDown className="text-gray-500" size={28} />
      </div>

      {/* USDC Equivalent Section */}
      <div className="flex items-center mb-1">
        <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center mr-4">
          <DollarSign className="text-white" size={24} />
        </div>
        <div>
          <div className="text-gray-400 text-sm">You will get</div>
          <div className="text-white text-3xl font-bold">{usdcEquivalent} USDC</div>
        </div>
      </div>

      <div className="text-gray-400 text-sm ml-[72px]">${usdcEquivalent}</div>
    </div>
  );
}
