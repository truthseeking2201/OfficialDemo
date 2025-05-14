export const fakeClaimWithdrawal = async (id: string) => {
  await new Promise((r) => setTimeout(r, 800));
  return { txDigest: `fake-claim-${id}` };
};