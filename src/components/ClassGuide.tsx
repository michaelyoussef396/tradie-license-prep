import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SOURCES, type SourceKey } from "@/data/bpc-sources";
import type { Course } from "@/data/courses";
import type { Faq } from "@/lib/class-guide";

/**
 * Building blocks for the Domestic Builder class pages (src/pages/DomesticBuilder*.tsx):
 * plain headings and text, inline citations to the BPC pages in src/data/bpc-sources.ts,
 * a source list, a course card and an FAQ list whose text also feeds the FAQPage JSON-LD
 * (faqJsonLd in src/lib/class-guide.ts). The course card shows only the course's name, who
 * it's for and its price, all from courses.ts.
 */

export const H2 = ({ children, id }: { children: ReactNode; id?: string }) => (
  <h2 id={id} className="mt-14 mb-4 scroll-mt-32 text-2xl sm:text-3xl font-bold text-slate-900">
    {children}
  </h2>
);

export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-8 mb-3 text-xl font-bold text-slate-900">{children}</h3>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-4 text-base sm:text-lg leading-relaxed text-slate-700">{children}</p>
);

export const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mb-5 list-disc space-y-2 pl-6 text-base sm:text-lg text-slate-700">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

/** Inline citation to one of the BPC SOURCES. */
export const Src = ({ k }: { k: SourceKey }) => (
  <a
    href={SOURCES[k].href}
    target="_blank"
    rel="noopener noreferrer"
    className="whitespace-nowrap text-sm text-blue-700 underline underline-offset-2"
  >
    (source)
  </a>
);

export const SourceList = ({ keys }: { keys: SourceKey[] }) => (
  <section className="mt-16 border-t border-slate-200 pt-8">
    <h2 className="mb-4 text-lg font-bold text-slate-900">Sources</h2>
    <ul className="space-y-2 text-sm text-slate-600">
      {keys.map((k) => (
        <li key={k}>
          <a
            href={SOURCES[k].href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-2"
          >
            {SOURCES[k].label}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export const FaqList = ({ faqs }: { faqs: Faq[] }) => (
  <>
    {faqs.map(({ q, a, src }) => (
      <div key={q}>
        <H3>{q}</H3>
        <P>
          {a}
          {src.map((k) => (
            <span key={k}>
              {" "}
              <Src k={k} />
            </span>
          ))}
        </P>
      </div>
    ))}
  </>
);

export const CourseCard = ({ course, onEnquire }: { course: Course; onEnquire: () => void }) => (
  <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-bold text-slate-900">{course.name}</h3>
    <p className="mt-3 flex-1 text-base text-slate-700">{course.whoItsFor}</p>
    <p className="mt-4 text-lg font-bold text-slate-900">
      {course.priceDisplay} <span className="text-sm font-normal text-slate-500">{course.exGstNote}</span>
    </p>
    {course.addOn && (
      <p className="mt-1 text-sm text-slate-600">
        {course.addOn.name} add-on +{course.addOn.priceDisplay} {course.addOn.exGstNote}
      </p>
    )}
    <Button onClick={onEnquire} className="mt-5 w-full">
      Ask about this course
    </Button>
  </div>
);
