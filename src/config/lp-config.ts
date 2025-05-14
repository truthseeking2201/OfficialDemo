import LpType from "../types/lp.type";
import { COIN_TYPES_CONFIG } from "./coin-config";
import { VAULT_CONFIG } from "./vault-config";

export const NDLP: LpType = {
  package_id: VAULT_CONFIG.PACKAGE_ID,
  vault_config_id: VAULT_CONFIG.VAULT_CONFIG_ID,
  vault_id: VAULT_CONFIG.VAULT_ID,
  clock: "0x6",

  lp_coin_type: COIN_TYPES_CONFIG.NDLP_COIN_TYPE,
  lp_symbol: "NDLP",
  lp_decimals: 9,
  lp_image: "/coins/nodo-lp.png",
  is_token_only: true,

  token_coin_type: COIN_TYPES_CONFIG.USDC_COIN_TYPE,
  token_symbol: "USDC",
  token_decimals: 9,
  token_image: "/coins/usdc.png",
};
