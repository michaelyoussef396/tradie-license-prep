import { describe, expect, test } from "bun:test";
import { courses, courseWeeksRange } from "./courses";

describe("courseWeeksRange", () => {
  test("should be able to read every course duration as a whole number of weeks", () => {
    for (const course of courses) expect(course.duration).toMatch(/^\d+ weeks$/);
  });

  test("should span the shortest to the longest course", () => {
    const weeks = courses.map((c) => Number(c.duration.split(" ")[0]));

    expect(courseWeeksRange).toBe(`${Math.min(...weeks)} to ${Math.max(...weeks)} weeks`);
  });
});
