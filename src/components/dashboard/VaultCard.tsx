
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, ChevronRight } from 'lucide-react';

interface VaultCardProps {
  vault: {
    id: string;
    title: string;
    icon: React.ReactNode;
    iconBg: string;
    activeDate: string;
    allocation: string;
    apy: string;
    profit: string;
  };
  onOpenDepositDialog: (vault: any) => void;
  primaryColor: string;
}

const VaultCard: React.FC<VaultCardProps> = ({ vault, onOpenDepositDialog, primaryColor }) => {
  return (
    <Card 
      key={vault.id} 
      className="glass-card p-4 rounded-xl card-hover-effect group transition-all duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full ${vault.iconBg} flex items-center justify-center mr-3 relative group-hover:shadow-lg transition-shadow duration-300`}
            >
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300"></div>
              {vault.icon}
            </div>
            <div>
              <div className="font-bold relative group-hover:text-gradient-nova transition-all duration-300">
                {vault.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-nova/40 group-hover:w-full transition-all duration-300"></span>
              </div>
              <div className="text-xs text-white/60">Nodo vault - Active since {vault.activeDate}</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">Allocation</div>
          <div className="font-semibold font-mono group-hover:text-white transition-colors duration-300">{vault.allocation}</div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">Current APY</div>
          <div className="font-semibold text-green-400 font-mono relative group">
            {vault.apy}
            <span className="absolute -right-2 top-0.5 w-1.5 h-1.5 rounded-full bg-green-400 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-white/60">30d Profit</div>
          <div className="font-semibold font-mono">{vault.profit}</div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="w-full bg-transparent border border-white/20 text-white hover:bg-white/10 relative overflow-hidden group/btn"
          >
            <span className="relative z-10">Manage</span>
            <span className="absolute inset-0 bg-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
          </Button>
          <Button 
            className={`w-full bg-${primaryColor} hover:bg-${primaryColor}/90 text-white flex items-center gap-2 relative overflow-hidden group/btn`}
            onClick={() => onOpenDepositDialog(vault)}
          >
            <span className="relative z-10 flex items-center gap-1">
              <Wallet size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
              <span>Deposit</span>
            </span>
            <ChevronRight size={16} className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all duration-300" />
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default VaultCard;
