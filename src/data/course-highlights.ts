import type { Course } from "./courses";

/**
 * Which of each course's inclusions (src/data/courses.ts) its homepage card highlights,
 * in display order. Each one is picked by a phrase in it rather than by position, so
 * adding, removing or reordering a bullet in courses.ts can't silently swap which ones a
 * card shows: course-highlights.test.ts fails unless every phrase matches exactly one
 * inclusion. The wording itself stays in courses.ts.
 */
export const COURSE_HIGHLIGHTS: Record<string, RegExp[]> = {
  comprehensive: [/practice questions/, /training materials/, /application and portfolio/, /^Small group/],
  evening: [/^Small group/, /Q&A practice tests/, /evening sessions/, /training materials/],
  private: [/one-on-one coaching/, /scheduling/, /training materials/, /application preparation/],
  carpentry: [/practice questions/, /training materials/, /^Application guidance/, /knowledge assessment/],
};

/** The inclusions a course's card highlights. A phrase that matches no single inclusion is skipped. */
export function highlightsFor(course: Course): string[] {
  return (COURSE_HIGHLIGHTS[course.id] ?? [])
    .map((phrase) => course.inclusions.filter((inclusion) => phrase.test(inclusion)))
    .filter((matches) => matches.length === 1)
    .map(([inclusion]) => inclusion);
}
