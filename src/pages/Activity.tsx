
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Filter, Search, Calendar, ChevronDown, Download, ChevronLeft, ChevronRight, SlidersHorizontal, AlertCircle, CheckCircle2, Clock, ArrowDown, ArrowUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const Activity = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [viewingTransaction, setViewingTransaction] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Mock transactions data
  const transactions = [
    {
      id: "0x6a8d...f41c",
      fullId: "0x6a8d7fb3e321c90d85a1f4e9cbe826f3084f41c",
      type: "Swap",
      description: "Swapped 5,000 USDC for 25.8 SUI",
      vault: "Market Making",
      timestamp: "5 min ago",
      date: "2025-04-09T14:20:00Z",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30",
      details: {
        input: "5,000 USDC",
        output: "25.8 SUI",
        rate: "1 SUI = 193.8 USDC",
        gasFee: "0.00042 SUI",
        reason: "Market volatility prompted rebalancing to increase SUI exposure",
        protocol: "Turbos Finance"
      }
    },
    {
      id: "0x9c3e...a27b",
      fullId: "0x9c3e4b5612f708d95a1f34e0cd8a27b",
      type: "Yield",
      description: "Deployed 12,500 USDC to Scallop lending protocol",
      vault: "Yield Optimization",
      timestamp: "23 min ago",
      date: "2025-04-09T14:00:00Z",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30",
      details: {
        amount: "12,500 USDC",
        apy: "6.84%",
        protocol: "Scallop Finance",
        gasFee: "0.00038 SUI",
        reason: "APY increased from 5.92% to 6.84%, exceeding threshold for reallocation",
        duration: "Variable, no lock-up period"
      }
    },
    {
      id: "0x2b7f...d93e",
      fullId: "0x2b7f8a9d42e5f61c07b3a0e84cd93e",
      type: "Rebalance",
      description: "Portfolio rebalanced: +3% SUI, -3% USDC",
      vault: "Analytics",
      timestamp: "1 hour ago",
      date: "2025-04-09T13:15:00Z",
      status: "Completed",
      color: "bg-orion/20 text-orion border-orion/30",
      details: {
        before: "65% USDC, 35% SUI",
        after: "62% USDC, 38% SUI",
        gasFee: "0.00052 SUI",
        reason: "SUI price momentum signals detected by AI model; increasing exposure to capture upside",
        adjustedValue: "≈ $5,340"
      }
    },
    {
      id: "0xf45a...c28d",
      fullId: "0xf45a3dbc6912f708d95a1f34e0c28d",
      type: "Deposit",
      description: "User deposited 10,000 USDC into vault",
      vault: "Market Making",
      timestamp: "2 hours ago",
      date: "2025-04-09T12:45:00Z",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30",
      details: {
        amount: "10,000 USDC",
        from: "0x87a...64E",
        to: "Quantum Nexus Vault",
        gasFee: "0.00035 SUI",
        navPrice: "$1.0032 per token",
        shares: "9,968.1035"
      }
    },
    {
      id: "0x3d7c...e61a",
      fullId: "0x3d7c5f2e41ab93d08c6742fe61a",
      type: "Withdraw",
      description: "User withdrew 2,500 USDC from vault",
      vault: "Yield Optimization",
      timestamp: "5 hours ago",
      date: "2025-04-09T09:30:00Z",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30",
      details: {
        amount: "2,500 USDC",
        from: "Cosmic Yield Vault",
        to: "0x87a...64E",
        gasFee: "0.00039 SUI",
        fee: "0.1% (2.5 USDC)",
        navPrice: "$1.0047 per token",
        shares: "2,487.7045"
      }
    },
    {
      id: "0x8f4b...a93c",
      fullId: "0x8f4b7d2a85e3c90f61bd42ca93c",
      type: "Swap",
      description: "Swapped 12.5 SUI for 250 USDC",
      vault: "Market Making",
      timestamp: "6 hours ago",
      date: "2025-04-09T08:15:00Z",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30",
      details: {
        input: "12.5 SUI",
        output: "250 USDC",
        rate: "1 SUI = 20 USDC",
        gasFee: "0.00041 SUI",
        reason: "Profit taking after SUI price increase",
        protocol: "Cetus AMM"
      }
    },
    {
      id: "0xc7e2...b58f",
      fullId: "0xc7e215ad96f3c8e7042a1dfb58f",
      type: "Yield",
      description: "Harvested 320 USDC rewards from lending position",
      vault: "Yield Optimization",
      timestamp: "8 hours ago",
      date: "2025-04-09T06:10:00Z",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30",
      details: {
        amount: "320 USDC",
        source: "Scallop Finance lending rewards",
        gasFee: "0.00032 SUI",
        reinvested: "Yes (100%)",
        newPosition: "12,820 USDC",
        compoundedAPY: "7.12%"
      }
    },
    {
      id: "0x1a5d...e72c",
      fullId: "0x1a5d483bf92c6d5e019ae72c",
      type: "Rebalance",
      description: "Portfolio rebalanced due to market volatility",
      vault: "Analytics",
      timestamp: "12 hours ago",
      date: "2025-04-09T02:20:00Z",
      status: "Completed",
      color: "bg-orion/20 text-orion border-orion/30",
      details: {
        before: "68% USDC, 32% SUI",
        after: "65% USDC, 35% SUI",
        gasFee: "0.00047 SUI",
        reason: "Increased volatility in SUI price; readjustment to maintain risk parameters",
        adjustedValue: "≈ $4,950"
      }
    },
    {
      id: "0x5e2f...a91b",
      fullId: "0x5e2f7c1d93a8b045e62fa91b",
      type: "Deposit",
      description: "User deposited 5,000 USDC into vault",
      vault: "Analytics",
      timestamp: "1 day ago",
      date: "2025-04-08T13:45:00Z",
      status: "Completed",
      color: "bg-orion/20 text-orion border-orion/30",
      details: {
        amount: "5,000 USDC",
        from: "0x87a...64E",
        to: "Alpha Engine Vault",
        gasFee: "0.00033 SUI",
        navPrice: "$1.0025 per token",
        shares: "4,987.5312"
      }
    },
    {
      id: "0xb43a...d72e",
      fullId: "0xb43a9f25c8071e6a3b9cd72e",
      type: "Swap",
      description: "Swapped 3,000 USDC for 15.3 SUI",
      vault: "Market Making",
      timestamp: "1 day ago",
      date: "2025-04-08T11:30:00Z",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30",
      details: {
        input: "3,000 USDC",
        output: "15.3 SUI",
        rate: "1 SUI = 196.1 USDC",
        gasFee: "0.00045 SUI",
        reason: "Strategic position building before expected price movement",
        protocol: "Aftermath Finance"
      }
    },
    {
      id: "0x7d1e...f53c",
      fullId: "0x7d1e4f9ab25d36c0e8a7f53c",
      type: "Yield",
      description: "Moved 8,000 USDC from Kriya to Scallop for higher APY",
      vault: "Yield Optimization",
      timestamp: "2 days ago",
      date: "2025-04-07T15:20:00Z",
      status: "Completed",
      color: "bg-aero/20 text-aero border-aero/30",
      details: {
        amount: "8,000 USDC",
        from: "Kriya Finance (5.75% APY)",
        to: "Scallop Finance (6.84% APY)",
        gasFee: "0.00068 SUI",
        reason: "Higher yield opportunity detected",
        projectedAdditionalYield: "≈ 87 USDC annually"
      }
    },
    {
      id: "0x4b8c...e19d",
      fullId: "0x4b8c3a7fd62e50914abce19d",
      type: "Withdraw",
      description: "User withdrew 1,500 USDC from vault",
      vault: "Market Making",
      timestamp: "3 days ago",
      date: "2025-04-06T09:15:00Z",
      status: "Completed",
      color: "bg-nova/20 text-nova border-nova/30",
      details: {
        amount: "1,500 USDC",
        from: "Quantum Nexus Vault",
        to: "0x87a...64E",
        gasFee: "0.00037 SUI",
        fee: "0.1% (1.5 USDC)",
        navPrice: "$1.0038 per token",
        shares: "1,494.2212"
      }
    }
  ];

  // Filter transactions based on active filter, search query, and date range
  const filteredTransactions = transactions.filter(tx => {
    // Filter by type
    if (activeFilter !== 'all' && !tx.type.toLowerCase().includes(activeFilter.toLowerCase())) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && 
        !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tx.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tx.vault.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by date range
    const txDate = new Date(tx.date);
    const today = new Date();
    if (dateRange === '24h' && (today.getTime() - txDate.getTime()) > 86400000) {
      return false;
    } else if (dateRange === '7d' && (today.getTime() - txDate.getTime()) > 7 * 86400000) {
      return false;
    } else if (dateRange === '30d' && (today.getTime() - txDate.getTime()) > 30 * 86400000) {
      return false;
    }
    
    return true;
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  // Get transaction type counts
  const typeCounts = transactions.reduce((counts, tx) => {
    const type = tx.type.toLowerCase();
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // Transaction status color mapping
  const statusColors = {
    "Completed": "bg-green-500/20 text-green-400",
    "Pending": "bg-yellow-500/20 text-yellow-400",
    "Failed": "bg-red-500/20 text-red-400"
  };
  
  const getTransactionIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'swap':
        return <div className="w-8 h-8 rounded-full bg-nova/20 flex items-center justify-center"><ArrowDown className="w-4 h-4 text-nova" /></div>;
      case 'yield':
        return <div className="w-8 h-8 rounded-full bg-aero/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-aero" /></div>;
      case 'rebalance':
        return <div className="w-8 h-8 rounded-full bg-orion/20 flex items-center justify-center"><SlidersHorizontal className="w-4 h-4 text-orion" /></div>;
      case 'deposit':
        return <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><ArrowDown className="w-4 h-4 text-green-500" /></div>;
      case 'withdraw':
        return <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center"><ArrowUp className="w-4 h-4 text-amber-500" /></div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><Clock className="w-4 h-4 text-white" /></div>;
    }
  };
  
  // Get status for transaction details
  const getStatusElement = (status: string) => {
    switch(status) {
      case 'Completed':
        return (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle2 size={16} />
            <span>Completed</span>
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock size={16} />
            <span>Pending</span>
          </div>
        );
      case 'Failed':
        return (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle size={16} />
            <span>Failed</span>
          </div>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Activity Feed</h1>
              <p className="text-white/70 max-w-3xl">
                Real-time on-chain activity from our AI agents, providing complete transparency into vault operations.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-white/80">Live Updates</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap gap-3 w-full lg:w-auto">
                  <div className="w-full md:col-span-2 lg:w-auto">
                    <div className="relative">
                      <Input
                        placeholder="Search transactions..."
                        className="pl-9 bg-white/5 border-white/20 focus:border-nova w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white/50 w-4 h-4" />
                    </div>
                  </div>
                  
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="bg-transparent border border-white/20 focus:border-nova">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/70" />
                        <SelectValue placeholder="Time period" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-nodo-dark border-white/10">
                      <SelectGroup>
                        <SelectLabel>Time Period</SelectLabel>
                        <SelectItem value="all">All time</SelectItem>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'all' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All ({transactions.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'swap' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('swap')}
                  >
                    Swaps ({typeCounts.swap || 0})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'yield' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('yield')}
                  >
                    Yields ({typeCounts.yield || 0})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'deposit' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('deposit')}
                  >
                    Deposits ({typeCounts.deposit || 0})
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Transaction metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-nodo-dark border-white/10 p-4">
                <h3 className="text-white/60 text-sm mb-2">Total Transactions</h3>
                <div className="text-2xl font-bold">{transactions.length}</div>
              </Card>
              <Card className="bg-nodo-dark border-white/10 p-4">
                <h3 className="text-white/60 text-sm mb-2">Last 24 Hours</h3>
                <div className="text-2xl font-bold">
                  {transactions.filter(tx => {
                    const txDate = new Date(tx.date);
                    const today = new Date();
                    return (today.getTime() - txDate.getTime()) <= 86400000;
                  }).length}
                </div>
              </Card>
              <Card className="bg-nodo-dark border-white/10 p-4">
                <h3 className="text-white/60 text-sm mb-2">Highest Volume</h3>
                <div className="text-2xl font-bold">Market Making</div>
              </Card>
              <Card className="bg-nodo-dark border-white/10 p-4">
                <h3 className="text-white/60 text-sm mb-2">Most Active</h3>
                <div className="text-2xl font-bold">Swaps</div>
              </Card>
            </div>
            
            {/* Transactions table */}
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
                    {currentItems.length > 0 ? (
                      currentItems.map((tx) => (
                        <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {getTransactionIcon(tx.type)}
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
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColors[tx.status as keyof typeof statusColors] || "bg-white/20 text-white"}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              className="p-2 rounded-full hover:bg-white/10 transition-colors"
                              onClick={() => setViewingTransaction(tx)}
                            >
                              <Eye size={16} className="text-white/70" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-white/60">
                          <div className="flex flex-col items-center justify-center">
                            <div className="mb-2">
                              <AlertCircle size={24} />
                            </div>
                            <p>No transactions matching your filters</p>
                            <Button 
                              variant="link" 
                              onClick={() => {
                                setActiveFilter('all');
                                setSearchQuery('');
                                setDateRange('all');
                              }}
                              className="mt-2 text-nova"
                            >
                              Clear filters
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination controls */}
              <div className="p-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-sm text-white/60">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTransactions.length)} of {filteredTransactions.length} transactions
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border border-white/20 text-white/70 hover:bg-white/5"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border border-white/20 text-white/70 hover:bg-white/5"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Export and analysis actions */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-end">
              <Button variant="outline" className="bg-transparent border-white/20 flex items-center gap-2">
                <Download size={16} />
                Export Transactions
              </Button>
              <Button variant="outline" className="bg-transparent border-white/20 flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Advanced Filters
              </Button>
            </div>
            
            {/* Transaction Detail Dialog */}
            <Dialog open={!!viewingTransaction} onOpenChange={(open) => !open && setViewingTransaction(null)}>
              <DialogContent className="bg-nodo-darker border border-white/10 text-white glass-card max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {viewingTransaction && getTransactionIcon(viewingTransaction.type)}
                    <span>Transaction Details</span>
                  </DialogTitle>
                  <DialogDescription className="text-white/70">
                    {viewingTransaction?.fullId}
                  </DialogDescription>
                </DialogHeader>
                
                {viewingTransaction && (
                  <div className="mt-4">
                    <Tabs defaultValue="details">
                      <TabsList className="bg-white/5 w-full">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="logs">Logs</TabsTrigger>
                        <TabsTrigger value="explorer">Explorer</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="details" className="pt-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-white/60 text-xs mb-1">Type</div>
                              <div className="font-medium">{viewingTransaction.type}</div>
                            </div>
                            <div>
                              <div className="text-white/60 text-xs mb-1">Status</div>
                              {getStatusElement(viewingTransaction.status)}
                            </div>
                            <div>
                              <div className="text-white/60 text-xs mb-1">Time</div>
                              <div className="font-medium">{new Date(viewingTransaction.date).toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-white/60 text-xs mb-1">Vault</div>
                              <div className="font-medium">{viewingTransaction.vault}</div>
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs mb-3">Transaction Details</div>
                            <div className="space-y-3">
                              {viewingTransaction.details && Object.entries(viewingTransaction.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="text-white/70 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                  <span className="font-medium">{value as React.ReactNode}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-white/60 text-xs mb-2">Transaction Description</div>
                            <div className="text-sm">
                              {viewingTransaction.description}
                              {viewingTransaction.details?.reason && (
                                <p className="mt-2 text-white/80">
                                  <strong>Reason:</strong> {viewingTransaction.details.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="logs" className="pt-4">
                        <div className="bg-nodo-dark rounded-lg p-4 border border-white/10 font-mono text-sm h-64 overflow-y-auto">
                          <div className="text-green-400">[INFO] Transaction initiated</div>
                          <div className="text-white/70">[INFO] Checking balance requirements</div>
                          <div className="text-white/70">[INFO] Balance requirements met</div>
                          <div className="text-white/70">[INFO] Calculating optimal execution path</div>
                          <div className="text-white/70">[INFO] Preparing transaction payload</div>
                          <div className="text-white/70">[INFO] Submitting transaction to blockchain</div>
                          <div className="text-white/70">[INFO] Waiting for confirmation</div>
                          <div className="text-green-400">[INFO] Transaction confirmed</div>
                          <div className="text-green-400">[INFO] Operation completed successfully</div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="explorer" className="pt-4">
                        <div className="bg-nodo-dark rounded-lg p-6 border border-white/10 text-center">
                          <p className="mb-4">View this transaction on SuiScan blockchain explorer.</p>
                          <Button className="bg-nova hover:bg-nova/90">
                            View on Explorer
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Activity;
