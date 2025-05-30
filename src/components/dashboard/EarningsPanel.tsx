import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";

export function EarningsPanel() {
  const [totalProfit] = useState(0);
  const [personalApr] = useState(0);
  const [claimableRewards] = useState(0);
  const [referrals] = useState(0);

  return (
    <Card className="bg-black/20 border border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>My Earnings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-white/60">Total Profit</p>
            <p className="font-mono text-lg text-emerald">
              ${totalProfit.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-white/60">Personal APR</p>
            <p className="font-mono text-lg">{personalApr.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-white/60">Claimable Reward</p>
            <p className="font-mono text-lg">
              ${claimableRewards.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-white/60">Referrals</p>
            <p className="font-mono text-lg">{referrals}</p>
          </div>
        </div>
        <Button className="mt-4">Claim Rewards</Button>
      </CardContent>
    </Card>
  );
}
