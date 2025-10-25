import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
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
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get Your Building License{" "}
            <span className="block gradient-text">Right The First Time</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Personalized mentorship for Melbourne tradies seeking VBA
            registration. Small classes, 95% success rate, 10+ years experience.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-105 transition-transform shadow-xl hover:shadow-2xl text-lg px-10 py-7"
              asChild
            >
              <a href="#contact">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform text-lg px-10 py-7"
              asChild
            >
              <a href="#courses">View Courses</a>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
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
