import { Link } from "react-router";
import { Mail, MessageCircle } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import { LOGIN_URL, QQ_GROUP_URL } from "../constants/links";

export interface FooterProps {
  staticExport?: boolean;
  assetUrls?: {
    logoImg?: string;
  };
  linkTargets?: {
    models?: string;
    pricing?: string;
    login?: string;
    developer?: string;
    developerQuickstart?: string;
    developerExamples?: string;
    support?: string;
    supportContact?: string;
  };
}

const DEFAULT_LINK_TARGETS = {
  models: "/models",
  pricing: "/pricing",
  login: LOGIN_URL,
  developer: "/developer",
  developerQuickstart: "/developer?section=quickstart",
  developerExamples: "/developer?section=examples",
  support: "/support",
  supportContact: "/support?section=contact",
};

function FooterLink({
  staticExport = false,
  to,
  href,
  children,
  style,
}: {
  staticExport?: boolean;
  to: string;
  href?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  if (staticExport) {
    return <a href={href ?? to} style={style}>{children}</a>;
  }

  return <Link to={to} style={style}>{children}</Link>;
}

export function Footer({ staticExport = false, assetUrls, linkTargets }: FooterProps) {
  const resolvedLogoImg = assetUrls?.logoImg ?? logoImg;
  const resolvedLinkTargets = { ...DEFAULT_LINK_TARGETS, ...linkTargets };

  return (
    <footer style={{ borderTop: "1px solid #E5E7EB", background: "#FAFAFA", padding: "48px 24px 28px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src={resolvedLogoImg} alt="OpenToken" style={{ height: 32, width: 32, objectFit: "contain" }} />
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "#0D9488" }}>opentoken</span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.7, maxWidth: "28ch", marginBottom: 16 }}>
              Open access to advanced AI models for more people.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href="mailto:opentoken@kit.xin"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}
              >
                <Mail size={13} /> Email
              </a>
              <a
                href={QQ_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, border: "1px solid #E5E7EB", background: "#fff", color: "#374151", fontSize: "0.82rem", fontWeight: 500, textDecoration: "none" }}
              >
                <MessageCircle size={13} /> QQ Group
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Product</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <FooterLink staticExport={staticExport} to="/models" href={resolvedLinkTargets.models} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Model Plaza</FooterLink>
              <FooterLink staticExport={staticExport} to="/pricing" href={resolvedLinkTargets.pricing} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Pricing</FooterLink>
              <a href={resolvedLinkTargets.login} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Console</a>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Developers</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <FooterLink staticExport={staticExport} to="/developer" href={resolvedLinkTargets.developer} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>API Docs</FooterLink>
              <FooterLink staticExport={staticExport} to="/developer?section=quickstart" href={resolvedLinkTargets.developerQuickstart} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Quickstart</FooterLink>
              <FooterLink staticExport={staticExport} to="/developer?section=examples" href={resolvedLinkTargets.developerExamples} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Examples</FooterLink>
            </div>
          </div>

          <div>
            <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "#111827", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em" }}>Support</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <FooterLink staticExport={staticExport} to="/support" href={resolvedLinkTargets.support} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>FAQ</FooterLink>
              <FooterLink staticExport={staticExport} to="/support?section=contact" href={resolvedLinkTargets.supportContact} style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}>Contact</FooterLink>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>Copyright 2025 OpenToken. All rights reserved.</span>
          <span style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>opentoken@kit.xin</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
