import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const stories = [
    {
      name: "Fauzi",
      initials: "F",
      bgColor: "bg-blue-500",
      story:
        "Gained Domestic Builder – Unlimited licence 5 years ago. Now runs a thriving $15M+ building company specializing in elite homes.",
    },
    {
      name: "Jordan",
      initials: "J",
      bgColor: "bg-green-500",
      story:
        "Achieved Carpentry licence and launched a successful high-end outdoor living business throughout Melbourne.",
    },
    {
      name: "Manny",
      initials: "M",
      bgColor: "bg-amber-500",
      story:
        "Licensed 5 years ago. Now completes 50+ homes per year with a reputation for quality and consistency.",
    },
  ];

  return (
    <section id="success" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Student Success Stories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 leading-relaxed">
            95% of our students pass and gain registration
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="glass-card p-5 sm:p-6 md:p-8 rounded-lg sm:rounded-xl hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Avatar and Quote Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full ${story.bgColor} flex items-center justify-center border-2 border-white/30 flex-shrink-0`}>
                  <span className="text-2xl font-bold text-white">{story.initials}</span>
                </div>
                <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300" />
              </div>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-4 sm:mb-6">
                {story.story}
              </p>
              <div className="text-lg sm:text-xl font-bold text-white">— {story.name}</div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/success-stories"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 sm:hover:scale-105 text-base w-full sm:w-auto min-h-[44px]"
          >
            View All Success Stories
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;