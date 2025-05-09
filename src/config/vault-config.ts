type VaultConfig = {
  PACKAGE_ID: string;
  VAULT_CONFIG_ID: string;
  VAULT_ID: string;
};

const VAULT_CONFIG_BY_ENV = {
  dev: {
    PACKAGE_ID:
      "0x65b8637e9df50887c87a20feb0b60b1f7ddfe8270b48b7765375d1a7c07cfe11",
    VAULT_CONFIG_ID:
      "0xaa6bf5f7578acd9aef938989b6e2f332d808c29b1402a332524836b33a62a306",
    VAULT_ID:
      "0x084df083698e8a993a8a409d6ec2c668db130b006b9649530dc776d36b9e40d2",
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
