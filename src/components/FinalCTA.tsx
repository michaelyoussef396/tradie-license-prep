import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail } from "lucide-react";
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
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Your Building License?
          </h2>
          <p className="text-xl text-blue-100">
            Contact Adrian today for a free consultation
          </p>
        </div>

        {/* Quick Contact Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-105 transition-transform text-lg px-10"
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
            className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-transform text-lg px-10"
            asChild
          >
            <a href="mailto:support@adcopropertyinspectionsmelbourne.com.au">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
          </Button>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Or Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  required
                  className="w-full"
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
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Type *
                </label>
                <Select>
                  <SelectTrigger className="w-full">
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
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg"
            >
              Book Free Consultation
            </Button>

            <p className="text-sm text-gray-500 text-center">
              We'll get back to you within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
