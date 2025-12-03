import { Button } from "@/components/ui/button";
import { Check, Clock, Users, Video, Wrench, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CourseCards = () => {
  const courses = [
    {
      badge: { text: "Most Comprehensive", color: "bg-blue-600" },
      title: "Comprehensive Builder Program",
      subtitle: "Domestic & Commercial",
      duration: "13 weeks",
      format: "In-person",
      formatIcon: Users,
      price: "$7,995",
      includes: [
        "600+ practice questions",
        "Full training materials",
        "Application & portfolio prep",
        "Pass guarantee",
      ],
      featured: false,
    },
    {
      badge: { text: "Most Popular", color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
      title: "Evening Builder Course",
      subtitle: "For Working Tradies",
      duration: "7 weeks",
      format: "1 night/week, 6pm-9pm",
      formatIcon: Clock,
      price: "$5,650",
      includes: [
        "Small group training",
        "600+ Q&A tests",
        "Fits around your work",
        "Pass guarantee",
      ],
      featured: true,
    },
    {
      badge: { text: "Personalised", color: "bg-violet-600" },
      title: "Private 1-on-1 Training",
      subtitle: "Flexible & Remote",
      duration: "9 weeks",
      format: "3 hrs/week via Zoom",
      formatIcon: Video,
      price: "$5,650",
      includes: [
        "One-on-one coaching",
        "Flexible scheduling",
        "All materials included",
        "Application prep",
      ],
      featured: false,
    },
    {
      badge: { text: "Specialist", color: "bg-amber-600" },
      title: "Carpentry License (DB-L)",
      subtitle: "Carpentry Specific",
      duration: "6 weeks",
      format: "In-person",
      formatIcon: Wrench,
      price: "$3,790",
      includes: [
        "450+ practice questions",
        "DB-L specific training",
        "Application guidance",
        "BPC interview prep",
      ],
      featured: false,
    },
  ];

  return (
    <section id="courses" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-blue-50/50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      
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
            Training Programs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pick the program that fits your schedule, budget, and learning style
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {courses.map((course, index) => {
            const FormatIcon = course.formatIcon;
            
            return (
              <motion.div
                key={index}
                className={`group relative ${course.featured ? 'md:-mt-4 md:mb-4' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Featured glow effect */}
                {course.featured && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                )}
                
                <div className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full
                  ${course.featured 
                    ? 'shadow-xl ring-2 ring-emerald-500/50 hover:shadow-2xl' 
                    : 'shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200'
                  }`}
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 ${course.featured ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`} />
                  
                  <div className="p-6 sm:p-8">
                    {/* Badge & Popular Star */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`${course.badge.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm`}>
                        {course.badge.text}
                      </span>
                      {course.featured && (
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{course.subtitle}</p>

                    {/* Duration & Format Pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                        <FormatIcon className="w-3.5 h-3.5" />
                        {course.format}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                          {course.price}
                        </span>
                        <span className="text-sm text-gray-500">inc GST</span>
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="space-y-3 mb-8">
                      {course.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5
                            ${course.featured ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Button
                      className={`w-full group/btn transition-all duration-300 ${
                        course.featured 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                      size="lg"
                      asChild
                    >
                      <Link to="/courses" className="flex items-center justify-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Payment Plans Note */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100">
            <span className="text-gray-600">Payment plans available</span>
            <span className="text-gray-300">|</span>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
            >
              Contact us to discuss
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseCards;
