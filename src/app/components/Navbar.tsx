import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import { LOGIN_URL } from "../constants/links";

export interface NavbarProps {
  staticExport?: boolean;
  assetUrls?: {
    logoImg?: string;
  };
  linkTargets?: {
    home?: string;
    models?: string;
    developer?: string;
    pricing?: string;
    support?: string;
    login?: string;
  };
}

const DEFAULT_LINK_TARGETS = {
  home: "/",
  models: "/models",
  developer: "/developer",
  pricing: "/pricing",
  support: "/support",
  login: LOGIN_URL,
};

const links = [
  { to: "/", label: "首页" },
  { to: "/models", label: "模型广场" },
  { to: "/developer", label: "开发者支持" },
  { to: "/pricing", label: "支付方案" },
  { to: "/support", label: "客服支持" },
];

function resolveLinkTarget(to: string, linkTargets: typeof DEFAULT_LINK_TARGETS) {
  switch (to) {
    case "/":
      return linkTargets.home;
    case "/models":
      return linkTargets.models;
    case "/developer":
      return linkTargets.developer;
    case "/pricing":
      return linkTargets.pricing;
    case "/support":
      return linkTargets.support;
    default:
      return to;
  }
}

export function Navbar({ staticExport = false, assetUrls, linkTargets }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedLogoImg = assetUrls?.logoImg ?? logoImg;
  const resolvedLinkTargets = { ...DEFAULT_LINK_TARGETS, ...linkTargets };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          height: 64,
          gap: 32,
        }}
      >
        {staticExport ? (
          <a href={resolvedLinkTargets.home} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src={resolvedLogoImg} alt="OpenToken" style={{ height: 36, width: 36, objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0D9488", letterSpacing: "-0.01em" }}>
              opentoken
            </span>
          </a>
        ) : (
          <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src={resolvedLogoImg} alt="OpenToken" style={{ height: 36, width: 36, objectFit: "contain" }} />
            <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#0D9488", letterSpacing: "-0.01em" }}>
              opentoken
            </span>
          </NavLink>
        )}

        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }} className="desktop-nav">
          {links.map(({ to, label }) => staticExport ? (
            <a
              key={to}
              href={resolveLinkTarget(to, resolvedLinkTargets)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: "0.92rem",
                fontWeight: 500,
                textDecoration: "none",
                color: to === "/" ? "#0D9488" : "#374151",
                background: to === "/" ? "#F0FDFA" : "transparent",
                transition: "all 0.15s ease",
              }}
            >
              {label}
            </a>
          ) : (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                padding: "6px 14px",
                borderRadius: 8,
                fontSize: "0.92rem",
                fontWeight: 500,
                textDecoration: "none",
                color: isActive ? "#0D9488" : "#374151",
                background: isActive ? "#F0FDFA" : "transparent",
                transition: "all 0.15s ease",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          href={resolvedLinkTargets.login}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 18px",
            borderRadius: 8,
            background: "#0D9488",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.88rem",
            textDecoration: "none",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#0F766E")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
          className="console-btn"
        >
          控制台
        </a>

        {!staticExport && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid #E5E7EB",
              background: "#fff",
              cursor: "pointer",
              color: "#374151",
            }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </div>

      {!staticExport && mobileOpen && (
        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            padding: "12px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "#fff",
          }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={resolveLinkTarget(to, resolvedLinkTargets)}
              end={to === "/"}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                color: isActive ? "#0D9488" : "#374151",
                background: isActive ? "#F0FDFA" : "transparent",
              })}
            >
              {label}
            </NavLink>
          ))}
          <a
            href={resolvedLinkTargets.login}
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: 8,
              padding: "10px 14px",
              borderRadius: 8,
              background: "#0D9488",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.92rem",
              textDecoration: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            控制台
          </a>
        </div>
      )}

      {staticExport && (
        <div
          style={{
            display: "none",
            borderTop: "1px solid #E5E7EB",
            padding: "12px 24px 20px",
            flexDirection: "column",
            gap: 4,
            background: "#fff",
          }}
          className="mobile-nav-static"
        >
          {links.map(({ to, label }) => (
            <a
              key={to}
              href={resolveLinkTarget(to, resolvedLinkTargets)}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                color: to === "/" ? "#0D9488" : "#374151",
                background: to === "/" ? "#F0FDFA" : "transparent",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={resolvedLinkTargets.login}
            style={{
              marginTop: 8,
              padding: "10px 14px",
              borderRadius: 8,
              background: "#0D9488",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.92rem",
              textDecoration: "none",
              textAlign: "left",
            }}
          >
            控制台
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          .desktop-nav { display: none !important; }
          .console-btn { display: none !important; }
          .mobile-toggle { display: flex !important; }
          .mobile-nav-static { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
