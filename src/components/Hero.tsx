import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(217 91% 57%) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Headline */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get Your Building License{" "}
            <span className="block gradient-text">Right The First Time</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Personalized mentorship for Melbourne tradies seeking BPC (formerly VBA)
            registration. Small classes, 95% success rate, 10+ years experience.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-md sm:max-w-none mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 sm:hover:scale-105 transition-transform shadow-xl hover:shadow-2xl text-base sm:text-lg px-8 sm:px-10 min-h-[48px] sm:py-7"
              onClick={scrollToContact}
            >
              Book Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 sm:hover:scale-105 transition-transform text-base sm:text-lg px-8 sm:px-10 min-h-[48px] sm:py-7"
              asChild
            >
              <Link to="/courses">View Courses</Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>No RTO - Pure Mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Pass Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Face-to-Face Training</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
