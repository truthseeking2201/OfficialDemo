import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { useMergeCoins } from "./useMergeCoins";

const network = import.meta.env.VITE_SUI_NETWORK;
const useWithdrawVault = () => {
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  const { mergeCoins } = useMergeCoins();

  /**
   *
   * @param lpAmount: amount wei
   * @param vaultId: vault_id
   */
  const getEstWithdrawAmount = async (lpAmount, vaultId, packageId) => {
    console.log("------lpAmount, vaultId", { lpAmount, vaultId });
    const client = new SuiClient({ url: getFullnodeUrl(network) });
    const tx = new Transaction();
    // populate the Transaction
    tx.moveCall({
      target: `${packageId}::vault::get_est_redeem_amount`,
      arguments: [tx.object(vaultId), tx.pure.u64(lpAmount)],
    });

    const res1 = await client.devInspectTransactionBlock({
      transactionBlock: tx,
      sender:
        "0xf2c8ed9d9461d16225bd32e8b64afc57de95679ea302206b6e1907de79825a24",
    });
    console.log("-------res1", res1);
    return {};
  };

  return {
    getEstWithdrawAmount,
  };
};

export default useWithdrawVault;
