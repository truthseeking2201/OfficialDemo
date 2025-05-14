import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";
import { random } from "lodash";
import { v4 as uuid } from "uuid";

import SummaryConfirmWithraw from "./SummaryConfirmWithraw";
import { Button } from "../../../components/ui/button";
import { RowItem } from "../../../components/ui/row-item";
import { Loader } from "../../../components/ui/loader";
import { IconErrorToast } from "../../../components/ui/icon-error-toast";
import { IconCheckSuccess } from "../../../components/ui/icon-check-success";
import { Badge } from "../../../components/ui/badge";
import { Info, Clock4 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { toast as uiToast } from "../../../components/ui/use-toast";
import { toast } from "../../../components/ui/sonner";

import { showFormatNumber } from "../../../lib/number";
import { useCurrentAccount } from "../../../stubs/FakeWalletBridge";
import LpType from "../../../types/lp.type";
import { useEstWithdrawVault } from "../../../hooks/useWithdrawVault";
import { useWithdrawMutation } from "../../../stubs/fakeQueries";
import { useWithdrawStore } from "../../../store/withdrawStore";

type Props = {
  balanceLp: number;
  lpData: LpType;
  onSuccess: () => void;
};

interface IFormInput {
  amount: number;
}

export default function WithdrawForm({ balanceLp, lpData, onSuccess }: Props) {
  // State
  const summary_default = {
    amount: 0,
    receive: 0,
    fee: 0,
    rateFee: 0.5,
  };
  const min_amount = 0.1;
  const [summary, setSummary] = useState(summary_default);
  const [timeCoolDown, setTimeCoolDown] = useState<string>("24-hour");
  const [form, setForm] = useState<IFormInput>();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Prepare badge UI element for reuse
  const BadgeCoolDown = (
    <Badge
      variant="warning"
      className="w-full p-4 rounded-xl block"
    >
      <div className="flex items-center mb-1">
        <Clock4 size={14} />{" "}
        <span className="text-sm text-white font-medium	ml-1.5 capitalize">
          {timeCoolDown} Cooldown Period
        </span>
      </div>
      <p className="m-0 font-normal text-xs">
        After confirming your withdrawal, there will be a {timeCoolDown}{" "}
        cooldown period before funds are released.
      </p>
    </Badge>
  );

  // Hooks
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });
  const currentAccount = useCurrentAccount();
  const address = currentAccount?.address;
  const { amountEst, configVault } = useEstWithdrawVault(
    form?.amount || 0,
    lpData
  );

  // Get withdraw mutation from fakeQueries
  const withdrawMutation = useWithdrawMutation();

  // Form handlers
  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    setForm(data);
    setOpenModalConfirm(true);
  };

  const onCloseModalConfirm = useCallback(() => {
    if (isLoading) return;
    setOpenModalConfirm(false);
  }, [isLoading]);

  const onCloseModalSuccess = () => {
    // Show toast notification when the user closes the success modal
    toast("Withdrawal request confirmed", {
      description: `Your ${showFormatNumber(summary.amount || 0)} ${lpData.lp_symbol} withdrawal is now cooling down.`,
      data: { variant: "success" }
    });
    setOpenModalSuccess(false);
    reset();
  };

  const handleMaxAmount = useCallback(() => {
    setValue("amount", balanceLp);
  }, [balanceLp, setValue]);

  const handleFormChange = useCallback((data: IFormInput) => {
    setForm(data);
  }, []);

  // FIXED FUNCTION: This handles the withdraw button click
  const handleWithdraw = useCallback(() => {
    if (!form) {
      console.error("No form data available");
      return;
    }
    
    console.log("Starting withdrawal process", { amount: form.amount, vaultId: lpData.vault_id });
    setIsLoading(true);
    
    // Force mock using simple setTimeout, avoiding any async issues
    setTimeout(() => {
      try {
        console.log("Withdrawal successful");
        
        // Create pending withdrawal data to save
        const pending = {
          id: uuid(),
          vaultId: lpData.vault_id,
          amountNdlp: Number(form.amount),
          feeUsd: Number(summary.fee || 0),
          conversionRate: Number(summary.receive / form.amount) || 0.995,
          createdAt: Date.now(),
          cooldownEnd: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
          recipient: address || "unknown",
        };
        
        // Save to withdraw store
        useWithdrawStore.getState().setPending(pending);
        
        // First close confirm modal
        setOpenModalConfirm(false);
        
        // Then open the success dialog with a small delay
        setTimeout(() => {
          setOpenModalSuccess(true);
          onSuccess();
          setIsLoading(false);
        }, 200);
        
      } catch (error) {
        console.error("Withdrawal failed:", error);
        uiToast({
          title: "Withdrawal failed",
          description: error.message || "An error occurred during withdrawal",
          variant: "destructive",
          duration: 5000,
        });
        // Also show in the custom toast
        toast("Withdrawal failed", {
          description: error.message || "An error occurred during withdrawal",
          data: { variant: "error" }
        });
        setIsLoading(false);
      }
    }, 1000);  // Simulate network delay
  }, [form, lpData.vault_id, onSuccess, summary, address]);

  // Update summary when estimate changes
  useEffect(() => {
    setSummary(amountEst);
  }, [amountEst]);

  // Watch form changes
  useEffect(() => {
    const debouncedCb = debounce((formValue) => {
      handleFormChange(formValue);
    }, 500);

    const subscription = watch(debouncedCb);
    return () => subscription.unsubscribe();
  }, [watch, handleFormChange]);

  // Render
  return (
    <div>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="font-body text-gray-400 !font-medium">
            Withdraw Amount ({lpData.lp_symbol})
          </div>
          <div className="font-body text-gray-400">
            Available:{" "}
            <span className="font-mono text-white">
              {balanceLp} {lpData.lp_symbol}
            </span>
          </div>
        </div>
        
        {/* Amount input */}
        <div className="relative mb-2 mt-2">
          <input
            type="text"
            placeholder="0.00"
            {...register("amount", {
              required: true,
              min: min_amount,
              max: balanceLp,
              pattern: /^\d*\.?\d{0,2}$/,
            })}
            className="input-vault w-full font-heading-lg text-3xl font-bold"
          />

          {/* MAX button */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex rounded-full mx-auto bg-gradient-to-tr from-[#0090FF] via-[#FF6D9C] to-[#FB7E16] p-px hover:opacity-70 transition-all duration-300">
            <button
              type="button"
              onClick={handleMaxAmount}
              className="bg-[#202124] border border-[#1A1A1A] text-white hover:text-white px-4 py-1 rounded-[16px] text-sm font-medium"
            >
              MAX
            </button>
          </div>
        </div>
        
        {/* Error messages */}
        {errors.amount?.type && (
          <div className="text-red-500 text-sm mt-1 flex items-center">
            <Info
              size={18}
              className="mr-2"
            />
            {(() => {
              if (errors.amount?.type === "required") {
                return "Please enter withdrawal amount";
              } else if (errors.amount?.type === "pattern") {
                return "Invalid withdrawal amount";
              } else if (errors.amount?.type === "max") {
                return `Insufficient ${lpData.lp_symbol} balance.`;
              } else if (errors.amount?.type === "min") {
                return `Please enter a valid amount`;
              }
            })()}
          </div>
        )}

        {/* Summary */}
        <div className="mb-5 p-4 border border-white/15 rounded-lg mt-5">
          <div className="mb-2 text-gray-200 font-medium">Withdraw Summary</div>
          <hr className="w-full border-t border-white/15" />
          <RowItem
            label="Amount"
            className="mt-2"
          >
            {summary.amount
              ? `${showFormatNumber(summary.amount)} ${lpData.lp_symbol}`
              : "--"}
          </RowItem>
          <RowItem
            label="To Receive"
            className="mt-3"
          >
            {summary.receive
              ? `${showFormatNumber(summary.receive)} ${lpData.token_symbol}`
              : "--"}
          </RowItem>
          <RowItem
            label="Withdraw Fee"
            className="mt-3"
          >
            {summary.amount
              ? `${showFormatNumber(summary.fee)} ${lpData.token_symbol}`
              : "--"}
          </RowItem>
        </div>

        {/* Cooldown notice */}
        {BadgeCoolDown}

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full font-semibold text-lg mt-5"
        >
          Withdraw
        </Button>
      </form>

      {/* Confirmation Modal */}
      <Dialog
        open={openModalConfirm}
        onOpenChange={(isOpen) => !isOpen && onCloseModalConfirm()}
      >
        <DialogContent className="sm:max-w-[480px] bg-[#141517] border border-white/10 p-0 rounded-2xl gap-8">
          <DialogHeader className="px-6 pt-6 pb-0 relative">
            <DialogTitle className="text-xl font-bold m-0">
              Confirm Your Withdrawal
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirm Your Withdrawal
            </DialogDescription>
          </DialogHeader>
          
          {/* Content */}
          <div className="px-6">
            <SummaryConfirmWithraw
              summary={summary}
              lpData={lpData}
              address={address}
            />
            <div className="mt-4">{BadgeCoolDown}</div>
          </div>
          
          {/* Footer */}
          <DialogFooter className="px-6 pb-6 w-full flex sm:space-x-0">
            <Button
              variant="outline"
              size="lg"
              className="w-full font-semibold text-base px-2 mr-2"
              onClick={onCloseModalConfirm}
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="w-full font-semibold text-base px-2 flex items-center justify-center [&_svg]:size-5"
              onClick={handleWithdraw}
              disabled={isLoading}
              id="confirm-withdrawal-button"
              data-testid="confirm-withdrawal-button"
              aria-label="Confirm Withdrawal"
            >
              {isLoading && <Loader className="mr-2" />}
              {isLoading ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog
        open={openModalSuccess}
        onOpenChange={(isOpen) => !isOpen && onCloseModalSuccess()}
      >
        <DialogContent
          className="sm:max-w-[480px] bg-[#141517] border border-white/10 px-7 py-8 rounded-2xl gap-5"
          hideIconClose={true}
        >
          <DialogHeader className="relative">
            <div className="flex items-center justify-center mb-5">
              <IconCheckSuccess />
            </div>
            <DialogTitle className="text-xl font-bold m-0 text-center">
              Withdrawal Request Confirmed!
            </DialogTitle>
            <DialogDescription className="m-0 text-center text-base text-gray-400">
              Your {showFormatNumber(summary.amount)} {lpData.lp_symbol}{" "}
              withdrawal request from Nodo AI Vault has been confirmed. Funds
              will be available after the{" "}
              <span className="whitespace-nowrap">{timeCoolDown}</span>{" "}
              cooldown.
            </DialogDescription>
          </DialogHeader>
          <SummaryConfirmWithraw
            summary={summary}
            lpData={lpData}
            address={address}
          />
          <div className="">
            <Button
              variant="primary"
              size="lg"
              className="w-full font-semibold text-base px-2 "
              onClick={onCloseModalSuccess}
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}