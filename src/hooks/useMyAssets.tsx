import { COIN_TYPES_CONFIG } from "@/config";
import { UserCoinAsset } from "@/types/coin.types";
import { useCurrentAccount } from "@/stubs/FakeWalletBridge";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import useFakeStore from "@/stubs/fakeStore";

interface CoinMetadata {
  decimals: number;
  name: string;
  symbol: string;
  url?: string;
  iconUrl?: string;
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

const roundDownBalance = (balance: number) => {
  return Math.floor(balance * 100) / 100;
};

const getCoinObjects = async (
  suiClient: SuiClient,
  coinType: string,
  address: string
) => {
  let allCoins = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    // Get a page of coins with optional cursor
    const coinsPage = await suiClient.getCoins({
      owner: address,
      cursor: cursor,
      coinType: coinType,
      limit: 50, // Number of items per page (default is 50)
    });

    // Add coins from this page to our collection
    allCoins = [...allCoins, ...coinsPage.data];

    // Update the cursor for the next page
    cursor = coinsPage.nextCursor;

    // Check if there are more pages
    hasNextPage = coinsPage.hasNextPage;
  }
  return allCoins;
};

export const useMyAssets = () => {
  const account = useCurrentAccount();
  const { assets, refreshBalance } = useFakeStore();

  return {
    assets,
    isLoading: false,
    refreshBalance,
  };
};

export const useGetCoinsMetadata = () => {
  // Return static fake metadata for allowed coin types
  return {
    [COIN_TYPES_CONFIG.USDC_COIN_TYPE]: {
      decimals: 6,
      name: "USD Coin",
      symbol: "USDC",
    },
    [COIN_TYPES_CONFIG.NDLP_COIN_TYPE]: {
      decimals: 9,
      name: "NODO LP Token",
      symbol: "NDLP",
    }
  } as Record<string, CoinMetadata>;
};
