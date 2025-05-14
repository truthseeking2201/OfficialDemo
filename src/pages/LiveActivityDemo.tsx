import React from 'react';
import { LiveVaultActivities } from '../components/vault/LiveVaultActivities';
import { PageContainer } from '../components/layout/PageContainer';

export default function LiveActivityDemo() {
  return (
    <PageContainer>
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Live Vault Activities Demo</h1>
        <p className="text-lg mb-8 text-white/70">
          This demo shows a continuous feed of vault activities that updates every 5 seconds.
          The activities are generated entirely client-side without any network requests.
        </p>
        <LiveVaultActivities />
      </div>
    </PageContainer>
  );
}