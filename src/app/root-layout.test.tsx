import { render, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Root } from "./layouts/Root";
import DeveloperPage from "./pages/DeveloperPage";

describe("root layout section navigation", () => {
  beforeEach(() => {
    localStorage.setItem("ia_welcome_seen", "1");
    Object.defineProperty(window, "scrollTo", {
      writable: true,
      configurable: true,
      value: vi.fn(),
    });
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it("scrolls to the requested section when the route search includes a section id", async () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          Component: Root,
          children: [{ path: "developer", Component: DeveloperPage }],
        },
      ],
      {
        initialEntries: ["/developer?section=quickstart"],
      },
    );

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
    });
  });
});
