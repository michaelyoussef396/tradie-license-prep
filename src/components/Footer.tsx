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
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Adrian Nicolazzo
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Professional mentorship for Melbourne tradies seeking VBA building
              registration. Small classes, personalized teaching, 95% success
              rate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
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
            <h4 className="text-white font-semibold mb-4">Our Courses</h4>
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
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="tel:0411626398"
                  className="hover:text-white transition-colors text-sm"
                >
                  0411 626 398
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:support@adcopropertyinspectionsmelbourne.com.au"
                  className="hover:text-white transition-colors text-sm break-all"
                >
                  support@adcopropertyinspectionsmelbourne.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Melbourne, Victoria</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm">
            © {currentYear} Adrian Nicolazzo Building Registration Mentorship.
            All rights reserved.
          </p>
          <p className="text-xs mt-2">
            Not an RTO. Professional mentorship for VBA licensing preparation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
