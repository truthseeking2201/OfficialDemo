import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart as LineChartIcon, Sparkles, TrendingUp, BarChart3, PieChart, ShieldCheck, Hexagon, CircleDollarSign, ArrowRight, GaugeCircle, Clock, Layers, Coins, AlertTriangle, Check, Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import VaultDetails from '@/components/vaults/VaultDetails';
import VaultSelector, { VaultOption } from '@/components/vaults/VaultSelector';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Extended vault type with all required properties
interface ExtendedVaultOption extends VaultOption {
  description: string;
  nav: string;
  tvl: string;
  inception: string;
  apy: string;
  risk: string;
  shadow: string;
  chartColor: string;
  portfolio: {
    icon: React.ReactNode;
    releaseDate: string;
  };
  chain: {
    name: string;
    icon: React.ReactNode;
  };
  compatibility: React.ReactNode[];
  features: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }[];
}

// Define the vault data structure to reflect Nodo's offerings
const vaults: ExtendedVaultOption[] = [
  {
    id: "vault-111",
    name: "CosmosYield",
    type: "Yield Optimization",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    description: "Designed for stable returns with minimal volatility. This Nodo vault focuses on secure yield generation through proven DeFi strategies, optimized for USDC holders seeking consistent passive income with institutional-grade risk management.",
    nav: "$100.13",
    tvl: "$28,715.31",
    inception: "26 Mar 23",
    apy: "5.8% - 8.4%",
    risk: "Low",
    color: "bg-amber-500/20 text-amber-500",
    shadow: "shadow-neon-aero",
    chartColor: "#10B981",
    portfolio: {
      icon: <CircleDollarSign className="w-5 h-5 text-white" />,
      releaseDate: "May 27, 2023"
    },
    chain: {
      name: "Sui",
      icon: <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">S</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-aero/60 rounded-full flex items-center justify-center text-xs text-white">A</div>
    ],
    features: [
      {
        title: "Nodo Smart Yield",
        icon: <Coins className="w-5 h-5 text-aero" />,
        description: "Earn native yields plus additional Nodo token rewards through our innovative dual-layer system"
      },
      {
        title: "Dynamic Rebalancing",
        icon: <Layers className="w-5 h-5 text-aero" />,
        description: "Nodo's AI algorithms continuously adjust portfolio allocations to maximize returns across market conditions"
      },
      {
        title: "Flexible Withdrawals",
        icon: <Clock className="w-5 h-5 text-aero" />,
        description: "Choose between instant access or scheduled withdrawals with optimized gas efficiency"
      },
      {
        title: "Nodo Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-aero" />,
        description: "• No annual management fee\n• 1% transaction and 10% performance fee"
      }
    ]
  },
  {
    id: "vault-502",
    name: "NexusAI",
    type: "DeFi Analyst",
    icon: <LineChartIcon className="w-5 h-5 text-white" />,
    description: "Nodo's quantitative strategy vault designed for higher returns. Leverages advanced AI algorithms and on-chain analytics to identify optimal trading opportunities across DeFi protocols. Suitable for investors seeking enhanced yield with managed risk exposure.",
    nav: "$105.27",
    tvl: "$6,432.80",
    inception: "15 Apr 23",
    apy: "8.6% - 12.4%",
    risk: "Medium",
    color: "bg-orion/20 text-orion",
    shadow: "shadow-neon-orion",
    chartColor: "#9B87F5",
    portfolio: {
      icon: <PieChart className="w-5 h-5 text-white" />,
      releaseDate: "April 15, 2023"
    },
    chain: {
      name: "Sui",
      icon: <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white">S</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-orion/60 rounded-full flex items-center justify-center text-xs text-white">O</div>
    ],
    features: [
      {
        title: "Nodo AI Trading",
        icon: <Sparkles className="w-5 h-5 text-orion" />,
        description: "Proprietary machine learning models optimize strategies based on market conditions and on-chain data"
      },
      {
        title: "Cross-Chain Exposure",
        icon: <Layers className="w-5 h-5 text-orion" />,
        description: "Access opportunities across multiple blockchains through Nodo's secure bridge technology"
      },
      {
        title: "24/7 Monitoring",
        icon: <BarChart3 className="w-5 h-5 text-orion" />,
        description: "Continuous position management with automated risk controls and alert systems"
      },
      {
        title: "Premium Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-orion" />,
        description: "• 0.5% annual management fee\n• 15% performance fee on profits"
      }
    ]
  },
  {
    id: "vault-703",
    name: "AlphaSync",
    type: "Market Maker",
    icon: <TrendingUp className="w-5 h-5 text-white" />,
    description: "Advanced trading strategy targeting alpha generation through sophisticated market-making algorithms. This Nodo vault utilizes high-frequency execution with optimized gas and MEV protection to capture spreads across decentralized exchanges.",
    nav: "$107.89",
    tvl: "$4,215.65",
    inception: "03 May 23",
    apy: "10.2% - 15.8%",
    risk: "High",
    color: "bg-nova/20 text-nova",
    shadow: "shadow-neon-nova",
    chartColor: "#F43F5E",
    portfolio: {
      icon: <BarChart3 className="w-5 h-5 text-white" />,
      releaseDate: "June 10, 2023"
    },
    chain: {
      name: "Sui",
      icon: <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs text-white">S</div>
    },
    compatibility: [
      <div key="1" className="w-5 h-5 bg-nova/60 rounded-full flex items-center justify-center text-xs text-white">N</div>,
      <div key="2" className="w-5 h-5 bg-orion/60 rounded-full flex items-center justify-center text-xs text-white">O</div>,
      <div key="3" className="w-5 h-5 bg-aero/60 rounded-full flex items-center justify-center text-xs text-white">A</div>
    ],
    features: [
      {
        title: "MEV Protection",
        icon: <ShieldCheck className="w-5 h-5 text-nova" />,
        description: "Advanced protection against frontrunning and sandwich attacks through private transaction channels"
      },
      {
        title: "ML Price Prediction",
        icon: <Sparkles className="w-5 h-5 text-nova" />,
        description: "Machine learning models predict short-term price movements to optimize entry and exit points"
      },
      {
        title: "Automated Rebalancing",
        icon: <Layers className="w-5 h-5 text-nova" />,
        description: "Strategy automatically adjusts position sizes based on market volatility and liquidity conditions"
      },
      {
        title: "Premium Fee Structure",
        icon: <CircleDollarSign className="w-5 h-5 text-nova" />,
        description: "• 1% annual management fee\n• 20% performance fee on profits"
      }
    ]
  }
];

const Vaults = () => {
  const [selectedVault, setSelectedVault] = useState<ExtendedVaultOption>(vaults[0]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'history'>('overview');
  const { toast } = useToast();
  
  // Simulated transaction history data
  const transactionHistory = [
    { id: 'tx1', date: '2025-04-01', type: 'Deposit', amount: '+500 USDC', status: 'Completed' },
    { id: 'tx2', date: '2025-03-28', type: 'Withdrawal', amount: '-120 USDC', status: 'Completed' },
    { id: 'tx3', date: '2025-03-22', type: 'Yield', amount: '+12.5 USDC', status: 'Completed' },
    { id: 'tx4', date: '2025-03-15', type: 'Deposit', amount: '+300 USDC', status: 'Completed' },
  ];
  
  useEffect(() => {
    // Animation when switching vaults
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 500);
    return () => clearTimeout(timer);
  }, [selectedVault.id]);
  
  const handleSelectVault = (vault: VaultOption) => {
    // Find the matching extended vault
    const extendedVault = vaults.find(v => v.id === vault.id);
    if (extendedVault) {
      setSelectedVault(extendedVault);
      
      // Show toast notification when vault is changed
      toast({
        title: `${extendedVault.name} Selected`,
        description: `You are now viewing the ${extendedVault.type} vault strategy.`,
        variant: "default",
      });
    }
  };

  // Function to determine background color based on transaction type
  const getTransactionBackground = (type: string) => {
    switch (type) {
      case 'Deposit':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'Withdrawal':
        return 'bg-amber-500/10 text-amber-400';
      case 'Yield':
        return 'bg-nova/10 text-nova';
      default:
        return 'bg-white/10';
    }
  };
  
  return (
    <div className="min-h-screen bg-nodo-darker text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-nova/5 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-40 right-1/5 w-80 h-80 bg-aero/5 rounded-full blur-[150px] animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orion/5 rounded-full blur-[100px] animate-pulse-glow"></div>
      </div>
      
      <Navbar />
      
      {/* Header with interactive elements */}
      <header className="relative z-10 pt-32 pb-6 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                <span className="text-gradient-nova">nodo</span>&nbsp;vaults
                <Badge variant="outline" className="ml-3 bg-white/5 text-xs">Beta</Badge>
              </h1>
              <p className="text-white/70 max-w-2xl">
                Explore our AI-powered investment strategies with institutional-grade risk management and optimized returns.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button className="bg-gradient-to-r from-nova/80 to-orion/80 hover:opacity-90">
                <Eye className="mr-2 h-4 w-4" /> Watch Tutorial
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto">
        <div className="pb-16 px-6 md:px-12">
          {/* Enhanced VaultSelector with VaultTabs */}
          <div className="mb-8">
            <VaultSelector 
              vaults={vaults}
              selectedVault={selectedVault}
              onSelectVault={handleSelectVault}
            />
          </div>
          
          {/* Additional Interactive Tabs */}
          <div className="mb-10">
            {/* VaultTabs component */}
          </div>
          
          {/* Content Tabs for Overview, Analytics, History */}
          <div className="mb-6 border-b border-white/10">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`px-4 py-2 relative ${activeTab === 'overview' ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
              >
                Overview
                {activeTab === 'overview' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nova"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('analytics')} 
                className={`px-4 py-2 relative ${activeTab === 'analytics' ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
              >
                Analytics
                {activeTab === 'analytics' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nova"></span>}
              </button>
              <button 
                onClick={() => setActiveTab('history')} 
                className={`px-4 py-2 relative ${activeTab === 'history' ? 'text-white' : 'text-white/60 hover:text-white/80'}`}
              >
                Transaction History
                {activeTab === 'history' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-nova"></span>}
              </button>
            </div>
          </div>

          {/* Tab Content with Animation */}
          <div className={`transition-opacity duration-300 ${showAnimation ? 'opacity-0' : 'opacity-100'}`}>
            {activeTab === 'overview' && (
              <VaultDetails vault={selectedVault} />
            )}
            
            {activeTab === 'analytics' && (
              <div className="glass-card p-8 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Advanced Analytics</h2>
                <p className="text-white/70 mb-4">
                  Detailed performance metrics and analysis for {selectedVault.name}.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-sm text-white/60 mb-2">Portfolio Correlation</h3>
                    <div className="text-2xl font-bold">0.34</div>
                    <div className="text-xs text-emerald-400">Low correlation to market</div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-sm text-white/60 mb-2">Sortino Ratio</h3>
                    <div className="text-2xl font-bold">2.8</div>
                    <div className="text-xs text-emerald-400">Above benchmark</div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="text-sm text-white/60 mb-2">Max Drawdown Recovery</h3>
                    <div className="text-2xl font-bold">14 days</div>
                    <div className="text-xs text-white/60">Avg. recovery time</div>
                  </div>
                </div>
                
                <div className="h-80 bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-white/40 text-center">
                    <BarChart3 className="w-10 h-10 mx-auto mb-2" />
                    <p>Detailed analytics charts</p>
                    <p className="text-xs">(Premium feature)</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="glass-card p-8 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Transaction History</h2>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((tx) => (
                      <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${getTransactionBackground(tx.type)}`}>
                            {tx.type}
                          </span>
                        </TableCell>
                        <TableCell className={tx.type === 'Withdrawal' ? 'text-amber-400' : 'text-emerald-400'}>
                          {tx.amount}
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-emerald-400" />
                          <span>{tx.status}</span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">
                    View All Transactions
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Nodo Staking & Rewards Section */}
          <div className="mt-16">
            <div className="glass-card p-8 rounded-xl border border-white/10 relative overflow-hidden group hover:border-nova/30 transition-colors duration-300">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-nova/10 rounded-full blur-[80px] opacity-60 group-hover:opacity-80 transition-opacity"></div>
              <div className="ml-6 relative z-10">
                <h2 className="text-2xl font-bold mb-2">
                  <span className="text-nova">nodo</span> staking & yield 
                  <span className="text-nova ml-2">boosters</span>
                </h2>
                <p className="text-white/70 mb-4">
                  Stake NODO tokens to amplify your returns and unlock premium features
                </p>
                <Button variant="outline" className="bg-transparent border-nova/30 text-nova hover:bg-nova/10 group">
                  learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vaults;
