import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Clock, 
  Users, 
  BookOpen, 
  Target, 
  FileText, 
  Award, 
  TrendingUp,
  Building2,
  Calendar,
  DollarSign,
  Phone,
  Quote
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Courses = () => {
  const courses = [
    {
      id: "comprehensive",
      badge: { text: "MOST COMPREHENSIVE", color: "bg-blue-600" },
      title: "Comprehensive Builder Program",
      duration: "13 weeks",
      price: "$7,995",
      whoFor: "Ideal for tradies seeking Domestic Builder – Unlimited or Commercial (Low-Rise) registration who want the most thorough preparation possible.",
      whatYouLearn: [
        { icon: Building2, text: "Complete building principles and regulations" },
        { icon: FileText, text: "VBA/BPC regulations and compliance requirements" },
        { icon: Target, text: "Interview techniques and confidence building" },
        { icon: BookOpen, text: "Technical knowledge assessment and improvement" },
        { icon: Users, text: "Site management and supervision principles" },
        { icon: Award, text: "Quality standards and building codes" },
        { icon: TrendingUp, text: "Business planning and contractor management" },
        { icon: Check, text: "Documentation and record-keeping systems" },
      ],
      included: [
        "600+ practice questions with detailed explanations",
        "Comprehensive training materials and resources",
        "Complete application and portfolio preparation",
        "VBA/BPC test preparation and practice sessions",
        "Pass guarantee - free resit if you don't pass",
        "Small group training (maximum 10 students)",
        "One-on-one consultation sessions",
        "Interview preparation and mock interviews",
        "Post-registration support and guidance",
        "8-month access to online testing platform",
      ],
      schedule: "13 weeks of intensive training with flexible scheduling options. Classes run weekly with additional consultation sessions available.",
      requirements: "Minimum 2 years building/construction experience. Trade qualification preferred. Technical references from registered builders required.",
      testimonial: {
        text: "Adrian's comprehensive program gave me everything I needed. The small class size meant I got personal attention, and the 600+ practice questions were invaluable. I passed first time and now run my own building company.",
        author: "Fauzi",
        achievement: "Now running $15M+ building company"
      }
    },
    {
      id: "evening",
      badge: { text: "MOST POPULAR", color: "bg-green-600" },
      title: "Evening Builder Course",
      duration: "7 weeks",
      price: "$5,650",
      whoFor: "Perfect for working tradies who can't take time off during the day. Get your builder registration while continuing to work full-time.",
      whatYouLearn: [
        { icon: Building2, text: "Domestic building regulations and compliance" },
        { icon: FileText, text: "VBA requirements and application process" },
        { icon: Target, text: "Interview preparation and techniques" },
        { icon: BookOpen, text: "Technical knowledge for domestic building" },
        { icon: Award, text: "Building codes and standards (AS)" },
        { icon: TrendingUp, text: "Business and contractor management" },
      ],
      included: [
        "7 evening sessions (6pm-9pm, one night per week)",
        "Small group training (maximum 10 students)",
        "600+ Q&A practice tests with explanations",
        "Complete application preparation support",
        "Portfolio development and review",
        "Pass guarantee - free resit available",
        "All training materials included",
        "VBA interview preparation",
        "Post-course support via email/phone",
      ],
      schedule: "One evening per week (6pm-9pm) for 7 weeks. Perfect for working tradies. Choose your preferred weeknight.",
      requirements: "Minimum 2 years relevant trade experience. Currently working in the building/construction industry preferred.",
      testimonial: {
        text: "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex topics easy to understand, and I felt fully prepared for my interview.",
        author: "Sidhu",
        achievement: "Licensed builder specializing in new homes"
      }
    },
    {
      id: "private",
      badge: { text: "PERSONALIZED", color: "bg-purple-600" },
      title: "Private 1-on-1 Training",
      duration: "9 weeks",
      price: "$5,650",
      whoFor: "Ideal for tradies who prefer one-on-one attention, have unique schedules, or want completely personalized training tailored to their specific needs.",
      whatYouLearn: [
        { icon: Target, text: "Personalized curriculum based on your gaps" },
        { icon: Building2, text: "Building regulations relevant to your experience" },
        { icon: FileText, text: "Application process and documentation" },
        { icon: BookOpen, text: "Technical knowledge in your weak areas" },
        { icon: Award, text: "Interview skills and confidence building" },
        { icon: TrendingUp, text: "Business planning for your specific goals" },
      ],
      included: [
        "9 weeks of one-on-one coaching (3 hours per week)",
        "Flexible scheduling via Zoom",
        "Completely personalized curriculum",
        "Licensed builder as your personal coach",
        "All training materials and resources",
        "8-month access to online testing platform",
        "Complete application preparation",
        "Portfolio development and review",
        "Unlimited email support during training",
      ],
      schedule: "3 hours per week for 9 weeks via Zoom. Flexible scheduling to suit your availability - days, evenings, or weekends.",
      requirements: "Minimum 2 years relevant experience. Initial assessment call to determine personalized curriculum needs.",
      testimonial: {
        text: "One-on-one training was worth every dollar. Adrian identified exactly where I was weak and we focused on those areas. The flexible schedule meant I could fit it around my work commitments.",
        author: "Jordan",
        achievement: "Licensed carpenter running outdoor living business"
      }
    },
    {
      id: "carpentry",
      badge: { text: "SPECIALIST", color: "bg-orange-600" },
      title: "Carpentry License (DB-L)",
      duration: "6 weeks",
      price: "$3,790",
      whoFor: "Specifically designed for qualified carpenters seeking DB-L (Domestic Builder - Limited) registration to legally supervise carpentry and building projects.",
      whatYouLearn: [
        { icon: Building2, text: "DB-L specific regulations and scope" },
        { icon: FileText, text: "Carpentry-focused building codes" },
        { icon: Target, text: "VBA interview preparation for DB-L" },
        { icon: BookOpen, text: "Technical carpentry knowledge assessment" },
        { icon: Award, text: "Quality standards for carpentry work" },
      ],
      included: [
        "450+ carpentry-specific practice questions",
        "DB-L focused training materials",
        "Application guidance and support",
        "VBA interview preparation",
        "Technical knowledge assessment",
        "Portfolio development support",
        "Small group format (max 10 students)",
        "Email support throughout the course",
      ],
      schedule: "6 weeks of focused DB-L training. Weekly sessions with practice questions and interview preparation.",
      requirements: "Qualified carpenter with minimum 2 years on-the-job experience. Trade certificate required.",
      testimonial: {
        text: "The DB-L course was exactly what I needed. Adrian knows the carpentry trade inside out and focused on what the VBA actually asks. Passed first time and now running my own carpentry business.",
        author: "Jordan",
        achievement: "Licensed DB-L carpenter"
      },
      addon: {
        title: "Application Prep Package",
        price: "+$1,460",
        savings: "Saves $650 vs. purchasing separately",
        includes: [
          "Complete application form assistance",
          "Portfolio compilation and review",
          "Technical reference coordination",
          "Documentation review and correction",
          "Submission preparation and checking",
        ]
      }
    },
  ];

  const faqItems = [
    {
      question: "How long is the process before getting my license?",
      answer: "The training duration varies by program (6-13 weeks), but the complete process including application submission and VBA processing typically takes 3-6 months total. We help expedite this by ensuring your application is perfect before submission."
    },
    {
      question: "What experience do I need to enroll?",
      answer: "You need a minimum of 2 years practical trade experience in your field. You should be actively working or have recent experience in building/construction. We assess each applicant individually based on their background and circumstances."
    },
    {
      question: "Do you help with the VBA/BPC applications?",
      answer: "Yes! Complete application support is included in all our programs. We help you prepare your portfolio, gather technical references, complete all required documentation, and ensure everything is correct before submission. This significantly increases your chances of approval."
    },
    {
      question: "What qualifications do I need?",
      answer: "Requirements vary by license type. Generally, you need a relevant trade qualification (Certificate III or IV), minimum 2 years experience, technical references from registered builders, and evidence of your practical work. We'll assess your specific situation during consultation."
    },
    {
      question: "What does the VBA/BPC test involve?",
      answer: "The test covers building regulations, Australian Standards, building codes, construction techniques, site management, and business knowledge. Our programs include 450-600+ practice questions that mirror the actual test format. We also prepare you for the interview component."
    },
    {
      question: "What's your success rate?",
      answer: "95% of students who complete our programs successfully gain their registration. This high success rate is due to our personalized teaching approach, comprehensive preparation, and ensuring students are truly ready before attempting their licensing."
    },
    {
      question: "What if I fail the VBA test?",
      answer: "All our programs include a pass guarantee. If you complete the program, attempt your test, and don't pass, you can resit the training course for free. We're committed to your success and will work with you until you achieve your registration."
    },
    {
      question: "Can I get a payment plan?",
      answer: "Yes! We offer flexible payment plans to make the investment more manageable. Contact us to discuss options that work for your financial situation. We believe cost shouldn't prevent good tradies from getting their license."
    },
    {
      question: "Do you offer online or in-person training?",
      answer: "We offer both! The Evening Builder Course and Comprehensive Program are face-to-face in Melbourne. The Private 1-on-1 Training is conducted via Zoom for maximum flexibility. All programs include online access to our testing platform."
    },
    {
      question: "How are classes different from online courses?",
      answer: "Our classes are live, interactive, and personalized. Unlike pre-recorded online courses, you get real-time feedback, can ask questions immediately, and receive coaching tailored to your individual strengths and weaknesses. Small class sizes (max 10) ensure personal attention."
    },
    {
      question: "What support do I get after the course?",
      answer: "Post-course support is included! We're available via email and phone to answer questions during your application process and even after you receive your license. Many students stay in touch and reach out when they need advice."
    },
    {
      question: "Can I switch courses after enrolling?",
      answer: "Yes, if you need to change programs due to work schedule or other reasons, we can discuss transferring to a different course format. We want to ensure you're in the program that works best for your situation."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Builder Registration Training Programs
            </h1>
            <p className="text-xl text-blue-100">
              Choose the program that fits your schedule and goals. All programs 
              include pass guarantee and complete application support.
            </p>
          </div>
        </div>
      </section>

      {/* Course Sections */}
      {courses.map((course, index) => (
        <section 
          key={course.id}
          id={course.id}
          className={index % 2 === 0 ? "py-16 md:py-24 bg-white" : "py-16 md:py-24 bg-blue-50"}
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Course Header */}
            <div className="text-center mb-12">
              <span className={`${course.badge.color} text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4`}>
                {course.badge.text}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                <div className="flex items-center gap-2 text-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                  <span className="text-gray-600">inc GST</span>
                </div>
              </div>
            </div>

            {/* Who This Is For */}
            <div className="bg-blue-100 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Who This Is For
              </h3>
              <p className="text-gray-700 leading-relaxed">{course.whoFor}</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* What You'll Learn */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  What You'll Learn
                </h3>
                <div className="space-y-4">
                  {course.whatYouLearn.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-gray-700 mt-2">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Check className="h-6 w-6 text-green-600" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {course.included.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Schedule & Format
                </h4>
                <p className="text-gray-700">{course.schedule}</p>
              </div>
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Entry Requirements
                </h4>
                <p className="text-gray-700">{course.requirements}</p>
              </div>
            </div>

            {/* Add-on Package (if exists) */}
            {course.addon && (
              <div className="bg-orange-50 border-2 border-orange-300 p-8 rounded-xl mb-12">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.addon.title}
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-orange-600">
                        {course.addon.price}
                      </span>
                      <span className="bg-orange-600 text-white text-sm px-3 py-1 rounded-full">
                        {course.addon.savings}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {course.addon.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 rounded-xl mb-8">
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 text-lg leading-relaxed mb-4">
                "{course.testimonial.text}"
              </p>
              <div className="text-white">
                <div className="font-bold text-xl">— {course.testimonial.author}</div>
                <div className="text-blue-200 text-sm">{course.testimonial.achievement}</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto"
                asChild
              >
                <a href="#contact">Enroll in {course.title}</a>
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Or call <a href="tel:0411626398" className="text-blue-600 font-semibold hover:underline">0411 626 398</a> to discuss
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compare Our Programs
            </h2>
            <p className="text-lg text-gray-600">
              See which program is right for you at a glance
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-left font-semibold">Comprehensive</th>
                  <th className="px-6 py-4 text-left font-semibold">Evening</th>
                  <th className="px-6 py-4 text-left font-semibold">Private 1-on-1</th>
                  <th className="px-6 py-4 text-left font-semibold">Carpentry (DB-L)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Duration</td>
                  <td className="px-6 py-4 text-gray-700">13 weeks</td>
                  <td className="px-6 py-4 text-gray-700">7 weeks</td>
                  <td className="px-6 py-4 text-gray-700">9 weeks</td>
                  <td className="px-6 py-4 text-gray-700">6 weeks</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Price</td>
                  <td className="px-6 py-4 text-gray-700">$7,995</td>
                  <td className="px-6 py-4 text-gray-700">$5,650</td>
                  <td className="px-6 py-4 text-gray-700">$5,650</td>
                  <td className="px-6 py-4 text-gray-700">$3,790</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Format</td>
                  <td className="px-6 py-4 text-gray-700">In-person</td>
                  <td className="px-6 py-4 text-gray-700">Evening classes</td>
                  <td className="px-6 py-4 text-gray-700">Online (Zoom)</td>
                  <td className="px-6 py-4 text-gray-700">In-person</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Group Size</td>
                  <td className="px-6 py-4 text-gray-700">Max 10</td>
                  <td className="px-6 py-4 text-gray-700">Max 10</td>
                  <td className="px-6 py-4 text-gray-700">One-on-one</td>
                  <td className="px-6 py-4 text-gray-700">Max 10</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Schedule</td>
                  <td className="px-6 py-4 text-gray-700">Flexible</td>
                  <td className="px-6 py-4 text-gray-700">6pm-9pm weekly</td>
                  <td className="px-6 py-4 text-gray-700">Fully flexible</td>
                  <td className="px-6 py-4 text-gray-700">Weekly sessions</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Practice Questions</td>
                  <td className="px-6 py-4 text-gray-700">600+</td>
                  <td className="px-6 py-4 text-gray-700">600+</td>
                  <td className="px-6 py-4 text-gray-700">Customized</td>
                  <td className="px-6 py-4 text-gray-700">450+</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Pass Guarantee</td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">Application Support</td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                  <td className="px-6 py-4"><Check className="h-5 w-5 text-green-600" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Universal Features */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Every Program Includes
            </h2>
            <p className="text-xl text-blue-200">
              Comprehensive support from enrollment to registration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Pass Guarantee</h3>
              <p className="text-white/90">
                If you complete the program and don't pass, resit the training for free. We're committed to your success.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Application Support</h3>
              <p className="text-white/90">
                Complete help with VBA/BPC applications, portfolio preparation, documentation, and technical references.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">VBA Test Prep</h3>
              <p className="text-white/90">
                Comprehensive test preparation with hundreds of practice questions that mirror the actual VBA/BPC test.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">All Materials Included</h3>
              <p className="text-white/90">
                Training manuals, study guides, practice tests, and online platform access - everything you need to succeed.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Interview Preparation</h3>
              <p className="text-white/90">
                Mock interviews, technique coaching, and confidence building to ensure you're ready for the VBA interview.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Post-Registration Support</h3>
              <p className="text-white/90">
                We don't disappear after you get licensed. Ongoing support and advice as you start your building business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment & Payment */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment in Your Future
            </h2>
            <p className="text-lg text-gray-600">
              Getting your builder registration is one of the best career investments you can make
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="h-7 w-7 text-blue-600" />
                Return on Investment
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Licensed builders in Melbourne earn significantly more than unlicensed tradies. Many of our students 
                recover their training investment within the first few months of being licensed. With registration, you can:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Start your own building company and keep all the profits</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Command higher rates as a licensed builder ($80-150+ per hour)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Take on bigger projects worth $50,000 to millions of dollars</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Build equity in your own business instead of making someone else rich</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flexible Payment Plans Available
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We understand that investing in your future is a big decision. That's why we offer flexible 
                payment plans to make our programs more accessible. Every tradie deserves the opportunity to 
                get their license, regardless of their current financial situation.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white" size="lg" asChild>
                <a href="#contact">Contact Us About Payment Plans</a>
              </Button>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Why Our Rates Reflect Quality
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our programs aren't the cheapest, and that's intentional. We keep class sizes small (max 10 students), 
                provide personalized attention, include complete application support, and offer a pass guarantee. 
                You're not just buying a course - you're investing in a partnership with an experienced builder 
                who's committed to your success. Our 95% success rate proves it's worth it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course FAQ */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our programs
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Choose Your Program?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free consultation to discuss which program suits you best
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto" 
              size="lg"
              asChild
            >
              <a href="#contact" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call 0411 626 398
              </a>
            </Button>
            <Button 
              className="bg-blue-800 text-white hover:bg-blue-900 text-lg px-8 py-6 h-auto border-2 border-white" 
              size="lg"
              asChild
            >
              <a href="#contact">Book Free Consultation</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
