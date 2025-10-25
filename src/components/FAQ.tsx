import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How long is the process before getting my license?",
      answer:
        "The timeline varies depending on your current experience and the course you choose. Our courses range from 6 weeks (Carpentry DB-L) to 13 weeks (Comprehensive Builder Program). After completing the course, you'll submit your application to the VBA. Most students gain their license within 3-6 months of starting with us, including course completion, application processing, and VBA interview.",
    },
    {
      question: "What experience do I need?",
      answer:
        "You need a minimum of 2 years practical trade experience in your field. The VBA requires technical references from registered builders (same or higher class), and you'll need to provide an evidence portfolio demonstrating your work experience. We assess each applicant individually based on their circumstances and help you determine if you're ready.",
    },
    {
      question: "Do you help with the applications?",
      answer:
        "Absolutely! Complete application support is included in all our programs. We help you prepare your portfolio, gather the right evidence, complete your application forms correctly, and ensure everything meets VBA requirements. We've done this hundreds of times and know exactly what the VBA is looking for.",
    },
    {
      question: "What qualifications do I need and can you help me attain them?",
      answer:
        "You'll need your trade certificate and relevant work experience. If you're missing certain qualifications, we can guide you on what's needed and point you in the right direction. However, we focus on VBA interview preparation and application support - we're not an RTO and don't issue certificates. We work with experienced tradies who have the base qualifications but need help passing their licensing interview.",
    },
    {
      question: "What does the VBA test involve?",
      answer:
        "The VBA assessment includes multiple-choice tests covering building regulations, standards, and technical knowledge specific to your license class. You'll also have an interview where they assess your understanding of building principles, problem-solving abilities, and practical knowledge. Our programs include 450-600+ practice questions (depending on your course) and extensive interview preparation to ensure you're fully ready for both components.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
