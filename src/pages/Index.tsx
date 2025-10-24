import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import WhatWeDo from "@/components/WhatWeDo";
import CourseOverview from "@/components/CourseOverview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustIndicators />
      <WhatWeDo />
      <CourseOverview />
      <Footer />
    </div>
  );
};

export default Index;
