import { COIN_TYPES_CONFIG } from "@/config";
import { VAULT_CONFIG } from "@/config/vault-config";
import { UserCoinAsset } from "@/types/coin.types";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMergeCoins } from "./useMergeCoins";

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
          onSuccess: (data) => {
            console.log("Deposit successful:", data);
            onDepositSuccessCallback?.(data);
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
