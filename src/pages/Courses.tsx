import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      badge: { text: "MOST COMPREHENSIVE", color: "bg-blue-600" },
      title: "Comprehensive Builder Program",
      duration: "13 weeks",
      price: "$7,995",
      audience: "Domestic & Commercial builder applicants",
      includes: [
        "600+ practice questions and answers",
        "Full training materials and resources",
        "Complete application and portfolio preparation",
        "VBA test preparation and practice",
        "Pass guarantee - free resit if needed",
        "Personalized coaching and feedback",
        "Small group setting (max 10 students)",
      ],
    },
    {
      badge: { text: "MOST POPULAR", color: "bg-green-600" },
      title: "Evening Builder Course",
      duration: "7 weeks, 1 night/week (6pm-9pm)",
      price: "$5,650",
      audience: "Working tradies seeking domestic builder registration",
      includes: [
        "Small group training (max 10 students)",
        "600+ Q&A practice tests",
        "Complete application preparation",
        "Portfolio development support",
        "Evening schedule designed for working tradies",
        "Pass guarantee - free resit if needed",
        "VBA interview preparation",
      ],
    },
    {
      badge: { text: "PERSONALIZED", color: "bg-purple-600" },
      title: "Private 1-on-1 Training",
      duration: "9 weeks (3 hrs/week via Zoom)",
      price: "$5,650",
      audience: "Those wanting personalized one-on-one coaching",
      includes: [
        "One-on-one coaching with licensed builder",
        "Flexible scheduling to suit your availability",
        "All training materials included",
        "8-month test access",
        "Complete application preparation",
        "Personalized to your strengths and weaknesses",
        "Portfolio development support",
      ],
    },
    {
      badge: { text: "SPECIALIST", color: "bg-orange-600" },
      title: "Carpentry License (DB-L)",
      duration: "6 weeks",
      price: "$3,790",
      audience: "Carpenters seeking DB-L registration",
      includes: [
        "450+ practice questions specific to carpentry",
        "DB-L specific training materials",
        "Application guidance and support",
        "VBA interview preparation",
        "Technical knowledge assessment",
        "Portfolio development",
      ],
      addon: {
        text: "Application Prep Package",
        price: "+$1,460",
        savings: "(saves $650)",
      },
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Training Programs
            </h1>
            <p className="text-xl text-blue-100">
              Choose the program that fits your schedule, goals, and learning style. 
              All programs include complete application support and pass guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <p className="text-gray-600 mb-2">{course.duration}</p>
                <p className="text-sm text-gray-500 mb-4">{course.audience}</p>

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

                {/* Add-on (if exists) */}
                {course.addon && (
                  <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="font-semibold text-gray-900 mb-1">
                      {course.addon.text}
                    </div>
                    <div className="text-orange-600 font-bold">
                      {course.addon.price}{" "}
                      <span className="text-sm text-orange-500">
                        {course.addon.savings}
                      </span>
                    </div>
                  </div>
                )}

                {/* Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                  asChild
                >
                  <a href="#contact">Book Consultation</a>
                </Button>
              </div>
            ))}
          </div>

          {/* Payment Plans Note */}
          <div className="text-center mt-12 p-8 bg-white rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Flexible Payment Plans Available
            </h3>
            <p className="text-gray-600 mb-6">
              We understand that investing in your future can be a big decision. 
              Contact us to discuss payment options that work for your situation.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              asChild
            >
              <a href="#contact">Contact Us About Payment Plans</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Entry Requirements Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Entry Requirements
          </h2>
          <div className="space-y-6 text-gray-700">
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Minimum Experience
              </h3>
              <p>
                At least 2 years of practical trade experience in your field
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Technical References
              </h3>
              <p>
                References from registered builders in the same or higher class
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Evidence Portfolio
              </h3>
              <p>
                Portfolio showing your work experience (we'll help you build this)
              </p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                Individual Assessment
              </h3>
              <p>
                Each application is assessed based on individual circumstances. 
                Contact us to discuss your specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
