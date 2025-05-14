import LpType from "../types/lp.type";

export default interface DataClaimType {
  id: string | number;
  timeUnlock: number;
  status: string;
  configLp: LpType;
  withdrawAmount: number;
  withdrawSymbol: string;

  receiveAmount: number;
  receiveSymbol: string;

  feeAmount: number;
  feeSymbol: string;
}
