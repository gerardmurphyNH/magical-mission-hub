import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import WorldIntroSection from "@/components/WorldIntroSection";
import MeetCharactersSection from "@/components/MeetCharactersSection";
import VirtueQuizSection from "@/components/VirtueQuizSection";
import KidsColoringSection from "@/components/KidsColoringSection";
import ToothSafeSection from "@/components/ToothSafeSection";
import FAQSection from "@/components/FAQSection";
import ParentTeacherSection from "@/components/ParentTeacherSection";
import SignupSection from "@/components/SignupSection";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";

const Index = () => {
  return (
    <main className="min-h-screen">
      {/* VideoObject lives on the dedicated /watch page (a proper "watch page"
          for Google) rather than here, where the homepage isn't video-first. */}
      <PageSeo
        canonical="https://wigglytoothworkshop.com/"
        description="An animated short film about what the Tooth Fairy really does with the teeth she collects. Free to watch, with a book and ToothSafe coming soon."
      />
      <NavBar />
      <HeroSection />
      <WorldIntroSection />
      <VirtueQuizSection />
      <MeetCharactersSection />
      <KidsColoringSection />
      <ToothSafeSection />
      <FAQSection />
      <ParentTeacherSection />
      <SignupSection />
      <Footer />
    </main>
  );
};

export default Index;
