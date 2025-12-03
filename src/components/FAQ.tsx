import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "How long is the process before getting my license?",
      answer:
        "The timeline varies depending on your current experience and the course you choose. Our courses range from 6 weeks (Carpentry DB-L) to 13 weeks (Comprehensive Builder Program). After completing the course, you'll submit your application to BPC (formerly VBA). Most students gain their license within 3-6 months of starting with us, including course completion, application processing, and BPC interview.",
    },
    {
      question: "What experience do I need?",
      answer:
        "You need a minimum of 2 years practical trade experience in your field. BPC requires technical references from registered builders (same or higher class), and you'll need to provide an evidence portfolio demonstrating your work experience. We assess each applicant individually based on their circumstances and help you determine if you're ready.",
    },
    {
      question: "Do you help with the applications?",
      answer:
        "Absolutely! Complete application support is included in all our programs. We help you prepare your portfolio, gather the right evidence, complete your application forms correctly, and ensure everything meets BPC requirements. We've done this hundreds of times and know exactly what BPC is looking for.",
    },
    {
      question: "What qualifications do I need and can you help me attain them?",
      answer:
        "You'll need your trade certificate and relevant work experience. If you're missing certain qualifications, we can guide you on what's needed and point you in the right direction. However, we focus on BPC interview preparation and application support - we're not an RTO and don't issue certificates. We work with experienced tradies who have the base qualifications but need help passing their licensing interview.",
    },
    {
      question: "What does the BPC test involve?",
      answer:
        "The BPC assessment includes multiple-choice tests covering building regulations, standards, and technical knowledge specific to your license class. You'll also have an interview where they assess your understanding of building principles, problem-solving abilities, and practical knowledge. Our programs include 450-600+ practice questions (depending on your course) and extensive interview preparation to ensure you're fully ready for both components.",
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about getting your BPC registration with Qualify Pro
          </p>
        </motion.div>

        {/* FAQ Cards */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Decorative side element */}
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-600 rounded-full hidden lg:block" />
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden data-[state=open]:shadow-lg data-[state=open]:border-blue-300"
              >
                <AccordionTrigger className="text-left px-6 py-5 hover:no-underline group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300">
                      <HelpCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 pr-4">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="pl-14 border-l-2 border-blue-100 ml-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-900 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Still have questions?</p>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Get in touch — we're happy to help
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
