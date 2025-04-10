
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { BarChart2, LineChart, PieChart, TrendingDown, TrendingUp } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Analytics Dashboard</h1>
              <p className="text-white/70 max-w-3xl">
                Comprehensive analytics and insights into vault performance, market trends, and on-chain activities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Value Locked</h3>
                  <span className="text-nova text-2xl font-bold">$27.4M</span>
                </div>
                <div className="flex items-center text-xs text-white/60">
                  <TrendingUp className="text-green-400 w-4 h-4 mr-1" />
                  <span className="text-green-400 mr-1">+4.2%</span>
                  <span>from last week</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Strategies</h3>
                  <span className="text-aero text-2xl font-bold">12</span>
                </div>
                <div className="flex items-center text-xs text-white/60">
                  <TrendingUp className="text-green-400 w-4 h-4 mr-1" />
                  <span className="text-green-400 mr-1">+2</span>
                  <span>from last month</span>
                </div>
              </Card>
              
              <Card className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <span className="text-orion text-2xl font-bold">1,248</span>
                </div>
                <div className="flex items-center text-xs text-white/60">
                  <TrendingUp className="text-green-400 w-4 h-4 mr-1" />
                  <span className="text-green-400 mr-1">+156</span>
                  <span>from last month</span>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="glass-card p-6 rounded-xl lg:col-span-2 h-80">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Performance Overview</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-xs px-3 py-1 rounded-full bg-white/10">Last 30 days</div>
                    <LineChart className="text-nova w-4 h-4" />
                  </div>
                </div>
                
                {/* Chart placeholder */}
                <div className="h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                  <span className="text-white/40">Performance Chart Placeholder</span>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-white/60">Total Return</div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-green-400">+24.8%</span>
                      <TrendingUp className="ml-1 w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Avg. APY</div>
                    <div className="text-xl font-bold">7.9%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">Weekly Change</div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-red-400">-1.2%</span>
                      <TrendingDown className="ml-1 w-4 h-4 text-red-400" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="lg:col-span-1 space-y-6">
                <Card className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold">Asset Allocation</h3>
                    <PieChart size={16} className="text-aero" />
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-40 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center mb-3">
                    <span className="text-white/40">Allocation Chart</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nova rounded-full mr-2"></div>
                        <span>SUI</span>
                      </div>
                      <span>45%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-aero rounded-full mr-2"></div>
                        <span>USDC</span>
                      </div>
                      <span>30%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orion rounded-full mr-2"></div>
                        <span>Other</span>
                      </div>
                      <span>25%</span>
                    </div>
                  </div>
                </Card>
              
                <Card className="glass-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold">Transaction Volume</h3>
                    <BarChart2 size={16} className="text-orion" />
                  </div>
                  
                  {/* Chart placeholder */}
                  <div className="h-40 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                    <span className="text-white/40">Volume Chart</span>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card className="glass-card p-6 rounded-xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Vault Comparison</h3>
                  <div className="text-xs px-3 py-1 rounded-full bg-white/10">Last 30 days</div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-white/10">
                        <th className="pb-3 text-xs text-white/70">Vault</th>
                        <th className="pb-3 text-xs text-white/70">TVL</th>
                        <th className="pb-3 text-xs text-white/70">30d Return</th>
                        <th className="pb-3 text-xs text-white/70">APY</th>
                        <th className="pb-3 text-xs text-white/70">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="py-3">Market Making Vault</td>
                        <td className="py-3">$12.8M</td>
                        <td className="py-3 text-green-400">+7.2%</td>
                        <td className="py-3">8.4%</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-nova/20 text-nova">Medium</span>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">Yield Optimization Vault</td>
                        <td className="py-3">$9.2M</td>
                        <td className="py-3 text-green-400">+5.9%</td>
                        <td className="py-3">7.1%</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-aero/20 text-aero">Low-Medium</span>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3">DeFi Analytics Vault</td>
                        <td className="py-3">$5.5M</td>
                        <td className="py-3 text-green-400">+10.2%</td>
                        <td className="py-3">11.4%</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-orion/20 text-orion">Medium-High</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Arbitrage Vault</td>
                        <td className="py-3">$3.2M</td>
                        <td className="py-3 text-red-400">-2.1%</td>
                        <td className="py-3">12.8%</td>
                        <td className="py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-orion/20 text-orion">High</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
