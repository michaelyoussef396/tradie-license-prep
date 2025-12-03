import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
  Clock,
  MapPin,
  ShieldCheck
} from "lucide-react";

const About = () => {
  const credentials = [
    {
      icon: Building2,
      title: "Registered Building Practitioner (Unlimited)",
      description: "Full domestic building registration covering all residential construction work with no project value limits. This is the highest level of building registration in Victoria, allowing Adrian to legally supervise and sign off on any domestic building project regardless of size or complexity."
    },
    {
      icon: Award,
      title: "Commercial License (Low-Rise)",
      description: "Qualified to supervise low-rise commercial building projects. This license covers commercial construction up to three storeys, including offices, retail spaces, warehouses, and mixed-use developments. Demonstrates expertise beyond residential building."
    },
    {
      icon: Hammer,
      title: "Qualified Carpenter",
      description: "Started as a qualified carpenter with years of hands-on experience on the tools. This trade foundation gives Adrian deep practical knowledge of construction techniques, building methods, and the real challenges tradies face on site every day."
    },
    {
      icon: GraduationCap,
      title: "10+ Years Training Experience",
      description: "Over a decade helping Melbourne tradies achieve their building registration. Has trained hundreds of students with a 95% success rate. Continuously updates training methods based on current BPC (formerly VBA) requirements and student feedback."
    },
  ];

  const timeline = [
    {
      year: "Early Career",
      title: "Qualified Carpenter",
      description: "Started career as a qualified carpenter, working on the tools across various residential and commercial projects. Learned construction from the ground up, gaining hands-on experience in all aspects of carpentry and building work.",
      icon: Hammer
    },
    {
      year: "Career Growth",
      title: "Site Manager & Supervisor",
      description: "Progressed to site management roles, coordinating teams, managing projects, and ensuring compliance across industrial, commercial, and residential sites. Developed expertise in project planning, quality control, and building regulations.",
      icon: Users
    },
    {
      year: "Achievement",
      title: "Registered Builder",
      description: "Achieved Registered Building Practitioner (Unlimited) and Commercial (Low-Rise) licenses. Understands firsthand the challenges of the BPC licensing process because he navigated it himself. This experience informs his teaching approach.",
      icon: Award
    },
    {
      year: "10+ Years",
      title: "Professional Trainer",
      description: "Dedicated career to helping other tradies achieve their building registration. Has refined teaching methods over years of experience, focusing on personalized attention and addressing individual knowledge gaps. 95% success rate proves effectiveness.",
      icon: GraduationCap
    }
  ];

  const teachingApproach = [
    {
      icon: Users,
      title: "Small Class Sizes (5-10 Max)",
      description: "Unlike large training organizations cramming 30+ students into a room, Adrian keeps classes deliberately small. This means every student gets individual attention, can ask questions freely, and receives personalized coaching. You're not just a number - Adrian knows your name, your background, and your specific challenges."
    },
    {
      icon: Target,
      title: "Identify Your Knowledge Gaps",
      description: "Every tradie comes in with different experience and strengths. Adrian starts by assessing what you know and what you need to learn. Rather than teaching everyone the same generic content, he identifies your specific weak areas and focuses training there. This targeted approach is far more effective than one-size-fits-all courses."
    },
    {
      icon: BookOpen,
      title: "Fill Gaps, Build on Strengths",
      description: "Once gaps are identified, Adrian creates a personalized learning path. If you're strong in practical building but weak in regulations, that's where he focuses. If your technical knowledge is solid but test-taking is a challenge, he works on that. Everyone learns differently - his teaching reflects that reality."
    },
    {
      icon: TrendingUp,
      title: "Improve Specific Weaknesses",
      description: "Whether it's understanding Australian Standards, mastering BPC regulations, or building confidence for the interview, Adrian addresses specific weaknesses head-on. Students aren't left wondering what they don't know - he makes it clear and provides targeted training to improve those exact areas."
    },
    {
      icon: Star,
      title: "Show You Your Strengths",
      description: "Many experienced tradies underestimate their own knowledge. Adrian helps students recognize and build confidence in what they already know. This confidence is crucial for BPC interviews. When you know your strengths, you can speak with authority about your experience and capabilities."
    },
    {
      icon: CheckCircle2,
      title: "Understanding, Not Memorization",
      description: "Adrian doesn't believe in memorizing answers to pass a test. He teaches underlying building principles and regulations so students truly understand the 'why' behind the rules. This deeper understanding not only helps pass the BPC process but makes you a genuinely better builder."
    }
  ];

  const testimonials = [
    {
      quote: "Adrian is patient and makes everything easy to understand. He doesn't rush through material - he makes sure everyone gets it before moving on. His teaching style is clear and practical.",
      author: "Jordan",
      achievement: "DB-L Carpentry License"
    },
    {
      quote: "What I appreciated most was how Adrian personalized his teaching. He identified where I was weak and spent extra time helping me improve those areas. I felt like he genuinely cared about my success.",
      author: "Sidhu",
      achievement: "Domestic Builder - Unlimited"
    },
    {
      quote: "Small class sizes made all the difference. I could ask questions without feeling stupid, and Adrian always took the time to explain things properly. Worth every dollar.",
      author: "Manny",
      achievement: "Domestic Builder - Unlimited"
    },
    {
      quote: "I failed the BPC process on my own, but with Adrian's help I passed easily the second time. His teaching focuses on understanding the principles, not just memorizing answers. That's what made the difference.",
      author: "Ben",
      achievement: "Domestic Builder - Unlimited"
    },
    {
      quote: "Adrian has been on the tools, been a site manager, and been a builder. He understands the practical side of building, not just theory. That real-world experience shows in his teaching.",
      author: "Fauzi",
      achievement: "Domestic Builder - Unlimited"
    },
    {
      quote: "The evening course was perfect for me - I could work during the day and study at night. Adrian made complex regulations easy to understand and gave me the confidence to pass my interview.",
      author: "Marco",
      achievement: "Domestic Builder - Unlimited"
    },
    {
      quote: "I've taken other courses before and this was completely different. Adrian tailors his teaching to each student's needs instead of using a cookie-cutter approach. That personalization is why his success rate is so high.",
      author: "Nick",
      achievement: "DB-L Carpentry License"
    },
    {
      quote: "What impressed me was Adrian's commitment to making sure we passed. He didn't just run through the material - he checked our understanding, identified weak points, and made sure we were truly ready before attempting registration.",
      author: "Tom",
      achievement: "Domestic Builder - Unlimited"
    }
  ];

  const stats = [
    { number: "95%", label: "Success Rate", description: "Students who pass and gain registration" },
    { number: "10+", label: "Years Experience", description: "Training tradies for licensing" },
    { number: "500+", label: "Students Trained", description: "Tradies helped achieve registration" },
    { number: "5-10", label: "Max Class Size", description: "Personal attention guaranteed" },
    { number: "100%", label: "Face-to-Face", description: "Melbourne-based in-person training" },
    { number: "3", label: "License Types", description: "Unlimited, DB-L, Commercial covered" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/5] bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white/20">
                <div className="text-center p-8">
                  <Building2 className="h-32 w-32 text-white mx-auto mb-6" />
                  <p className="text-white font-semibold text-xl">Adrian Nicolazzo</p>
                  <p className="text-blue-200">Professional Photo Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Learn From Someone Who's Been On The Tools
              </h1>
              <div className="space-y-3 text-lg text-blue-100">
                <p className="flex items-center gap-3">
                  <Award className="h-6 w-6 flex-shrink-0" />
                  <span>Registered Building Practitioner (Unlimited)</span>
                </p>
                <p className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 flex-shrink-0" />
                  <span>Commercial License (Low-Rise)</span>
                </p>
                <p className="flex items-center gap-3">
                  <GraduationCap className="h-6 w-6 flex-shrink-0" />
                  <span>10+ Years Training Melbourne Tradies</span>
                </p>
                <p className="flex items-center gap-3">
                  <Users className="h-6 w-6 flex-shrink-0" />
                  <span>500+ Students Successfully Licensed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Biography */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Adrian's Story
          </h2>
          
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              Adrian didn't start as a trainer - he started as a carpenter, working on the tools like every 
              other tradie trying to make a living. He knows what it's like to be covered in sawdust at the 
              end of a long day, to deal with difficult site conditions, and to work for someone else's building 
              company while dreaming of running your own.
            </p>

            <p>
              After years working as a qualified carpenter on residential and commercial projects across Melbourne, 
              Adrian progressed into site management roles. He coordinated teams, managed projects from start to 
              finish, and gained deep knowledge of building regulations, compliance requirements, and quality 
              standards. But more importantly, he learned how buildings actually come together - not just the 
              theory from textbooks, but the practical reality of making it work on site.
            </p>

            <p>
              The turning point came when Adrian decided to get his building registration. Like many tradies, 
              he found the BPC licensing process confusing and intimidating. There was so much information to 
              absorb - building codes, Australian Standards, regulations, business knowledge - and not much 
              guidance on how to prepare properly. He passed his registration through determination and hard 
              work, eventually achieving both Domestic Builder (Unlimited) and Commercial (Low-Rise) licenses.
            </p>

            <p>
              After gaining his licenses, Adrian started noticing a pattern. Many experienced tradies with solid 
              practical skills were struggling with the registration process. Some failed multiple times not 
              because they lacked ability, but because they didn't know how to prepare effectively or what 
              BPC was really looking for. Others gave up entirely, convinced they "weren't smart enough" - which 
              was never true.
            </p>

            <p>
              That's when Adrian decided to start training. He knew he could help tradies navigate the licensing 
              process because he'd been through it himself. He understood the challenges, the confusing parts, 
              and what made the difference between passing and failing. More than that, he believed experienced 
              tradies deserved to have their own building businesses, not spend their whole careers making 
              someone else rich.
            </p>

            <p>
              Over 10+ years and 500+ students later, Adrian has refined his teaching approach into something 
              uniquely effective: small classes, personalized attention, and a focus on understanding principles 
              rather than memorizing answers. His 95% success rate isn't accidental - it's the result of genuinely 
              caring about student success and refusing to take shortcuts in training. When you train with Adrian, 
              you're learning from someone who's been in your position and knows exactly how to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Qualifications & Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((cred, index) => {
              const Icon = cred.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {cred.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {cred.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Career Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative flex gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center relative z-10">
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-blue-50 p-6 rounded-xl">
                      <div className="text-sm font-semibold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How I Teach Differently
            </h2>
            <p className="text-xl text-blue-200">
              It's not about cramming information - it's about understanding what you need to learn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachingApproach.map((approach, index) => {
              const Icon = approach.icon;
              return (
                <div
                  key={index}
                  className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">
                    {approach.title}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="h-8 w-8 text-blue-300 mb-3" />
                <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-blue-600">{testimonial.achievement}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By The Numbers */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            By The Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-blue-50 p-6 rounded-xl text-center hover:bg-blue-100 transition-colors duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Involvement */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Industry Involvement & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Current BPC Knowledge
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Adrian stays up-to-date with BPC regulation changes, new Australian Standards, 
                    and updated building codes. His training materials are continuously revised to reflect 
                    current requirements, ensuring students are prepared for today's licensing process.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ongoing Education
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Maintains current building practitioner registration requiring ongoing professional 
                    development. Regularly attends industry updates and training to ensure teaching reflects 
                    best practices and current building standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Industry Connections
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Strong network within Melbourne's building industry. Maintains relationships with other 
                    registered builders, suppliers, and industry professionals. This network benefits students 
                    through insights and connections.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Melbourne-Based
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Located in Melbourne with deep knowledge of Victorian building regulations. Understands 
                    local building market, council requirements, and Melbourne-specific construction challenges. 
                    Face-to-face training only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Learn From Adrian?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of Melbourne tradies who have achieved their building registration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto" 
                size="lg"
                asChild
              >
                <Link to="/courses">View Training Programs</Link>
              </Button>
              <Button 
                className="bg-blue-800 text-white hover:bg-blue-900 text-lg px-8 py-6 h-auto border-2 border-white" 
                size="lg"
                asChild
              >
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
