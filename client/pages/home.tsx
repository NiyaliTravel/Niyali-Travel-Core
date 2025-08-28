import Navigation from "../components/navigation";
import HeroSection from "../components/hero-section";
import FeaturedGuestHouses from "../components/featured-guest-houses";
import ExperiencesSection from "../components/experiences-section";
import FerryScheduleWidget from "../components/ferry-schedule-widget";
import DomesticAirlinesWidget from "../components/domestic-airlines-widget";
import InteractiveStats from "../components/interactive-stats";
import AgentPortalCTA from "../components/agent-portal-cta";
import AIChatbotWidget from "../components/ai-chatbot-widget";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturedGuestHouses />
      <ExperiencesSection />
      <FerryScheduleWidget />
      <DomesticAirlinesWidget />
      <InteractiveStats />
      <AgentPortalCTA />
      <AIChatbotWidget />
      <Footer />
    </div>
  );
}
