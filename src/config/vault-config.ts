type VaultConfig = {
  PACKAGE_ID: string;
  VAULT_CONFIG_ID: string;
  VAULT_ID: string;
};

const VAULT_CONFIG_BY_ENV = {
  dev: {
    PACKAGE_ID:
      "0x5b6dbcfe8819b040e1af822b56a0ec88550be9b728926c8ccded3cb1b2c3c40c",
    VAULT_CONFIG_ID:
      "0xb7ca3de74e49f1ca294470c0ca685643d742891ea1aaf89057b163508602a493",
    VAULT_ID:
      "0xf85068f8ef89cc1e9e04b120af41956e26f6a93c9ca90a8c2384162c8227fbe9",
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
