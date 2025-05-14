import { getVaultConfig } from "../apis/vault";
import { PROD_VAULT_ID, VAULT_CONFIG } from "../config/vault-config";
import { VaultConfig } from "../types/vault-config.types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGetVaultConfig = (vaultId?: string) => {
  // Fake vault config
  const vaultConfig: VaultConfig = {
    total_liquidity: 500000000000, // 500,000 with 9 decimals
    rate: "1000000", // 1:1 rate
    deposit: {
      fields: {
        fee_bps: "50", // 0.5% fee
        min: "0"
      }
    },
    withdraw: {
      fields: {
        fee_bps: "50", // 0.5% fee
        min: "0",
        total_fee: "0"
      }
    },
    lock_duration_ms: 86400000 // 24 hours in milliseconds
  };

  return {
    vaultConfig,
    isLoading: false,
  };
};

export const useGetVaultManagement = () => {
  const vaultId = PROD_VAULT_ID;

  return useQuery({
    queryKey: ["vault-management-data"],
    queryFn: () => getVaultConfig(vaultId),
    refetchInterval: 60000,
  }) as UseQueryResult<
    {
      apr: number;
      total_users: number;
    },
    Error
  >;
};
