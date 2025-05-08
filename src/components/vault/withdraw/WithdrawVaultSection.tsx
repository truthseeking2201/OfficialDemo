import { useState, useEffect, useRef } from "react";
import NDLPIcon from "@/assets/images/NDLP.png";
import { formatNumber } from "@/lib/number";
import { useCurrentAccount } from "@mysten/dapp-kit";
import useExchangeRateToken from "@/hooks/useExchangeRateToken";

export default function WithdrawVaultSection() {
  const [balanceLp, setBalanceLp] = useState<number>(0);
  const count = useRef<number>(0);

  const { ndlpUsdc: rateNdlpUsdc, refetchExchangeRate } =
    useExchangeRateToken();
  const currentAccount = useCurrentAccount();
  const isConnected = !!currentAccount?.address;
  const address = currentAccount?.address;

  /**
   * FUNCTION
   */

  /**
   * LIFECYCLES
   */
  useEffect(() => {
    refetchExchangeRate();
    // if (count.current == 0) {
    //   refetchExchangeRate();
    // }
    // count.current++;
  });

  /**
   * RENDER
   */
  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      {/* Balance */}
      <div className="">
        <div className="font-sans text-base text-white mb-3">Total Balance</div>
        <div className="flex">
          <img
            src={NDLPIcon}
            alt="NODOAIx Token"
            className="w-[36px] h-[36px]"
          />
          <div>{formatNumber(balanceLp)}</div>
        </div>
      </div>
      {/* withdraw */}
      {/* clain */}
    </div>
  );
}
