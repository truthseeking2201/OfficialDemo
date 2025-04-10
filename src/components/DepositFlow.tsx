
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Wallet, CircleDollarSign, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface DepositFlowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vault: {
    name: string;
    icon: React.ReactNode;
    iconBg: string;
  } | null;
}

type StepType = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: StepType[] = [
  {
    id: 1,
    title: "Amount",
    description: "Select deposit amount",
    icon: <CircleDollarSign className="w-4 h-4" />
  },
  {
    id: 2,
    title: "Review",
    description: "Confirm details",
    icon: <BarChart3 className="w-4 h-4" />
  },
  {
    id: 3,
    title: "Complete",
    description: "Finalize deposit",
    icon: <Check className="w-4 h-4" />
  }
];

const DepositFlow: React.FC<DepositFlowProps> = ({ open, onOpenChange, vault }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const handleNextStep = () => {
    if (step === 1) {
      if (!amount || parseFloat(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      simulateProcessing();
    } else if (step === 3) {
      onOpenChange(false);
      setTimeout(() => {
        setStep(1);
        setAmount('');
        setIsProcessing(false);
        setProgressValue(0);
      }, 500);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const simulateProcessing = () => {
    setIsProcessing(true);
    
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success(`Successfully deposited $${amount} into ${vault?.name}`);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const goToStep = (stepId: number) => {
    if (stepId < step) {
      setStep(stepId);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-nodo-dark text-white border border-white/10 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {vault && (
              <div className={`w-6 h-6 rounded-full ${vault.iconBg} flex items-center justify-center`}>
                {vault.icon}
              </div>
            )}
            Deposit to {vault?.name}
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Deposit funds into this vault to start earning yield
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-6 relative">
          <div className="absolute w-full top-1/2 h-0.5 bg-white/10 -z-10 transform -translate-y-1/2"></div>
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <button 
                className={`flex flex-col items-center gap-1 ${step >= s.id ? 'cursor-pointer' : 'pointer-events-none opacity-50'}`}
                onClick={() => goToStep(s.id)}
                disabled={step < s.id}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step > s.id 
                      ? 'bg-green-600' 
                      : step === s.id 
                      ? 'bg-aero' 
                      : 'bg-white/20'
                  }`}
                >
                  {step > s.id ? <Check className="w-4 h-4" /> : s.icon}
                </div>
                <div className="text-xs font-medium">{s.title}</div>
              </button>
              {idx < steps.length - 1 && <div className="flex-1"></div>}
            </React.Fragment>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium text-white/70">
                Deposit Amount (USDC)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50">$</span>
                <Input
                  id="amount"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="pl-8 bg-white/5 border-white/10 focus:border-white/30"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full bg-aero hover:bg-aero/90"
                onClick={handleNextStep}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <Card className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Deposit Amount</span>
                  <span className="font-mono">${parseFloat(amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Vault</span>
                  <span>{vault?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Transaction Fee</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <div className="h-px bg-white/10 my-2"></div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="font-mono">${parseFloat(amount).toFixed(2)}</span>
                </div>
              </div>
            </Card>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1 bg-transparent border-white/20 hover:bg-white/10"
                onClick={handlePrevStep}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-aero hover:bg-aero/90"
                onClick={handleNextStep}
              >
                Confirm Deposit <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            {isProcessing ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="animate-pulse mb-4">
                    <Wallet className="w-12 h-12 mx-auto text-aero" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Processing Your Deposit</h3>
                  <p className="text-white/70 text-sm mb-4">Please wait while we process your transaction</p>
                </div>
                
                <Progress 
                  value={progressValue} 
                  className="h-2 bg-white/10" 
                  indicatorClassName="bg-aero" 
                />
                
                <div className="flex justify-between text-xs text-white/50">
                  <span>Initializing</span>
                  <span>Processing</span>
                  <span>Completing</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Deposit Successful!</h3>
                  <p className="text-white/70 text-sm">
                    You've successfully deposited <span className="font-mono">${parseFloat(amount).toFixed(2)}</span> into {vault?.name}
                  </p>
                </div>
                
                <Card className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Transaction ID</span>
                      <span className="font-mono">txn-{Math.random().toString(36).substring(2, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Date</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
                
                <div className="pt-2">
                  <Button 
                    onClick={handleNextStep}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Done <Check className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepositFlow;
