import { describe, expect, test } from "bun:test";

import {
  CARPENTRY_EXPERIENCE_SUMMARY,
  COMMERCIAL_EXPERIENCE_NOTE,
  EXPERIENCE_BY_CLASS_SUMMARY,
  LICENCE_TYPE_OPTIONS,
  LIMITED_EXPERIENCE_SUMMARY,
  UNLIMITED_MINIMUM_YEARS,
  getUnderMinimumNote,
} from "./eligibility";

const notes = [undefined, ...LICENCE_TYPE_OPTIONS].map((type) => ({
  type: type ?? "(none selected)",
  note: getUnderMinimumNote(type),
}));

const INVITATIONS = [/ask and we'll confirm/i, /send your enquiry anyway/i];

describe("getUnderMinimumNote", () => {
  test.each(notes)("should end with exactly one invitation for $type", ({ note }) => {
    const found = INVITATIONS.filter((re) => re.test(note));

    expect(found).toHaveLength(1);
  });

  test("should state the Unlimited figure only for Domestic Builder (Unlimited) or by class", () => {
    for (const { note } of notes) {
      if (!note.includes(`${UNLIMITED_MINIMUM_YEARS} years`)) continue;

      expect(note).toContain("Domestic Builder (Unlimited)");
    }
  });
});

describe("experience figures on HOLD", () => {
  // The Domestic Builder (Limited) and Commercial (Low-Rise) minimums are not
  // confirmed in writing (src/data/eligibility.ts header): no copy may state one.
  const unconfirmed = [
    LIMITED_EXPERIENCE_SUMMARY,
    CARPENTRY_EXPERIENCE_SUMMARY,
    COMMERCIAL_EXPERIENCE_NOTE,
    ...notes.filter(({ type }) => !type.includes("Unlimited") && !type.includes("none") && !type.includes("Not Sure")).map(({ note }) => note),
  ];

  test.each(unconfirmed)("should state no figure: %s", (copy) => {
    expect(copy).not.toMatch(/\d/);
  });

  test("should never present a single figure for every class", () => {
    expect(EXPERIENCE_BY_CLASS_SUMMARY).toContain("depends on the class");
    expect(EXPERIENCE_BY_CLASS_SUMMARY).not.toMatch(/\b2 years\b/);
  });
});
