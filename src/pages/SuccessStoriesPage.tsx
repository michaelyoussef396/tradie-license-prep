import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { 
  Building2, 
  TrendingUp, 
  Award,
  CheckCircle2,
  ArrowRight,
  Users,
  Target,
  Rocket,
  Star,
  Briefcase,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessStoriesPage = () => {
  // Every claim below is traceable to Adrian's written confirmation of 9 Sep 2026.
  // Do not add business names, suburbs, headcounts or timeframes without sign-off.
  const caseStudies = [
    {
      id: "fauzi",
      name: "Fauzi",
      initials: "F",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      achievement: "Domestic Builder (Unlimited)",
      licensedAgo: "5 years ago",
      outcome:
        "Runs a building company turning over $15M+ a year, specialising in elite homes across Melbourne's most prestigious suburbs.",
      icon: Building2,
    },
    {
      id: "jordan",
      name: "Jordan",
      initials: "J",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-600",
      achievement: "Carpentry Licence (DB-L)",
      licensedAgo: null,
      outcome:
        "Launched a business focused on high-end outdoor living spaces, partnering with numerous suppliers to deliver premium installations throughout Melbourne.",
      icon: Award,
    },
    {
      id: "sidhu",
      name: "Sidhu",
      initials: "S",
      gradientFrom: "from-violet-500",
      gradientTo: "to-violet-600",
      achievement: "Domestic Builder",
      licensedAgo: "6 years ago",
      outcome:
        "Runs a building company constructing new homes across Melbourne's northern and western suburbs.",
      icon: Building2,
    },
    {
      id: "manny",
      name: "Manny",
      initials: "M",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-600",
      // Adrian's source gives no licence class for Manny.
      achievement: null,
      licensedAgo: "5 years ago",
      outcome: "Leads a high-volume building company completing 50+ homes a year.",
      icon: TrendingUp,
    },
    {
      id: "ben",
      name: "Ben",
      initials: "B",
      gradientFrom: "from-slate-500",
      gradientTo: "to-slate-600",
      achievement: "Bathroom and Kitchen (Limited)",
      licensedAgo: "4 years ago",
      outcome: "Completes 40+ renovation projects a year in Melbourne's inner suburbs.",
      icon: Award,
    },
  ];

  /** Generic and true of every student — not a per-student claim. */
  const TRAINING_LINE = "Prepared for BPC registration with Adrian at Qualify Pro.";

  // Describes how the program is run — deliberately not a claim about what the
  // featured students experienced, which Adrian's source material does not cover.
  const successFactors = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Group courses are capped at 10 students, so Adrian can work to each person's specific needs rather than teach to the room."
    },
    {
      icon: Target,
      title: "Identified Knowledge Gaps",
      description: "Rather than generic training, Adrian assesses your strengths and weaknesses and focuses on filling specific gaps rather than teaching everything from scratch."
    },
    {
      icon: CheckCircle2,
      title: "Built on Existing Strengths",
      description: "Adrian recognises what you already know from practical experience and builds on it while systematically improving weaker areas."
    },
    {
      icon: Star,
      title: "Understanding Over Memorisation",
      description: "The focus is on understanding building principles and regulations, and on finding and applying the right reference quickly, rather than memorising answers."
    }
  ];

  const journeySteps = [
    {
      step: "1",
      title: "Free Consultation",
      description: "Discuss your experience, goals, and which program suits you best",
      icon: Users
    },
    {
      step: "2",
      title: "Personalized Training",
      description: "Small classes with focus on your specific knowledge gaps",
      icon: Target
    },
    {
      step: "3",
      title: "BPC Registration",
      description: "Pass your licensing with confidence and complete support",
      icon: CheckCircle2
    },
    {
      step: "4",
      title: "Build Your Business",
      description: "Launch or grow your building company with ongoing support",
      icon: Rocket
    }
  ];

  return (
    <PageTransition>
      <Seo title={"Student Success Stories | Qualify Pro Melbourne"} description={"Real Melbourne tradies who gained their building registration with Qualify Pro and went on to run their own businesses."} path="/success-stories" />
      <div className="min-h-screen">
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

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <Star className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">95% Pass Rate</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Tradies,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
              Our students achieve a 95% pass rate for registration with the Building and Plumbing Commission (BPC), formerly the VBA, based on Qualify Pro's own student records. Here are their stories of transformation.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "100+", label: "Tradies Helped By Adrian" },
                { value: "95%", label: "Pass Rate" },
                { value: "2017", label: "Training Since" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">Based on Qualify Pro&apos;s own student records.</p>
          </motion.div>
        </div>
      </section>

      {/* Success Rate Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl px-10 py-6 mb-8 shadow-lg">
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">High</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Pass Rate
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Students who complete our programs achieve a 95% pass rate for their BPC registration, based on Qualify Pro's own student records. 
              Here's what happens after they get licensed:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Award, title: "Gained Registration", description: "Students achieved Domestic Builder Unlimited, Domestic Builder, DB-L Carpentry and Bathroom and Kitchen Limited registration", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
              { icon: Briefcase, title: "Started Businesses", description: "Many students launched their own building companies and are now their own bosses", gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
                          ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className={`${item.bg} p-8 rounded-2xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, index) => {
        const Icon = study.icon;
        const isEven = index % 2 === 0;
        return (
          <section 
            key={study.id}
            className={`py-20 ${isEven ? "bg-slate-50" : "bg-white"}`}
          >
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  {study.name}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-lg text-slate-600">
                  {study.achievement && (
                    <span className="font-semibold text-blue-600">{study.achievement}</span>
                  )}
                  {study.achievement && study.licensedAgo && (
                    <span className="hidden sm:block">•</span>
                  )}
                  {study.licensedAgo && <span>Licensed {study.licensedAgo}</span>}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Avatar */}
                <motion.div
                  className="lg:col-span-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`aspect-square max-w-[200px] mx-auto rounded-2xl bg-gradient-to-br ${study.gradientFrom} ${study.gradientTo} flex items-center justify-center shadow-2xl`}>
                    <span className="text-7xl font-bold text-white">{study.initials}</span>
                  </div>
                </motion.div>

                {/* Outcome */}
                <motion.div
                  className="lg:col-span-2 space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                      <Icon className="h-6 w-6 text-emerald-600" />
                      Where {study.name} is now
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{study.outcome}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">The training</h3>
                    <p className="text-slate-600 leading-relaxed">{TRAINING_LINE}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Common Success Factors */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How The Program{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Different backgrounds, different classes — the same approach to preparing for registration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">{factor.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">{factor.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every student came from a different background with different challenges. What they 
              all received was personalized training focused on their individual needs. That's why 
              our students achieve a 95% pass rate (based on Qualify Pro's own student records) - because we don't believe in one-size-fits-all training.
            </p>
          </motion.div>
        </div>
      </section>

      {/* You Could Be Next */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              You Could Be{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Next</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your success story starts with a simple conversation. Here's the journey:
            </p>
          </motion.div>

          {/* Journey Steps */}
          <div className="relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -translate-y-1/2 rounded-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Step Card */}
                    <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 relative z-10 border border-slate-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 relative shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-600 shadow-md">
                          <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{step.title}</h3>
                      <p className="text-slate-600 text-center leading-relaxed">{step.description}</p>
                    </div>

                    {/* Arrow (Mobile/Tablet) */}
                    {index < journeySteps.length - 1 && (
                      <div className="flex justify-center my-4 lg:hidden">
                        <ArrowRight className="h-8 w-8 text-blue-500" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl text-slate-600 mb-8">
              Ready to start your success story? Book a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg"
                asChild
              >
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
              <Button 
                className="bg-white text-blue-600 hover:bg-slate-50 text-lg px-8 py-6 h-auto border-2 border-blue-600 shadow-md" 
                size="lg"
                asChild
              >
                <Link to="/courses">View Our Programs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
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
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Write Your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Success Story?</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-10">
              Join the 100+ Melbourne tradies Adrian has helped achieve their building registration
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button 
                className="bg-white text-slate-900 hover:bg-slate-100 text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg"
                asChild
              >
                <Link to="/courses">View Programs</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg"
                asChild
              >
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
            </div>

            {/* Quick Contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-400">
              <a href="tel:0411626398" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-5 w-5" />
                <span>0411 626 398</span>
              </a>
              <a href="mailto:hello@qualifypro.com.au" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
  );
};

export default SuccessStoriesPage;
