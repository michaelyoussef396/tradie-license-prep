import {
  Building2,
  Hammer,
  Factory,
  Droplet,
  Box,
  Wrench,
  Bath,
  DoorOpen,
  Fence,
  Warehouse,
} from "lucide-react";
import { motion } from "framer-motion";

const TradeAreas = () => {
  const tradeAreas = [
    { icon: Building2, name: "Domestic Builder Unlimited" },
    { icon: Hammer, name: "Carpentry (DB-L)" },
    { icon: Factory, name: "Commercial Building" },
    { icon: Droplet, name: "Waterproofing" },
    { icon: Box, name: "Bricklaying" },
    { icon: Wrench, name: "Cabinet Making" },
    { icon: Bath, name: "Kitchen & Bath Renovations" },
    { icon: DoorOpen, name: "Door & Window" },
    { icon: Fence, name: "Pergolas & Decks" },
    { icon: Warehouse, name: "Sheds & Structures" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trade Areas We Cover
          </h2>
        </motion.div>

        {/* Trade Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {tradeAreas.map((trade, index) => {
            const Icon = trade.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-900 leading-tight">
                  {trade.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TradeAreas;
