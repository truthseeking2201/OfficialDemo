import { PageContainer } from "../components/layout/PageContainer";

export default function UserDashboard() {
  return (
    <PageContainer className="space-y-8">
      <section>
        <h1 className="text-xl font-bold text-white mb-4">Your NODO Overview</h1>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-white/70">
          Overview metrics go here.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-2">Vault Holdings</h2>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-white/70">
          Vault table placeholder.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-2">AI Vault Activity</h2>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-white/70">
          AI activity feed placeholder.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white mb-2">My Earnings</h2>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4 text-white/70">
          Earnings panel placeholder.
        </div>
      </section>
    </PageContainer>
  );
}
