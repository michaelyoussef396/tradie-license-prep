import { Users, Target, BookOpen, TrendingUp, Star, Shield } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseAdrian = () => {
  const benefits = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 10 students means individual attention to your learning style and needs",
    },
    {
      icon: Target,
      title: "Personalized Teaching",
      description: "Tailored approach addressing your specific strengths and weaknesses",
    },
    {
      icon: BookOpen,
      title: "Fill Knowledge Gaps",
      description: "We identify and address your specific technical knowledge gaps",
    },
    {
      icon: TrendingUp,
      title: "Improve Weaknesses",
      description: "Test-taking skills, technical knowledge - we help with all aspects",
    },
    {
      icon: Star,
      title: "Show Your Strengths",
      description: "Build confidence by highlighting what you're already good at",
    },
    {
      icon: Shield,
      title: "Pass Guarantee",
      description: "Free resit if needed - we're committed to your success",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Tradies Choose Adrian
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full" />
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAdrian;
