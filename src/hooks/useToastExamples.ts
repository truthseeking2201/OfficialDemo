import { toast } from "../components/ui/sonner";

/**
 * Examples of how to use the custom toast
 */
export const useToastExamples = () => {
  const showSuccessToast = () => {
    toast('Deposit successful', {
      description: 'Your 1 000 USDC deposit has been confirmed.',
      data: { variant: 'success' },
    });
  };

  const showWithdrawToast = () => {
    toast('Withdraw submitted', {
      description: '200 NDLP withdrawal is now cooling down.',
      data: { variant: 'success' },
    });
  };

  const showErrorToast = () => {
    toast('Network timeout', {
      description: 'Network timeout. Please try again later',
      data: { variant: 'error' },
    });
  };

  return {
    showSuccessToast,
    showWithdrawToast,
    showErrorToast
  };
};