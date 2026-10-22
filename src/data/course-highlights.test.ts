import { describe, expect, test } from "bun:test";
import { COURSE_HIGHLIGHTS, highlightsFor } from "./course-highlights";
import { courses } from "./courses";

describe("course card highlights", () => {
  test("should pick exactly one inclusion per phrase, for every course", () => {
    for (const course of courses) {
      const phrases = COURSE_HIGHLIGHTS[course.id];
      expect(phrases?.length).toBe(4);
      for (const phrase of phrases) {
        const matches = course.inclusions.filter((inclusion) => phrase.test(inclusion));
        expect({ course: course.id, phrase: String(phrase), matches: matches.length }).toEqual({
          course: course.id,
          phrase: String(phrase),
          matches: 1,
        });
      }
    }
  });

  test("should give every card four different bullets", () => {
    for (const course of courses) {
      const highlights = highlightsFor(course);
      expect(highlights).toHaveLength(4);
      expect(new Set(highlights).size).toBe(4);
    }
  });
});
