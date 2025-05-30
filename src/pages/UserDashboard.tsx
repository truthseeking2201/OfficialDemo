import { useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { PositionsPanel } from "../components/dashboard/PositionsPanel";
import { ActivityPanel } from "../components/dashboard/ActivityPanel";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { UserInvestment, TransactionHistory } from "../types/vault";

export default function UserDashboard() {
  const [investments] = useState<UserInvestment[]>([
    {
      vaultId: "deep-sui",
      principal: 500,
      shares: 48.25,
      depositDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      lockupPeriod: 60,
      unlockDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
      currentValue: 536.5,
      profit: 36.5,
      isWithdrawable: false,
      currentApr: 24.8,
    },
    {
      vaultId: "cetus-sui",
      principal: 750,
      shares: 73.12,
      depositDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      lockupPeriod: 30,
      unlockDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      currentValue: 771.25,
      profit: 21.25,
      isWithdrawable: true,
      currentApr: 18.7,
    },
  ]);

  const transactions: TransactionHistory[] = [
    {
      id: "1",
      tx_type: "add",
      timestamp: "2025-05-01T10:00:00Z",
      value: 1000,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      tokenId: "USDC",
      txHash:
        "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    },
    {
      id: "2",
      tx_type: "swap",
      timestamp: "2025-05-02T12:00:00Z",
      value: 500,
      address: "0xabcdef1234567890abcdef1234567890abcdef1234",
      tokenId: "USDC",
      txHash:
        "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    },
    {
      id: "3",
      tx_type: "remove",
      timestamp: "2025-05-03T14:00:00Z",
      value: 300,
      address: "0x4567890abcdef1234567890abcdef1234567890ab",
      tokenId: "USDC",
      txHash:
        "0x4567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef12",
    },
  ];

  const totalDeposited = investments.reduce((sum, inv) => sum + inv.principal, 0);
  const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalProfit = investments.reduce((sum, inv) => sum + inv.profit, 0);
  const avgApr =
    investments.length > 0 ?
    investments.reduce(
      (sum, inv) => sum + (inv.currentApr ?? 0) * (inv.currentValue / totalValue),
      0
    ) : 0;

  return (
    <PageContainer>
      <div className="space-y-12 py-8">
        <section>
          <h2 className="font-heading-lg mb-4">Your NODO Overview</h2>
          <MetricsOverview investments={investments} isLoading={false} />
        </section>

        <section>
          <h2 className="font-heading-lg mb-4">Vault Holdings</h2>
          <PositionsPanel
            positions={investments}
            isLoading={false}
            onWithdraw={() => {}}
          />
        </section>

        <section>
          <h2 className="font-heading-lg mb-4">AI Vault Activity (your wallet only)</h2>
          <ActivityPanel activities={transactions} isLoading={false} />
        </section>

        <section>
          <h2 className="font-heading-lg mb-4">My Earnings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-black/20 border border-white/10">
              <CardHeader>
                <CardTitle>Earnings Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div>Total Profit Received: ${totalProfit.toFixed(2)}</div>
                <div>Real APR: {((totalProfit / totalDeposited) * 100).toFixed(2)}%</div>
                <div>Claimable Rewards: $0.00</div>
              </CardContent>
            </Card>
            <Card className="bg-black/20 border border-white/10">
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <div>Your Referral Code: <code>NODO-1234</code></div>
                <div>Referrals Used: 0</div>
                <div>Rewards Earned: $0.00</div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

