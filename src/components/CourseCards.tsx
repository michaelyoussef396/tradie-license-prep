import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
        "VBA interview prep",
      ],
    },
  ];

  return (
    <section id="courses" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the program that fits your schedule and goals
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border-t-4 border-blue-600 p-8 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Badge */}
              <div className="mb-4">
                <span
                  className={`${course.badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                >
                  {course.badge.text}
                </span>
              </div>

              {/* Title & Duration */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-4">{course.duration}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {course.price}
                </span>
                <span className="text-gray-600 ml-2">inc GST</span>
              </div>

              {/* Includes */}
              <div className="space-y-3 mb-8">
                {course.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                asChild
              >
                <a href="/courses">Learn More</a>
              </Button>
            </div>
          ))}
        </div>

        {/* Payment Plans Note */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Payment plans available.{" "}
            <a href="#contact" className="text-blue-600 hover:underline font-medium">
              Contact us to discuss options
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
