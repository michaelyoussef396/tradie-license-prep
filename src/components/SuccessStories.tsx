import { Quote, Home, TrendingUp, Wrench, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SuccessStories = () => {
  const stories = [
    {
      name: "Fauzi",
      initials: "F",
      bgGradient: "from-blue-500 to-blue-600",
      licence: "Domestic Builder Unlimited",
      highlight: "$15M+",
      highlightLabel: "Annual Revenue",
      highlightIcon: TrendingUp,
      story: "Now runs a thriving building company specialising in elite homes across Melbourne's most prestigious suburbs.",
      timeframe: "Licensed 5 years ago",
    },
    {
      name: "Jordan",
      initials: "J",
      bgGradient: "from-emerald-500 to-teal-500",
      licence: "Carpentry Licence",
      highlight: "High-End",
      highlightLabel: "Outdoor Living",
      highlightIcon: Building2,
      story: "Launched a successful business focused on premium outdoor spaces, partnering with top suppliers across Melbourne.",
      timeframe: "Licensed 3 years ago",
    },
    {
      name: "Manny",
      initials: "M",
      bgGradient: "from-amber-500 to-orange-500",
      licence: "Domestic Builder",
      highlight: "50+",
      highlightLabel: "Homes Per Year",
      highlightIcon: Home,
      story: "Leads a building company known for quality and consistency, completing major residential projects across Melbourne.",
      timeframe: "Licensed 5 years ago",
    },
    {
      name: "Ben",
      initials: "B",
      bgGradient: "from-violet-500 to-purple-500",
      licence: "Bathroom & Kitchen",
      highlight: "40+",
      highlightLabel: "Projects Annually",
      highlightIcon: Wrench,
      story: "Completes renovation projects throughout Melbourne's inner suburbs with a reputation for exceptional craftsmanship.",
      timeframe: "Licensed 4 years ago",
    },
    {
      name: "Sidhu",
      initials: "S",
      bgGradient: "from-cyan-500 to-blue-500",
      licence: "Domestic Builder",
      highlight: "New Homes",
      highlightLabel: "North & West Melb",
      highlightIcon: Building2,
      story: "Operates a growing company building quality homes across Melbourne's northern and western corridors.",
      timeframe: "Licensed 2 years ago",
    },
  ];

  return (
    <section id="success" className="py-16 sm:py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-4">
            Real Results
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
            <span className="text-white font-semibold">95%</span> of our students gain their registration. Here's what they've achieved.
          </p>
        </motion.div>

        {/* Stories - Bento-style layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {stories.map((story, index) => {
            const HighlightIcon = story.highlightIcon;
            const isLarge = index === 0;
            
            return (
              <motion.div
                key={index}
                className={`group relative ${isLarge ? 'lg:col-span-2 lg:row-span-1' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden ${isLarge ? 'lg:flex lg:items-center lg:gap-8' : ''}`}>
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${story.bgGradient}`} />
                  
                  {/* Quote decoration */}
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-white/5" />
                  
                  {/* Avatar & Badge */}
                  <div className={`${isLarge ? 'lg:flex-shrink-0' : ''} mb-5 lg:mb-0`}>
                    <div className="flex items-center gap-4">
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${story.bgGradient} flex items-center justify-center shadow-lg`}>
                        <span className="text-2xl font-bold text-white">{story.initials}</span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{story.name}</h3>
                        <p className="text-sm text-blue-300">{story.licence}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`${isLarge ? 'lg:flex-1' : ''}`}>
                    {/* Highlight stat */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${story.bgGradient} bg-opacity-20 flex items-center justify-center`}>
                        <HighlightIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white leading-none">{story.highlight}</div>
                        <div className="text-xs text-blue-300/80">{story.highlightLabel}</div>
                      </div>
                    </div>
                    
                    {/* Story */}
                    <p className="text-white/80 leading-relaxed mb-4">
                      "{story.story}"
                    </p>
                    
                    {/* Timeframe */}
                    <span className="inline-block text-xs text-blue-400/60 bg-blue-500/10 px-3 py-1 rounded-full">
                      {story.timeframe}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            to="/success-stories"
            className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-white/10"
          >
            Read Their Full Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
