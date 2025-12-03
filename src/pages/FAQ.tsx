import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, HelpCircle, ChevronRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Questions",
      icon: "💬",
      questions: [
        {
          question: "What is this mentorship program?",
          answer:
            "This is NOT an RTO or training college. We provide specialized mentorship to prepare experienced tradies for their BPC (formerly VBA) licensing interviews and registration. We focus on small group training (max 10 students) with personalized teaching.",
        },
        {
          question: "How is this different from TAFE or an RTO?",
          answer:
            "Unlike RTOs that provide certificates, we focus purely on licensing preparation. We help you understand the Acts, Regulations, and Standards needed for your specific builder class registration. Our small classes allow personalized attention to fill your individual knowledge gaps.",
        },
        {
          question: "What's the success rate?",
          answer:
            "95% of students who complete our programs gain their BPC registration.",
        },
        {
          question: "Who is Adrian Nicolazzo?",
          answer:
            "Adrian Nicolazzo is the owner and lead trainer of Qualify Pro. He's a Registered Building Practitioner (Unlimited), with Commercial License (Low-Rise), Qualified Carpenter, and 10+ years training experience. He's worked in all positions from carpenter to builder across industrial, commercial, and residential projects.",
        },
        {
          question: "Where are you located?",
          answer:
            "We're based in Melbourne, Victoria. All training is face-to-face only (no online courses).",
        },
      ],
    },
    {
      category: "Course & Training Questions",
      icon: "📚",
      questions: [
        {
          question: "How long is the process before getting my license?",
          answer:
            "Our courses range from 6 to 13 weeks. After completing training, you'll be prepared for the BPC test and interview. Most students gain registration within a few months of finishing the course.",
        },
        {
          question: "What are the class sizes?",
          answer:
            "We keep classes small - minimum 5 students, maximum 10. This allows us to personalize teaching and address each student's specific weaknesses.",
        },
        {
          question: "What's included in the programs?",
          answer:
            "All programs include training materials, 450-600+ practice questions, Acts & Regulations guidance, application and portfolio preparation, BPC test and interview preparation, and a pass guarantee (free resit if needed).",
        },
        {
          question: "Do you offer evening classes?",
          answer:
            "Yes! Our most popular program runs 1 night per week, 6pm-9pm, designed for working tradies.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes. Contact us to discuss payment options based on your individual needs. We're flexible and want to make training accessible.",
        },
      ],
    },
    {
      category: "Requirements",
      icon: "📋",
      questions: [
        {
          question: "What experience do I need?",
          answer:
            "Minimum 2 years practical experience in your specific trade. Requirements vary by individual circumstances and license class you're seeking.",
        },
        {
          question: "What qualifications do I need?",
          answer:
            "You need the trade qualifications for your specific builder class, technical references from registered builders, and an evidence portfolio. We can help guide you through what's needed.",
        },
        {
          question: "Do you help with the applications?",
          answer:
            "Yes! All our programs include complete application preparation, portfolio development, and guidance through the BPC portal process.",
        },
        {
          question: "What documents do I need?",
          answer:
            "Technical references from registered builders (same or higher class), evidence portfolio of your work, and proof of your trade qualifications. We help you prepare all of this.",
        },
      ],
    },
    {
      category: "BPC Test & Registration",
      icon: "✅",
      questions: [
        {
          question: "What does the BPC test involve?",
          answer:
            "The test covers Building Acts, Regulations, Australian Standards, and practical knowledge for your specific license class. We provide 450-600+ practice questions and mock tests to prepare you thoroughly.",
        },
        {
          question: "How do I prepare for the interview?",
          answer:
            "We provide step-by-step interview preparation, covering common questions, technical requirements, and how to present your experience confidently.",
        },
        {
          question: "What if I don't pass the test?",
          answer:
            "All our programs include a pass guarantee. If you don't pass, you can resit the course for free.",
        },
        {
          question: "What trade areas do you cover?",
          answer:
            "Domestic Builder Unlimited, Carpentry (DB-L), Commercial Building (Low-Rise), Waterproofing, Bricklaying, Cabinet Making, Kitchen & Bathroom Renovations, Door & Window Replacement, External Fixtures (Pergolas, Decks), Sheds & Non-Habitable Structures, and more.",
        },
      ],
    },
    {
      category: "Investment & Value",
      icon: "💰",
      questions: [
        {
          question: "What do your programs cost?",
          answer:
            "Programs range from $3,790 to $7,995 inc GST depending on duration and format. Contact us for detailed pricing and payment plan options.",
        },
        {
          question: "Is the consultation really free?",
          answer:
            "Yes! The initial consultation is completely free with no obligation. We'll discuss your experience, goals, and recommend the best program for you.",
        },
        {
          question: "What's the ROI of getting licensed?",
          answer:
            "Licensed builders earn significantly more and can take on larger projects. Many of our students have started their own businesses or advanced to higher positions after getting licensed.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Blueprint Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <HelpCircle className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Got Questions?</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Questions
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to know about builder registration training in Melbourne
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category, index) => (
              <motion.a
                key={index}
                href={`#category-${index}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.category}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              id={`category-${categoryIndex}`}
              className="mb-12 scroll-mt-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Heading */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {category.category}
                </h2>
              </div>

              {/* Questions Accordion */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={questionIndex}
                      value={`category-${categoryIndex}-item-${questionIndex}`}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold px-6 py-5 hover:bg-slate-50 hover:no-underline transition-colors [&[data-state=open]]:bg-blue-50 [&[data-state=open]]:text-blue-700">
                        <span className="flex items-center gap-3">
                          <ChevronRight className="h-5 w-5 text-blue-500 shrink-0 transition-transform duration-200 [&[data-state=open]]:rotate-90" />
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-5 pt-0 text-slate-600 leading-relaxed text-base">
                        <div className="pl-8">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <MessageCircle className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Can't Find Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Answer?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
              Get in touch with Qualify Pro and we'll help you out. We're happy to answer any questions you have.
            </p>

            {/* Contact Methods */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="tel:0411626398"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400">Call us</div>
                  <div className="font-semibold">0411 626 398</div>
                </div>
              </a>
              <a
                href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400">Email us</div>
                  <div className="font-semibold">Get in touch</div>
                </div>
              </a>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/contact">Book Free Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
