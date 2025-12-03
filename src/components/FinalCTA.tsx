import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, ArrowRight, CheckCircle2, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FinalCTA = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling will be added later
    console.log("Form submitted");
  };

  const benefits = [
    { icon: CheckCircle2, text: "Free consultation - no obligation" },
    { icon: Clock, text: "Response within 24 hours" },
    { icon: Shield, text: "95% success rate" },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-900" />
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-full text-sm font-medium mb-6">
              Get Started Today
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Get Your<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Building License?
              </span>
            </h2>
            
            <p className="text-lg text-blue-100/80 mb-8 leading-relaxed">
              Book a free consultation to discuss your experience, goals, and the best path to your BPC registration.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-white/80">{benefit.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Contact */}
            <div className="space-y-4">
              <p className="text-sm text-blue-300/60 uppercase tracking-wider font-medium">
                Or contact us directly
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:0411626398"
                  className="group inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60">Call us</div>
                    <div className="text-white font-semibold">0411 626 398</div>
                  </div>
                </a>
                <a
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="group inline-flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-300/60">Email us</div>
                    <div className="text-white font-semibold">Send a message</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Book Your Free Consultation
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  Fill in the form and we'll be in touch within 24 hours
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        required
                        className="w-full h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        required
                        className="w-full h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="w-full h-12 text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      License Type *
                    </label>
                    <Select>
                      <SelectTrigger className="w-full h-12 text-base border-gray-200">
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="builder-unlimited">Domestic Builder Unlimited</SelectItem>
                        <SelectItem value="carpentry">Carpentry (DB-L)</SelectItem>
                        <SelectItem value="commercial">Commercial Building (Low-Rise)</SelectItem>
                        <SelectItem value="waterproofing">Waterproofing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Tell us about your experience
                    </label>
                    <Textarea
                      placeholder="How many years have you been in the trade? What help do you need?"
                      rows={3}
                      className="w-full text-base border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold shadow-lg shadow-blue-500/25 group"
                  >
                    Book Free Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <p className="text-xs text-gray-400 text-center">
                    No obligation • No spam • Just helpful advice
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
