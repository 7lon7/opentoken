import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import { QQ_GROUP_URL } from "../constants/links";

export interface SupportPageProps {
  staticExport?: boolean;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        background: "#CCFBF1",
        color: "#0D9488",
        fontSize: "0.78rem",
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

export default function SupportPage({ staticExport = false }: SupportPageProps) {
  void staticExport;

  return (
    <div style={{ background: "#fff" }}>
      <div
        style={{
          padding: "64px 24px 30px",
          background: "linear-gradient(180deg, #F0FDFA 0%, #fff 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Tag>客服支持</Tag>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#111827",
              marginTop: 18,
              marginBottom: 14,
              letterSpacing: "-0.04em",
            }}
          >
            客服支持
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        <div
          id="contact"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 16,
          }}
          className="contact-cards"
        >
          <a
            href={QQ_GROUP_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              padding: "24px 28px",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              background: "#fff",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#0D9488";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(13,148,136,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0D9488",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={22} />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                QQ 群社区
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: "#0D9488",
                  marginBottom: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                点击加入官方群 <ExternalLink size={12} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                实时答疑，活跃社区
              </div>
            </div>
          </a>

          <a
            href="mailto:opentoken@kit.xin"
            style={{
              display: "flex",
              gap: 18,
              alignItems: "center",
              padding: "24px 28px",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              background: "#fff",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#0D9488";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 20px rgba(13,148,136,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0D9488",
                flexShrink: 0,
              }}
            >
              <Mail size={22} />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                邮件支持
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: "#0D9488",
                  marginBottom: 2,
                }}
              >
                opentoken@kit.xin
              </div>
              <div style={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                通常 24 小时内回复
              </div>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .contact-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
