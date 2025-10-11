/**
 * Analytics Tracking Hook
 * 
 * Provides client-side analytics tracking for page views.
 * Automatically tracks the current page on component mount.
 */

import { useEffect } from "react";

let sessionId: string | null = null;

/**
 * Gets or creates a unique session ID for the current browser session.
 * Session ID is stored in sessionStorage and persists until browser tab is closed.
 * @returns Session ID string
 */
function getSessionId(): string {
  if (sessionId) return sessionId;
  
  sessionId = sessionStorage.getItem("analytics-session-id");
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("analytics-session-id", sessionId);
  }
  return sessionId;
}

/**
 * Hook to automatically track page views.
 * Should be used in the root Router component to track all route changes.
 * 
 * @example
 * function Router() {
 *   useAnalytics();
 *   return <Switch>...</Switch>;
 * }
 */
export function useAnalytics() {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: getSessionId(),
            path: window.location.pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, []);
}
