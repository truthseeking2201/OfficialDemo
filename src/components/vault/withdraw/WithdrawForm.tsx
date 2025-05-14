import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";

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

import { showFormatNumber } from "../../../lib/number";
import { useCurrentAccount } from "../../../stubs/FakeWalletBridge";
import LpType from "../../../types/lp.type";
import { useToast } from "../../../hooks/use-toast";
import {
  useEstWithdrawVault,
  useWithdrawVault,
} from "../../../hooks/useWithdrawVault";
import { useWithdrawMutation } from "../../../stubs/fakeQueries";
import { random } from "lodash";

type Props = {
  balanceLp: number;
  lpData: LpType;
  onSuccess: () => void;
};
interface IFormInput {
  amount: number;
}

export default function WithdrawForm({ balanceLp, lpData, onSuccess }: Props) {
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
  /**
   * HOOKS
   */
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
  const { toast } = useToast();
  const { withdraw } = useWithdrawVault();
  const { amountEst, configVault } = useEstWithdrawVault(
    form?.amount || 0,
    lpData
  );
  
  // Use the withdrawal mutation from our fake implementation
  const withdrawMutation = useWithdrawMutation();

  /**
   * FUNCTION
   */
  const onSubmit = (data) => {
    setForm(data);
    setOpenModalConfirm(true);
  };

  const onCloseModalConfirm = useCallback(() => {
    if (isLoading) return;
    setOpenModalConfirm(false);
  }, [isLoading]);

  const onCloseModalSuccess = () => {
    setOpenModalSuccess(false);
    reset();
  };

  const handleMaxAmount = useCallback(() => {
    setValue("amount", balanceLp);
  }, [balanceLp, setValue]);

  const handleFormChange = useCallback((data: IFormInput) => {
    setForm(data);
  }, []);

  const onWithdraw = useCallback(async () => {
    if (!form) return;
    
    setIsLoading(true);
    
    try {
      console.log("Withdrawing", form.amount, "from vault", lpData.vault_id);
      
      // Use our fake mutation with explicit try/catch for better debugging
      await withdrawMutation.mutateAsync({
        vaultId: lpData.vault_id,
        amount: form.amount
      });
      
      console.log("Withdrawal successful");
      setOpenModalSuccess(true);
      onCloseModalConfirm();
      onSuccess();
    } catch (error) {
      console.error("Withdrawal failed:", error);
      toast({
        title: "Withdraw failed",
        description: error.message || "An error occurred during withdrawal",
        variant: "destructive",
        duration: 5000,
        icon: <IconErrorToast />
      });
    } finally {
      setIsLoading(false);
    }
  }, [form, lpData.vault_id, withdrawMutation, onCloseModalConfirm, onSuccess, toast]);

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    setSummary(amountEst);
  }, [amountEst]);

  useEffect(() => {
    const debouncedCb = debounce((formValue) => {
      handleFormChange(formValue);
    }, 500);

    const subscription = watch(debouncedCb);
    return () => subscription.unsubscribe();
  }, [watch, handleFormChange]);

  /**
   * RENDER
   */
  return (
    <div>
      {/* form */}
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

        {BadgeCoolDown}

        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full font-semibold text-lg mt-5"
        >
          Withdraw
        </Button>
      </form>

      {/* modal confirm */}
      <Dialog
        open={openModalConfirm}
        onOpenChange={(isOpen) => !isOpen && onCloseModalConfirm()}
      >
        <DialogContent className="sm:max-w-[480px] bg-[#141517] border border-white/10 p-0 rounded-2xl gap-8">
          {/* Header */}
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
              className="w-full font-semibold text-base px-2 flex items-center [&_svg]:size-5"
              onClick={() => {
                console.log("Confirm Withdrawal button clicked");
                onWithdraw();
              }}
              disabled={isLoading}
            >
              {isLoading && <Loader />}{" "}
              {isLoading ? "Processing..." : "Confirm Withdrawal"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* modal success */}
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