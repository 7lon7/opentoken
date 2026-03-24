// @vitest-environment node

import path from "path";
import { describe, expect, it } from "vitest";
import { loadConfigFromFile } from "vite";

describe("vite config", () => {
  it("configures React plugin and src alias", async () => {
    const result = await loadConfigFromFile(
      { command: "build", mode: "test" },
      path.resolve(__dirname, "vite.config.ts"),
    );

    expect(result?.config?.resolve?.alias?.["@"]).toBe(path.resolve(__dirname, "./src"));
  });
});
