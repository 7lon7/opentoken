import { Outlet, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { WelcomeModal } from "../components/WelcomeModal";

export function Root() {
  const [showWelcome, setShowWelcome] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const seen = localStorage.getItem("ia_welcome_seen");
    if (!seen) {
      setTimeout(() => setShowWelcome(true), 600);
    }
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem("ia_welcome_seen", "1");
  };

  useEffect(() => {
    const section = new URLSearchParams(location.search).get("section");

    if (section) {
      const element = document.getElementById(section);

      if (element) {
        element.scrollIntoView({ block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.search]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fff", color: "#111827", fontFamily: '"Plus Jakarta Sans","Noto Sans SC",system-ui,-apple-system,"Microsoft YaHei",sans-serif' }}>
      {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
