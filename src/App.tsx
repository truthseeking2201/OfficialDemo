import { MainLayout } from "@/components/layout/MainLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy load pages for better performance with improved loading reliability
const VaultCatalog = lazy(() =>
  import("./pages/VaultCatalog").catch((e) => {
    console.error("Error loading VaultCatalog:", e);
    return { default: () => <PageFallback /> };
  })
);
const VaultDetail = lazy(() =>
  import("./pages/EnhancedVaultDetail").catch((e) => {
    console.error("Error loading EnhancedVaultDetail:", e);
    return { default: () => <PageFallback /> };
  })
);
const Dashboard = lazy(() =>
  // Load Dashboard component immediately without delay
  import("./pages/Dashboard").catch((e) => {
    console.error("Error loading Dashboard:", e);
    return { default: () => <PageFallback /> };
  })
);
const NotFound = lazy(() =>
  import("./pages/NotFound").catch((e) => {
    console.error("Error loading NotFound:", e);
    return { default: () => <PageFallback /> };
  })
);

// Create query client that still loads data but doesn't show loading states
const queryClient = new QueryClient();

// Replace loading state with mock data for demo - no loading screen needed
const PageFallback = () => null;

// Preload Dashboard component immediately when app loads
(() => {
  // This immediate invocation will preload the Dashboard in the background
  import("./pages/Dashboard").catch((err) =>
    console.error("Failed to preload Dashboard on init:", err)
  );
})();

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
      <WalletProvider autoConnect>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainLayout>
                      <Suspense fallback={<PageFallback />}>
                        <VaultCatalog />
                      </Suspense>
                    </MainLayout>
                  }
                />

                {/* Routes for backward compatibility with old URLs */}
                <Route
                  path="/vaults/orion-stable"
                  element={<Navigate to="/vaults/cetus-sui" replace />}
                />
                <Route
                  path="/vaults/nova-yield"
                  element={<Navigate to="/vaults/deep-sui" replace />}
                />
                <Route
                  path="/vaults/emerald-growth"
                  element={<Navigate to="/vaults/sui-usdc" replace />}
                />

                {/* Regular vault detail route */}
                <Route
                  path="/vaults/:vaultId"
                  element={
                    <MainLayout>
                      <Suspense fallback={<PageFallback />}>
                        <VaultDetail />
                      </Suspense>
                    </MainLayout>
                  }
                />

                {/* Dashboard route with dedicated Suspense */}
                <Route
                  path="/dashboard"
                  element={
                    <MainLayout>
                      <Suspense fallback={<PageFallback />}>
                        <Dashboard />
                      </Suspense>
                    </MainLayout>
                  }
                />

                <Route
                  path="*"
                  element={
                    <Suspense fallback={<PageFallback />}>
                      <NotFound />
                    </Suspense>
                  }
                />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);

export default App;
