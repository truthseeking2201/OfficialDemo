
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp, ArrowUpRight, CircleDollarSign, PlusCircle, RefreshCw, Wallet } from 'lucide-react';

const Transactions = () => {
  const [amount, setAmount] = useState('');
  
  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Transaction Center</h1>
              <p className="text-white/70">
                Manage your deposits, withdrawals, and other transactions safely and efficiently.
              </p>
            </div>
            
            <Card className="glass-card rounded-xl overflow-hidden border-white/10 mb-8">
              <Tabs defaultValue="deposit">
                <div className="bg-white/5 p-4">
                  <TabsList className="w-full grid grid-cols-4 bg-transparent">
                    <TabsTrigger value="deposit" className="data-[state=active]:bg-nova/20 data-[state=active]:text-nova">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      <span>Deposit</span>
                    </TabsTrigger>
                    <TabsTrigger value="withdraw" className="data-[state=active]:bg-orion/20 data-[state=active]:text-orion">
                      <ArrowUpRight className="w-4 h-4 mr-2" />
                      <span>Withdraw</span>
                    </TabsTrigger>
                    <TabsTrigger value="swap" className="data-[state=active]:bg-aero/20 data-[state=active]:text-aero">
                      <ArrowDownUp className="w-4 h-4 mr-2" />
                      <span>Swap</span>
                    </TabsTrigger>
                    <TabsTrigger value="stake" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      <CircleDollarSign className="w-4 h-4 mr-2" />
                      <span>Stake</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* Deposit Tab */}
                <TabsContent value="deposit" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Select Vault</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose a vault" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="market-making">Market Making Vault</SelectItem>
                          <SelectItem value="yield-optimization">Yield Optimization Vault</SelectItem>
                          <SelectItem value="defi-analytics">DeFi Analytics Vault</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Select Asset</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose an asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="usdc">USDC</SelectItem>
                          <SelectItem value="sui">SUI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Amount</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white/5 border-white/20 text-white focus-visible:ring-nova pl-6"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60">$</span>
                        <Button 
                          variant="ghost" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs text-nova hover:text-nova-light hover:bg-transparent"
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Available: 12,500 USDC</span>
                        <span>Min: 100 USDC</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Current APY</span>
                        <span className="text-sm text-green-400">8.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Gas Fee (estimated)</span>
                        <span className="text-sm">0.00042 SUI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Time to Completion</span>
                        <span className="text-sm">~30 seconds</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-nova hover:bg-nova/90 text-white">
                      Deposit Funds
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Withdraw Tab */}
                <TabsContent value="withdraw" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Select Vault</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose a vault" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="market-making">Market Making Vault</SelectItem>
                          <SelectItem value="yield-optimization">Yield Optimization Vault</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Select Asset</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose an asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="usdc">USDC</SelectItem>
                          <SelectItem value="sui">SUI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Amount</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white/5 border-white/20 text-white focus-visible:ring-orion pl-6"
                        />
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60">$</span>
                        <Button 
                          variant="ghost" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs text-orion hover:text-orion-light hover:bg-transparent"
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Available: 25,000 USDC</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Withdrawal Fee</span>
                        <span className="text-sm">0.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Gas Fee (estimated)</span>
                        <span className="text-sm">0.00038 SUI</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Time to Completion</span>
                        <span className="text-sm">~2 minutes</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-orion hover:bg-orion/90 text-white">
                      Withdraw Funds
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Swap Tab */}
                <TabsContent value="swap" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">From</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white/5 border-white/20 text-white focus-visible:ring-aero"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Select>
                            <SelectTrigger className="bg-white/10 border-none w-[100px]">
                              <SelectValue placeholder="SUI" />
                            </SelectTrigger>
                            <SelectContent className="bg-nodo-dark border-white/20">
                              <SelectItem value="sui">SUI</SelectItem>
                              <SelectItem value="usdc">USDC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button variant="ghost" className="bg-white/10 rounded-full p-2 h-auto">
                        <ArrowDownUp size={16} />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">To</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white/5 border-white/20 text-white focus-visible:ring-aero"
                          readOnly
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                          <Select>
                            <SelectTrigger className="bg-white/10 border-none w-[100px]">
                              <SelectValue placeholder="USDC" />
                            </SelectTrigger>
                            <SelectContent className="bg-nodo-dark border-white/20">
                              <SelectItem value="sui">SUI</SelectItem>
                              <SelectItem value="usdc">USDC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Exchange Rate</span>
                        <span className="text-sm">1 SUI = 19.42 USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Price Impact</span>
                        <span className="text-sm text-green-400">0.05%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Gas Fee (estimated)</span>
                        <span className="text-sm">0.00052 SUI</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-aero hover:bg-aero/90 text-white">
                      Swap Tokens
                    </Button>
                  </div>
                </TabsContent>
                
                {/* Stake Tab */}
                <TabsContent value="stake" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Staking Asset</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose an asset" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="nodo">NODO Token</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Staking Period</label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          <SelectValue placeholder="Choose a period" />
                        </SelectTrigger>
                        <SelectContent className="bg-nodo-dark border-white/20">
                          <SelectItem value="30">30 days (10% APY)</SelectItem>
                          <SelectItem value="90">90 days (15% APY)</SelectItem>
                          <SelectItem value="180">180 days (22% APY)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Amount</label>
                      <div className="relative">
                        <Input 
                          type="text" 
                          placeholder="0.00" 
                          className="bg-white/5 border-white/20 text-white focus-visible:ring-white"
                        />
                        <Button 
                          variant="ghost" 
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 text-xs text-white hover:text-white/80 hover:bg-transparent"
                        >
                          MAX
                        </Button>
                      </div>
                      <div className="flex justify-between text-xs text-white/60">
                        <span>Available: 500 NODO</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-white/5 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Staking APY</span>
                        <span className="text-sm text-green-400">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Lockup Period</span>
                        <span className="text-sm">90 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-white/70">Early Unstaking Fee</span>
                        <span className="text-sm text-orion">5%</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
                      Stake Tokens
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            {/* Transaction History */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Transaction History</h2>
                <Button variant="outline" className="bg-transparent border border-white/20 text-white hover:bg-white/10 flex gap-2 items-center">
                  <RefreshCw size={14} />
                  <span>Refresh</span>
                </Button>
              </div>
              
              <Card className="glass-card rounded-xl overflow-hidden border-white/10">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/5">
                      <tr className="text-left">
                        <th className="px-6 py-3 text-xs font-medium text-white/70">Type</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/70">Asset</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/70">Amount</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/70">Date</th>
                        <th className="px-6 py-3 text-xs font-medium text-white/70">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-nova/20">
                              <PlusCircle size={14} className="text-nova" />
                            </div>
                            <span className="ml-3 text-sm">Deposit</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">USDC</td>
                        <td className="px-6 py-4 text-sm">$10,000.00</td>
                        <td className="px-6 py-4 text-sm text-white/70">Apr 05, 2025</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-aero/20">
                              <ArrowDownUp size={14} className="text-aero" />
                            </div>
                            <span className="ml-3 text-sm">Swap</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">SUI → USDC</td>
                        <td className="px-6 py-4 text-sm">50 SUI</td>
                        <td className="px-6 py-4 text-sm text-white/70">Apr 03, 2025</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orion/20">
                              <ArrowUpRight size={14} className="text-orion" />
                            </div>
                            <span className="ml-3 text-sm">Withdraw</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">USDC</td>
                        <td className="px-6 py-4 text-sm">$2,500.00</td>
                        <td className="px-6 py-4 text-sm text-white/70">Mar 28, 2025</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            Completed
                          </span>
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

export default Transactions;
