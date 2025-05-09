export default interface LpType {
  pid?: string;
  lp_coin_type: string;
  lp_symbol: string;
  lp_decimals: number | 9;
  lp_image?: string;
  is_token_only: boolean;

  token_coin_type?: string;
  token_symbol?: string;
  token_decimals?: number | 9;
  token_image?: string;

  quote_coin_type?: string;
  quote_symbol?: string;
  quote_decimals?: number | 9;
  quote_image?: string;
}
