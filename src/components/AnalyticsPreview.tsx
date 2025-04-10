
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BarChart2, LineChart, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnalyticsPreview = () => {
  return (
    <div className="py-20 px-6 md:px-12 bg-gradient-to-b from-nodo-darker to-nodo-dark">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Data-Driven Insights</h2>
            <p className="text-white/70 max-w-2xl">
              Comprehensive analytics and dashboards provide deep insights into market trends and performance.
            </p>
          </div>
          <Link to="/analytics" className="group flex items-center gap-2 py-2 mt-4 md:mt-0 text-white hover:text-nova transition-colors">
            View All Analytics
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analytics Preview */}
          <Card className="glass-card p-6 rounded-xl lg:col-span-2 h-80 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Performance Overview</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Last 30 days</span>
                <LineChart size={16} className="text-nova" />
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {/* This would be replaced with an actual chart component */}
              <div className="w-full h-48 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-white/40">Performance Chart Placeholder</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-white/60 mb-1">Total Return</div>
                <div className="text-lg font-bold text-green-400">+24.8%</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-white/60 mb-1">Sharpe Ratio</div>
                <div className="text-lg font-bold">2.14</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-white/60 mb-1">Max Drawdown</div>
                <div className="text-lg font-bold text-orange-400">-3.2%</div>
              </div>
            </div>
          </Card>
          
          {/* Side Analytics Panels */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold">Asset Allocation</h3>
                <PieChart size={16} className="text-aero" />
              </div>
              
              {/* This would be replaced with an actual chart component */}
              <div className="w-full h-40 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-white/40">Allocation Chart</span>
              </div>
            </Card>
            
            <Card className="glass-card p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold">Market Trends</h3>
                <BarChart2 size={16} className="text-orion" />
              </div>
              
              {/* This would be replaced with an actual chart component */}
              <div className="w-full h-40 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                <span className="text-white/40">Trends Chart</span>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            asChild
          >
            <Link to="/analytics">
              Explore Full Analytics Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPreview;
