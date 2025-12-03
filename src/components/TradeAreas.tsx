import {
  Building2,
  Hammer,
  Factory,
  Droplets,
  Blocks,
  SquareStack,
  ChefHat,
  PanelTop,
  TreeDeciduous,
  Warehouse,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface TradeArea {
  icon: LucideIcon;
  name: string;
  popular?: boolean;
}

const TradeAreas = () => {
  const tradeAreas: TradeArea[] = [
    { icon: Building2, name: "Domestic Builder Unlimited", popular: true },
    { icon: Hammer, name: "Carpentry (DB-L)", popular: true },
    { icon: Factory, name: "Commercial Building (Low-Rise)" },
    { icon: Droplets, name: "Waterproofing" },
    { icon: Blocks, name: "Bricklaying & Blocklaying" },
    { icon: SquareStack, name: "Cabinet Making & Joinery" },
    { icon: ChefHat, name: "Kitchen & Bathroom Renovations" },
    { icon: PanelTop, name: "Door & Window Replacement" },
    { icon: TreeDeciduous, name: "External Fixtures (Pergolas, Decks)" },
    { icon: Warehouse, name: "Sheds & Non-Habitable Structures" },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5l5 4-5 3zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H24v-2zm0 4h20v2H24v-2zm0 4h20v2H24v-2zm0 4h20v2H24v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      
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
            Registration Types
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Trade Areas We Cover
          </h2>
          <p className="text-lg text-blue-200/70 max-w-2xl mx-auto">
            Find your trade below - if you don't see it, get in touch. We may still be able to help.
          </p>
        </motion.div>

        {/* Trade Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {tradeAreas.map((trade, index) => {
            const Icon = trade.icon;
            
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 h-full
                  ${trade.popular 
                    ? 'border-blue-400/40 hover:border-blue-400/70 hover:bg-blue-500/10' 
                    : 'border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  {/* Popular badge */}
                  {trade.popular && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110
                    ${trade.popular 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30' 
                      : 'bg-white/10 group-hover:bg-white/20'
                    }`}
                  >
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300
                      ${trade.popular ? 'text-white' : 'text-blue-400 group-hover:text-blue-300'}`} 
                    />
                  </div>
                  
                  {/* Trade name */}
                  <p className={`text-sm font-medium leading-tight transition-colors duration-300
                    ${trade.popular ? 'text-white' : 'text-white/80 group-hover:text-white'}`}
                  >
                    {trade.name}
                  </p>
                  
                  {/* Popular label */}
                  {trade.popular && (
                    <span className="inline-block mt-2 text-xs text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div 
          className="text-center mt-10 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-blue-300/60 text-sm">
            Don't see your trade? <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              Contact us
            </button> — we may still be able to assist.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TradeAreas;
