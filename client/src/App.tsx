/**
 * Root Application Component
 * 
 * Sets up:
 * - TanStack Query for server state management
 * - Tooltip provider for UI components
 * - Toast notifications
 * - Routing with analytics tracking
 * - PWA service worker registration
 */

import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAnalytics } from "@/hooks/use-analytics";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/not-found";

/**
 * Router component with analytics tracking
 */
function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  /**
   * Register service worker for PWA functionality (production only)
   * Provides offline support and app installation capability
   * Only registered in production to avoid dev server issues
   */
  useEffect(() => {
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
