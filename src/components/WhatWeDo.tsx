import { CheckCircle } from "lucide-react";

const WhatWeDo = () => {
  const benefits = [
    "One-on-one mentorship tailored to your experience",
    "VBA interview preparation and practice sessions",
    "Real-world scenarios and case studies",
    "Post-course support until you're registered",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide personalized mentorship to experienced tradies who need to pass 
              their VBA licensing interview. This is NOT an RTO - it's focused, practical 
              support to help you succeed.
            </p>
          </div>

          <div className="bg-card rounded-xl shadow-lg p-8 md:p-10">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base md:text-lg text-card-foreground">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
