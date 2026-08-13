import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { trackPhoneClick } from "@/lib/analytics";

const ThankYou = () => {
  return (
    <PageTransition>
      <Seo
        title="Thank You | Qualify Pro"
        description="Thanks for your enquiry. A Qualify Pro BPC prep specialist will call you within one business day to discuss your eligibility."
        path="/thank-you"
        noindex
      />
      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-1 flex items-center justify-center bg-slate-900 px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl text-center"
          >
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Thanks — we'll be in touch shortly.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed">
              One of our BPC prep specialists will call you within 1 business day to
              discuss your eligibility and answer any questions. In the meantime feel
              free to call us directly on 0411 626 398.
            </p>

            <a
              href="tel:0411626398"
              onClick={trackPhoneClick}
              className="mt-10 inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-2xl sm:text-3xl font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Phone className="h-7 w-7" />
              0411 626 398
            </a>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="outline" size="lg">
                <Link to="/courses">
                  Explore our programs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-slate-300 hover:text-white">
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </motion.div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ThankYou;