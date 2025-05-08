import React from "react";
import { useWallet } from "@/hooks/useWallet";
import { Zap, PlusCircle, RefreshCw, Lock } from "lucide-react";
import { BalanceCard } from "@/components/wallet/BalanceCard";

const RightContent = () => {
  const { isConnected, balance } = useWallet();

  return (
    <div className="max-w-[300px] flex-shrink-0">
      {/* Balance Card - Only visible when wallet is connected */}
      {isConnected && <BalanceCard className="mb-6" />}

      {/* Metric Card */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-6 mb-6">
        <h3 className="font-heading-md text-100 mb-4">Metric</h3>

        <div className="mb-4">
          <div className="font-caption text-075 flex items-center gap-1">
            APR{" "}
            <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-xs ml-1">
              ?
            </div>
          </div>
          <div className="font-heading-lg text-100">24.8%</div>
        </div>

        <div className="mb-4">
          <div className="font-caption text-075">TVL</div>
          <div className="font-heading-lg text-100">$1,293</div>
        </div>

        <div>
          <div className="font-caption text-075">User</div>
          <div className="font-heading-lg text-100">123</div>
        </div>
      </div>

      {/* Introducing NDLP Card */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-6 mb-6">
        <h3 className="font-heading-md text-100 mb-4">Introducing</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center">
            <Zap size={14} className="text-surface-000" />
          </div>
          <span className="font-heading-md text-100">$NDLP</span>
        </div>

        <p className="font-body text-075 mb-6">
          When you deposit into any NODO vault, you receive $NDLP Tokens that
          automatically grow in value
        </p>

        {/* Features */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw size={16} className="text-brand-orange" />
            </div>
            <div>
              <div className="font-body font-medium mb-1">Auto-Compounding</div>
              <div className="font-caption text-075">
                Exponential yield via autonomous reinvesting
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <Zap size={16} className="text-brand-orange" />
            </div>
            <div>
              <div className="font-body font-medium mb-1">
                Exclusive Benefits
              </div>
              <div className="font-caption text-075">
                Priority access to premium AI features
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <Lock size={16} className="text-brand-orange" />
            </div>
            <div>
              <div className="font-body font-medium mb-1">Limited Supply</div>
              <div className="font-caption text-075">
                Early adopters gain maximum potential
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How NODO AI Vault works */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-6">
        <h3 className="font-heading-md text-100 mb-4">
          How NODO AI Vault works
        </h3>

        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <PlusCircle size={16} className="text-brand-orange" />
            </div>
            <div>
              <div className="font-body font-medium mb-1">Deposit</div>
              <div className="font-caption text-075">
                Simply Enter NODO AI vault, then receive $NDLP as your
                collateral token
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 rounded-full border border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <div className="font-body font-medium mb-1">AI Invest</div>
              <div className="font-caption text-075">
                AI auto-allocates to top LP pools for max yield
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-075 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
              <Zap size={16} className="text-brand-orange" />
            </div>
            <div>
              <div className="font-body font-medium mb-1">Earn & Withdraw</div>
              <div className="font-caption text-075">
                Earn yield in real time. Withdraw $NDLP anytime (7h unbonding)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightContent;
