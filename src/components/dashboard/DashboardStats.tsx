
import React from 'react';
import { Card } from '@/components/ui/card';

interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  primaryColor: string;
  activeVaults: number;
  totalValue: string;
  monthChange: string;
  returns: string;
  nextRewards: string;
}

interface DashboardStatsProps {
  agent: AIAgent;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ agent }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="glass-card p-6 rounded-xl">
        <div className="text-sm text-white/60 mb-2">Total Portfolio Value</div>
        <div className="text-3xl font-bold font-mono">{agent.totalValue}</div>
        <div className="flex items-center text-green-400 text-sm mt-2">
          <span className="mr-1 font-mono">{agent.monthChange}</span>
          <span className="text-white/60">this month</span>
        </div>
      </Card>
      
      <Card className="glass-card p-6 rounded-xl">
        <div className="text-sm text-white/60 mb-2">Active Vaults</div>
        <div className="text-3xl font-bold font-mono">{agent.activeVaults}</div>
        <div className="flex items-center text-white/60 text-sm mt-2">
          <span className="mr-1">of 6 vaults</span>
        </div>
      </Card>
      
      <Card className="glass-card p-6 rounded-xl">
        <div className="text-sm text-white/60 mb-2">30d Returns</div>
        <div className="text-3xl font-bold text-green-400 font-mono">{agent.returns}</div>
        <div className="flex items-center text-white/60 text-sm mt-2">
          <span className="mr-1 font-mono">+3.8% ROI</span>
        </div>
      </Card>
      
      <Card className="glass-card p-6 rounded-xl">
        <div className="text-sm text-white/60 mb-2">Next Rewards</div>
        <div className="text-3xl font-bold font-mono">{agent.nextRewards}</div>
        <div className="flex items-center text-white/60 text-sm mt-2">
          <span className="mr-1 font-mono">Est. $125.40</span>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
