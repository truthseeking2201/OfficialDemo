import { COIN_TYPES_CONFIG } from "@/config";
import { RATE_DENOMINATOR, VAULT_CONFIG } from "@/config/vault-config";
import { UserCoinAsset } from "@/types/coin.types";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMergeCoins } from "./useMergeCoins";
import { useGetVaultConfig } from "./useVault";

export const useDepositVault = () => {
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();


  const { mergeCoins } = useMergeCoins();

  const deposit = async (
    coin: UserCoinAsset,
    amount: number,
    onDepositSuccessCallback?: (data: any) => void
  ) => {
    try {
      if (!account?.address) {
        throw new Error("No account connected");
      }

      // Merge coins first
      const mergedCoinId = await mergeCoins(coin.coin_type);
      if (!mergedCoinId) {
        throw new Error("No coins available to deposit");
      }

      const tx = new Transaction();

      // Split from the merged coin
      const [splitCoin] = tx.splitCoins(tx.object(mergedCoinId), [
        tx.pure.u64(Math.floor(amount * 10 ** coin.decimals)),
      ]);

      tx.moveCall({
        target: `${VAULT_CONFIG.PACKAGE_ID}::vault::deposit`,
        arguments: [
          tx.object(VAULT_CONFIG.VAULT_CONFIG_ID),
          tx.object(VAULT_CONFIG.VAULT_ID),
          splitCoin,
        ],
        typeArguments: [
          COIN_TYPES_CONFIG.USDC_COIN_TYPE,
          COIN_TYPES_CONFIG.NDLP_COIN_TYPE,
        ],
      });

      const result = await signAndExecuteTransaction(
        {
          transaction: tx,
        },
        {
          onSuccess: async (data) => {
            const { digest } = data;
            
            const txResponse = await suiClient.waitForTransaction({
              digest,
              options: {
                showEvents: true,
              },
            });

            const events = txResponse?.events;
            
            const depositEvent = events.find(event => 
              event.type.includes('vault::DepositEvent')
            );
            console.log("🚀 ~ onSuccess: ~ depositEvent:", depositEvent)

            // Pass the event data to your callback
            onDepositSuccessCallback?.({
              ...data,
              depositAmount: (depositEvent?.parsedJson as { amount?: number })?.amount,
              depositLpAmount: (depositEvent?.parsedJson as { lp?: number })?.lp,
            });
          },
          onError: (error) => {
            console.error("Deposit failed:", error);
            throw error;
          },
        }
      );

      return result;
    } catch (error) {
      console.error("Error in deposit:", error);
      throw error;
    }
  };

  return {
    deposit,
  };
};

export const useCalculateNDLPReturn = (
  amount: number,
  usdcDecimals: number,
  ndlpDecimals: number
) => {
  const { vaultConfig } = useGetVaultConfig();

  if (!amount || !vaultConfig || !usdcDecimals || !ndlpDecimals) {
    return 0;
  }

  const rawAmount = amount * 10 ** usdcDecimals;
  const fee = (rawAmount * +vaultConfig.deposit.fields.fee_bps) / 10000;
  const net_amount = rawAmount - fee;

  const lp = (net_amount * RATE_DENOMINATOR) / +vaultConfig.rate;

  const ndlpAmountWillGet = lp / Math.pow(10, ndlpDecimals);

  return Number(ndlpAmountWillGet).toFixed(2);
};
