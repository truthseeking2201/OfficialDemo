import { MainLayout } from "./components/layout/MainLayout";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
const UserDashboard = lazy(() =>
  import("./pages/UserDashboard").catch((e) => {
    console.error("Error loading UserDashboard:", e);
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
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity
    }
  }
});

// Replace loading state with mock data for demo - no loading screen needed
const PageFallback = () => null;

// Preload Dashboard and UserDashboard components immediately when app loads
(() => {
  // This immediate invocation will preload the Dashboard in the background
  import("./pages/Dashboard").catch((err) =>
    console.error("Failed to preload Dashboard on init:", err)
  );
  // Preload UserDashboard in the background as well
  import("./pages/UserDashboard").catch((err) =>
    console.error("Failed to preload UserDashboard on init:", err)
  );
})();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Suspense fallback={<PageFallback />}>
                      <Dashboard />
                    </Suspense>
                  </MainLayout>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <MainLayout>
                    <Suspense fallback={<PageFallback />}>
                      <UserDashboard />
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
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;