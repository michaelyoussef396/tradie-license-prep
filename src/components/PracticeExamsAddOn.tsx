import { ArrowRight, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";
import { practiceExamsAddOn } from "@/data/courses";

const TONE_STYLES = {
  dark: {
    container: "border border-amber-400/40 bg-amber-400/10 backdrop-blur-sm p-4 sm:p-5",
    icon: "bg-amber-400/20 text-amber-300",
    label: "text-amber-300",
    name: "text-white",
    description: "text-blue-100/80",
    cta: "bg-amber-400 text-slate-900 hover:bg-amber-300",
  },
  light: {
    container: "border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 md:p-8",
    icon: "bg-amber-100 text-amber-700",
    label: "text-amber-700",
    name: "text-gray-900",
    description: "text-gray-700",
    cta: "bg-amber-600 text-white hover:bg-amber-700",
  },
};

interface PracticeExamsAddOnProps {
  /** "dark" for hero sections, "light" for white or slate-50 sections. */
  tone: keyof typeof TONE_STYLES;
  className?: string;
}

const PracticeExamsAddOn = ({ tone, className = "" }: PracticeExamsAddOnProps) => {
  const styles = TONE_STYLES[tone];

  return (
    <aside
      aria-label={`${practiceExamsAddOn.name} (add-on)`}
      className={`rounded-2xl text-left ${styles.container} ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className={`hidden sm:flex flex-shrink-0 w-10 h-10 rounded-lg items-center justify-center ${styles.icon}`}>
            <BookMarked className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${styles.label}`}>
              {practiceExamsAddOn.label}
            </p>
            <p className={`mt-1 text-lg sm:text-xl font-bold leading-snug ${styles.name}`}>
              {practiceExamsAddOn.name}
            </p>
            <p className={`mt-1 text-sm leading-relaxed ${styles.description}`}>
              {practiceExamsAddOn.description}
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className={`inline-flex min-h-[44px] flex-shrink-0 items-center justify-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors sm:self-center ${styles.cta}`}
        >
          {practiceExamsAddOn.callToAction}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
};

export default PracticeExamsAddOn;
