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

// ============================================
// CONVERSION EVENT - Lead Form Submission
// ============================================
export const trackSignupSuccess = (virtue?: string): void => {
  // This is the primary conversion event
  trackEvent("generate_lead", {
    virtue: virtue || "none",
    currency: "USD",
    value: 1, // Assign a value for conversion tracking
  });
  // Also track as custom event for backwards compatibility
  trackEvent("signup_success", {
    virtue: virtue || "none",
  });
};

// Track form interactions
export const trackFormStart = (): void => {
  trackEvent("form_start", {
    form_name: "workshop_signup",
  });
};

export const trackFormError = (errorType: string): void => {
  trackEvent("form_error", {
    form_name: "workshop_signup",
    error_type: errorType,
  });
};

// ============================================
// QUIZ TRACKING
// ============================================
export const trackQuizStart = (): void => {
  trackEvent("quiz_start", {
    quiz_name: "virtue_quiz",
  });
};

export const trackQuizAnswer = (questionNumber: number, answer: string): void => {
  trackEvent("quiz_answer", {
    quiz_name: "virtue_quiz",
    question_number: questionNumber,
    answer_virtue: answer,
  });
};

export const trackQuizCompletion = (virtue: string): void => {
  trackEvent("quiz_completion", {
    quiz_name: "virtue_quiz",
    result_virtue: virtue,
  });
};

export const trackQuizReset = (): void => {
  trackEvent("quiz_reset", {
    quiz_name: "virtue_quiz",
  });
};

// ============================================
// FAQ TRACKING
// ============================================
export const trackFAQOpen = (question: string): void => {
  trackEvent("faq_open", {
    faq_question: question,
  });
};

// ============================================
// BUTTON CLICK TRACKING
// ============================================
export const trackButtonClick = (buttonName: string, location: string): void => {
  trackEvent("button_click", {
    button_name: buttonName,
    button_location: location,
  });
};

// Track CTA clicks that scroll to signup
export const trackCTAClick = (location: string): void => {
  trackEvent("cta_click", {
    cta_type: "join_workshop",
    cta_location: location,
  });
};

// ============================================
// MISC TRACKING
// ============================================
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
