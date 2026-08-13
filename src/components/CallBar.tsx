import { Phone } from "lucide-react";

const CallBar = () => (
  <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
    <a
      href="tel:0411626398"
      className="flex items-center justify-center gap-2 h-12 px-4 text-white font-bold text-base sm:text-lg tracking-wide hover:from-blue-700 hover:to-blue-800 transition-colors"
      aria-label="Call Qualify Pro on 0411 626 398"
    >
      <Phone className="w-5 h-5" />
      Call 0411 626 398
    </a>
  </div>
);

export default CallBar;
