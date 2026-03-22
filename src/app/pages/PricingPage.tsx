import { Check } from "lucide-react";
import { LOGIN_URL } from "../constants/links";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "#CCFBF1", color: "#0D9488", fontSize: "0.78rem", fontWeight: 700 }}>
      {children}
    </span>
  );
}

const plans = [
  {
    name: "余额版",
    price: "¥♾",
    period: "",
    desc: "适合低频调用与预算弹性场景",
    badge: "按需付费",
    features: [
      "无需订阅，按调用量实时扣费",
      "支持随充随用，余额永不过期",
      "每个模型单独定价，轻量任务减少消耗"
    ],
    highlight: false,
    cta: "充值",
  },
  {
    name: "轻量版",
    price: "¥??",
    period: "/月",
    desc: "适合个人开发者与轻量探索",
    badge: null,
    features: [
      "基础模型访问（GPT-5.2 等）",
      "每月 200 万 Token 额度",
    ],
    highlight: false,
    cta: "敬请期待",
  },
  {
    name: "专业版",
    price: "¥??",
    period: "/月",
    desc: "适合频繁使用与团队开发者",
    badge: "最受欢迎",
    features: [
      "全量模型访问权限",
      "每月 1000 万 Token 额度",
    ],
    highlight: true,
    cta: "敬请期待",
  },
  {
    name: "满血版",
    price: "¥??",
    period: "/月",
    desc: "适合高强度生产与企业环境",
    badge: null,
    features: [
      "全量模型最高优先级访问",
      "每月 5000 万 Token 额度",
    ],
    highlight: false,
    cta: "敬请期待",
  },
];

export default function PricingPage() {
  return (
    <div style={{ background: "#fff" }}>
      {/* Header */}
      <div style={{ padding: "64px 24px 48px", background: "linear-gradient(180deg, #F0FDFA 0%, #fff 100%)", borderBottom: "1px solid #E5E7EB", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Tag>支付方案</Tag>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#111827", marginTop: 18, marginBottom: 14, letterSpacing: "-0.04em" }}>
            简单透明的定价
          </h1>
          <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
            无隐藏费用。按需选择，随时升级。余额永不过期。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        {/* Pricing cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24 }} className="pricing-pg-grid">
          {plans.map(({ name, price, period, desc, badge, features, highlight, cta }) => {
            const isComingSoon = cta === "敬请期待";
            const defaultShadow = highlight ? "0 8px 48px rgba(13,148,136,0.14)" : "0 2px 8px rgba(0,0,0,0.04)";
            const hoverShadow = highlight ? "0 14px 56px rgba(13,148,136,0.22)" : "0 10px 28px rgba(0,0,0,0.1)";

            return (
              <div key={name} style={{
                padding: "36px 30px", borderRadius: 20,
                border: highlight ? "2px solid #0D9488" : "1px solid #E5E7EB",
                background: highlight ? "linear-gradient(160deg, #F0FDFA, #fff)" : "#fff",
                position: "relative",
                boxShadow: defaultShadow,
                transform: "translateY(0)",
                transition: "transform 0.22s ease, box-shadow 0.22s ease",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = hoverShadow;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = defaultShadow;
                }}
              >
              {badge && (
                <div style={{
                  position: "absolute", top: -1, left: "50%", transform: "translateX(-50%) translateY(-50%)",
                  padding: "4px 16px", borderRadius: 999,
                  background: "#0D9488", color: "#fff",
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}>
                  {badge}
                </div>
              )}

              <div style={{ marginBottom: 28 }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827", marginBottom: 8 }}>{name}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 10 }}>
                  <span style={{ fontSize: "2.6rem", fontWeight: 800, color: highlight ? "#0D9488" : "#111827", letterSpacing: "-0.04em", lineHeight: 1 }}>{price}</span>
                  <span style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: 4 }}>{period}</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.6 }}>{desc}</p>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 11, marginBottom: 32 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.88rem", color: "#374151" }}>
                    <Check size={15} style={{ color: "#0D9488", flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </div>
                ))}
              </div>

              <a
                href={isComingSoon ? undefined : LOGIN_URL}
                aria-disabled={isComingSoon}
                tabIndex={isComingSoon ? -1 : 0}
                style={{
                  width: "100%", padding: "12px 0", borderRadius: 10,
                  background: isComingSoon ? "#E5E7EB" : highlight ? "#0D9488" : "#fff",
                  color: isComingSoon ? "#6B7280" : highlight ? "#fff" : "#0D9488",
                  border: isComingSoon ? "1.5px solid #D1D5DB" : highlight ? "none" : "1.5px solid #0D9488",
                  fontWeight: 700, fontSize: "0.95rem", cursor: isComingSoon ? "not-allowed" : "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onClick={e => {
                  if (isComingSoon) {
                    e.preventDefault();
                  }
                }}
                onMouseEnter={e => {
                  if (isComingSoon) {
                    return;
                  }
                  e.currentTarget.style.background = highlight ? "#0F766E" : "#F0FDFA";
                }}
                onMouseLeave={e => {
                  if (isComingSoon) {
                    return;
                  }
                  e.currentTarget.style.background = highlight ? "#0D9488" : "#fff";
                }}
              >
                {cta}
              </a>
              </div>
            );
          })}
        </div>

        {/* Key advantages */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16 }} className="adv-grid">
            {[
              { emoji: "💰", title: "1:10 汇率", desc: "1 人民币 = 10 美元额度，无任何汇率损耗，计费清晰透明。" },
              { emoji: "♾️", title: "余额永不过期", desc: "充值余额无有效期限制，按实际调用量扣费，杜绝浪费。" },
              { emoji: "📉", title: "低至官方 1/70", desc: "通过批量采购与智能路由，将 AI 使用成本降至最低。" },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ padding: "24px", borderRadius: 16, border: "1px solid #E5E7EB", background: "#FAFAFA" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{emoji}</div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.87rem", color: "#6B7280", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-pg-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          .adv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
