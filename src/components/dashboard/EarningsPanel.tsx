import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export function EarningsPanel() {
  const earnings = {
    totalProfit: 1250.75,
    personalApr: 18.2,
    claimable: 150.5,
    referrals: 3,
  };

  return (
    <Card className="bg-black/20 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>My Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-white/60">Profit Received</p>
            <p className="text-lg font-mono font-medium">
              ${earnings.totalProfit.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/60">Personal APR</p>
            <p className="text-lg font-mono font-medium">
              {earnings.personalApr.toFixed(1)}%
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Claimable Reward</p>
              <p className="text-lg font-mono font-medium">
                ${earnings.claimable.toLocaleString()}
              </p>
            </div>
            <Button size="sm">Claim</Button>
          </div>
          <div>
            <p className="text-xs text-white/60">Referral Uses</p>
            <p className="text-lg font-mono font-medium">{earnings.referrals}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
