import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VirtueProvider } from "@/context/VirtueContext";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import IsToothFairyReal from "./pages/IsToothFairyReal";
import WhatDoesTheToothFairyDo from "./pages/WhatDoesTheToothFairyDo";
import HowMuchDoesTheToothFairyLeave from "./pages/HowMuchDoesTheToothFairyLeave";
import Printables from "./pages/Printables";
import ForTeachers from "./pages/ForTeachers";
import ForParents from "./pages/ForParents";
import News from "./pages/News";
import Premiere from "./pages/Premiere";
import ColoringPage from "./pages/ColoringPage";
import WhyDoesTheToothFairyTakeTeeth from "./pages/WhyDoesTheToothFairyTakeTeeth";
import ToothFairyStoryExplained from "./pages/ToothFairyStoryExplained";
import ToothFairyStory from "./pages/ToothFairyStory";
import FirstToothWhatToDo from "./pages/FirstToothWhatToDo";
import ToothFairyFAQ from "./pages/ToothFairyFAQ";
import TeacherPrintables from "./pages/TeacherPrintables";
import ToothFairyLetter from "./pages/ToothFairyLetter";
import WhatToSayToothFairy from "./pages/WhatToSayToothFairy";
import FirstToothTradition from "./pages/FirstToothTradition";
import WhyDoesTheToothFairyLeaveMoney from "./pages/WhyDoesTheToothFairyLeaveMoney";
import Watch from "./pages/Watch";
import LettersToTheToothFairy from "./pages/LettersToTheToothFairy";
import WhatDoesTheToothFairyLookLike from "./pages/WhatDoesTheToothFairyLookLike";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VirtueProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
            <Route path="/why-does-the-tooth-fairy-take-teeth" element={<WhyDoesTheToothFairyTakeTeeth />} />
            <Route path="/tooth-fairy-story-explained" element={<ToothFairyStoryExplained />} />
            <Route path="/tooth-fairy-story" element={<ToothFairyStory />} />
            <Route path="/first-tooth-what-to-do" element={<FirstToothWhatToDo />} />
            <Route path="/tooth-fairy-faq" element={<ToothFairyFAQ />} />
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
        </BrowserRouter>
      </VirtueProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
