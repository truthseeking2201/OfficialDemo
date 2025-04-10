
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, Wallet, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BalanceCardProps {
  initialInvestment: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  onDeposit: () => void;
  onWithdraw: () => void;
}

const BalanceCard: React.FC<BalanceCardProps> = ({
  initialInvestment,
  currentValue,
  profitLoss,
  profitLossPercentage,
  onDeposit,
  onWithdraw
}) => {
  const [isBalanceHidden, setIsBalanceHidden] = React.useState(false);
  const { toast } = useToast();

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
    toast({
      title: isBalanceHidden ? "Balance Visible" : "Balance Hidden",
      description: isBalanceHidden ? "Your balance is now visible" : "Your balance is now hidden",
    });
  };

  const formatCurrency = (amount: number): string => {
    return isBalanceHidden 
      ? "••••••" 
      : `$${amount.toLocaleString()}`;
  };

  return (
    <Card className="glass-card border border-white/10 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Your Balance</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-transparent hover:bg-white/10"
          onClick={toggleBalanceVisibility}
        >
          {isBalanceHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2">{formatCurrency(currentValue)}</span>
          <div className={`flex items-center ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {profitLoss >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
            <span>{profitLossPercentage}%</span>
          </div>
        </div>
        <div className="text-sm text-white/60 mt-1">
          Initial investment: {formatCurrency(initialInvestment)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={onDeposit}
          className="bg-nova hover:bg-nova/90 flex items-center gap-2"
        >
          <ArrowUpRight className="h-4 w-4" /> Deposit
        </Button>
        <Button 
          onClick={onWithdraw}
          className="bg-amber-500 hover:bg-amber-600 flex items-center gap-2"
        >
          <ArrowDownRight className="h-4 w-4" /> Withdraw
        </Button>
      </div>
    </Card>
  );
};

export default BalanceCard;
