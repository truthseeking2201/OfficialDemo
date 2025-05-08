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
      "0xc42c1f1aa9be83e5d507d9dedfbe1c95e779ab5e85585497c7d515afd722610c::ndlp::NDLP",
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
