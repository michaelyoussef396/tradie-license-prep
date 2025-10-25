import { Award, Building2, Hammer, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const AboutAdrian = () => {
  const credentials = [
    {
      icon: Building2,
      title: "Building Practitioner",
      subtitle: "Unlimited",
    },
    {
      icon: Award,
      title: "Commercial License",
      subtitle: "Low-Rise",
    },
    {
      icon: Hammer,
      title: "Qualified Carpenter",
      subtitle: "Trade Certified",
    },
    {
      icon: GraduationCap,
      title: "10+ Years Training",
      subtitle: "Proven Expertise",
    },
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Image Placeholder */}
          <motion.div 
            className="lg:col-span-2 order-first"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <div className="text-center p-6 sm:p-8">
                <Building2 className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg text-gray-600 font-medium">Adrian Nicolazzo</p>
                <p className="text-xs sm:text-sm text-gray-500">Photo Coming Soon</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Learn From Someone Who's Been On The Tools
            </motion.h2>

            <motion.div 
              className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p>
                Qualified Pro is led by Adrian Nicolazzo, a Registered Building Practitioner (Unlimited) and
                Commercial License holder (Low-Rise) with a unique perspective -
                he's worked in every position from carpenter to site manager to
                builder.
              </p>
              <p>
                With 10+ years of training experience, Adrian has helped
                hundreds of tradies successfully navigate the VBA licensing
                process. Our approach isn't about memorizing answers - it's
                about understanding the building principles that will make you a
                better builder.
              </p>
            </motion.div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-blue-50 p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                        {cred.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {cred.subtitle}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Learn More Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 sm:hover:scale-105 text-base w-full sm:w-auto min-h-[44px]"
              >
                Learn More About Adrian Nicolazzo
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdrian;
