
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CircleDollarSign, ChevronRight, Info, Shield, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Stepper } from '@/components/ui/stepper';

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedVault: any;
  primaryColor: string;
  onSubmit: (values: any) => void;
  vaults?: any[]; // Added vaults array for switching
  onVaultChange?: (vaultId: string) => void; // Added handler for vault switching
}

const DepositDialog: React.FC<DepositDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedVault, 
  primaryColor, 
  onSubmit,
  vaults = [],
  onVaultChange
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  
  const steps = [
    { title: "Enter amount", description: "Specify deposit amount" },
    { title: "Review details", description: "Confirm transaction" },
    { title: "Confirmation", description: "Deposit completed" }
  ];
  
  const form = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const handleSubmit = (values: any) => {
    if (currentStep === 0) {
      // Move to review step
      setCurrentStep(1);
      return;
    }
    
    if (currentStep === 1) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        // Generate random transaction ID
        const txId = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
        setTransactionId(txId);
        setCurrentStep(2);
        
        // Pass values to parent component
        onSubmit(values);
      }, 1500);
    }
  };
  
  const handleClose = () => {
    // Reset everything when closing
    form.reset();
    setShowDetails(false);
    setIsSubmitting(false);
    setCurrentStep(0);
    setTransactionId("");
    onOpenChange(false);
  };

  if (!selectedVault) return null;

  // Helper function to calculate the projected monthly yield
  const calculateMonthlyYield = (amount: string, apy: string): string => {
    const numericAmount = parseFloat(amount || '0');
    const numericApy = parseFloat(apy?.replace('%', '') || '0');
    return (numericAmount * (numericApy / 100 / 12)).toFixed(2);
  };
  
  // Helper function to calculate the projected yearly yield
  const calculateYearlyYield = (amount: string, apy: string): string => {
    const numericAmount = parseFloat(amount || '0');
    const numericApy = parseFloat(apy?.replace('%', '') || '0');
    return (numericAmount * (numericApy / 100)).toFixed(2);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose();
      } else {
        onOpenChange(isOpen);
      }
    }}>
      <DialogContent className="sm:max-w-[500px] bg-nodo-darker border border-white/10 text-white glass-card animate-in fade-in-0 zoom-in-95 duration-300">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${selectedVault.color} flex items-center justify-center relative group`}>
              {selectedVault.icon}
              <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300"></span>
            </div>
            <DialogTitle className="group">
              {currentStep === 2 ? "Deposit Successful" : `Deposit to ${selectedVault.name}`}
            </DialogTitle>
          </div>
          <DialogDescription className="text-white/70">
            {currentStep === 2 ? 
              "Your funds are now being deployed" : 
              `Make a deposit to start earning ${selectedVault.apy} APY`}
          </DialogDescription>
        </DialogHeader>
        
        {/* Stepper component */}
        <div className="mb-6">
          <Stepper 
            steps={steps}
            currentStep={currentStep}
            className="text-sm"
          />
        </div>
        
        {/* Step 0: Vault Selection */}
        {currentStep === 0 && vaults.length > 0 && onVaultChange && (
          <div className="mb-4 animate-in fade-in-50 slide-in-from-bottom-5 duration-300 delay-150">
            <Label className="text-sm font-medium mb-2 block">Select a Vault</Label>
            <div className="grid grid-cols-1 gap-3">
              {vaults.map((vault, index) => (
                <Card
                  key={vault.id}
                  className={`p-3 border cursor-pointer transition-all duration-300 card-hover-effect ${
                    selectedVault.id === vault.id 
                      ? `bg-${vault.colorAccent}/20 border-${vault.colorAccent}/50` 
                      : 'bg-nodo-dark border-white/10 hover:bg-white/5'
                  }`}
                  onClick={() => onVaultChange(vault.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${vault.color} flex items-center justify-center relative`}>
                        {vault.icon}
                        <span className={`absolute inset-0 rounded-full bg-${vault.colorAccent}/20 opacity-0 hover:opacity-100 scale-0 hover:scale-100 transition-all duration-300`}></span>
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-white transition-colors duration-300">{vault.name}</p>
                        <p className="text-xs text-white/60">{vault.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-400">{vault.apy}</p>
                      <p className="text-xs text-white/60">APY</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Step 0: Amount Entry Form */}
        {currentStep === 0 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300 delay-300">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USDC)</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="0.00"
                          className="bg-nodo-dark border-white/20 text-white pl-8 focus:border-white/40 focus:ring focus:ring-white/10 transition-all duration-300"
                          {...field}
                        />
                      </FormControl>
                      <CircleDollarSign className="absolute left-2 top-2.5 h-4 w-4 text-white/50" />
                    </div>
                    <FormDescription className="text-white/60 flex justify-between">
                      <span>Available: 125,000 USDC</span>
                      <button 
                        type="button" 
                        className="text-xs text-white hover:text-nova transition-colors duration-300"
                        onClick={() => form.setValue('amount', '125000')}
                      >
                        MAX
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between text-sm text-white/70 p-3 bg-white/5 rounded-lg">
                <span>Estimated APY:</span>
                <span className="text-green-400 font-semibold relative group">
                  {selectedVault.apy}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-green-400 group-hover:w-full transition-all duration-300"></span>
                </span>
              </div>
              
              {/* Additional deposit information section */}
              <div className={`overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-4 pt-2">
                  <div className="rounded-lg bg-nodo-dark/70 p-4 border border-white/5">
                    <h4 className="flex items-center gap-2 font-medium mb-3">
                      <TrendingUp size={16} className="text-green-400" />
                      <span>Performance Details</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Historical APY (30d):</span>
                        <span className="font-medium text-white">{parseFloat(selectedVault.apy) - 0.5}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Historical APY (90d):</span>
                        <span className="font-medium text-white">{selectedVault.apy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Projected monthly yield:</span>
                        <span className="font-medium text-white">
                          ${calculateMonthlyYield(form.getValues().amount, selectedVault.apy)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Projected yearly yield:</span>
                        <span className="font-medium text-white">
                          ${calculateYearlyYield(form.getValues().amount, selectedVault.apy)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-nodo-dark/70 p-4 border border-white/5">
                    <h4 className="flex items-center gap-2 font-medium mb-3">
                      <Shield size={16} className="text-blue-400" />
                      <span>Security & Risk</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Risk Level:</span>
                        <span className="font-medium text-white">Medium-Low</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Security Audits:</span>
                        <span className="font-medium text-white">3 completed</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Insurance Coverage:</span>
                        <span className="font-medium text-white">Yes, via Nexus Mutual</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-nodo-dark/70 p-4 border border-white/5">
                    <h4 className="flex items-center gap-2 font-medium mb-3">
                      <Clock size={16} className="text-purple-400" />
                      <span>Timeframes & Fees</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Deposit Fee:</span>
                        <span className="font-medium text-white">0%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Withdrawal Fee:</span>
                        <span className="font-medium text-white">0.1%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Lock-up Period:</span>
                        <span className="font-medium text-white">None</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Gas Estimation:</span>
                        <span className="font-medium text-white">~0.00042 SUI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="button"
                variant="ghost"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full border border-dashed border-white/20 text-white/70 hover:text-white hover:bg-white/5 text-sm py-2 h-auto transition-all"
              >
                {showDetails ? "Hide Details" : "Show Additional Information"} 
                <Info size={14} className="ml-2" />
              </Button>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClose}
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 relative overflow-hidden group"
                >
                  <span className="relative z-10">Cancel</span>
                  <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
                <Button 
                  type="submit" 
                  className={`bg-${primaryColor || 'nova'} relative group overflow-hidden`}
                  disabled={!form.getValues().amount || isSubmitting}
                >
                  <span className="relative z-10 flex items-center gap-1">
                    Continue
                    <ChevronRight size={16} className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
        
        {/* Step 1: Review */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-sm font-medium text-white/70 mb-2">Transaction Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Amount:</span>
                    <span className="font-medium">{Number(form.getValues().amount).toLocaleString()} USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Destination:</span>
                    <span className="font-medium">{selectedVault.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Expected APY:</span>
                    <span className="font-medium text-green-400">{selectedVault.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Est. Monthly Yield:</span>
                    <span className="font-medium text-green-400">${calculateMonthlyYield(form.getValues().amount, selectedVault.apy)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Gas Fee:</span>
                    <span className="font-medium">~0.00042 SUI</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-sm font-medium text-white/70 mb-2">What happens next</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-green-500/20 p-1 rounded-full">
                      <CheckCircle2 size={12} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm">Your funds will be transferred to the vault</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-blue-500/20 p-1 rounded-full">
                      <CheckCircle2 size={12} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm">The AI will automatically begin optimizing your position</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 bg-purple-500/20 p-1 rounded-full">
                      <CheckCircle2 size={12} className="text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm">Your dashboard will update with your new position</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-950/30 rounded-lg p-4 border border-blue-500/20 flex items-center gap-3">
                <Info size={20} className="text-blue-400 shrink-0" />
                <p className="text-sm text-blue-200">You can withdraw your funds at any time with no lockup period. A 0.1% withdrawal fee applies.</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setCurrentStep(0)}
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                Back
              </Button>
              <Button 
                onClick={() => handleSubmit(form.getValues())}
                className={`bg-${primaryColor || 'nova'} relative group overflow-hidden`}
                disabled={isSubmitting}
              >
                <span className="relative z-10 flex items-center gap-1">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </> 
                  ) : (
                    <>
                      Confirm Deposit
                      <ChevronRight size={16} className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </DialogFooter>
          </div>
        )}
        
        {/* Step 2: Success */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
            <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-1">Deposit Successful!</h3>
              <p className="text-white/70 text-center mb-2">
                {Number(form.getValues().amount).toLocaleString()} USDC has been deposited to {selectedVault.name}
              </p>
              <div className="bg-white/5 px-4 py-2 rounded-full font-mono text-sm">
                Transaction: {transactionId}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-sm font-medium text-white/70 mb-3">Next steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex items-center justify-center bg-purple-500/20 rounded-full text-purple-400">1</div>
                    <div>
                      <p className="text-sm font-medium">View your position</p>
                      <p className="text-xs text-white/60">Check your dashboard for real-time updates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex items-center justify-center bg-blue-500/20 rounded-full text-blue-400">2</div>
                    <div>
                      <p className="text-sm font-medium">Track AI operations</p>
                      <p className="text-xs text-white/60">Monitor the vault's strategies in the activity feed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-6 w-6 flex items-center justify-center bg-green-500/20 rounded-full text-green-400">3</div>
                    <div>
                      <p className="text-sm font-medium">Set up notifications</p>
                      <p className="text-xs text-white/60">Get alerts for important vault actions and performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  // Close dialog and reset form
                  handleClose();
                  
                  // Show success toast
                  toast({
                    title: "Deposit Successful",
                    description: `${Number(form.getValues().amount).toLocaleString()} USDC has been deposited to ${selectedVault.name}.`,
                    duration: 5000,
                  });
                }}
                className="bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  // Close dialog and reset form
                  handleClose();
                  
                  // Navigate to transactions
                  window.location.href = "/activity";
                }}
                className={`bg-${primaryColor || 'nova'} relative group overflow-hidden`}
              >
                <span className="relative z-10 flex items-center gap-1">
                  View Transaction
                  <ChevronRight size={16} className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
