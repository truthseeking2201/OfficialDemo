import { useState, useEffect } from "react";
import { VaultData } from "../types/vault";
import { toast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useDepositAudio } from "./useDepositAudio";
import { useDepositCalculations } from "./useDepositCalculations";
import { useDepositAnimations } from "./useDepositAnimations";
import { useDepositMutation } from "../stubs/fakeQueries";
import { random } from "lodash";

interface UseDepositDrawerProps {
  vault?: VaultData;
  onClose?: () => void;
}

export const useDepositDrawer = (props?: UseDepositDrawerProps) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");
  const [selectedLockup, setSelectedLockup] = useState<number>(30);
  const [step, setStep] = useState<'details' | 'confirmation' | 'success'>('details');
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>("");

  // Use the refactored hooks
  const { calculateEstimatedReturns, getUnlockDate } = useDepositCalculations(props?.vault);
  const { showConfetti, setShowConfetti, countUpValue, fadeRefresh, setFadeRefresh } = useDepositAnimations(step, amount);
  useDepositAudio(step, amount);

  // Deposit mutation
  const depositMutation = useDepositMutation();

  // Set default lockup period based on vault data
  useEffect(() => {
    if (props?.vault?.lockupPeriods && props.vault.lockupPeriods.length > 0) {
      setSelectedLockup(props.vault.lockupPeriods[0].days);
    }
  }, [props?.vault]);

  // Handle fade refresh animation
  useEffect(() => {
    if (amount || selectedLockup) {
      setFadeRefresh(true);
      setTimeout(() => {
        setFadeRefresh(false);
      }, 300);
    }
  }, [amount, selectedLockup, setFadeRefresh]);

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9]*\.?[0-9]*$/.test(value) || value === '') {
      setAmount(value);
      if (value !== '') {
        const numVal = parseFloat(value);
        if (!isNaN(numVal)) {
          setSliderValue(Math.min(numVal, 100000));
        }
      } else {
        setSliderValue(0);
      }
      validateAmount(value);
    }
  };

  // Validate deposit amount
  const validateAmount = (value: string) => {
    if (!value) {
      setValidationError("");
      return;
    }

    const numVal = parseFloat(value);
    if (isNaN(numVal) || numVal <= 0) {
      setValidationError("Min 1 USDC required");
    } else if (numVal > 100000) {
      setValidationError("Exceeds wallet balance");
    } else {
      setValidationError("");
    }
  };

  // Handle confirm deposit
  const handleConfirmDeposit = () => {
    if (!amount || !props?.vault) return;

    depositMutation.mutate(
      {
        vaultId: props.vault.id,
        amount: parseFloat(amount),
        lockupPeriod: selectedLockup
      },
      {
        onSuccess: () => {
          setStep('success');
          setShowConfetti(true);
          
          setTimeout(() => {
            setShowConfetti(false);
          }, 3000);

          // Show toast notification
          toast({
            title: "NODOAIx Token Minted",
            description: `${(parseFloat(amount) * 0.98).toFixed(2)} NODOAIx Tokens have been added to your wallet. NODOAIx Tokens represent your share of the vault's assets and automatically burn upon withdrawal, functioning as proof of your deposit and yielding interest over time.`,
            variant: "default",
            duration: 5000,
          });

          // Dispatch custom event
          if (props?.vault) {
            window.dispatchEvent(new CustomEvent('deposit-success', {
              detail: { amount: parseFloat(amount), vaultId: props.vault.id }
            }));
          }
        },
        onError: (error) => {
          toast({
            title: "Deposit Failed",
            description: error.message || "There was an error processing your deposit. Please try again.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return {
    state: {
      amount,
      selectedLockup,
      step,
      sliderValue,
      validationError,
      showConfetti,
      countUpValue,
      fadeRefresh,
      depositMutation,
    },
    actions: {
      setSelectedLockup,
      handleAmountChange,
      handleSliderChange: (value: number) => {
        setSliderValue(value);
        setAmount(value.toString());
        validateAmount(value.toString());
      },
      handleMaxClick: () => {
        const maxAmount = 100000;
        setAmount(String(maxAmount));
        setSliderValue(maxAmount);
        validateAmount(String(maxAmount));
      },
      handleReviewClick: () => {
        if (!amount || parseFloat(amount) <= 0) {
          setValidationError("Please enter a valid amount");
          return;
        }
        setStep('confirmation');
      },
      handleViewDashboard: () => {
        if (props?.onClose) props.onClose();
        navigate('/dashboard');
      },
      handleDepositAgain: () => {
        setStep('details');
        setAmount("");
        setSliderValue(0);
        if (props?.vault?.lockupPeriods && props.vault.lockupPeriods.length > 0) {
          setSelectedLockup(props.vault.lockupPeriods[0].days);
        }
      },
      handleConfirmDeposit,
      openDepositDrawer: (vault: VaultData) => {
        window.dispatchEvent(new CustomEvent('open-deposit-drawer', {
          detail: { vault }
        }));
      },
    },
    calculations: {
      calculateEstimatedReturns: () => calculateEstimatedReturns(amount, selectedLockup),
      getUnlockDate: () => getUnlockDate(selectedLockup)
    }
  };
};