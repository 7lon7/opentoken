import { X, Flame } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import { QQ_GROUP_URL } from "../constants/links";

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.3s ease both",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: "100%",
          maxWidth: 500,
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          overflow: "hidden",
          animation: "slideUp 0.35s ease both",
        }}
      >
        {/* Top green band */}
        <div
          style={{
            background: "linear-gradient(135deg, #0D9488, #14B8A6)",
            padding: "32px 32px 24px",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} />
          </button>

          <img
            src={logoImg}
            alt="OpenToken"
            style={{
              height: 52,
              width: 52,
              objectFit: "contain",
              marginBottom: 16,
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "0.82rem",
              fontStyle: "italic",
              lineHeight: 1.6,
              marginBottom: 8,
            }}
          >
            "文明，就是火炬。在它照亮的范围内，人类不断前进。"
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 32px 28px" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "#111827",
              marginBottom: 12,
            }}
          >
            你好，欢迎加入OpenToken社区！
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              color: "#4B5563",
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            我们的宗旨是：
            <strong style={{ color: "#0D9488" }}>
              让每个人都能紧跟AI时代的步伐
            </strong>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: "#F0FDFA",
                border: "1px solid #CCFBF1",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#0D9488",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                官方域名
              </div>
              <a
                href="https://kit.xin"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#0F766E",
                  textDecoration: "none",
                }}
              >
                kit.xin
              </a>
            </div>
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: "#F0FDFA",
                border: "1px solid #CCFBF1",
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#0D9488",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: 4,
                }}
              >
                官方社群
              </div>
              <a
                href={QQ_GROUP_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "#0F766E",
                  textDecoration: "none",
                }}
              >
                QQ 群：点击加入 →
              </a>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              marginTop: 20,
              width: "100%",
              padding: "11px 0",
              borderRadius: 10,
              background: "#0D9488",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0F766E")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
          >
            开始探索
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
