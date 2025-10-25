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
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trade Areas We Cover
          </h2>
        </div>

        {/* Trade Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tradeAreas.map((trade, index) => {
            const Icon = trade.icon;
            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  {trade.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TradeAreas;
