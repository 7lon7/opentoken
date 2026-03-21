import { describe, expect, it } from "vitest";
import { router } from "./routes";

function collectPaths(routes: readonly unknown[]): string[] {
  return routes.flatMap((route) => {
    if (!route || typeof route !== "object") {
      return [];
    }

    const current = "path" in route && typeof route.path === "string" ? [route.path] : [];
    const children = "children" in route && Array.isArray(route.children) ? collectPaths(route.children) : [];

    return [...current, ...children];
  });
}

describe("router", () => {
  it("does not expose a console route", () => {
    const paths = collectPaths(router.routes);

    expect(paths).not.toContain("console");
  });

  it("creates hash-based hrefs for app routes", () => {
    expect(router.createHref({ pathname: "/pricing" })).toBe("#/pricing");
  });
});
