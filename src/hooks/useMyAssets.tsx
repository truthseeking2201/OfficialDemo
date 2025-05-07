import {
  useCurrentAccount,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface CoinContent {
  type: string;
  fields: {
    balance: string;
    id: { id: string };
  };
}

interface CoinMetadata {
  decimals: number;
  name: string;
  symbol: string;
  description: string;
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
  name: string;
  symbol: string;
  description?: string;
}

// Token type constants
const TEST_COIN_TYPE =
  "0x284eedbf8293669dd9914e6e7a9fcbfebdc5da0563da83739cd651617a8ba3cf::usdc::USDC";

const USDC_COIN_TYPE =
  "0xe3ad979c39cca5b9a8d9c9ff4dfe990585538c6102ff9f0b975e40183089e601::nodo::NODO";

const COIN_TYPE_PREFIX = "0x2::coin::Coin<";

const ALLOW_COIN_TYPES = [USDC_COIN_TYPE, TEST_COIN_TYPE] as const;

type TokenType = (typeof ALLOW_COIN_TYPES)[number];

// Token metadata for image URLs only
const TOKEN_IMAGES: Record<string, string> = {
  [USDC_COIN_TYPE]: "/lovable-uploads/77821401-b055-4857-ad36-bf928d64b288.png",
  [TEST_COIN_TYPE]: "/lovable-uploads/5e426b4d-ccda-486b-8980-761ff3c70294.png",
};

export const useMyAssets = () => {
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const {
    data: ownedObjects,
    isLoading,
    isFetching,
    refetch,
    error,
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

  const coinTypes = [USDC_COIN_TYPE, TEST_COIN_TYPE];
  const results = useQueries({
    queries: coinTypes.map((coinType) => ({
      queryKey: ["getCoinMetadata", coinType],
      queryFn: () => suiClient.getCoinMetadata({ coinType }),
      enabled: !!account?.address,
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
    })),
  });

  const coinMetadata = results.reduce((acc, result, index) => {
    if (result.data) {
      acc[coinTypes[index]] = result.data;
    }
    return acc;
  }, {} as Record<string, CoinMetadata>);

  const assets = useMemo(() => {
    if (!ownedObjects?.data) return [];

    const groupedBalances = ownedObjects.data
      .map((obj) => ({
        ...obj,
        coinType: obj.data?.type.replace(COIN_TYPE_PREFIX, "").replace(">", ""),
      }))
      .filter((obj) => {
        return (
          obj.coinType && ALLOW_COIN_TYPES.includes(obj.coinType as TokenType)
        );
      })
      .reduce((acc, obj) => {
        const content = obj.data?.content as unknown as CoinContent;
        if (!content) {
          console.warn("Invalid coin content structure:", obj);
          return acc;
        }

        const coinType = obj.coinType;
        const rawBalance = Number(content.fields?.balance || "0");
        const metadata = coinMetadata[coinType] as CoinMetadata;
        const decimals = metadata?.decimals || 9;
        const balance = rawBalance / Math.pow(10, decimals);

        if (!acc[coinType]) {
          acc[coinType] = {
            coin_type: coinType,
            balance: balance,
            raw_balance: rawBalance,
            image_url: TOKEN_IMAGES[coinType] || metadata?.iconUrl,
            decimals: decimals,
            name: metadata?.name || coinType.split("::").pop() || "",
            symbol:
              metadata?.symbol ||
              coinType.split("::").pop()?.toUpperCase() ||
              "",
          };
        }

        acc[coinType].raw_balance += balance;
        return acc;
      }, {} as Record<string, Asset>);

    // Convert grouped balances to array
    return Object.values(groupedBalances);
  }, [ownedObjects?.data, coinMetadata]);

  return {
    assets,
    loading: isLoading || isFetching,
    error,
    refreshBalance: refetch,
  };
};
