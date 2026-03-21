// @vitest-environment node

import path from "path";
import { describe, expect, it } from "vitest";
import { loadConfigFromFile } from "vite";

describe("vite config", () => {
  it("enables single-file output for production builds", async () => {
    const result = await loadConfigFromFile(
      { command: "build", mode: "test" },
      path.resolve(__dirname, "vite.config.ts"),
    );

    const pluginNames = result?.config?.plugins?.map((plugin) => plugin.name) ?? [];

    expect(pluginNames).toContain("vite:singlefile");
    expect(result?.config?.build?.cssCodeSplit).toBe(false);
  });
});
