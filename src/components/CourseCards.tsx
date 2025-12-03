import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CourseCards = () => {
  const courses = [
    {
      badge: { text: "MOST COMPREHENSIVE", color: "bg-blue-600" },
      title: "Comprehensive Builder Program",
      duration: "13 weeks",
      price: "$7,995",
      includes: [
        "600+ practice questions",
        "Full training materials",
        "Application & portfolio prep",
        "Pass guarantee",
      ],
    },
    {
      badge: { text: "MOST POPULAR", color: "bg-green-600" },
      title: "Evening Builder Course",
      duration: "7 weeks, 1 night/week (6pm-9pm)",
      price: "$5,650",
      includes: [
        "Small group training",
        "600+ Q&A tests",
        "Evening schedule for working tradies",
        "Pass guarantee",
      ],
    },
    {
      badge: { text: "PERSONALIZED", color: "bg-purple-600" },
      title: "Private 1-on-1 Training",
      duration: "9 weeks (3 hrs/week via Zoom)",
      price: "$5,650",
      includes: [
        "One-on-one coaching",
        "Flexible scheduling",
        "All materials included",
        "Application prep",
      ],
    },
    {
      badge: { text: "SPECIALIST", color: "bg-orange-600" },
      title: "Carpentry License (DB-L)",
      duration: "6 weeks",
      price: "$3,790",
      includes: [
        "450+ practice questions",
        "DB-L specific training",
        "Application guidance",
        "BPC interview prep",
      ],
    },
  ];

  return (
    <section id="courses" className="py-12 sm:py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Programs
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose the program that fits your schedule and goals
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl border-t-4 border-blue-600 p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Badge */}
              <div className="mb-3 sm:mb-4">
                <span
                  className={`${course.badge.color} text-white text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full`}
                >
                  {course.badge.text}
                </span>
              </div>

              {/* Title & Duration */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{course.duration}</p>

              {/* Price */}
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {course.price}
                </span>
                <span className="text-sm sm:text-base text-gray-600 ml-2">inc GST</span>
              </div>

              {/* Includes */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {course.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white min-h-[44px]"
                size="lg"
                asChild
              >
                <Link to="/courses">Learn More</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Payment Plans Note */}
        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Payment plans available.{" "}
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="text-blue-600 hover:underline font-medium"
            >
              Contact us to discuss options
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseCards;
