import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Award, Building2, Hammer, GraduationCap, Users, Target, BookOpen } from "lucide-react";

const About = () => {
  const credentials = [
    {
      icon: Building2,
      title: "Registered Building Practitioner",
      subtitle: "Unlimited",
      description: "Full building registration covering all domestic and commercial building work",
    },
    {
      icon: Award,
      title: "Commercial License",
      subtitle: "Low-Rise",
      description: "Qualified to supervise low-rise commercial building projects",
    },
    {
      icon: Hammer,
      title: "Qualified Carpenter",
      subtitle: "Trade Certified",
      description: "Started as a qualified carpenter, worked on the tools for years",
    },
    {
      icon: GraduationCap,
      title: "10+ Years Training",
      subtitle: "Proven Expertise",
      description: "Over a decade helping tradies achieve their building registration",
    },
  ];

  const teachingApproach = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 10 students per class ensures everyone gets individual attention and personalized coaching",
    },
    {
      icon: Target,
      title: "Identify Your Gaps",
      description: "We assess your knowledge and experience to identify specific areas that need improvement",
    },
    {
      icon: BookOpen,
      title: "Fill Knowledge Gaps",
      description: "Targeted training focused on your specific weaknesses while building on your strengths",
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
              About Adrian Nicolazzo
            </h1>
            <p className="text-xl text-blue-100">
              Learn from someone who's been on the tools and knows exactly 
              what it takes to pass the VBA licensing process
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Image Placeholder */}
            <div className="lg:col-span-2">
              <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center sticky top-24">
                <div className="text-center p-8">
                  <Building2 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Adrian Nicolazzo</p>
                  <p className="text-sm text-gray-500">Photo Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Real Experience, Real Results
              </h2>

              <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
                <p className="text-lg">
                  Adrian is a Registered Building Practitioner (Unlimited) and Commercial 
                  License holder (Low-Rise) with a unique perspective - he's worked in every 
                  position from carpenter to site manager to builder.
                </p>
                <p className="text-lg">
                  With 10+ years of training experience, Adrian has helped hundreds of tradies 
                  successfully navigate the VBA licensing process. His approach isn't about 
                  memorizing answers - it's about understanding the building principles that 
                  will make you a better builder.
                </p>
                <p className="text-lg">
                  Having worked across industrial, commercial, and residential projects, Adrian 
                  brings real-world experience to every training session. He knows what the VBA 
                  is looking for because he's been through it himself.
                </p>
                <p className="text-lg">
                  Adrian's teaching philosophy is simple: small classes, personalized attention, 
                  and a focus on filling individual knowledge gaps. He doesn't believe in 
                  one-size-fits-all training - every tradie has different strengths and 
                  weaknesses, and his approach reflects that.
                </p>
              </div>

              {/* Credentials */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Qualifications & Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {credentials.map((cred, index) => {
                  const Icon = cred.icon;
                  return (
                    <div
                      key={index}
                      className="bg-blue-50 p-6 rounded-lg"
                    >
                      <Icon className="h-8 w-8 text-blue-600 mb-3" />
                      <div className="font-semibold text-gray-900 text-lg mb-1">
                        {cred.title}
                      </div>
                      <div className="text-sm text-blue-600 font-medium mb-2">
                        {cred.subtitle}
                      </div>
                      <div className="text-sm text-gray-600">
                        {cred.description}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Teaching Approach */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Teaching Philosophy
              </h3>
              <div className="space-y-6">
                {teachingApproach.map((approach, index) => {
                  const Icon = approach.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {approach.title}
                        </h4>
                        <p className="text-gray-700">
                          {approach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Journey Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Career Journey
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Started as a Carpenter
              </h3>
              <p className="text-gray-700">
                Adrian began his career as a qualified carpenter, working on the tools 
                and learning the trade from the ground up. This hands-on experience gave 
                him a deep understanding of practical carpentry and building work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Progressed to Site Manager
              </h3>
              <p className="text-gray-700">
                Moving into site management, Adrian learned the coordination, planning, 
                and compliance aspects of building projects across industrial, commercial, 
                and residential sectors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Became a Registered Builder
              </h3>
              <p className="text-gray-700">
                After gaining his building registration, Adrian understands firsthand the 
                challenges tradies face in the licensing process - because he's been through 
                it himself.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                10+ Years Training Tradies
              </h3>
              <p className="text-gray-700">
                For over a decade, Adrian has dedicated himself to helping other tradies 
                achieve their building registration, with a 95% success rate among students 
                who complete his programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free consultation to discuss your licensing goals
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105"
          >
            Book Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
