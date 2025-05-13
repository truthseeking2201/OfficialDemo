import { getVaultConfig } from "@/apis/vault";
import { VAULT_CONFIG } from "@/config/vault-config";
import { VaultConfig } from "@/types/vault-config.types";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useQuery } from "@tanstack/react-query";

export const useGetVaultConfig = (vaultId?: string) => {
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

export const useGetVaultManagement = () => {
  const vaultId = VAULT_CONFIG.VAULT_ID;
  return useQuery({
    queryKey: ["vault-management-data", vaultId],
    queryFn: () => getVaultConfig(vaultId),
  });
};
