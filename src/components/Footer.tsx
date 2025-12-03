import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Success Stories", href: "#success" },
    { name: "FAQ", href: "#faq" },
  ];

  const courses = [
    { name: "Comprehensive Builder", href: "#courses" },
    { name: "Evening Builder", href: "#courses" },
    { name: "Private 1-on-1", href: "#courses" },
    { name: "Carpentry DB-L", href: "#courses" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img 
              src="/images/qualify-pro-logo.png" 
              alt="Qualify Pro" 
              className="h-10 w-auto mb-3 sm:mb-4 brightness-0 invert"
            />
            <p className="text-sm leading-relaxed mb-4">
              Professional mentorship for Melbourne tradies seeking VBA building
              registration. Small classes, personalized teaching, 95% success
              rate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <a
                    href={course.href}
                    className="hover:text-white transition-colors text-sm"
                  >
                    {course.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:0411626398"
                  className="hover:text-white transition-colors text-sm"
                >
                  0411 626 398
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="hover:text-white transition-colors text-sm break-all"
                >
                  support@adcopropertyinspectionsmelbourne.com.au
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Melbourne, Victoria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
          <p className="text-xs sm:text-sm leading-relaxed">
            © {currentYear} Qualify Pro. All rights reserved.
          </p>
          <p className="text-xs mt-2 leading-relaxed">
            Not an RTO. Professional mentorship for VBA licensing preparation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
