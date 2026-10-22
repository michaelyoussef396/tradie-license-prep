import type { SourceKey } from "@/data/bpc-sources";

/** A class-page FAQ: the answer text, and the BPC sources cited after it on the page. */
export interface Faq {
  q: string;
  a: string;
  src: SourceKey[];
}

/** FAQPage structured data from the same list the page renders, so the two can't drift. */
export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/** Scrolls to the page's enquiry form (id "enquiry-form"). */
export const scrollToEnquiry = () => {
  document.getElementById("enquiry-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};
