import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import DeveloperPage from "./pages/DeveloperPage";
import HomePage from "./pages/HomePage";
import ModelPlazaPage from "./pages/ModelPlazaPage";
import PricingPage from "./pages/PricingPage";

const LOGIN_URL = "https://kit.xin/login";

describe("external login navigation", () => {
  it("renders the navbar console entry as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });

  it("renders the footer console entry as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });

  it("renders the homepage primary CTA as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });

  it("renders the pricing CTA as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <PricingPage />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });

  it("renders the model plaza CTA as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <ModelPlazaPage />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });

  it("renders the developer CTA as an external login link", () => {
    const { container } = render(
      <MemoryRouter>
        <DeveloperPage />
      </MemoryRouter>,
    );

    expect(
      container.querySelector(`a[href="${LOGIN_URL}"]`),
    ).toBeInTheDocument();
  });
});
