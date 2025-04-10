
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { VaultOption } from '../vaults/VaultSelector';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Info, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Enhanced vault data structure with more detailed information
const vaults: VaultOption[] = [
  {
    id: "vault-111",
    name: "Quantum Nexus",
    type: "Yield Optimization",
    icon: <div className="w-4 h-4 bg-amber-500 rounded-full"></div>,
    color: "bg-amber-500/20",
    status: "active",
    securityScore: 98,
    lastAudit: "March 15, 2025",
    performanceRating: "A+",
    riskLevel: "Low"
  },
  {
    id: "vault-502",
    name: "Orion Protocol",
    type: "AI Analyst",
    icon: <div className="w-4 h-4 bg-orion rounded-full"></div>,
    color: "bg-orion/20",
    status: "active",
    securityScore: 95,
    lastAudit: "January 22, 2025",
    performanceRating: "A",
    riskLevel: "Medium"
  },
  {
    id: "vault-309",
    name: "Nova Strategy",
    type: "Market Maker",
    icon: <div className="w-4 h-4 bg-nova rounded-full"></div>,
    color: "bg-nova/20",
    status: "maintenance",
    securityScore: 92,
    lastAudit: "February 5, 2025",
    performanceRating: "B+",
    riskLevel: "High"
  }
];

interface VaultTabsProps {
  selectedVault: VaultOption;
  onSelectVault: (vault: VaultOption) => void;
}

export function VaultTabs({ selectedVault, onSelectVault }: VaultTabsProps) {
  const [hoveredVault, setHoveredVault] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInfoClick = (vaultId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the tab selection
    
    // Find the vault data to show in the toast
    const vault = vaults.find(v => v.id === vaultId);
    
    if (vault) {
      toast({
        title: `${vault.name} Details`,
        description: (
          <div className="space-y-2 pt-1">
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Risk Level:</span>
              <span className={`text-sm font-medium ${getRiskColor(vault.riskLevel as string)}`}>{vault.riskLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Security Score:</span>
              <span className="text-sm font-medium">{vault.securityScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Last Audit:</span>
              <span className="text-sm font-medium">{vault.lastAudit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/80">Performance:</span>
              <span className={`text-sm font-medium ${getPerformanceColor(vault.performanceRating as string)}`}>
                {vault.performanceRating}
              </span>
            </div>
          </div>
        ),
        variant: "default",
      });
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs ml-2">
            Active
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 text-xs ml-2">
            Maintenance
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-emerald-400";
      case "Medium":
        return "text-amber-400";
      case "High":
        return "text-red-400";
      default:
        return "";
    }
  };
  
  const getPerformanceColor = (performance: string) => {
    if (performance.startsWith("A")) return "text-emerald-400";
    if (performance.startsWith("B")) return "text-amber-400";
    if (performance.startsWith("C")) return "text-yellow-400";
    return "text-red-400";
  };

  const handleMouseEnter = (vaultId: string) => {
    setHoveredVault(vaultId);
  };
  
  const handleMouseLeave = () => {
    setHoveredVault(null);
  };

  return (
    <Tabs value={selectedVault.id} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        {vaults.map((vault) => (
          <TabsTrigger
            key={vault.id}
            value={vault.id}
            onClick={() => onSelectVault(vault)}
            onMouseEnter={() => handleMouseEnter(vault.id)}
            onMouseLeave={handleMouseLeave}
            className={`data-[state=active]:bg-white/10 relative group transition-all duration-300 overflow-hidden ${
              hoveredVault === vault.id ? 'bg-white/5' : ''
            }`}
          >
            <div className="flex items-center gap-2 relative z-10">
              <span className={`w-3 h-3 rounded-full ${vault.color.replace('/20', '')} transition-transform duration-300 group-hover:scale-110`}></span>
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="font-medium">{vault.name}</span>
                  {getStatusIndicator(vault.status as string)}
                </div>
                <span className="text-xs opacity-70 text-left">{vault.type}</span>
              </div>
            </div>
            
            {hoveredVault === vault.id && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-transparent hover:bg-white/10" 
                  onClick={(e) => handleInfoClick(vault.id, e)}
                >
                  <Info className="w-4 h-4" />
                </Button>
                
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 animate-slide-right"></div>
              </>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {vaults.map((vault) => (
        <TabsContent key={vault.id} value={vault.id} className="space-y-6">
          <div className="rounded-lg border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-10 h-10 rounded-full ${vault.color} flex items-center justify-center`}>
                {vault.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold flex items-center">
                  {vault.name}
                  {vault.status === "active" ? (
                    <ShieldCheck className="ml-2 w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="ml-2 w-4 h-4 text-amber-400" />
                  )}
                </h3>
                <p className="text-sm opacity-70">{vault.type}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-xs opacity-60">Risk Level</span>
                <span className={`font-medium ${getRiskColor(vault.riskLevel as string)}`}>
                  {vault.riskLevel}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-60">Performance Rating</span>
                <span className={`font-medium ${getPerformanceColor(vault.performanceRating as string)}`}>
                  {vault.performanceRating}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs opacity-60">Security Score</span>
                <div className="flex items-center">
                  <span className="font-medium">{vault.securityScore}/100</span>
                  <div className="ml-2 h-2 w-16 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${vault.securityScore > 95 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${vault.securityScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="mt-4 bg-gradient-to-r from-nova to-orion hover:opacity-90 transition-opacity"
              size="sm"
            >
              <TrendingUp className="mr-1 h-3 w-3" /> View Performance
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default VaultTabs;
