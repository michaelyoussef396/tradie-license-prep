import { describe, expect, test } from "bun:test";

import {
  CARPENTRY_EXPERIENCE_SUMMARY,
  COMMERCIAL_EXPERIENCE_NOTE,
  EXPERIENCE_BY_CLASS_SUMMARY,
  LICENCE_TYPE_OPTIONS,
  LIMITED_EXPERIENCE_SUMMARY,
  UNLIMITED_EXPERIENCE_SUMMARY,
  UNLIMITED_MINIMUM_PROJECTS,
  UNLIMITED_MINIMUM_YEARS,
  getUnderMinimumNote,
} from "./eligibility";

const notes = [undefined, ...LICENCE_TYPE_OPTIONS].map((type) => ({
  type: type ?? "(none selected)",
  note: getUnderMinimumNote(type),
}));

const INVITATIONS = [/ask and we'll confirm/gi, /send your enquiry anyway/gi];

const countInvitations = (copy: string) =>
  INVITATIONS.reduce((total, re) => total + (copy.match(re) ?? []).length, 0);

describe("getUnderMinimumNote", () => {
  test.each(notes)("should contain exactly one invitation for $type", ({ note }) => {
    expect(countInvitations(note)).toBe(1);
  });

  test("should state the Unlimited figure only for Domestic Builder (Unlimited) or by class", () => {
    for (const { note } of notes) {
      if (!note.includes(`${UNLIMITED_MINIMUM_YEARS} years`)) continue;

      expect(note).toContain("Domestic Builder (Unlimited)");
    }
  });
});

describe("attribution", () => {
  // The projects figure is Adrian's (confirmed 9 Sep 2026); the BPC info sheet
  // gives Domestic Builder (Unlimited) only "at least 3 years of practical
  // experience". Copy that states the projects figure must not credit the BPC.
  const allCopy = [
    UNLIMITED_EXPERIENCE_SUMMARY,
    EXPERIENCE_BY_CLASS_SUMMARY,
    LIMITED_EXPERIENCE_SUMMARY,
    CARPENTRY_EXPERIENCE_SUMMARY,
    COMMERCIAL_EXPERIENCE_NOTE,
    ...notes.map(({ note }) => note),
  ];

  test("should never credit the projects figure to the BPC", () => {
    const withProjects = allCopy.filter((copy) => copy.includes(`${UNLIMITED_MINIMUM_PROJECTS} projects`));

    expect(withProjects.length).toBeGreaterThan(0);
    for (const copy of withProjects) expect(copy).not.toMatch(/\bBPC\b/);
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
