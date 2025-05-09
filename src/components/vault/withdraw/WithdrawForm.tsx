import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import debounce from "lodash/debounce";

import SummaryConfirmWithraw from "./SummaryConfirmWithraw";
import { Button } from "@/components/ui/button";
import { RowItem } from "@/components/ui/row-item";
import { Info, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { showFormatNumber } from "@/lib/number";

import { useCurrentAccount } from "@mysten/dapp-kit";
import useExchangeRateToken from "@/hooks/useExchangeRateToken";
import { useMyAssets, useWallet } from "@/hooks";
import { getBalanceToken } from "@/use_case/withdraw_vault_use_case";

import LpType from "@/types/lp-type";

type Props = {
  balanceLp: number;
  lpData: LpType;
};
interface IFormInput {
  amount: number;
}

export default function WithdrawForm({ balanceLp, lpData }: Props) {
  const summary_default = {
    amount: 0,
    receive: 0,
    fee: 0,
    rateFee: 0.5,
  };
  const [summary, setSummary] = useState(summary_default);
  const [form, setForm] = useState<IFormInput>();
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  /**
   * HOOKS
   */
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "all" });
  const currentAccount = useCurrentAccount();
  const address = currentAccount?.address;

  /**
   * FUNCTION
   */
  const onSubmit = (data) => {
    setForm(data);
    setOpenModalConfirm(true);
  };
  const onCloseModalConfirm = () => {
    setOpenModalConfirm(false);
  };
  const onCloseModalSuccess = () => {
    setOpenModalSuccess(false);
  };

  const handleMaxAmount = useCallback(() => {
    setValue("amount", balanceLp);
  }, [balanceLp]);

  const handleFormChange = useCallback((data: IFormInput) => {
    if (!Number(data.amount)) {
      setSummary(summary_default);
      return;
    }
    setSummary({
      ...summary_default,
      amount: data.amount,
      receive: data.amount * 1, //TODO
      fee: data.amount * 0.05, //TODO,
      rateFee: 0.5,
    });
  }, []);

  const onWithdraw = useCallback(() => {
    // TODO
    console.log("-------onWithdraw");
    setOpenModalSuccess(true);
    onCloseModalConfirm();
  }, []);

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    const debouncedCb = debounce((formValue) => {
      handleFormChange(formValue);
    }, 500);

    const subscription = watch(debouncedCb);
    return () => subscription.unsubscribe();
  }, [watch]);

  /**
   * RENDER
   */
  return (
    <div>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="font-body text-gray-400">
            Withdraw Amount ({lpData.lp_symbol})
          </div>
          <div className="font-body text-gray-400">
            Avaialble:{" "}
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
              min: 0.1,
              max: balanceLp,
              pattern: /^\d*\.?\d{0,2}$/,
            })}
            className="input-vault w-full font-heading-lg"
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
          <div className="text-red-error text-sm mt-1 flex items-center">
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
        <div className="mb-6 p-4 border border-white/15 rounded-lg mt-6">
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
            {summary.fee
              ? `${showFormatNumber(summary.fee)} ${lpData.token_symbol}`
              : "--"}
          </RowItem>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="xl"
          className="w-full font-semibold text-lg mt-6"
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
          </div>
          {/* Footer */}
          <DialogFooter className="px-6 pb-6 w-full flex sm:space-x-0">
            <Button
              variant="outline"
              size="lg"
              className="w-full font-semibold text-base px-2 mr-2"
              onClick={onCloseModalConfirm}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="w-full font-semibold text-base px-2"
              onClick={onWithdraw}
            >
              Confirm Withdrawal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* modal success */}
      <Dialog
        open={openModalSuccess}
        onOpenChange={(isOpen) => !isOpen && onCloseModalSuccess()}
      >
        <DialogContent className="sm:max-w-[480px] bg-[#141517] border border-white/10 px-7 py-8 rounded-2xl gap-5">
          <DialogHeader className="relative">
            <div className="flex items-center justify-center mb-5">
              <div className="bg-emerald-500 rounded-full	flex items-center justify-center h-16 w-16">
                <Check size={32} />
              </div>
            </div>
            <DialogTitle className="text-xl font-bold m-0 text-center">
              Withdrawal Request Confirmed!
            </DialogTitle>
            <DialogDescription className="m-0 text-center text-base text-gray-400">
              Your $512.50 withdrawal request from Nodo AI Vault has been
              confirmed. Funds will be available after the{" "}
              <span className="whitespace-nowrap">24-hour</span> cooldown.
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
