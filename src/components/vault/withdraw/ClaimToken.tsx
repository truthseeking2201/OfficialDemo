import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { formatNumber, getBalanceAmountForInput } from "@/lib/number";
import { useCurrentAccount } from "@mysten/dapp-kit";
import useExchangeRateToken from "@/hooks/useExchangeRateToken";
import { useMyAssets, useWallet } from "@/hooks";
import { NDLP } from "@/config/lp-config";
import { getBalanceToken } from "@/use_case/withdraw_vault_use_case";

import DataClaimType from "@/types/data-claim-type";

type Props = {
  data?: DataClaimType;
};

const ClaimToken = ({ data }: Props) => {
  /**
   * HOOKS
   */

  /**
   * FUNCTION
   */

  /**
   * LIFECYCLES
   */

  /**
   * RENDER
   */
  return (
    <div className="p-6 bg-black rounded-b-2xl rounded-tr-2xl">
      ClaimToken {data?.id}
    </div>
  );
};

export default ClaimToken;
