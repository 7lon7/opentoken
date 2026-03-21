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
    name: "轻量版",
    price: "¥19",
    period: "/月",
    desc: "适合个人开发者与轻量探索",
    badge: null,
    features: [
      "基础模型访问（GPT-5.2 等）",
      "每月 200 万 Token 额度",
      "按量计费，余额永不过期",
      "标准速率限制",
      "邮件技术支持",
      "API 文档与示例",
    ],
    highlight: false,
    cta: "获取 API 密钥",
  },
  {
    name: "专业版",
    price: "¥49",
    period: "/月",
    desc: "适合频繁使用与团队开发者",
    badge: "最受欢迎",
    features: [
      "全量模型访问权限",
      "每月 1000 万 Token 额度",
      "按量计费，余额永不过期",
      "更高并发限制（3x）",
      "优先技术支持通道",
      "使用统计与分析面板",
      "团队账号协作",
    ],
    highlight: true,
    cta: "获取 API 密钥",
  },
  {
    name: "满血版",
    price: "¥99",
    period: "/月",
    desc: "适合高强度生产与企业环境",
    badge: null,
    features: [
      "全量模型最高优先级访问",
      "每月 5000 万 Token 额度",
      "按量计费，余额永不过期",
      "最高速率限制（10x）",
      "专属 1v1 客服通道",
      "企业账单与发票支持",
      "自定义接入方案咨询",
      "SLA 服务保障协议",
    ],
    highlight: false,
    cta: "获取 API 密钥",
  },
];

const faqs = [
  { q: "余额会过期吗？", a: "不会。充值的余额永久有效，按实际使用量扣除，无月费锁定。" },
  { q: "价格相比官方有什么优势？", a: "OpenToken 汇率为 1:1（人民币=美元），综合模型倍率低至官方价格的 1/7，帮助你大幅降低 AI 使用成本。" },
  { q: "可以随时更换套餐吗？", a: "可以。套餐随时升级或降级，变更立即生效，未使用余额按比例结转。" },
  { q: "支持哪些支付方式？", a: "支持微信支付、支付宝等主流支付方式，企业用户可联系客服了解对公转账。" },
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 24 }} className="pricing-pg-grid">
          {plans.map(({ name, price, period, desc, badge, features, highlight, cta }) => (
            <div key={name} style={{
              padding: "36px 30px", borderRadius: 20,
              border: highlight ? "2px solid #0D9488" : "1px solid #E5E7EB",
              background: highlight ? "linear-gradient(160deg, #F0FDFA, #fff)" : "#fff",
              position: "relative",
              boxShadow: highlight ? "0 8px 48px rgba(13,148,136,0.14)" : "0 2px 8px rgba(0,0,0,0.04)",
              display: "flex", flexDirection: "column",
            }}>
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
                href={LOGIN_URL}
                style={{
                  width: "100%", padding: "12px 0", borderRadius: 10,
                  background: highlight ? "#0D9488" : "#fff",
                  color: highlight ? "#fff" : "#0D9488",
                  border: highlight ? "none" : "1.5px solid #0D9488",
                  fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = highlight ? "#0F766E" : "#F0FDFA"; }}
                onMouseLeave={e => { e.currentTarget.style.background = highlight ? "#0D9488" : "#fff"; }}
              >
                {cta}
              </a>
            </div>
          ))}
        </div>

        {/* Key advantages */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#111827", marginBottom: 24 }}>为什么选择 OpenToken 的定价？</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 16 }} className="adv-grid">
            {[
              { emoji: "💰", title: "1:1 汇率", desc: "1 人民币 = 1 美元额度，无任何汇率损耗，计费清晰透明。" },
              { emoji: "♾️", title: "余额永不过期", desc: "充值余额无有效期限制，按实际调用量扣费，杜绝浪费。" },
              { emoji: "📉", title: "低至官方 1/7", desc: "通过批量采购与智能路由，将 AI 使用成本降至最低。" },
            ].map(({ emoji, title, desc }) => (
              <div key={title} style={{ padding: "24px", borderRadius: 16, border: "1px solid #E5E7EB", background: "#FAFAFA" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>{emoji}</div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.87rem", color: "#6B7280", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#111827", marginBottom: 24 }}>常见问题</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16 }} className="faq-grid">
            {faqs.map(({ q, a }) => (
              <div key={q} style={{ padding: "22px 24px", borderRadius: 14, border: "1px solid #E5E7EB", background: "#fff" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{q}</h3>
                <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.65 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for custom */}
        <div style={{
          marginTop: 48, padding: "32px", borderRadius: 18,
          border: "1px solid #E5E7EB", background: "#F9FAFB",
          display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}>
          <div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginBottom: 6 }}>需要定制方案？</h3>
            <p style={{ fontSize: "0.88rem", color: "#6B7280", margin: 0 }}>企业客户可联系我们获取专属报价与技术支持。</p>
          </div>
          <a href="mailto:opentoken@kit.xin" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "10px 22px", borderRadius: 10,
            background: "#0D9488", color: "#fff",
            fontWeight: 600, fontSize: "0.92rem",
            textDecoration: "none", flexShrink: 0,
            transition: "background 0.2s ease",
          }}>
            联系我们
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pricing-pg-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          .adv-grid { grid-template-columns: 1fr !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
