import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Quote, Building2, TrendingUp, Award } from "lucide-react";

const SuccessStoriesPage = () => {
  const stories = [
    {
      name: "Fauzi",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "5 years ago",
      story:
        "Fauzi came to Adrian with solid carpentry experience but needed help navigating the VBA licensing process for unlimited domestic building. Through the Comprehensive Builder Program, he not only passed his registration but gained the confidence and knowledge to start his own building company.",
      outcome:
        "Today, Fauzi runs a thriving building company turning over $15+ million annually, specializing in elite homes across Melbourne's prestigious suburbs including Toorak, Brighton, and Armadale. His company has built a reputation for quality craftsmanship and attention to detail.",
      icon: Building2,
    },
    {
      name: "Jordan",
      achievement: "Carpentry License (DB-L)",
      yearsAgo: "3 years ago",
      story:
        "Jordan was an experienced carpenter looking to formalize his skills with proper licensing. He enrolled in the Carpentry License course and appreciated Adrian's practical, no-nonsense approach to teaching. The personalized attention in small classes helped him identify and strengthen weak areas in his technical knowledge.",
      outcome:
        "After gaining his license, Jordan launched a successful business focused on high-end outdoor living spaces. He now partners with numerous suppliers and builders throughout Melbourne, delivering premium pergolas, decks, and outdoor structures. His business has grown steadily year-on-year.",
      icon: Award,
    },
    {
      name: "Sidhu",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "4 years ago",
      story:
        "Sidhu had been working as a site supervisor for years but wanted to take the next step and become a registered builder. He chose the Evening Builder Course so he could continue working while studying. Adrian's teaching style - focusing on understanding principles rather than just memorizing - was exactly what Sidhu needed.",
      outcome:
        "Sidhu now runs a successful building company specializing in new homes across northern and western Melbourne. His company builds quality homes for families, with a focus on modern design and energy efficiency. He credits Adrian's training with giving him the confidence to start his own business.",
      icon: Building2,
    },
    {
      name: "Manny",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "5 years ago",
      story:
        "Manny had years of experience in construction but found the VBA licensing process intimidating. Through Adrian's Comprehensive Builder Program, he received personalized support that addressed his specific knowledge gaps. The small class size meant he could ask questions freely without feeling rushed.",
      outcome:
        "Licensed 5 years ago, Manny now leads a high-volume building company completing 50+ homes per year. His company has built a strong reputation in Melbourne's growth corridors for delivering quality homes on time and on budget. He's known for his excellent client relationships and attention to detail.",
      icon: TrendingUp,
    },
    {
      name: "Ben",
      achievement: "Domestic Builder – Unlimited",
      yearsAgo: "3 years ago",
      story:
        "Ben came to Adrian after a failed attempt at the VBA licensing process on his own. He was frustrated and considering giving up on his dream of becoming a registered builder. Adrian's pass guarantee and supportive teaching style gave him the confidence to try again, this time with proper preparation.",
      outcome:
        "Ben passed his registration on the first attempt after completing Adrian's program. Today, he runs a thriving renovation business completing 40+ projects annually, specializing in kitchen and bathroom renovations across Melbourne's inner suburbs. He's grateful for Adrian's patience and effective teaching methods.",
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-blue-100">
              Real tradies, real results. See how Adrian's training has helped 
              Melbourne tradies achieve their building registration and grow successful businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Licensed Tradies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => {
              const Icon = story.icon;
              return (
                <div
                  key={index}
                  className="bg-blue-50 rounded-2xl p-8 md:p-12 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {story.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {story.achievement}
                      </p>
                      <p className="text-sm text-gray-600">
                        Licensed {story.yearsAgo}
                      </p>
                    </div>
                  </div>

                  {/* Story */}
                  <div className="mb-6">
                    <Quote className="h-8 w-8 text-blue-300 mb-3" />
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">
                      {story.story}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Where They Are Now
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {story.outcome}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-4">
                "Adrian is patient and makes everything easy to understand. 
                He personalizes his teaching for each student and really takes 
                the time to help you. I passed first time thanks to his training."
              </p>
              <div className="text-lg font-bold text-white">— Jordan</div>
            </div>
            <div className="glass-card p-8 rounded-xl">
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-4">
                "Small classes made all the difference. I could ask questions 
                without feeling rushed, and Adrian identified exactly where I 
                needed to improve. Worth every dollar."
              </p>
              <div className="text-lg font-bold text-white">— Manny</div>
            </div>
            <div className="glass-card p-8 rounded-xl">
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-4">
                "I failed on my own, but with Adrian's help I passed easily. 
                His teaching style focuses on understanding, not just memorizing. 
                Highly recommend."
              </p>
              <div className="text-lg font-bold text-white">— Ben</div>
            </div>
            <div className="glass-card p-8 rounded-xl">
              <Quote className="h-10 w-10 text-blue-300 mb-4" />
              <p className="text-white/90 leading-relaxed mb-4">
                "The evening course was perfect for me - I could work during 
                the day and study at night. Adrian's program gave me everything 
                I needed to pass."
              </p>
              <div className="text-lg font-bold text-white">— Sidhu</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of Melbourne tradies who have achieved their building 
            registration with Adrian's help
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Book Free Consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
