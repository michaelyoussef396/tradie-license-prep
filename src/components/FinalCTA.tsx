import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";
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

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Get Your Building License?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 leading-relaxed">
            Contact Adrian today for a free consultation
          </p>
        </motion.div>

        {/* Quick Contact Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-lg sm:max-w-none mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 sm:hover:scale-105 transition-transform text-base sm:text-lg px-8 sm:px-10 min-h-[48px]"
            asChild
          >
            <a href="tel:0411626398">
              <Phone className="mr-2 h-5 w-5" />
              Call Now: 0411 626 398
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 sm:hover:scale-105 transition-transform text-base sm:text-lg px-8 sm:px-10 min-h-[48px]"
            asChild
          >
            <a href="mailto:support@adcopropertyinspectionsmelbourne.com.au">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
          </Button>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-white rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            Or Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="w-full min-h-[44px] text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <Input
                  type="tel"
                  placeholder="Your phone number"
                  required
                  className="w-full min-h-[44px] text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full min-h-[44px] text-base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Type *
                </label>
                <Select>
                  <SelectTrigger className="w-full min-h-[44px] text-base">
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="builder-unlimited">
                      Domestic Builder Unlimited
                    </SelectItem>
                    <SelectItem value="carpentry">Carpentry (DB-L)</SelectItem>
                    <SelectItem value="commercial">
                      Commercial Building
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your experience and what you need help with..."
                rows={4}
                className="w-full text-base"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base sm:text-lg min-h-[48px]"
            >
              Book Free Consultation
            </Button>

            <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
              We'll get back to you within 24 hours
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
