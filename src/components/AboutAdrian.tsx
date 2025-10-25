import { Award, Building2, Hammer, GraduationCap } from "lucide-react";

const AboutAdrian = () => {
  const credentials = [
    {
      icon: Building2,
      title: "Building Practitioner",
      subtitle: "Unlimited",
    },
    {
      icon: Award,
      title: "Commercial License",
      subtitle: "Low-Rise",
    },
    {
      icon: Hammer,
      title: "Qualified Carpenter",
      subtitle: "Trade Certified",
    },
    {
      icon: GraduationCap,
      title: "10+ Years Training",
      subtitle: "Proven Expertise",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="lg:col-span-2">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <Building2 className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Adrian Nicolazzo</p>
                <p className="text-sm text-gray-500">Photo Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Learn From Someone Who's Been On The Tools
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
              <p>
                Adrian is a Registered Building Practitioner (Unlimited) and
                Commercial License holder (Low-Rise) with a unique perspective -
                he's worked in every position from carpenter to site manager to
                builder.
              </p>
              <p>
                With 10+ years of training experience, Adrian has helped
                hundreds of tradies successfully navigate the VBA licensing
                process. His approach isn't about memorizing answers - it's
                about understanding the building principles that will make you a
                better builder.
              </p>
              <p>
                Having worked across industrial, commercial, and residential
                projects, Adrian brings real-world experience to every training
                session. He knows what the VBA is looking for because he's been
                through it himself.
              </p>
            </div>

            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={index}
                    className="bg-blue-50 p-4 rounded-lg flex items-center gap-3"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {cred.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {cred.subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdrian;
