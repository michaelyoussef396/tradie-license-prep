import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PageTransition from "@/components/PageTransition";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
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
  ArrowRight,
  Send
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
    <PageTransition>
      <div className="min-h-screen">
        <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Blueprint Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-8">
              <Send className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Free Consultation</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Get You{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Licensed
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300">
              Book your free consultation. We'll discuss your experience, goals, 
              and the best program for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Form and Contact Details */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-200 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  Book Your Free Consultation
                </h2>
                <p className="text-slate-600 mb-8">Fill out the form and we'll be in touch within 24 hours</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-slate-900 font-semibold mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="John Smith"
                      required
                      className="h-12 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <Label htmlFor="phone" className="text-slate-900 font-semibold mb-2 block">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="0411 626 398"
                      required
                      className="h-12 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="john.smith@email.com"
                      required
                      className="h-12 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* License Type */}
                  <div>
                    <Label htmlFor="licenseType" className="text-slate-900 font-semibold mb-2 block">
                      License Type You're Seeking *
                    </Label>
                    <Select 
                      value={formData.licenseType} 
                      onValueChange={(value) => handleInputChange("licenseType", value)}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white border-slate-300">
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
                    <Label htmlFor="experience" className="text-slate-900 font-semibold mb-2 block">
                      Years of Experience *
                    </Label>
                    <Select 
                      value={formData.experience} 
                      onValueChange={(value) => handleInputChange("experience", value)}
                      required
                    >
                      <SelectTrigger className="h-12 bg-white border-slate-300">
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
                    <Label htmlFor="message" className="text-slate-900 font-semibold mb-2 block">
                      Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your goals or any questions you have..."
                      rows={4}
                      className="bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Book Free Consultation"}
                  </Button>

                  <p className="text-sm text-slate-500 text-center">
                    We'll contact you within 24 hours to schedule your consultation
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg text-slate-600">
                  Prefer to contact us directly? We're here to help answer any questions 
                  about our programs or the BPC licensing process.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:0411626398"
                  className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 group border border-slate-200 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Call Us</div>
                    <div className="text-2xl font-bold text-blue-600">0411 626 398</div>
                    <div className="text-sm text-slate-500 mt-1">Click to call now</div>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all duration-300 group border border-slate-200 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Email Us</div>
                    <div className="text-blue-600 font-medium break-all">
                      support@adcopropertyinspectionsmelbourne.com.au
                    </div>
                    <div className="text-sm text-slate-500 mt-1">We respond within 24 hours</div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Location</div>
                    <div className="text-slate-700 font-medium">Melbourne, Victoria</div>
                    <div className="text-sm text-slate-500 mt-1">Face-to-face training only</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">Training Hours</div>
                    <div className="text-slate-700 font-medium">Evening sessions available</div>
                    <div className="text-sm text-slate-500 mt-1">6pm - 9pm, one night per week</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What Happens Next?
            </h2>
            <p className="text-xl text-slate-600">
              Here's the simple process from consultation to getting licensed
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 relative shadow-lg">
                      <Icon className="h-8 w-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-600 shadow-md">
                        <span className="text-blue-600 font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {/* Arrow */}
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:flex justify-center items-center absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-blue-500" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ About Consultation */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            FAQ About Your Free Consultation
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="py-16 md:py-20 bg-slate-50">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Other Ways to Connect
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: "Prefer to Call?", content: "0411 626 398", link: "tel:0411626398", subtitle: "Speak with Adrian directly about your licensing goals" },
              { icon: Mail, title: "Have a Quick Question?", content: "Send us an email", link: "mailto:support@adcopropertyinspectionsmelbourne.com.au", subtitle: "We respond to all emails within 24 hours" },
              { icon: Award, title: "Want to Learn More First?", content: "View Our Programs", link: "/courses", subtitle: "Explore our training programs and pricing", isButton: true },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index} 
                  className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  {item.isButton ? (
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white mb-2 shadow-md"
                      asChild
                    >
                      <a href={item.link}>{item.content}</a>
                    </Button>
                  ) : (
                    <a 
                      href={item.link}
                      className="text-xl font-bold text-blue-600 hover:text-blue-700 block mb-2"
                    >
                      {item.content}
                    </a>
                  )}
                  <p className="text-slate-600">{item.subtitle}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-16 text-center border border-slate-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <MapPin className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Face-to-Face Training in Melbourne
            </h3>
            <p className="text-slate-600 text-lg mb-4">
              All our training is conducted in person in Melbourne, Victoria
            </p>
            <p className="text-slate-500">
              Interactive map showing location coming soon
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Reinforcement */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, value: "95%", label: "Success Rate" },
              { icon: Award, value: "10+", label: "Years Experience" },
              { icon: Users, value: "Free", label: "Consultation" },
              { icon: Shield, value: "100%", label: "Pass Guarantee" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
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
            <p className="text-xl text-slate-600 mb-8">
              Or fill out the form above to schedule your free consultation
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to Form
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  </PageTransition>
  );
};

export default Contact;
