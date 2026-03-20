import HeroSection from "@/components/HeroSection";
import WhatsComingSection from "@/components/WhatsComingSection";
import CredibilitySection from "@/components/CredibilitySection";
import ToothSafeSection from "@/components/ToothSafeSection";
import VirtueQuizSection from "@/components/VirtueQuizSection";
import FAQSection from "@/components/FAQSection";
import DownloadSection from "@/components/DownloadSection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhatsComingSection />
      <CredibilitySection />
      <ToothSafeSection />
      <VirtueQuizSection />
      <FAQSection />
      <DownloadSection />
      <SignupSection />
      <Footer />
    </main>
  );
};

export default Index;
