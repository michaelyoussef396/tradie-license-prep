import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import { trackPhoneClick, trackEvent } from "@/lib/analytics";

const ThankYou = () => {
  // GA4 conversion event — fires once on landing on the real /thank-you route.
  useEffect(() => {
    trackEvent("generate_lead");
  }, []);

  return (
    <PageTransition>
      <Seo
        title="Thank You | Qualify Pro"
        description="Thanks for your enquiry. A Qualify Pro BPC prep specialist will call you within one business day to discuss your eligibility."
        path="/thank-you"
        noindex
      />
      <Helmet>
        {/*
          GOOGLE ADS CONVERSION SNIPPET PLACEHOLDER
          Paste the Google Ads event snippet for this conversion action here when supplied.
          Example:
          <script>{`gtag('event', 'conversion', { send_to: 'AW-XXXXXXXXX/XXXXXXXXXXXX' });`}</script>
        */}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 bg-slate-900 px-4 py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-2xl"
          >
            <div className="text-center">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
                Got it — we'll be in touch
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-300">
                Your details are through. Someone will call you within one business day to run
                through your eligibility.
              </p>
            </div>

            <h2 className="mt-14 text-2xl font-bold text-white">While you're waiting</h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-300">
              If you'd rather not wait, call us directly — happy to answer questions on the spot.
            </p>

            <a
              href="tel:0411626398"
              onClick={trackPhoneClick}
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-2xl sm:text-3xl font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-7 w-7" />
              0411 626 398
            </a>

            <p className="mt-10 font-semibold text-white">Worth a read in the meantime:</p>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/bpc-exam-changes"
                  className="group inline-flex items-start gap-2 text-slate-300 hover:text-white"
                >
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong className="text-white">What's changed with BPC registration</strong> —
                    the interview has been replaced by an exam, and it affects anyone mid-application.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/builder-registration-course-melbourne"
                  className="group inline-flex items-start gap-2 text-slate-300 hover:text-white"
                >
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    <strong className="text-white">How the course works</strong> — formats,
                    durations and what's included.
                  </span>
                </Link>
              </li>
            </ul>

            <h2 className="mt-14 text-2xl font-bold text-white">One thing that helps</h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-slate-300">
              Have a rough idea of your years of experience in your trade and which registered
              builders could provide a technical reference. Those two things are the first questions
              we'll ask, and knowing them speeds everything up.
            </p>
          </motion.div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ThankYou;
