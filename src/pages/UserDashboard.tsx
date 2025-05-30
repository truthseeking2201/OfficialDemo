import { useState } from "react";
// This dashboard follows the 4-layer structure outlined in docs/dashboard_design.md
import { PageContainer } from "../components/layout/PageContainer";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { PositionsPanel } from "../components/dashboard/PositionsPanel";
import { ActivityPanel } from "../components/dashboard/ActivityPanel";
import { EarningsPanel } from "../components/dashboard/EarningsPanel";
import { UserInvestment, TransactionHistory } from "../types/vault";

export default function UserDashboard() {
  const [investments] = useState<UserInvestment[]>([]);
  const [activities] = useState<TransactionHistory[]>([]);

  return (
    <PageContainer className="space-y-10 py-8">
      {/* Layer 1: Overview */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Your NODO Overview</h2>
        <MetricsOverview investments={investments} isLoading={false} />
      </section>

      {/* Layer 2: Vault Holdings */}
      <section>
        <PositionsPanel
          positions={investments}
          isLoading={false}
          onWithdraw={() => {}}
        />
      </section>

      {/* Layer 3: AI Activity */}
      <section>
        <ActivityPanel activities={activities} isLoading={false} />
      </section>

      {/* Layer 4: Earnings */}
      <section>
        <EarningsPanel />
      </section>
    </PageContainer>
  );
}
