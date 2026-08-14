import { Link } from "react-router-dom";
import { ArrowRight, FileText, GraduationCap } from "lucide-react";

const links = [
  {
    to: "/bpc-exam-changes",
    icon: FileText,
    title: "BPC exam changes 2026",
    description:
      "The face-to-face interview is gone. Here's what the new online exam involves and what it means if you're mid-application.",
  },
  {
    to: "/builder-registration-course-melbourne",
    icon: GraduationCap,
    title: "Builder registration course Melbourne",
    description:
      "In-person, small-group mentorship in Melbourne — course options, what's included and entry requirements.",
  },
];

const HomeResourceLinks = () => (
  <section className="bg-slate-50 py-16">
    <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-2xl sm:text-3xl font-bold text-slate-900">Start here</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <l.icon className="mb-4 h-8 w-8 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">{l.title}</h3>
            <p className="mt-2 text-base text-slate-600">{l.description}</p>
            <span className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700">
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default HomeResourceLinks;
