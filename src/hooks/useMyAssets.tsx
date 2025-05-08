import { COIN_TYPES_CONFIG } from "@/config";
import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { useQueries } from "@tanstack/react-query";

interface CoinMetadata {
  decimals: number;
  name: string;
  symbol: string;
  url?: string;
  iconUrl?: string;
}

interface Asset {
  coin_type: string;
  balance: number;
  raw_balance: number;
  id?: string;
  image_url: string;
  decimals: number;
  display_name: string;
  name: string;
  symbol: string;
}

const ALLOW_COIN_TYPES = [
  COIN_TYPES_CONFIG.USDC_COIN_TYPE,
  COIN_TYPES_CONFIG.NDLP_COIN_TYPE,
] as const;

const COIN_CONFIG = {
  [COIN_TYPES_CONFIG.USDC_COIN_TYPE]: {
    display_name: "USDC",
    image_url: "/coins/usdc.png",
  },
  [COIN_TYPES_CONFIG.NDLP_COIN_TYPE]: {
    display_name: "NDLP",
    image_url: "/coins/ndlp.png",
  },
};

export const useMyAssets = () => {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();

  const {
    data: allCoins,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSuiClientQuery(
    "getAllCoins",
    {
      owner: account?.address || "",
      limit: 100, // no need to fetch more than 100 coins
    },
    {
      enabled: !!account?.address,
    }
  );

  const results = useQueries({
    queries: ALLOW_COIN_TYPES.map((coinType) => ({
      queryKey: ["getCoinMetadata", coinType],
      queryFn: () => suiClient.getCoinMetadata({ coinType }),
      enabled: !!account?.address,
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
    })),
  });

  const coinMetadata = results.reduce((acc, result, index) => {
    if (result.data) {
      acc[ALLOW_COIN_TYPES[index]] = result.data;
    }
    return acc;
  }, {} as Record<string, CoinMetadata>);

  const assets: Asset[] =
    allCoins?.data
      ?.filter((coin) => ALLOW_COIN_TYPES.includes(coin.coinType))
      .map((coin) => {
        const metadata = coinMetadata[coin.coinType] as CoinMetadata;
        const decimals = metadata?.decimals || 9;
        const rawBalance = Number(coin.balance || "0");
        const balance = rawBalance / Math.pow(10, decimals);

        return {
          coin_type: coin.coinType,
          balance: balance,
          raw_balance: rawBalance,
          image_url: COIN_CONFIG[coin.coinType]?.image_url,
          decimals: decimals,
          display_name: COIN_CONFIG[coin.coinType]?.display_name,
          name: metadata?.name,
          symbol: metadata?.symbol,
        };
      }) || [];

  return {
    assets,
    loading: isLoading || isFetching,
    error,
    refreshBalance: refetch,
  };
};
