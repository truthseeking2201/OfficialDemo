import { useState } from "react";
import { PageContainer } from "../components/layout/PageContainer";
import { MetricsOverview } from "../components/dashboard/MetricsOverview";
import { PositionsPanel } from "../components/dashboard/PositionsPanel";
import { ActivityPanel } from "../components/dashboard/ActivityPanel";
import { EarningsPanel } from "../components/dashboard/EarningsPanel";
import type { UserInvestment, TransactionHistory } from "../types/vault";

export default function UserDashboard() {
  const [investments] = useState<UserInvestment[]>([]);
  const [activities] = useState<TransactionHistory[]>([]);

  return (
    <PageContainer className="space-y-10 py-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Your NODO Overview</h2>
        <MetricsOverview investments={investments} isLoading={false} />
      </section>

      <section>
        <PositionsPanel
          positions={investments}
          isLoading={false}
          onWithdraw={() => {}}
        />
      </section>

      <section>
        <ActivityPanel activities={activities} isLoading={false} />
      </section>

      <section>
        <EarningsPanel />
      </section>
    </PageContainer>
  );
}
