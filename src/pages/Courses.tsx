import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
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
  Quote,
  ArrowRight,
  Star,
  Video,
  Wrench,
  HelpCircle,
  Shield
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
      badge: { text: "Most Comprehensive", color: "bg-blue-600" },
      title: "Comprehensive Builder Program",
      subtitle: "Domestic & Commercial",
      duration: "13 weeks",
      format: "In-person",
      formatIcon: Users,
      price: "$7,995",
      whoFor: "Ideal for tradies seeking Domestic Builder – Unlimited or Commercial (Low-Rise) registration who want the most thorough preparation possible.",
      whatYouLearn: [
        { icon: Building2, text: "Complete building principles and regulations" },
        { icon: FileText, text: "BPC regulations and compliance requirements" },
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
        "BPC test preparation and practice sessions",
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
      },
      featured: false,
      accent: "from-blue-500 to-blue-600"
    },
    {
      id: "evening",
      badge: { text: "Most Popular", color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
      title: "Evening Builder Course",
      subtitle: "For Working Tradies",
      duration: "7 weeks",
      format: "1 night/week, 6pm-9pm",
      formatIcon: Clock,
      price: "$5,650",
      whoFor: "Perfect for working tradies who can't take time off during the day. Get your builder registration while continuing to work full-time.",
      whatYouLearn: [
        { icon: Building2, text: "Domestic building regulations and compliance" },
        { icon: FileText, text: "BPC requirements and application process" },
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
        "BPC interview preparation",
        "Post-course support via email/phone",
      ],
      schedule: "One evening per week (6pm-9pm) for 7 weeks. Perfect for working tradies. Choose your preferred weeknight.",
      requirements: "Minimum 2 years relevant trade experience. Currently working in the building/construction industry preferred.",
      testimonial: {
        text: "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex topics easy to understand, and I felt fully prepared for my interview.",
        author: "Manny",
        achievement: "Licensed builder completing 50+ homes/year"
      },
      featured: true,
      accent: "from-emerald-500 to-teal-500"
    },
    {
      id: "private",
      badge: { text: "Personalised", color: "bg-violet-600" },
      title: "Private 1-on-1 Training",
      subtitle: "Flexible & Remote",
      duration: "9 weeks",
      format: "3 hrs/week via Zoom",
      formatIcon: Video,
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
      },
      featured: false,
      accent: "from-violet-500 to-purple-500"
    },
    {
      id: "carpentry",
      badge: { text: "Specialist", color: "bg-amber-600" },
      title: "Carpentry License (DB-L)",
      subtitle: "Carpentry Specific",
      duration: "6 weeks",
      format: "In-person",
      formatIcon: Wrench,
      price: "$3,790",
      whoFor: "Specifically designed for qualified carpenters seeking DB-L (Domestic Builder - Limited) registration to legally supervise carpentry and building projects.",
      whatYouLearn: [
        { icon: Building2, text: "DB-L specific regulations and scope" },
        { icon: FileText, text: "Carpentry-focused building codes" },
        { icon: Target, text: "BPC interview preparation for DB-L" },
        { icon: BookOpen, text: "Technical carpentry knowledge assessment" },
        { icon: Award, text: "Quality standards for carpentry work" },
      ],
      included: [
        "450+ carpentry-specific practice questions",
        "DB-L focused training materials",
        "Application guidance and support",
        "BPC interview preparation",
        "Technical knowledge assessment",
        "Portfolio development support",
        "Small group format (max 10 students)",
        "Email support throughout the course",
      ],
      schedule: "6 weeks of focused DB-L training. Weekly sessions with practice questions and interview preparation.",
      requirements: "Qualified carpenter with minimum 2 years on-the-job experience. Trade certificate required.",
      testimonial: {
        text: "The DB-L course was exactly what I needed. Adrian knows the carpentry trade inside out and focused on what BPC actually asks. Passed first time and now running my own carpentry business.",
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
      },
      featured: false,
      accent: "from-amber-500 to-orange-500"
    },
  ];

  const faqItems = [
    {
      question: "How long is the process before getting my license?",
      answer: "The training duration varies by program (6-13 weeks), but the complete process including application submission and BPC (formerly VBA) processing typically takes 3-6 months total. We help expedite this by ensuring your application is perfect before submission."
    },
    {
      question: "What experience do I need to enroll?",
      answer: "You need a minimum of 2 years practical trade experience in your field. You should be actively working or have recent experience in building/construction. We assess each applicant individually based on their background and circumstances."
    },
    {
      question: "Do you help with the BPC applications?",
      answer: "Yes! Complete application support is included in all our programs. We help you prepare your portfolio, gather technical references, complete all required documentation, and ensure everything is correct before submission. This significantly increases your chances of approval."
    },
    {
      question: "What does the BPC test involve?",
      answer: "The test covers building regulations, Australian Standards, building codes, construction techniques, site management, and business knowledge. Our programs include 450-600+ practice questions that mirror the actual test format. We also prepare you for the interview component."
    },
    {
      question: "What's your success rate?",
      answer: "95% of students who complete our programs successfully gain their registration. This high success rate is due to our personalized teaching approach, comprehensive preparation, and ensuring students are truly ready before attempting their licensing."
    },
    {
      question: "What if I fail the BPC test?",
      answer: "All our programs include a pass guarantee. If you complete the program, attempt your test, and don't pass, you can resit the training course for free. We're committed to your success and will work with you until you achieve your registration."
    },
    {
      question: "Can I get a payment plan?",
      answer: "Yes! We offer flexible payment plans to make the investment more manageable. Contact us to discuss options that work for your financial situation. We believe cost shouldn't prevent good tradies from getting their license."
    },
  ];

  const universalFeatures = [
    { icon: Shield, title: "Pass Guarantee", description: "If you complete the program and don't pass, resit the training for free." },
    { icon: FileText, title: "Application Support", description: "Complete help with BPC applications, portfolio, and documentation." },
    { icon: Target, title: "BPC Test Prep", description: "Hundreds of practice questions that mirror the actual BPC test." },
    { icon: BookOpen, title: "All Materials Included", description: "Training manuals, study guides, and online platform access." },
    { icon: Users, title: "Interview Preparation", description: "Mock interviews and technique coaching for the BPC interview." },
    { icon: TrendingUp, title: "Post-Registration Support", description: "Ongoing support and advice after you get licensed." },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-6">
              Training Programs
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Professional Builder<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Registration Training
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto">
              Choose the program that fits your schedule and goals. All programs include pass guarantee and complete application support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Cards Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {courses.map((course, index) => {
              const FormatIcon = course.formatIcon;
              return (
                <motion.a
                  key={course.id}
                  href={`#${course.id}`}
                  className={`group relative block ${course.featured ? 'md:-mt-4 md:mb-4' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {course.featured && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                  )}
                  
                  <div className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 h-full
                    ${course.featured 
                      ? 'shadow-xl ring-2 ring-emerald-500/50 hover:shadow-2xl' 
                      : 'shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200'
                    }`}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${course.accent}`} />
                    
                    <div className="p-6 sm:p-8">
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

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{course.subtitle}</p>

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

                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500">inc GST</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.whoFor}</p>

                      <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Course Sections */}
      {courses.map((course, index) => (
        <section 
          key={course.id}
          id={course.id}
          className={index % 2 === 0 ? "py-16 md:py-24 bg-slate-50" : "py-16 md:py-24 bg-white"}
        >
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className={`${course.badge.color} text-white text-sm font-semibold px-4 py-2 rounded-full inline-block mb-4`}>
                {course.badge.text}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">{course.price}</span>
                  <span className="text-gray-500">inc GST</span>
                </div>
              </div>
            </motion.div>

            {/* Who This Is For */}
            <motion.div 
              className={`bg-gradient-to-r ${course.accent} p-6 md:p-8 rounded-2xl mb-12 text-white`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Who This Is For
              </h3>
              <p className="text-white/90 leading-relaxed">{course.whoFor}</p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
              <motion.div 
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                  What You'll Learn
                </h3>
                <div className="space-y-4">
                  {course.whatYouLearn.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${course.accent} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-700 mt-2">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div 
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Check className="h-6 w-6 text-emerald-600" />
                  What's Included
                </h3>
                <div className="space-y-3">
                  {course.included.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Schedule & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <motion.div 
                className="bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Schedule & Format
                </h4>
                <p className="text-gray-600">{course.schedule}</p>
              </motion.div>
              <motion.div 
                className="bg-white p-6 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Entry Requirements
                </h4>
                <p className="text-gray-600">{course.requirements}</p>
              </motion.div>
            </div>

            {/* Add-on Package */}
            {course.addon && (
              <motion.div 
                className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-6 md:p-8 rounded-2xl mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{course.addon.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-amber-600">{course.addon.price}</span>
                      <span className="bg-amber-600 text-white text-sm px-3 py-1 rounded-full">{course.addon.savings}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {course.addon.includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            <motion.div 
              className="bg-slate-900 p-6 md:p-8 rounded-2xl mb-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Quote className="absolute top-4 right-4 h-12 w-12 text-blue-400/20" />
              <p className="text-white/90 text-lg leading-relaxed mb-4 relative z-10">
                "{course.testimonial.text}"
              </p>
              <div>
                <div className="font-bold text-xl text-white">— {course.testimonial.author}</div>
                <div className="text-blue-300 text-sm">{course.testimonial.achievement}</div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <div className="text-center">
              <Button
                className={`bg-gradient-to-r ${course.accent} hover:opacity-90 text-white text-lg px-8 py-6 h-auto rounded-xl shadow-lg group`}
                asChild
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Enroll in {course.title}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Or call <a href="tel:0411626398" className="text-blue-600 font-semibold hover:underline">0411 626 398</a> to discuss
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Universal Features */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-4">
              Included In Every Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Every Program Includes
            </h2>
            <p className="text-lg text-blue-200/70">
              Comprehensive support from enrollment to registration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment & Payment */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Your Investment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment in Your Future
            </h2>
            <p className="text-lg text-gray-600">
              Getting your builder registration is one of the best career investments you can make
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-slate-50 p-6 md:p-8 rounded-2xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="h-7 w-7 text-blue-600" />
                Return on Investment
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Licensed builders in Melbourne earn significantly more than unlicensed tradies. With registration, you can:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Start your own building company",
                  "Command $80-150+ per hour",
                  "Take on projects worth millions",
                  "Build equity in your own business"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 md:p-8 rounded-2xl border-2 border-emerald-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Flexible Payment Plans Available
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                We offer flexible payment plans to make our programs more accessible. Every tradie deserves the opportunity to get their license.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" size="lg" asChild>
                <Link to="/contact">Contact Us About Payment Plans</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <AccordionTrigger className="text-left px-6 py-5 hover:no-underline group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors pr-4">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-14">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Choose Your Program?
            </h2>
            <p className="text-xl text-blue-200/80 mb-8">
              Book a free consultation to discuss which program suits you best
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-slate-900 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-lg group" 
                size="lg"
                asChild
              >
                <a href="tel:0411626398" className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Call 0411 626 398
                </a>
              </Button>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 h-auto rounded-xl group" 
                size="lg"
                asChild
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
  );
};

export default Courses;
