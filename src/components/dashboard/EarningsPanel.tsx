import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { KpiTile } from "./KpiTile";

export function EarningsPanel() {
  return (
    <Card className="bg-black/20 border border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>My Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <KpiTile title="Total Profit" value={1234} prefix="$" />
          <KpiTile title="Personal APR" value={18.5} prefix="" />
          <KpiTile title="Claimable" value={250} prefix="$" />
          <KpiTile title="Referrals" value={3} prefix="" />
        </div>
        <Button size="sm" className="gradient-bg-nova text-[#0E0F11]">
          Claim Rewards
        </Button>
      </CardContent>
    </Card>
  );
}
