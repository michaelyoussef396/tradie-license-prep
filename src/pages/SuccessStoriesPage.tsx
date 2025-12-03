import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { 
  Quote, 
  Building2, 
  TrendingUp, 
  Award,
  CheckCircle2,
  ArrowRight,
  Users,
  Target,
  Rocket,
  Video,
  Star,
  Briefcase,
  Phone,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessStoriesPage = () => {
  const caseStudies = [
    {
      id: "fauzi",
      name: "Fauzi",
      initials: "F",
      gradientFrom: "from-blue-500",
      gradientTo: "to-blue-600",
      headline: "From Tradie to $15M Business Owner",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "5 years ago",
      currentBusiness: "Elite Homes Melbourne",
      revenue: "$15M+ annually",
      before: {
        title: "The Starting Point",
        description: "Fauzi was an experienced carpenter with solid practical skills and years of on-site experience. He'd worked on numerous residential projects and knew his trade inside out. However, he was working for someone else's building company and wanted to start his own business building high-end homes. The problem? He needed his Domestic Builder Unlimited registration to legally run his own building company and sign off on projects."
      },
      challenge: {
        title: "The Challenge",
        description: "While Fauzi's practical carpentry skills were excellent, he struggled with the theoretical side of building regulations, Australian Standards, and business knowledge required for the BPC licensing process. He'd attempted self-study but found the material overwhelming and wasn't sure what BPC was actually looking for in interviews. He was worried about investing time and money into the licensing process only to fail."
      },
      training: {
        title: "The Training",
        description: "Fauzi enrolled in Qualify Pro's Comprehensive Builder Program. Adrian quickly identified that Fauzi's practical knowledge was strong, but he needed focused work on building regulations, compliance requirements, and understanding Australian Standards. Rather than teaching everything from scratch, Adrian personalized the training to fill Fauzi's specific knowledge gaps. The small class size meant Fauzi could ask questions freely and get immediate feedback. The 600+ practice questions helped Fauzi master the test format, and the interview preparation built his confidence to articulate his practical experience professionally."
      },
      result: {
        title: "The Result",
        description: "Fauzi passed his Domestic Builder Unlimited registration on the first attempt. Within months, he launched his own building company specializing in elite homes across Melbourne's prestigious suburbs including Toorak, Brighton, and Armadale. Five years later, his company turns over $15+ million annually and has built a reputation for exceptional quality and craftsmanship. Fauzi now employs multiple teams and manages several high-end residential projects simultaneously. His success demonstrates how proper licensing preparation can transform a tradie's career trajectory."
      },
      quote: "Adrian's personalized approach helped me understand the regulations I was struggling with. The small class size meant I could ask questions without feeling rushed, and the practice tests prepared me perfectly for the BPC process. I passed first time and never looked back. Now I run my own company building elite homes - something that wouldn't have been possible without my unlimited builder registration.",
      icon: Building2
    },
    {
      id: "jordan",
      name: "Jordan",
      initials: "J",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-emerald-600",
      headline: "From Carpenter to Premium Business Owner",
      achievement: "Carpentry License (DB-L)",
      yearsAgo: "3 years ago",
      currentBusiness: "Premium Outdoor Living",
      revenue: "High-end installations",
      before: {
        title: "The Starting Point",
        description: "Jordan was a qualified carpenter with years of experience but wanted to specialize in outdoor living spaces - pergolas, decks, outdoor kitchens, and entertainment areas. He saw a market opportunity in high-end outdoor installations but needed his DB-L (Domestic Builder Limited - Carpentry) registration to legally supervise these projects and run his own business."
      },
      challenge: {
        title: "The Challenge",
        description: "Jordan's hands-on carpentry skills were excellent from years on the tools, but he lacked confidence in his theoretical knowledge. He wasn't sure he understood building codes well enough to pass the BPC test. He'd also never done a formal interview and was nervous about articulating his experience professionally. Working full-time meant he needed training that fit around his job schedule."
      },
      training: {
        title: "The Training",
        description: "Jordan enrolled in the Carpentry License (DB-L) course designed specifically for carpenters. Adrian focused on building Jordan's confidence by showing him he already knew more than he realized - he just needed to learn how to express it properly. The 450+ carpentry-specific practice questions helped Jordan master technical knowledge areas, while interview coaching taught him how to discuss his practical experience with authority. Adrian's teaching style made complex regulations understandable and relevant to real carpentry work."
      },
      result: {
        title: "The Result",
        description: "Jordan achieved his Carpentry License (DB-L) and immediately launched his own business specializing in high-end outdoor living spaces. He quickly established partnerships with premium suppliers and builders throughout Melbourne. His business focuses on quality over quantity - delivering exceptional outdoor installations that command premium prices. Jordan now works directly with homeowners and builders on upscale projects, earning significantly more than when he was employed. His success shows how specialized licensing can open doors to profitable niche markets."
      },
      quote: "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on. His teaching style is clear and practical. I passed first time and launched my business within weeks. Now I'm doing the high-end outdoor work I always wanted to do, working with the best suppliers in Melbourne.",
      icon: Award
    },
    {
      id: "sidhu",
      name: "Sidhu",
      initials: "S",
      gradientFrom: "from-violet-500",
      gradientTo: "to-violet-600",
      headline: "Building New Homes Across Melbourne",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "4 years ago",
      currentBusiness: "Sidhu Building Constructions",
      revenue: "Multiple new homes annually",
      before: {
        title: "The Starting Point",
        description: "Sidhu had been working as a site supervisor for a building company for years. He managed projects, coordinated trades, and handled day-to-day construction operations. He was essentially doing a builder's job but working for someone else. Sidhu wanted to start his own building company and build new homes under his own name, but he needed his Domestic Builder Unlimited registration to make that happen."
      },
      challenge: {
        title: "The Challenge",
        description: "Sidhu's practical site management experience was extensive, but he needed to formalize his technical knowledge for the BPC licensing process. His biggest challenge was time - he was working full-time as a site supervisor and couldn't take time off for daytime training. He also wasn't confident in his test-taking abilities and worried about the BPC interview process."
      },
      training: {
        title: "The Training",
        description: "Sidhu chose Qualify Pro's Evening Builder Course specifically designed for working tradies. One evening per week (6pm-9pm) meant he could continue working while preparing for his license. Adrian's teaching focused on understanding building principles rather than just memorizing answers - this approach resonated with Sidhu's practical experience. The small group format meant Sidhu could discuss real site scenarios and learn how regulations applied to actual building work. The interview preparation gave Sidhu the confidence to articulate his extensive site management experience professionally."
      },
      result: {
        title: "The Result",
        description: "Sidhu passed his Domestic Builder Unlimited registration and launched his own building company. Four years later, he specializes in new homes across northern and western Melbourne's growth corridors. His company has built a reputation for quality construction, modern design, and energy-efficient homes. Sidhu now manages multiple projects simultaneously and has built dozens of homes for Melbourne families. His business continues to grow as word-of-mouth referrals bring new clients. The evening course format allowed him to transition from employee to business owner without financial disruption."
      },
      quote: "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex regulations easy to understand and gave me the confidence to pass my interview. His focus on understanding principles rather than memorizing really helped. Now I'm building new homes across Melbourne's growth corridors under my own company name.",
      icon: Building2
    },
    {
      id: "manny",
      name: "Manny",
      initials: "M",
      gradientFrom: "from-amber-500",
      gradientTo: "to-amber-600",
      headline: "From Licensed to High-Volume Builder",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "5 years ago",
      currentBusiness: "Manny's Building Company",
      revenue: "50+ homes per year",
      before: {
        title: "The Starting Point",
        description: "Manny had years of building experience and wanted to scale up from working for others to running his own high-volume building operation. He had the skills and experience but lacked the formal registration needed to legally operate as a builder. He wanted to build volume residential projects but needed his Domestic Builder Unlimited license to do so."
      },
      challenge: {
        title: "The Challenge",
        description: "Manny found the BPC licensing process intimidating. Despite his extensive practical experience, he wasn't confident about the formal testing and interview process. He'd heard stories of experienced builders failing multiple times and wasn't sure how to prepare effectively. He needed training that would give him confidence and ensure he passed on the first attempt."
      },
      training: {
        title: "The Training",
        description: "Manny enrolled in Qualify Pro's Comprehensive Builder Program seeking thorough preparation. Adrian assessed Manny's knowledge and identified specific areas needing improvement while recognizing his strong practical foundation. The personalized approach meant Manny focused training time on his weak areas rather than covering material he already knew. The small class size (maximum 10 students) provided an environment where Manny could ask questions freely without feeling rushed. The 600+ practice questions prepared Manny thoroughly for the BPC test format, and the interview coaching taught him how to present his experience professionally."
      },
      result: {
        title: "The Result",
        description: "Manny passed his Domestic Builder Unlimited registration first time. Five years later, he leads a high-volume building company completing 50+ homes per year throughout Melbourne. His company has built a strong reputation for quality construction, consistency, and excellent client relationships. Manny has developed efficient systems and processes allowing him to manage multiple projects simultaneously while maintaining quality standards. His success demonstrates how proper licensing preparation combined with business acumen can create a thriving high-volume building operation."
      },
      quote: "Small classes made all the difference. I could ask questions without feeling rushed or stupid, and Adrian always took the time to explain things properly. He identified exactly where I needed to improve and focused on those areas. I passed first time and now I'm running a successful high-volume building company. Worth every dollar.",
      icon: TrendingUp
    },
    {
      id: "ben",
      name: "Ben",
      initials: "B",
      gradientFrom: "from-teal-500",
      gradientTo: "to-teal-600",
      headline: "Renovation Specialist Success",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "3 years ago",
      currentBusiness: "Ben's Renovations",
      revenue: "40+ projects annually",
      before: {
        title: "The Starting Point",
        description: "Ben was an experienced tradie specializing in renovations, particularly kitchen and bathroom projects. He'd been working in the renovation space for years but wanted to run his own renovation business and take on larger projects. However, he'd previously attempted the BPC licensing process independently and failed. The experience left him frustrated and questioning whether he was capable of getting his license."
      },
      challenge: {
        title: "The Challenge",
        description: "Ben's biggest challenge was rebuilding confidence after his previous failed attempt at BPC registration. He wasn't sure what he'd done wrong the first time or how to improve for a second attempt. He was considering giving up on his dream of running his own renovation business. He needed training that would show him exactly where his knowledge gaps were and how to address them effectively."
      },
      training: {
        title: "The Training",
        description: "Ben enrolled in Qualify Pro's program specifically seeking the pass guarantee - knowing he could resit if needed gave him confidence to try again. Adrian identified that Ben's practical renovation knowledge was strong, but he'd struggled with articulating building principles and regulations in the interview. Rather than starting from scratch, Adrian focused on filling specific knowledge gaps and teaching interview techniques. The supportive, patient teaching style helped Ben rebuild his confidence. Mock interviews prepared Ben to discuss his renovation experience professionally and demonstrate his understanding of building regulations."
      },
      result: {
        title: "The Result",
        description: "Ben passed his Domestic Builder Unlimited registration on the first attempt after completing Adrian's program. Today, he runs a thriving renovation business specializing in kitchen and bathroom projects across Melbourne's inner suburbs. His company completes 40+ projects annually with a focus on quality workmanship and client satisfaction. Ben's renovation business has grown through word-of-mouth referrals and positive reviews. His success story demonstrates that previous failures don't determine future outcomes - with proper preparation and support, success is achievable."
      },
      quote: "I failed on my own, but with Adrian's help I passed easily the second time. His teaching style focuses on understanding, not just memorizing answers. He was patient, supportive, and identified exactly what I needed to work on. Now I run my own renovation business doing 40+ projects a year. I'm so glad I didn't give up on my dream.",
      icon: Award
    }
  ];

  const successFactors = [
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Every student received individual attention in classes of maximum 10 people. This personalized approach allowed Adrian to identify and address each student's specific needs."
    },
    {
      icon: Target,
      title: "Identified Knowledge Gaps",
      description: "Rather than generic training, Adrian assessed each student's strengths and weaknesses, focusing on filling specific knowledge gaps rather than teaching everything from scratch."
    },
    {
      icon: CheckCircle2,
      title: "Built on Existing Strengths",
      description: "Adrian recognized what students already knew from practical experience and built confidence by showing them their strengths while systematically improving weak areas."
    },
    {
      icon: Star,
      title: "Understanding Over Memorization",
      description: "Students learned building principles and regulations deeply rather than memorizing answers. This deeper understanding helped them pass interviews and become better builders."
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
              <span className="text-blue-300 text-sm font-medium">95% Success Rate</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Real Tradies,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Real Results
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto">
              95% of our students pass their BPC (formerly VBA) registration. Here are their stories of transformation.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: "500+", label: "Licensed Tradies" },
                { value: "95%", label: "Success Rate" },
                { value: "10+", label: "Years Experience" },
                { value: "$15M+", label: "Student Revenue" },
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
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">95%</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Success Rate
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              95% of students who complete our programs successfully gain their BPC (formerly VBA) registration. 
              Here's what happens after they get licensed:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Gained Registration", description: "Students achieved Domestic Builder Unlimited, DB-L Carpentry, or Commercial licenses", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
              { icon: Briefcase, title: "Started Businesses", description: "Many students launched their own building companies and are now their own bosses", gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50" },
              { icon: TrendingUp, title: "Advanced Careers", description: "Students earn significantly more as licensed builders than unlicensed tradies", gradient: "from-violet-500 to-violet-600", bg: "bg-violet-50" },
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
                  {study.headline}
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-lg text-slate-600">
                  <span className="font-semibold text-blue-600">{study.achievement}</span>
                  <span className="hidden sm:block">•</span>
                  <span>Licensed {study.yearsAgo}</span>
                  <span className="hidden sm:block">•</span>
                  <span>{study.currentBusiness}</span>
                </div>
              </motion.div>

              {/* Avatar and Stats */}
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

                  {/* Quick Stats */}
                  <div className="mt-6 space-y-3">
                    {[
                      { label: "License Type", value: study.achievement },
                      { label: "Current Business", value: study.currentBusiness },
                      { label: "Revenue/Scale", value: study.revenue },
                    ].map((stat, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-sm text-slate-500 mb-1">{stat.label}</div>
                        <div className="font-semibold text-slate-900">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Story Content */}
                <motion.div 
                  className="lg:col-span-2 space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {[
                    { data: study.before, color: "slate", number: 1 },
                    { data: study.challenge, color: "amber", number: 2 },
                    { data: study.training, color: "blue", number: 3 },
                    { data: study.result, color: "emerald", number: 4 },
                  ].map((section, idx) => (
                    <div 
                      key={idx} 
                      className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${
                        section.color === "slate" ? "border-slate-400" :
                        section.color === "amber" ? "border-amber-500" :
                        section.color === "blue" ? "border-blue-600" :
                        "border-emerald-500"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          section.color === "slate" ? "bg-slate-400" :
                          section.color === "amber" ? "bg-amber-500" :
                          section.color === "blue" ? "bg-blue-600" :
                          "bg-emerald-500"
                        }`}>
                          {section.number}
                        </div>
                        {section.data.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{section.data.description}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Quote */}
              <motion.div 
                className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 rounded-2xl shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Quote className="h-12 w-12 text-blue-400 mb-4" />
                <p className="text-white text-lg md:text-xl leading-relaxed mb-6">
                  "{study.quote}"
                </p>
                <div className="text-white">
                  <div className="font-bold text-2xl">— {study.name}</div>
                  <div className="text-slate-400">{study.achievement}</div>
                </div>
              </motion.div>
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
              What These Success Stories{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Have In Common</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Different backgrounds, same outcome - how Adrian's approach helped each one succeed
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
              95% of our students pass and gain registration - because we don't believe in one-size-fits-all training.
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

      {/* Video Testimonials Placeholder */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Video className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Video Testimonials Coming Soon
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We're currently filming video testimonials with our successful students. 
              Check back soon to watch them share their stories in their own words.
            </p>
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
              Join hundreds of Melbourne tradies who have achieved their building registration
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
              <a href="mailto:support@adcopropertyinspectionsmelbourne.com.au" className="flex items-center gap-2 hover:text-white transition-colors">
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
