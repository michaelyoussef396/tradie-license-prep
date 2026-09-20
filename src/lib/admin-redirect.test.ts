import { describe, expect, test } from "bun:test";
import { DEFAULT_ADMIN_DESTINATION, resolveAdminDestination } from "./admin-redirect";

describe("resolveAdminDestination", () => {
  test("should return an in-app admin path unchanged", () => {
    expect(resolveAdminDestination("/admin/email-templates")).toBe("/admin/email-templates");
  });

  test("should keep a query string on an admin path", () => {
    expect(resolveAdminDestination("/admin/dashboard?tab=pipeline")).toBe(
      "/admin/dashboard?tab=pipeline",
    );
  });

  test("should fall back for a non-admin path", () => {
    expect(resolveAdminDestination("/courses")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for the login path itself", () => {
    expect(resolveAdminDestination("/admin")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a path that merely starts with the word admin", () => {
    expect(resolveAdminDestination("/administrator/secrets")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for an absolute URL", () => {
    expect(resolveAdminDestination("https://evil.example/admin/")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a protocol-relative URL", () => {
    expect(resolveAdminDestination("//evil.example/admin/")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a traversal segment", () => {
    expect(resolveAdminDestination("/admin/../../evil")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a trailing traversal segment", () => {
    expect(resolveAdminDestination("/admin/..")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a backslash separator", () => {
    expect(resolveAdminDestination("/admin/..\\..\\evil")).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back when no path was captured", () => {
    expect(resolveAdminDestination(undefined)).toBe(DEFAULT_ADMIN_DESTINATION);
  });

  test("should fall back for a non-string value", () => {
    expect(resolveAdminDestination({ toString: () => "/admin/dashboard" })).toBe(
      DEFAULT_ADMIN_DESTINATION,
    );
  });
});
