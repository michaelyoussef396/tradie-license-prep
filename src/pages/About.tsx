import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Award, 
  Building2, 
  Hammer, 
  GraduationCap, 
  Users, 
  Target, 
  BookOpen,
  TrendingUp,
  Star,
  CheckCircle2,
  Quote,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Phone
} from "lucide-react";
import trainingImage from "@/assets/about-training-materials.jpg";

const About = () => {
  const credentials = [
    {
      icon: Building2,
      title: "Registered Building Practitioner (Unlimited)",
      description: "Full domestic building registration covering all residential construction work with no project value limits."
    },
    {
      icon: Award,
      title: "Commercial License (Low-Rise)",
      description: "Qualified to supervise low-rise commercial building projects up to three storeys."
    },
    {
      icon: Hammer,
      title: "Qualified Carpenter",
      description: "Started as a qualified carpenter with years of hands-on experience on the tools."
    },
    {
      icon: GraduationCap,
      title: "10+ Years Training Experience",
      description: "Over a decade helping Melbourne tradies achieve their building registration with a 95% success rate."
    },
  ];

  const journey = [
    { role: "Carpenter", description: "Started on the tools" },
    { role: "Site Manager", description: "Ran job sites" },
    { role: "Builder", description: "Full project delivery" },
    { role: "Trainer", description: "Helping tradies succeed" },
  ];

  const teachingApproach = [
    {
      icon: Users,
      title: "Small Class Sizes (5-10 Max)",
      description: "Every student gets individual attention. You're not just a number - Adrian knows your name and your specific challenges."
    },
    {
      icon: Target,
      title: "Identify Your Knowledge Gaps",
      description: "Rather than teaching everyone the same generic content, he identifies your specific weak areas and focuses training there."
    },
    {
      icon: BookOpen,
      title: "Fill Gaps, Build on Strengths",
      description: "Once gaps are identified, Adrian creates a personalized learning path based on your specific needs."
    },
    {
      icon: TrendingUp,
      title: "Improve Specific Weaknesses",
      description: "Whether it's understanding Australian Standards or building interview confidence, Adrian addresses weaknesses head-on."
    },
    {
      icon: Star,
      title: "Show You Your Strengths",
      description: "Many experienced tradies underestimate their own knowledge. Adrian helps build confidence in what you already know."
    },
    {
      icon: CheckCircle2,
      title: "Understanding, Not Memorization",
      description: "He teaches underlying building principles so students truly understand the 'why' behind the rules."
    }
  ];

  const testimonials = [
    {
      quote: "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on.",
      author: "Jordan",
      achievement: "DB-L Carpentry License",
      initials: "J",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      quote: "What I appreciated most was how Adrian personalized his teaching. He identified where I was weak and spent extra time helping me improve those areas.",
      author: "Manny",
      achievement: "Domestic Builder - Unlimited",
      initials: "M",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      quote: "Small class sizes made all the difference. I could ask questions without feeling stupid, and Adrian always took the time to explain things properly.",
      author: "Ben",
      achievement: "Bathroom & Kitchen License",
      initials: "B",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      quote: "Adrian has been on the tools, been a site manager, and been a builder. He understands the practical side of building, not just theory.",
      author: "Fauzi",
      achievement: "Domestic Builder - Unlimited",
      initials: "F",
      gradient: "from-blue-500 to-blue-600"
    },
  ];

  const stats = [
    { number: "95%", label: "Success Rate" },
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Students Trained" },
    { number: "5-10", label: "Max Class Size" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-6">
              Meet Your Trainer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Learn From Someone Who's<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Been On The Tools
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-8">
              Adrian Nicolazzo isn't your typical trainer. Before he started helping tradies get their licences, 
              he spent years doing the work himself.
            </p>
            
            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-blue-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adrian's Story with Image */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl blur-xl" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src={trainingImage} 
                    alt="Training materials and building plans at Qualify Pro" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Overlay badge */}
                <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-4 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm text-blue-300">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Adrian's Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                From Carpenter to Trainer
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Adrian didn't start as a trainer - he started as a carpenter, working on the tools like every 
                  other tradie. He knows what it's like to be covered in sawdust at the end of a long day.
                </p>
                <p>
                  After years working on residential and commercial projects across Melbourne, Adrian progressed 
                  into site management roles, gaining deep knowledge of building regulations and compliance.
                </p>
                <p>
                  When he went through the BPC licensing process himself, he found it confusing and intimidating. 
                  That experience drives his teaching today - helping tradies navigate what he once struggled with.
                </p>
              </div>

              {/* Journey Pills */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">The Journey</p>
                <div className="flex flex-wrap gap-2">
                  {journey.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                        {item.role}
                      </span>
                      {index < journey.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-gray-300 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Qualifications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Credentials & Experience
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((cred, index) => {
              const Icon = cred.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cred.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{cred.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-4">
              Teaching Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How I Teach Differently
            </h2>
            <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
              It's not about cramming information - it's about understanding what you need to learn
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachingApproach.map((approach, index) => {
              const Icon = approach.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{approach.title}</h3>
                  <p className="text-white/70 leading-relaxed">{approach.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Student Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Students Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Quote className="h-8 w-8 text-blue-200 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center`}>
                    <span className="text-lg font-bold text-white">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-blue-600">{testimonial.achievement}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Industry Knowledge
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Staying Current
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: ShieldCheck, title: "Current BPC Knowledge", description: "Training materials continuously revised to reflect current BPC requirements and regulation changes." },
              { icon: BookOpen, title: "Ongoing Education", description: "Maintains current building practitioner registration requiring ongoing professional development." },
              { icon: Users, title: "Industry Connections", description: "Strong network within Melbourne's building industry with relationships across suppliers and professionals." },
              { icon: MapPin, title: "Melbourne-Based", description: "Deep knowledge of Victorian building regulations and Melbourne-specific construction requirements." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Learn From Adrian?
            </h2>
            <p className="text-xl text-blue-200/80 mb-8">
              Join hundreds of Melbourne tradies who have achieved their building registration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-slate-900 hover:bg-blue-50 text-lg px-8 py-6 h-auto rounded-xl shadow-lg group" 
                size="lg"
                asChild
              >
                <Link to="/courses" className="flex items-center gap-2">
                  View Training Programs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 h-auto rounded-xl group" 
                size="lg"
                asChild
              >
                <a href="tel:0411626398" className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call 0411 626 398
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
