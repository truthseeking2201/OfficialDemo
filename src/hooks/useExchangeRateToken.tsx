import { useState } from "react";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";

// import { useWalletKit } from "@mysten/wallet-kit";
const network = import.meta.env.VITE_SUI_NETWORK;

const useExchangeRateToken = () => {
  const [ndlpUsdc, setNdlpUsdc] = useState<number>(0);

  const refetchExchangeRate = async () => {
    // console.log("-------network", network);
    // const client = new SuiClient({ url: getFullnodeUrl(network) });
    // // console.log("-------client", client);

    // const res = await client.getObject({
    //   id: "0xf2c8ed9d9461d16225bd32e8b64afc57de95679ea302206b6e1907de79825a24",
    //   // id: "0xf3888326285a5aa9d42183eca9e0f556c8ab96b47b09c50a71aa3c85e4de34ba",
    //   options: {
    //     showBcs: true,
    //     // showContent: true,
    //     // showDisplay: true,
    //     // showOwner: true,
    //     // showPreviousTransaction: true,
    //     // showStorageRebate: true,
    //     // showType: true,
    //   },
    // });
    // console.log("-------res", res?.data || res);
    // const packageObjectId =
    //   "0xf3888326285a5aa9d42183eca9e0f556c8ab96b47b09c50a71aa3c85e4de34ba";
    // // "0xf2c8ed9d9461d16225bd32e8b64afc57de95679ea302206b6e1907de79825a24";
    // // "0xfed61f2a12451dbdded1fa711084f5d601f602b8cc1508742d9ddfa5f632454d";
    // const vaultId =
    //   // "0xf3888326285a5aa9d42183eca9e0f556c8ab96b47b09c50a71aa3c85e4de34ba";
    //   "0xc42c1f1aa9be83e5d507d9dedfbe1c95e779ab5e85585497c7d515afd722610c::ndlp::NDLP";
    // // const res1 = await client.call(
    // //   `${packageObjectId}::vault::get_lock_duration`,
    // //   [vaultId]
    // // );
    // const txb = new Transaction();
    // // populate the Transaction
    // txb.moveCall({
    //   target: `${packageObjectId}::vault::get_lock_duration`,
    //   arguments: [
    //     txb.pure.string(
    //       "0xf2c8ed9d9461d16225bd32e8b64afc57de95679ea302206b6e1907de79825a24"
    //     ),
    //   ],
    // });

    // const res1 = await client.devInspectTransactionBlock({
    //   // transactionBlock: txb,
    //   transactionBlock: txb,
    //   // sender: packageObjectId,
    //   sender:
    //     "0xf2c8ed9d9461d16225bd32e8b64afc57de95679ea302206b6e1907de79825a24",
    // });
    // console.log("-------res1", res1);

    // // ex balance
    // // const res = await client.getBalance({
    // //   owner:
    // //     // "0x16039ba417fdeab14706722045fc12b4f9667b2390338cdfd483322f3e9df5ab",
    // //     "0xefbaec0f33824958856eb6572bfd870f85aad9efb59bf90c0966187874f1d8a8",
    // //   coinType:
    // //     "0x8190b041122eb492bf63cb464476bd68c6b7e570a4079645a8b28732b6197a82::wal::WAL",
    // // });
    // // console.log("-------res", res);
    setNdlpUsdc(1);
  };
  return {
    ndlpUsdc,
    refetchExchangeRate,
  };
};

export default useExchangeRateToken;
