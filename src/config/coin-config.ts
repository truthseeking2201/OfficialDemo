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
      "0x3fa0ecba8f850714a12c988d40767086dd343ede49dc16dd11ce8bd68916a2b5::ndlp::NDLP",
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
