import { COIN_TYPES_CONFIG } from "@/config";
import { VAULT_CONFIG } from "@/config/vault-config";
import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

export const useDepositVault = () => {
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  const deposit = async (coinId: string, amount: number, onDepositSuccessCallback?: (data: any) => void) => {
    try {
      if (!account?.address) {
        throw new Error("No account connected");
      }

      const tx = new Transaction();

      // Get the coin object to check balance
      const coin = await suiClient.getObject({
        id: coinId,
        options: { showContent: true },
      });

      // need to split the coin instead of using the whole coin
      const [splitCoin] = tx.splitCoins(tx.object(coinId), [
        tx.pure.u64(Math.floor(amount * 1_000_000_000)),
      ]);

      tx.moveCall({
        target: `${VAULT_CONFIG.PACKAGE_ID}::vault::deposit`,
        arguments: [
          tx.object(VAULT_CONFIG.VAULT_CONFIG_ID), // config parameter
          tx.object(VAULT_CONFIG.VAULT_ID), // vault parameter
          splitCoin, // use the split coin instead of the original coin
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
