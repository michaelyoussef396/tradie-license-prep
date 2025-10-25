import { Trophy, Award, Users, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const TrustBar = () => {
  const stats = [
    {
      icon: Trophy,
      stat: "95%",
      description: "Success Rate",
    },
    {
      icon: Award,
      stat: "10+",
      description: "Years Experience",
    },
    {
      icon: Users,
      stat: "Max 10",
      description: "Students Per Class",
    },
    {
      icon: MapPin,
      stat: "Melbourne",
      description: "Based Face-to-Face",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="bg-blue-50 p-8 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
