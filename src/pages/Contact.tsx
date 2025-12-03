import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle2,
  Award,
  Users,
  Shield,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    licenseType: "",
    experience: "",
    message: ""
  });

  // Form validation schema
  const contactSchema = z.object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
    phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
    email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
    licenseType: z.string().min(1, "Please select a license type"),
    experience: z.string().min(1, "Please select your experience level"),
    message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Here you would normally send to a backend API
      // For now, we'll simulate success
      console.log("Form submitted:", validatedData);

      // Show success message
      toast({
        title: "Consultation Request Received!",
        description: "We'll contact you within 24 hours to schedule your free consultation.",
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        licenseType: "",
        experience: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show validation errors
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or call us directly.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextSteps = [
    {
      step: "1",
      icon: MessageSquare,
      title: "Book Your Free Consultation",
      description: "We'll discuss your trade experience, which license you're seeking, and answer any questions you have"
    },
    {
      step: "2",
      icon: Users,
      title: "Choose Your Program",
      description: "We'll recommend the best training program based on your schedule, goals, and current experience level"
    },
    {
      step: "3",
      icon: CheckCircle2,
      title: "Start Your Training",
      description: "Begin your personalized journey to BPC (formerly VBA) registration with small classes and expert guidance"
    }
  ];

  const faqItems = [
    {
      question: "What will we discuss?",
      answer: "We'll talk about your trade experience, which license you're seeking, your timeline, and which of our programs would be the best fit for your situation."
    },
    {
      question: "How long is the consultation?",
      answer: "Usually 15-20 minutes. Long enough to understand your needs and answer your questions, but short enough to fit into your busy schedule."
    },
    {
      question: "Is it really free?",
      answer: "Yes, completely free with no obligation. We want to make sure our programs are right for you before you commit."
    },
    {
      question: "What should I have ready?",
      answer: "Just details of your trade experience, which license you're aiming for, and any questions you have about the registration process."
    },
    {
      question: "Can I start training right away?",
      answer: "If you meet the entry requirements and a course is starting soon, yes! Otherwise, we'll schedule you for the next available class."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Get You Licensed
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              Book your free consultation. We'll discuss your experience, goals, 
              and the best program for you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Form and Contact Details */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-blue-50 p-8 md:p-10 rounded-2xl border-2 border-blue-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Book Your Free Consultation
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-gray-900 font-semibold mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Smith"
                      required
                      className="h-12 bg-white border-gray-300"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-gray-900 font-semibold mb-2">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="0411 626 398"
                      required
                      className="h-12 bg-white border-gray-300"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-semibold mb-2">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john.smith@email.com"
                      required
                      className="h-12 bg-white border-gray-300"
                    />
                  </div>

                  {/* License Type */}
                  <div>
                    <Label htmlFor="licenseType" className="text-gray-900 font-semibold mb-2">
                      License Type You're Seeking *
                    </Label>
                    <Select 
                      value={formData.licenseType} 
                      onValueChange={(value) => handleInputChange("licenseType", value)}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white border-gray-300">
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="unlimited">Domestic Builder - Unlimited</SelectItem>
                        <SelectItem value="dbl">Carpentry License (DB-L)</SelectItem>
                        <SelectItem value="commercial">Commercial Building (Low-Rise)</SelectItem>
                        <SelectItem value="other">Other / Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Experience */}
                  <div>
                    <Label htmlFor="experience" className="text-gray-900 font-semibold mb-2">
                      Years of Experience *
                    </Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => handleInputChange("experience", value)}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white border-gray-300">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white z-50">
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="4-5">4-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-semibold mb-2">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your goals or any questions you have..."
                      rows={4}
                      className="bg-white border-gray-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? "Sending..." : "Book Free Consultation"}
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    We'll contact you within 24 hours to schedule your consultation
                  </p>
                </form>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Prefer to contact us directly? We're here to help answer any questions 
                  about our programs or the BPC licensing process.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:0411626398"
                  className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Call Us</div>
                    <div className="text-2xl font-bold text-blue-600">0411 626 398</div>
                    <div className="text-sm text-gray-600 mt-1">Click to call now</div>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Email Us</div>
                    <div className="text-blue-600 font-medium break-all">
                      support@adcopropertyinspectionsmelbourne.com.au
                    </div>
                    <div className="text-sm text-gray-600 mt-1">We respond within 24 hours</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Location</div>
                    <div className="text-gray-700 font-medium">Melbourne, Victoria</div>
                    <div className="text-sm text-gray-600 mt-1">Face-to-face training only</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Training Hours</div>
                    <div className="text-gray-700 font-medium">Evening sessions available</div>
                    <div className="text-sm text-gray-600 mt-1">6pm - 9pm, one night per week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Happens Next?
            </h2>
            <p className="text-xl text-gray-600">
              Here's the simple process from consultation to getting licensed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <Icon className="h-8 w-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-blue-600">
                        <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {/* Arrow */}
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:flex justify-center items-center absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-blue-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ About Consultation */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            FAQ About Your Free Consultation
          </h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Other Ways to Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prefer to Call */}
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Prefer to Call?
              </h3>
              <a 
                href="tel:0411626398"
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 block mb-2"
              >
                0411 626 398
              </a>
              <p className="text-gray-600">
                Speak with Adrian directly about your licensing goals
              </p>
            </div>

            {/* Quick Question */}
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Have a Quick Question?
              </h3>
              <a 
                href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                className="text-blue-600 hover:text-blue-700 font-semibold break-all block mb-2"
              >
                Send us an email
              </a>
              <p className="text-gray-600">
                We respond to all emails within 24 hours
              </p>
            </div>

            {/* Learn More First */}
            <div className="bg-white p-8 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Want to Learn More First?
              </h3>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white mb-2"
                asChild
              >
                <a href="/courses">View Our Programs</a>
              </Button>
              <p className="text-gray-600">
                Explore our training programs and pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-16 text-center">
            <MapPin className="h-20 w-20 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Face-to-Face Training in Melbourne
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              All our training is conducted in person in Melbourne, Victoria
            </p>
            <p className="text-gray-600">
              Interactive map showing location coming soon
            </p>
          </div>
        </div>
      </section>

      {/* Trust Reinforcement */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-blue-200">Consultation</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-blue-200">Pass Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Have Questions? We're Here to Help.
          </h2>
          <div className="mb-8">
            <a 
              href="tel:0411626398"
              className="inline-block text-4xl md:text-5xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              0411 626 398
            </a>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Or fill out the form above to schedule your free consultation
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto"
            size="lg"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Form
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
