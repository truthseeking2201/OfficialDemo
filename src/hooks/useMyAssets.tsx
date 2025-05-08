import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

// TODO: Update coin type
const USDC_COIN_TYPE =
  "0x2::coin::Coin<0x284eedbf8293669dd9914e6e7a9fcbfebdc5da0563da83739cd651617a8ba3cf::usdc::USDC>";

const NODO_AI_COIN_TYPE = "TODO";

const ALLOW_COIN_TYPES = [USDC_COIN_TYPE, NODO_AI_COIN_TYPE];

export const useMyAssets = () => {
  const account = useCurrentAccount();
  const {
    data: ownedObjects,
    isLoading,
    isFetching,
    refetch,
  } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address || "",
      options: {
        showContent: true,
        showType: true,
      },
    },
    {
      enabled: !!account?.address,
    }
  );
  const coinBalances =
    ownedObjects?.data
      ?.filter((obj) => {
        return ALLOW_COIN_TYPES.includes(obj.data?.type || "");
      })
      .map((obj) => {
        const content = obj.data?.content as unknown as {
          type: string;
          fields: {
            balance: string;
            id: { id: string };
          };
        };
        return {
          type: content?.type || "",
          balance: content?.fields?.balance || "0",
          id: content?.fields?.id?.id || "",
          image_url: "TODO",
        };
      }) || [];

  return {
    assets: coinBalances,
    loading: isLoading || isFetching,
    refreshBalance: refetch,
  };
};
