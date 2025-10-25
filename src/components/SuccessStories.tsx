import { Quote } from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      name: "Fauzi",
      story:
        "Gained Domestic Builder – Unlimited licence 5 years ago. Now runs a thriving building company turning over $15+ million annually, specializing in elite homes across Melbourne's prestigious suburbs.",
    },
    {
      name: "Jordan",
      story:
        "Achieved Carpentry licence and launched a successful business focused on high-end outdoor living spaces. Partners with numerous suppliers delivering premium installations throughout Melbourne.",
    },
    {
      name: "Manny",
      story:
        "Licensed 5 years ago, now leads a high-volume building company completing 50+ homes per year. Known for quality, consistency, and strong client relationships.",
    },
  ];

  return (
    <section id="success" className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-blue-200">
            95% of our students pass and gain registration
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-6">
                {story.story}
              </p>
              <div className="text-xl font-bold text-white">— {story.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
