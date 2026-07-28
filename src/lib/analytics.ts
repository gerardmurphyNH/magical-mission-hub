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
// VIDEO TRACKING
// ============================================
export const trackVideoPlay = (videoId: string): void => {
  trackEvent("video_start", {
    video_id: videoId,
    video_title: "The Tooth Fairy's Secret Workshop",
  });
};

export const trackVideoProgress = (videoId: string, percent: number): void => {
  trackEvent("video_progress", {
    video_id: videoId,
    video_percent: percent,
  });
};

export const trackVideoComplete = (videoId: string): void => {
  trackEvent("video_complete", {
    video_id: videoId,
    video_title: "The Tooth Fairy's Secret Workshop",
  });
};

// ============================================
// MISC TRACKING
// ============================================
export const trackColoringPageDownload = (): void => {
  trackEvent("coloring_page_download", {
    file_name: "free-tooth-fairy-coloring-page.pdf",
  });
};

// ============================================
// TEACHER PRINTABLES TRACKING
// ============================================
export const trackTeacherWorksheetDownload = (): void => {
  trackEvent("teacher_resource_download", { resource_type: "worksheet" });
};

export const trackTeacherGuideDownload = (): void => {
  trackEvent("teacher_resource_download", { resource_type: "guide" });
};

export const trackTeacherColoringDownload = (): void => {
  trackEvent("teacher_resource_download", { resource_type: "coloring_page" });
};

export const trackTeacherBundleDownload = (): void => {
  trackEvent("teacher_resource_download", { resource_type: "bundle" });
};

export const trackTeacherSignupSubmit = (): void => {
  trackEvent("teacher_signup_submit");
};

export const trackTeacherResourcesPageClick = (location: string): void => {
  trackEvent("teacher_resources_click", { click_location: location });
};

// ============================================
// TOOTH FAIRY LETTER TRACKING
// ============================================
export const trackToothFairyLetterPdfDownload = (): void => {
  trackEvent("letter_download", { file_type: "pdf" });
};

export const trackToothFairyLetterImageDownload = (): void => {
  trackEvent("letter_download", { file_type: "image" });
};

export const trackToothFairyLetterExamplePdfDownload = (): void => {
  trackEvent("letter_example_download", { file_type: "pdf" });
};

export const trackToothFairyLetterExampleImageDownload = (): void => {
  trackEvent("letter_example_download", { file_type: "image" });
};

export const trackToothFairyGuideDownload = (): void => {
  trackEvent("tooth_fairy_guide_download");
};

// ============================================
// LETTERS TO/FROM THE TOOTH FAIRY TRACKING
// ============================================
export const trackLetterTypeSelect = (letterType: "to" | "from"): void => {
  trackEvent("letter_type_select", { letter_type: letterType });
};

export const trackLetterFormStart = (letterType: "to" | "from"): void => {
  trackEvent("letter_form_start", { letter_type: letterType });
};

export const trackLetterSubmitSuccess = (letterType: "to" | "from", quality: string): void => {
  // Secondary conversion event for the letters flywheel
  trackEvent("letter_submit_success", { letter_type: letterType, quality });
};

export const trackLetterSubmitError = (letterType: "to" | "from", errorType: string): void => {
  trackEvent("letter_submit_error", { letter_type: letterType, error_type: errorType });
};

export const trackWorkshopJoinFromLetter = (): void => {
  trackSignupSuccess();
  trackEvent("workshop_join_source", { source: "letters_page" });
};

// Type declarations
declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      targetId: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
    // YouTube IFrame Player API
    YT: {
      Player: new (
        element: HTMLIFrameElement | string,
        config: {
          events: {
            onStateChange?: (e: { data: number }) => void;
            onReady?: (e: unknown) => void;
          };
        }
      ) => {
        getCurrentTime: () => number;
        getDuration: () => number;
        destroy: () => void;
      };
      PlayerState: { PLAYING: 1; PAUSED: 2; ENDED: 0; BUFFERING: 3 };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
