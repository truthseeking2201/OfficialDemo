type CoinConfig = {
  NDLP_COIN_TYPE: string;
  USDC_COIN_TYPE: string;
};

type CoinConfigByEnv = {
  [key: string]: CoinConfig;
};

const CONFIG: CoinConfigByEnv = {
  dev: {
    NDLP_COIN_TYPE:
      "0x5183e6146fe032c104dce827069fe635cc3a661892c9de9cf8b9bb82dbf38ae2::ndlp::NDLP",
    USDC_COIN_TYPE:
      "0xe3ad979c39cca5b9a8d9c9ff4dfe990585538c6102ff9f0b975e40183089e601::nodo::NODO",
  },
  uat: {
    NDLP_COIN_TYPE: "todo",
    USDC_COIN_TYPE: "todo",
  },
};
export const COIN_TYPES_CONFIG = CONFIG[
  import.meta.env.VITE_APP_ENV || "dev"
] as CoinConfig;
