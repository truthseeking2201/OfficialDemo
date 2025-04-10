
import React from 'react';
import { Card } from "@/components/ui/card";
import { Eye } from 'lucide-react';

const transactions = [
  {
    id: "0x6a8d...f41c",
    type: "Swap",
    description: "Swapped 5,000 USDC for 25.8 SUI",
    vault: "Market Making",
    timestamp: "5 min ago",
    status: "Completed",
    color: "bg-nova/20 text-nova border-nova/30"
  },
  {
    id: "0x9c3e...a27b",
    type: "Yield",
    description: "Deployed 12,500 USDC to Scallop lending protocol",
    vault: "Yield Optimization",
    timestamp: "23 min ago",
    status: "Completed",
    color: "bg-aero/20 text-aero border-aero/30"
  },
  {
    id: "0x2b7f...d93e",
    type: "Rebalance",
    description: "Portfolio rebalanced: +3% SUI, -3% USDC",
    vault: "Analytics",
    timestamp: "1 hour ago",
    status: "Completed",
    color: "bg-orion/20 text-orion border-orion/30"
  },
  {
    id: "0xf45a...c28d",
    type: "Deposit",
    description: "User deposited 10,000 USDC into vault",
    vault: "Market Making",
    timestamp: "2 hours ago",
    status: "Completed",
    color: "bg-nova/20 text-nova border-nova/30"
  },
  {
    id: "0x3d7c...e61a",
    type: "Withdraw",
    description: "User withdrew 2,500 USDC from vault",
    vault: "Yield Optimization",
    timestamp: "5 hours ago",
    status: "Completed",
    color: "bg-aero/20 text-aero border-aero/30"
  }
];

const ActivityFeed = () => {
  return (
    <div className="py-20 px-6 md:px-12 bg-nodo-dark">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Transparent Activity</h2>
            <p className="text-white/70 max-w-2xl">
              All AI agent activities are 100% on-chain, providing complete transparency and auditability.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/5 border border-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-white/80">Live Updates</span>
          </div>
        </div>
        
        <Card className="glass-card rounded-xl overflow-hidden border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left">
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Transaction</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Description</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Vault</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Time</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70">Verify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.color.split(" ")[0]}`}>
                          <span className="text-xs font-medium">{tx.type.charAt(0)}</span>
                        </div>
                        <span className="ml-3 text-sm font-mono">{tx.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${tx.color}`}>
                        {tx.vault}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/70">{tx.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                        {tx.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <Eye size={16} className="text-white/70" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        <div className="mt-8 text-center">
          <span className="text-sm text-white/60">
            View more transactions in the{" "}
            <a href="/activity" className="text-nova hover:text-nova-light transition-colors">
              Activity Hub
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
