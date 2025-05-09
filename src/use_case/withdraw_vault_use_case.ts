import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

// import { useWalletKit } from "@mysten/wallet-kit";
const network_default = import.meta.env.VITE_SUI_NETWORK || "testnet";

interface paramsGetBalanceToken {
  owner: string;
  coinType: string;
  network?: string;
}
export const getBalanceToken = async ({
  owner,
  coinType,
  network,
}: paramsGetBalanceToken) => {
  const client = new SuiClient({
    url: getFullnodeUrl(network || network_default),
  });
  const res = await client.getBalance({
    owner: owner,
    coinType: coinType,
  });
  console.log("--------res", res);
  return res?.totalBalance || 0;
};
