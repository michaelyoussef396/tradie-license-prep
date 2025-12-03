import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, MapPin, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trustBadges = [
    { icon: TrendingUp, stat: "95%", label: "Success Rate" },
    { icon: Award, stat: "10+", label: "Years Experience" },
    { icon: Users, stat: "Max 10", label: "Per Class" },
    { icon: MapPin, stat: "Melbourne", label: "Face-to-Face" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-8 overflow-hidden bg-slate-900"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950" />
      
      {/* Blueprint Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Diagonal Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden hidden lg:block">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/10"
          style={{
            clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        />
      </div>
      
      {/* Floating Shapes */}
      <motion.div 
        className="absolute top-32 right-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl hidden lg:block"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 left-20 w-48 h-48 rounded-full bg-blue-400/10 blur-2xl hidden lg:block"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now Enrolling for 2024
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">Get Your</span>
              <br />
              <span className="text-white">Building License</span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Right The First Time
                </span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              className="text-lg sm:text-xl text-blue-100/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Personalised mentorship for Melbourne tradies seeking BPC 
              <span className="text-blue-300/70"> (formerly VBA) </span>
              registration. Small classes, real results, from someone who's been on the tools.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-base sm:text-lg px-8 py-6 rounded-xl"
                onClick={scrollToContact}
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-400/40 text-blue-100 hover:bg-blue-500/10 hover:border-blue-400/60 backdrop-blur-sm text-base sm:text-lg px-8 py-6 rounded-xl"
                asChild
              >
                <Link to="/courses">View Courses</Link>
              </Button>
            </motion.div>

            {/* Social Proof Line */}
            <motion.p
              className="text-blue-200/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Join <span className="text-blue-300 font-semibold">500+</span> tradies who've gained their registration
            </motion.p>
          </div>

          {/* Trust Badges Card */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-6 text-center">
                  Why Tradies Choose Us
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {trustBadges.map((badge, index) => {
                    const Icon = badge.icon;
                    return (
                      <motion.div
                        key={index}
                        className="group relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20 rounded-xl p-4 hover:border-blue-400/40 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white leading-none mb-1">
                              {badge.stat}
                            </div>
                            <div className="text-sm text-blue-200/70">
                              {badge.label}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom Tag */}
                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-blue-200/60 text-sm">
                    <span className="text-blue-300">No RTO</span> • Pure mentorship from a licensed builder
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave/Angle Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;