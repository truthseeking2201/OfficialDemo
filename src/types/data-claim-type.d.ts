export default interface DataClaimType {
  id: string | number;
  timeUnlock: number;
  status: string;
  withdrawAmount: number;
  withdrawSymbol: string;

  receiveAmount: number;
  receiveSymbol: string;

  feeAmount: number;
  feeSymbol: string;
}
