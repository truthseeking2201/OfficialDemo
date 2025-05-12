import { VAULT_CONFIG } from "@/config/vault-config";
import { VaultConfig } from "@/types/vault-config.types";
import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export const useGetVaultConfig = (vaultId?: string) => {
  const account = useCurrentAccount();

  const { data, isLoading } = useSuiClientQuery(
    "getObject",
    {
      id: vaultId || VAULT_CONFIG.VAULT_ID,
      options: {
        showType: true,
        showContent: true,
        showDisplay: true,
      },
    },
    {
      enabled: !!account?.address,
      refetchInterval: 30000,
    }
  );

  const content = data?.data.content as unknown as {
    fields: VaultConfig;
  };
  return {
    vaultConfig: content?.fields,
    isLoading,
  };
};
