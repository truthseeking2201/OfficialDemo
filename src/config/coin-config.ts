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
    NDLP_COIN_TYPE:
      "0xfcb103653192c1358d090b86c239a44aa7b8e4ed4e2313946edc444dc7a1d98::ndlptest::NDLPTEST",
    USDC_COIN_TYPE:
      "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC",
  },
};
export const COIN_TYPES_CONFIG = CONFIG[
  import.meta.env.VITE_APP_ENV || "dev"
] as CoinConfig;
