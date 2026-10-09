import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VirtueProvider } from "@/context/VirtueContext";
import ScrollToTop from "@/components/ScrollToTop";

// Route-level code splitting: each page loads its own chunk on first visit
// instead of every page's JS shipping on every single page load. The single
// <Suspense> below wraps the whole <Routes> block rather than each <Route>
// individually so scripts/prerender.mjs's regex (which expects a bare
// `element={<Component />}`) keeps matching every route unchanged.
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const IsToothFairyReal = lazy(() => import("./pages/IsToothFairyReal"));
const WhatDoesTheToothFairyDo = lazy(() => import("./pages/WhatDoesTheToothFairyDo"));
const HowMuchDoesTheToothFairyLeave = lazy(() => import("./pages/HowMuchDoesTheToothFairyLeave"));
const Printables = lazy(() => import("./pages/Printables"));
const ForTeachers = lazy(() => import("./pages/ForTeachers"));
const ForParents = lazy(() => import("./pages/ForParents"));
const News = lazy(() => import("./pages/News"));
const Premiere = lazy(() => import("./pages/Premiere"));
const ColoringPage = lazy(() => import("./pages/ColoringPage"));
const ToothFairyStory = lazy(() => import("./pages/ToothFairyStory"));
const FirstToothWhatToDo = lazy(() => import("./pages/FirstToothWhatToDo"));
const TeacherPrintables = lazy(() => import("./pages/TeacherPrintables"));
const ToothFairyLetter = lazy(() => import("./pages/ToothFairyLetter"));
const WhatToSayToothFairy = lazy(() => import("./pages/WhatToSayToothFairy"));
const FirstToothTradition = lazy(() => import("./pages/FirstToothTradition"));
const WhyDoesTheToothFairyLeaveMoney = lazy(() => import("./pages/WhyDoesTheToothFairyLeaveMoney"));
const Watch = lazy(() => import("./pages/Watch"));
const LettersToTheToothFairy = lazy(() => import("./pages/LettersToTheToothFairy"));
const WhatDoesTheToothFairyLookLike = lazy(() => import("./pages/WhatDoesTheToothFairyLookLike"));

const queryClient = new QueryClient();

// Router-agnostic app tree: the browser wraps it in <BrowserRouter> (App below)
// and scripts/prerender.mjs wraps it in <StaticRouter> to render each route to
// HTML at build time (src/entry-server.tsx). Keep every route as a one-line
// Route with a literal path and a bare element (no wrapper props) - prerender
// and seo.test.ts both parse them with a regex.
export const AppShell = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VirtueProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        {/* data-prerender-fallback lets the build detect a route that was still suspended when rendered */}
        <Suspense fallback={<div data-prerender-fallback className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/is-the-tooth-fairy-real" element={<IsToothFairyReal />} />
            <Route path="/what-does-the-tooth-fairy-do-with-teeth" element={<WhatDoesTheToothFairyDo />} />
            <Route path="/how-much-does-the-tooth-fairy-leave" element={<HowMuchDoesTheToothFairyLeave />} />
            <Route path="/printables" element={<Printables />} />
            <Route path="/for-teachers" element={<ForTeachers />} />
            <Route path="/for-parents" element={<ForParents />} />
            <Route path="/news" element={<News />} />
            <Route path="/tooth-fairy-film-premiere" element={<Premiere />} />
            <Route path="/coloring-page" element={<ColoringPage />} />
            <Route path="/tooth-fairy-story" element={<ToothFairyStory />} />
            <Route path="/first-tooth-what-to-do" element={<FirstToothWhatToDo />} />
            <Route path="/tooth-fairy-printables" element={<TeacherPrintables />} />
            <Route path="/tooth-fairy-letter" element={<ToothFairyLetter />} />
            <Route path="/what-to-say-when-child-asks-if-tooth-fairy-is-real" element={<WhatToSayToothFairy />} />
            <Route path="/first-tooth-tradition" element={<FirstToothTradition />} />
            <Route path="/why-does-the-tooth-fairy-leave-money" element={<WhyDoesTheToothFairyLeaveMoney />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/letters-to-the-tooth-fairy" element={<LettersToTheToothFairy />} />
            <Route path="/what-does-the-tooth-fairy-look-like" element={<WhatDoesTheToothFairyLookLike />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </VirtueProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>
);

export default App;
