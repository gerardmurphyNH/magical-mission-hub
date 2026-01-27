// Google Analytics 4 helper functions
import { GA_MEASUREMENT_ID } from "./config";

// Check if GA is configured and loaded
const isGAConfigured = (): boolean => {
  return (
    GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  );
};

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, string | number | boolean>
): void => {
  if (!isGAConfigured()) {
    console.log("[Analytics] Event (GA not configured):", eventName, parameters);
    return;
  }

  try {
    window.gtag("event", eventName, parameters);
  } catch (error) {
    console.error("[Analytics] Error tracking event:", error);
  }
};

// Specific event trackers
export const trackSignupSuccess = (virtue?: string): void => {
  trackEvent("signup_success", {
    virtue: virtue || "none",
  });
};

export const trackQuizCompletion = (virtue: string): void => {
  trackEvent("quiz_completion", {
    result_virtue: virtue,
  });
};

export const trackColoringPageDownload = (): void => {
  trackEvent("coloring_page_download", {
    file_name: "coloring-page.pdf",
  });
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}
