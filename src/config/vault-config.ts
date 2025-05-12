type VaultConfig = {
  PACKAGE_ID: string;
  VAULT_CONFIG_ID: string;
  VAULT_ID: string;
};

export const RATE_DENOMINATOR = 1000000;

const VAULT_CONFIG_BY_ENV = {
  dev: {
    PACKAGE_ID:
      "0xd80a7e7f6f738bf28a4b9765256769933d309b61e228e8396f87fe37ac516cb0",
    VAULT_CONFIG_ID:
      "0xa6fc893afa760b7e319b15a6e1dae3f803d808a0f27d354af932afe3c461608c",
    VAULT_ID:
      "0xacd4204485b5855ec38e700126f94124115e793ff34743f128eac28622ae869d",
  },
  uat: {
    PACKAGE_ID: "todo",
    VAULT_CONFIG_ID: "todo",
    VAULT_ID: "todo",
  },
};

export const VAULT_CONFIG = VAULT_CONFIG_BY_ENV[
  import.meta.env.VITE_APP_ENV || "dev"
] as VaultConfig;
