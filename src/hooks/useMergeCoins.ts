import { useCurrentAccount } from "@/stubs/FakeWalletBridge";
import { random } from "lodash";

interface UseMergeCoinsResult {
  mergeCoins: (coinType: string) => Promise<string | undefined>;
  isLoading: boolean;
  error: Error | null;
}

export const useMergeCoins = (): UseMergeCoinsResult => {
  const account = useCurrentAccount();

  const mergeCoins = async (coinType: string): Promise<string | undefined> => {
    if (!account?.address) {
      throw new Error("No account connected");
    }

    try {
      // Simulate network delay (300-700ms)
      await new Promise(resolve => setTimeout(resolve, random(300, 700)));
      
      // Generate a fake coin object ID based on coin type
      const coinObjectId = 'fake-coin-' + coinType.split('::').pop()?.toLowerCase();
      
      return coinObjectId;
    } catch (error) {
      console.error("Error merging coins:", error);
      throw error;
    }
  };

  return {
    mergeCoins,
    isLoading: false,
    error: null,
  };
};
