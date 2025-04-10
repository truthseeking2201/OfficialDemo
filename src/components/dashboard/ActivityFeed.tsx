
import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ActivityFeed: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Recent Activity</h3>
        <Link to="/activity" className="text-sm text-nova hover:text-nova-light">View All Activity</Link>
      </div>
      
      <Card className="glass-card rounded-xl overflow-hidden border-white/10">
        <div className="divide-y divide-white/10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-nova/20 flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-nova">S</span>
              </div>
              <div>
                <div className="font-medium">Swapped 5,000 USDC for 25.8 SUI</div>
                <div className="text-xs text-white/60">Market Making Vault • 5 min ago</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                Completed
              </span>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-aero/20 flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-aero">Y</span>
              </div>
              <div>
                <div className="font-medium">Deployed 12,500 USDC to Scallop lending protocol</div>
                <div className="text-xs text-white/60">Yield Optimization Vault • 23 min ago</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                Completed
              </span>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orion/20 flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-orion">R</span>
              </div>
              <div>
                <div className="font-medium">Portfolio rebalanced: +3% SUI, -3% USDC</div>
                <div className="text-xs text-white/60">Analytics Vault • 1 hour ago</div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                Completed
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActivityFeed;
