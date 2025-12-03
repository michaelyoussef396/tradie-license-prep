import { Users, Target, BookOpen, TrendingUp, Award, Shield } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseAdrian = () => {
  const benefits = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 10 students means you're not just a number. Real attention, real progress.",
      accent: "from-blue-500 to-blue-600",
    },
    {
      icon: Target,
      title: "Personalised Teaching",
      description: "We adapt to your learning style, not the other way around. Every tradie learns differently.",
      accent: "from-blue-600 to-blue-700",
    },
    {
      icon: BookOpen,
      title: "Fill Knowledge Gaps",
      description: "Years on the tools doesn't mean you know everything for the test. We find and fix those gaps.",
      accent: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Improve Weaknesses",
      description: "Struggle with technical questions? We'll drill them until they're second nature.",
      accent: "from-blue-600 to-blue-700",
    },
    {
      icon: Award,
      title: "Test-Taking Skills",
      description: "Knowing the content is half the battle. We teach you how to approach the exam itself.",
      accent: "from-blue-500 to-blue-600",
    },
    {
      icon: Shield,
      title: "Pass First Time",
      description: "95% of our students pass on their first attempt. If you don't, your resit is on us.",
      accent: "from-blue-600 to-blue-700",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      
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
            The Qualify Pro Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Tradies Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Straight-talking mentorship from someone who's been on the tools. No corporate nonsense.
          </p>
        </motion.div>

        {/* Benefits - Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                className={`group relative ${index >= 3 ? 'lg:mt-8' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 h-full overflow-hidden">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Icon with animated background */}
                  <div className="relative mb-5">
                    <div className={`absolute -inset-2 bg-gradient-to-r ${benefit.accent} rounded-xl opacity-10 group-hover:opacity-20 blur transition-opacity duration-300`} />
                    <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.accent} text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            <span className="text-blue-600 font-semibold">Real mentorship</span> • Not a factory-line RTO
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseAdrian;
