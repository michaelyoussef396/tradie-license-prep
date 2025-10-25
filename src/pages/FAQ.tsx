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
import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is this mentorship program?",
          answer:
            "This is NOT an RTO or training college. We provide specialized mentorship to prepare experienced tradies for their VBA (Victorian Building Authority) licensing interviews and registration. We focus on small group training (max 10 students) with personalized teaching.",
        },
        {
          question: "How is this different from TAFE or an RTO?",
          answer:
            "Unlike RTOs that provide certificates, we focus purely on licensing preparation. We help you understand the Acts, Regulations, and Standards needed for your specific builder class registration. Our small classes allow personalized attention to fill your individual knowledge gaps.",
        },
        {
          question: "What's the success rate?",
          answer:
            "95% of students who complete our programs gain their VBA registration.",
        },
        {
          question: "Who is Adrian Nicolazzo?",
          answer:
            "Adrian is a Registered Building Practitioner (Unlimited), with Commercial License (Low-Rise), Qualified Carpenter, and 10+ years training experience. He's worked in all positions from carpenter to builder across industrial, commercial, and residential projects.",
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
      questions: [
        {
          question: "How long is the process before getting my license?",
          answer:
            "Our courses range from 6 to 13 weeks. After completing training, you'll be prepared for the VBA test and interview. Most students gain registration within a few months of finishing the course.",
        },
        {
          question: "What are the class sizes?",
          answer:
            "We keep classes small - minimum 5 students, maximum 10. This allows us to personalize teaching and address each student's specific weaknesses.",
        },
        {
          question: "What's included in the programs?",
          answer:
            "All programs include training materials, 450-600+ practice questions, Acts & Regulations guidance, application and portfolio preparation, VBA test and interview preparation, and a pass guarantee (free resit if needed).",
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
            "Yes! All our programs include complete application preparation, portfolio development, and guidance through the VBA portal process.",
        },
        {
          question: "What documents do I need?",
          answer:
            "Technical references from registered builders (same or higher class), evidence portfolio of your work, and proof of your trade qualifications. We help you prepare all of this.",
        },
      ],
    },
    {
      category: "VBA Test & Registration",
      questions: [
        {
          question: "What does the VBA/BPC test involve?",
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white pt-32 pb-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            className="text-xl text-blue-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about builder registration training in
            Melbourne
          </motion.p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {/* Category Heading */}
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
                {category.category}
              </h2>

              {/* Questions Accordion */}
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`category-${categoryIndex}-item-${questionIndex}`}
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Can't Find Your Answer?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get in touch and we'll help you out
          </motion.p>

          {/* Contact Methods */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="tel:0411626398"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span className="font-semibold">0411 626 398</span>
            </a>
            <a
              href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-semibold">Email Us</span>
            </a>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-6"
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
