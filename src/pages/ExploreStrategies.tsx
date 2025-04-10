
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Sparkles, LineChart, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Strategy card component
const StrategyCard = ({
  name,
  description,
  type,
  apy,
  risk,
  popularity,
  color
}: {
  name: string;
  description: string;
  type: string;
  apy: string;
  risk: string;
  popularity: number;
  color: string;
}) => {
  const icon = type === 'Yield' ? <Sparkles className="w-5 h-5 text-white" /> :
               type === 'Market Making' ? <LineChart className="w-5 h-5 text-white" /> :
               <TrendingUp className="w-5 h-5 text-white" />;

  return (
    <Card className={`glass-card p-6 rounded-xl group hover-scale shadow-neon-${color.split('-')[1]}`}>
      <div className="flex justify-between items-center mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          {icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-xs ${color} bg-white/10`}>
          {type}
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-white/70 text-sm mb-3">{description}</p>
      
      <div className="flex justify-between mb-3 text-sm">
        <div>
          <span className="text-white/60 mr-1">APY:</span>
          <span className="font-medium">{apy}</span>
        </div>
        <div>
          <span className="text-white/60 mr-1">Risk:</span>
          <span className="font-medium">{risk}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/60">Popularity</span>
          <span className="text-white/80">{popularity}%</span>
        </div>
        <Progress value={popularity} className="h-1.5 bg-white/10" />
      </div>
      
      <Button className="w-full bg-transparent border border-white/20 hover:bg-white/10 text-white group-hover:border-nova group-hover:text-nova transition-colors flex items-center justify-center gap-2">
        <span>Explore Strategy</span>
        <ArrowUpRight size={16} />
      </Button>
    </Card>
  );
};

const ExploreStrategies = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const strategies = [
    {
      name: "Delta-Neutral Liquidity",
      description: "Provide liquidity while maintaining balanced exposure to minimize price risk.",
      type: "Market Making",
      apy: "8.4% - 12.2%",
      risk: "Medium",
      popularity: 82,
      color: "bg-nova/20 text-nova"
    },
    {
      name: "USDC Lend-Optimize",
      description: "Automatically shifts stablecoin deposits between lending protocols for maximum yield.",
      type: "Yield",
      apy: "6.2% - 8.7%",
      risk: "Low",
      popularity: 94,
      color: "bg-aero/20 text-aero"
    },
    {
      name: "Flash Arbitrage",
      description: "Execute cross-DEX arbitrage opportunities with flash loans and low latency execution.",
      type: "Arbitrage",
      apy: "12.5% - 18.3%",
      risk: "High",
      popularity: 65,
      color: "bg-orion/20 text-orion"
    },
    {
      name: "SUI Compounding",
      description: "Stack SUI yields through a combination of staking, lending, and protocol farming.",
      type: "Yield",
      apy: "9.1% - 11.8%",
      risk: "Medium",
      popularity: 78,
      color: "bg-aero/20 text-aero"
    },
    {
      name: "Range Bound Market Making",
      description: "Dynamic liquidity provision that concentrates in narrower price ranges for higher fees.",
      type: "Market Making",
      apy: "10.2% - 14.6%",
      risk: "Medium-High",
      popularity: 69,
      color: "bg-nova/20 text-nova"
    },
    {
      name: "Options Vault Strategy",
      description: "Generate yield through automated options writing and hedging strategies.",
      type: "Yield",
      apy: "7.8% - 13.4%",
      risk: "Medium-High",
      popularity: 62,
      color: "bg-orion/20 text-orion"
    },
    {
      name: "Correlation Arbitrage",
      description: "Exploit price discrepancies between correlated assets across different venues.",
      type: "Arbitrage",
      apy: "11.3% - 16.5%",
      risk: "High",
      popularity: 57,
      color: "bg-orion/20 text-orion"
    },
    {
      name: "Stablecoin Maximizer",
      description: "Diversified stablecoin strategy with focus on capital preservation and steady yield.",
      type: "Yield",
      apy: "5.9% - 7.4%",
      risk: "Low",
      popularity: 91,
      color: "bg-aero/20 text-aero"
    },
    {
      name: "Dynamic LP Rebalancer",
      description: "Intelligently shifts liquidity between pools based on volume and fee generation metrics.",
      type: "Market Making",
      apy: "9.5% - 13.8%",
      risk: "Medium",
      popularity: 73,
      color: "bg-nova/20 text-nova"
    }
  ];
  
  // Filter strategies based on active filter and search query
  const filteredStrategies = strategies.filter(strategy => {
    const matchesFilter = activeFilter === 'all' || strategy.type.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = strategy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-nodo-darker text-white">
      <Navbar />
      <main>
        <div className="pt-28 pb-12 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore AI Strategies</h1>
              <p className="text-white/70 max-w-3xl">
                Browse our library of AI-powered investment strategies across various risk levels and investment objectives.
                Each strategy can be deployed in a vault or combined with others for custom portfolio solutions.
              </p>
            </div>
            
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'all' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All Strategies
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'yield' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('yield')}
                  >
                    Yield
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'market making' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('market making')}
                  >
                    Market Making
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`bg-transparent border ${activeFilter === 'arbitrage' ? 'border-nova text-nova' : 'border-white/20 text-white/70'} hover:bg-white/5`}
                    onClick={() => setActiveFilter('arbitrage')}
                  >
                    Arbitrage
                  </Button>
                </div>
                
                <div className="relative w-full md:w-auto">
                  <Input
                    placeholder="Search strategies..."
                    className="pl-9 bg-white/5 border-white/20 focus:border-nova w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 text-white/50 w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStrategies.map((strategy, index) => (
                <StrategyCard key={index} {...strategy} />
              ))}
            </div>
            
            {filteredStrategies.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <Search className="w-12 h-12 text-white/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No strategies found</h3>
                <p className="text-white/60 text-center max-w-md">
                  No strategies matched your search criteria. Try adjusting your filters or search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreStrategies;
