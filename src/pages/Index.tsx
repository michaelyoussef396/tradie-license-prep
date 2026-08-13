import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WhyChooseAdrian from "@/components/WhyChooseAdrian";
import CourseCards from "@/components/CourseCards";
import SuccessStories from "@/components/SuccessStories";
import AboutAdrian from "@/components/AboutAdrian";
import TradeAreas from "@/components/TradeAreas";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <Seo title={"Qualify Pro | Melbourne BPC Registration Experts"} description={"Get your building license right the first time. Personalised BPC registration prep for Melbourne tradies. Small classes, 95% success rate."} path="/" />
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <WhyChooseAdrian />
        <CourseCards />
        <SuccessStories />
        <AboutAdrian />
        <TradeAreas />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
