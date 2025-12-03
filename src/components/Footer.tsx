import { Phone, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About Adrian", href: "/about" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  const courses = [
    { name: "Comprehensive Builder Program", href: "/courses" },
    { name: "Evening Builder Course", href: "/courses" },
    { name: "Private 1-on-1 Training", href: "/courses" },
    { name: "Carpentry License (DB-L)", href: "/courses" },
  ];

  const tradeAreas = [
    "Domestic Builder Unlimited",
    "Carpentry (DB-L)",
    "Commercial Building",
    "Waterproofing",
    "Kitchen & Bathroom",
  ];

  return (
    <footer className="bg-slate-950 text-gray-400 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <img 
                src="/images/qualify-pro-logo.png" 
                alt="Qualify Pro" 
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Professional mentorship for Melbourne tradies seeking BPC (formerly VBA) building registration. Small classes, personalised teaching, 95% success rate.
            </p>
            
            {/* Stats mini badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                95% Success Rate
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-blue-300">
                10+ Years Experience
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Our Programs
            </h4>
            <ul className="space-y-3">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link
                    to={course.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {course.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0411626398"
                  className="group flex items-start gap-3 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Call us</div>
                    <div className="text-sm text-white font-medium">0411 626 398</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="group flex items-start gap-3 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-0.5">Email us</div>
                    <div className="text-sm text-white font-medium break-all">support@adcopropertyinspectionsmelbourne.com.au</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Location</div>
                  <div className="text-sm text-white font-medium">Melbourne, Victoria</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Evening Classes</div>
                  <div className="text-sm text-white font-medium">6pm - 9pm</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Qualify Pro. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Not an RTO — Professional mentorship for BPC licensing preparation
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
