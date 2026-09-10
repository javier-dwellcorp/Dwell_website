import { cookies } from 'next/headers';
import { AtlasDashboard } from '@/components/atlas-dashboard';
import { DemoLoginForm } from '@/components/demo-login-form';

export const dynamic = 'force-dynamic';

export default async function AtlasPage() {
  const cookieStore = await cookies();
  const authorized = cookieStore.get('dwell_demo_atlas')?.value === 'atlas-demo';

  if (!authorized) {
    return (
      <main className="atlas-login-page">
        <a className="atlas-login-brand" href="/"><img src="/dwell-logo-clean.png" alt="Dwell" /></a>
        <section className="atlas-login-card">
          <p className="kicker">Knowledge Keeper ATLAS</p>
          <h1>Client demonstration</h1>
          <p>Enter the demonstration profile to open the simplified ATLAS workspace.</p>
          <DemoLoginForm />
          <p className="prototype-disclaimer">This prototype contains synthetic information only.</p>
        </section>
      </main>
    );
  }

  return <AtlasDashboard />;
}
