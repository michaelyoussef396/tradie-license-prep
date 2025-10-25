import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const SuccessStories = () => {
  const stories = [
    {
      name: "Fauzi",
      story:
        "Gained Domestic Builder – Unlimited licence 5 years ago. Now runs a thriving $15M+ building company specializing in elite homes.",
    },
    {
      name: "Jordan",
      story:
        "Achieved Carpentry licence and launched a successful high-end outdoor living business throughout Melbourne.",
    },
    {
      name: "Manny",
      story:
        "Licensed 5 years ago. Now completes 50+ homes per year with a reputation for quality and consistency.",
    },
  ];

  return (
    <section id="success" className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-blue-200">
            95% of our students pass and gain registration
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="glass-card p-8 rounded-xl hover:bg-white/20 transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-6">
                {story.story}
              </p>
              <div className="text-xl font-bold text-white">— {story.name}</div>
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
          <a
            href="/success-stories"
            className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            View All Success Stories
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
