import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import { trackCtaClick, trackPhoneClick } from "@/lib/analytics";

const BuildersLicenceMelbourne = () => {
  const scrollToForm = () => {
    trackCtaClick("Check My Eligibility", "/builders-licence-melbourne");
    const form = document.getElementById("eligibility-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const trustItems = [
    { icon: TrendingUp, text: "Consistently high BPC pass rate" },
    { icon: Award, text: "10+ years specialist experience" },
    { icon: Users, text: "Small personalised classes" },
    { icon: CheckCircle2, text: "Specialist BPC prep, not a generic course" },
  ];

  const steps = [
    {
      step: "1",
      title: "Book a free eligibility check",
      description: "We confirm you qualify and explain the process",
    },
    {
      step: "2",
      title: "Join a small personalised class",
      description: "Coaching built around your trade and registration class",
    },
    {
      step: "3",
      title: "Sit your BPC assessment prepared and confident",
      description: "",
    },
  ];

  return (
    <>
      <Seo
        title="Get Your Builder's Licence in Melbourne | Qualify Pro"
        description="Qualify Pro prepares experienced Melbourne tradies for the Building and Plumbing Commission (BPC) registration process. Small classes, specialist prep, free eligibility check."
        path="/builders-licence-melbourne"
      />

      <main className="overflow-hidden">
        {/* HERO — designed to fit a mobile screen without scrolling */}
        <section className="relative min-h-[calc(100svh-3rem)] lg:min-h-0 lg:py-24 flex flex-col justify-center bg-slate-900 pt-8 pb-8">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950" />

          {/* Blueprint grid overlay — lightweight SVG pattern, no large images */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Subtle accent glows (desktop only) */}
          <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden hidden lg:block">
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/10"
              style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
            />
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-3 sm:mb-4"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Free eligibility check
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 leading-[1.1] tracking-tight text-white"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Get Your Builder's Licence in Victoria
                <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent mt-1">
                  — Without the Guesswork
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-blue-100/80 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Qualify Pro prepares experienced Melbourne tradies for the full Building and Plumbing Commission registration process.
              </motion.p>

              {/* CTA + tap-to-call */}
              <motion.div
                className="flex flex-col items-center gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  size="lg"
                  className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 text-base sm:text-lg px-8 py-6 rounded-xl"
                  onClick={scrollToForm}
                >
                  Check My Eligibility — It's Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <a
                  href="tel:0411626398"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold text-white hover:text-blue-200 transition-colors"
                  aria-label="Call Qualify Pro on 0411 626 398"
                >
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  0411 626 398
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom angle divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* TRUST STRIP — immediately below hero */}
        <section className="py-6 sm:py-8 bg-white border-b border-slate-100">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {trustItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-blue-50/80 border border-blue-100"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                      {item.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS — 3 steps */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-10 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-700 rounded-full text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                Three steps to your BPC registration
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg sm:text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-slate-600 text-sm sm:text-base">
                      {step.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FORM SECTION — same 4 fields and submit behaviour as homepage */}
        <section id="eligibility-form" className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-700 rounded-full text-sm font-medium mb-4">
                  Free, No Obligation
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Check Your Eligibility
                </h2>
                <p className="text-slate-600 text-base sm:text-lg mb-6">
                  Tell us a little about your trade experience and we'll confirm whether you're ready to start the BPC registration process.
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Free eligibility assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>No spam — we call within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Personalised advice for your trade</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <HeroEnquiryForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS PLACEHOLDER — content coming later */}
        {/* 
          TODO: Add testimonials section here once content is provided.
          Suggested structure: 2-3 student success stories with quote, name,
          trade, and outcome. Keep images small and optimised (<100KB each).
        */}

        {/* FAQ PLACEHOLDER — content coming later */}
        {/* 
          TODO: Add FAQ accordion here once content is provided.
          Suggested topics: eligibility requirements, BPC assessment format,
          class sizes, payment plans, and how long the process takes.
        */}

        {/* Minimal bottom strip — no navigation links except phone */}
        <section className="py-8 bg-slate-900">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-400 text-sm mb-2">
              Qualify Pro — BPC registration mentorship for Melbourne tradies
            </p>
            <a
              href="tel:0411626398"
              onClick={trackPhoneClick}
              className="inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-300 transition-colors"
              aria-label="Call Qualify Pro on 0411 626 398"
            >
              <Phone className="h-5 w-5" />
              0411 626 398
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default BuildersLicenceMelbourne;
