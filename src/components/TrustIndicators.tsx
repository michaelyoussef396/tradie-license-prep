import { Award, Users, Star, MapPin } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    {
      icon: Star,
      title: "95% Success Rate",
      description: "Industry-leading results",
    },
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Proven training expertise",
    },
    {
      icon: Users,
      title: "Small Classes (5-10 Max)",
      description: "Personalized attention",
    },
    {
      icon: MapPin,
      title: "Melbourne-Based",
      description: "Local VBA knowledge",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {indicators.map((indicator, index) => {
            const Icon = indicator.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {indicator.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {indicator.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
