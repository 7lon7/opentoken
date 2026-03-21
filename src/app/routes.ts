import { createHashRouter } from "react-router";
import { Root } from "./layouts/Root";
import HomePage from "./pages/HomePage";
import ModelPlazaPage from "./pages/ModelPlazaPage";
import DeveloperPage from "./pages/DeveloperPage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "models", Component: ModelPlazaPage },
      { path: "developer", Component: DeveloperPage },
      { path: "pricing", Component: PricingPage },
      { path: "support", Component: SupportPage },
    ],
  },
]);
