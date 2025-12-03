import { Award, Building2, Hammer, GraduationCap, HardHat, Briefcase, Quote, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import trainingImage from "@/assets/about-training-materials.jpg";

const AboutAdrian = () => {
  const credentials = [
    { icon: Building2, label: "Registered Building Practitioner (Unlimited)" },
    { icon: Award, label: "Commercial License (Low-Rise)" },
    { icon: Hammer, label: "Qualified Carpenter" },
    { icon: GraduationCap, label: "10+ Years Training Experience" },
  ];

  const experience = [
    { role: "Carpenter", description: "Started on the tools" },
    { role: "Site Manager", description: "Ran job sites" },
    { role: "Builder", description: "Full project delivery" },
    { role: "Trainer", description: "Helping tradies succeed" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 origin-top-right hidden lg:block" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Your Trainer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Learn From Someone Who's<br className="hidden sm:block" />
            <span className="text-blue-600">Been On The Tools</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Image & Quote */}
          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Training Image */}
            <div className="relative mb-6">
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl blur-xl" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src={trainingImage} 
                  alt="Building plans and training materials at Qualify Pro workshop" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-white">AN</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Adrian Nicolazzo</div>
                      <div className="text-sm text-blue-600">Lead Trainer & Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Quote */}
            <motion.div 
              className="relative bg-slate-900 rounded-2xl p-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-blue-400/30" />
              <p className="text-lg leading-relaxed mb-4 text-white/90">
                "Patient and understandable - makes things simple and straightforward. Adrian doesn't just teach from a book, he explains it like a tradie would."
              </p>
              <div className="text-sm text-blue-300">— Graduate feedback</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            {/* Intro Text */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Adrian Nicolazzo isn't your typical trainer. Before he started helping tradies get their licences, 
                he spent years doing the work himself - from swinging a hammer as a carpenter to managing sites 
                and running projects as a builder.
              </p>
              <p className="text-gray-600 leading-relaxed">
                That hands-on experience means he understands the gaps between practical knowledge and what the 
                BPC exam expects. He's helped hundreds of tradies bridge that gap and gain their registration.
              </p>
            </motion.div>

            {/* Career Journey Timeline */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                The Journey
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.map((exp, index) => (
                  <div key={index} className="flex items-center">
                    <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                      {exp.role}
                    </span>
                    {index < experience.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-300 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Credentials */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Credentials
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-800">{cred.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Industry Experience */}
            <motion.div 
              className="mb-8 p-5 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Industry Experience</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Worked across <span className="font-medium text-blue-700">industrial</span>, <span className="font-medium text-blue-700">commercial</span>, and <span className="font-medium text-blue-700">residential</span> projects. 
                    He knows what it's like at every level of the industry.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                Learn More About Adrian
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdrian;
