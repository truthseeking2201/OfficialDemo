
import React from 'react';
import { Sparkles, LineChart, TrendingUp } from 'lucide-react';

export interface VaultOption {
  id: string;
  name: string;
  type: string;
  icon: React.ReactNode;
  color: string;
  colorAccent?: string;
  status?: string;
  securityScore?: number;
  lastAudit?: string;
  performanceRating?: string;
  riskLevel?: string;
}

interface VaultSelectorProps {
  vaults: VaultOption[];
  selectedVault: VaultOption;
  onSelectVault: (vault: VaultOption) => void;
}

const VaultSelector: React.FC<VaultSelectorProps> = ({
  vaults,
  selectedVault,
  onSelectVault,
}) => {
  return (
    <div className="flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-hide">
      <div className="glass-panel px-2 py-2 rounded-full flex items-center space-x-3 transition-all duration-300 hover:shadow-lg">
        {vaults.map((vault) => (
          <button
            key={vault.id}
            className={`flex items-center px-4 py-2 rounded-full transition-all ${
              selectedVault.id === vault.id
                ? `bg-gradient-to-r ${
                    vault.id === "vault-111"
                      ? "from-amber-500/90 to-amber-600/70"
                      : vault.id === "vault-502"
                      ? "from-orion/90 to-orion/70"
                      : "from-nova/90 to-nova/70"
                  } text-white shadow-lg`
                : "hover:bg-white/5"
            } group relative overflow-hidden`}
            onClick={() => onSelectVault(vault)}
          >
            {/* Background animation on hover */}
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            
            {/* Status indicator - small dot for active/maintenance */}
            {vault.status && (
              <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${
                vault.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}></span>
            )}
            
            <div
              className={`w-8 h-8 rounded-full ${vault.color} flex items-center justify-center mr-3 transition-transform group-hover:scale-110`}
            >
              {vault.icon}
            </div>
            <div className="text-left">
              <div className="text-xs opacity-70">{vault.type}</div>
              <div className="font-medium relative">
                {vault.name}
                {selectedVault.id === vault.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-white/30"></span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VaultSelector;
