import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
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

const faqs = [
  {
    category: "接入配置",
    items: [
      {
        q: "如何获取 API 密钥？",
        a: "注册账号后，进入控制台 → API 密钥管理，点击「创建密钥」即可生成。每个密钥可设置名称和用途标签，方便管理。",
      },
      {
        q: "Base URL 应该填写什么？",
        a: "统一填写 https://kit.xin（不加结尾斜杠）。部分客户端需要填写 /v1 路径，请参考各客户端配置说明。",
      },
      {
        q: "支持哪些 SDK 和客户端？",
        a: "支持所有 OpenAI 兼容的 SDK，包括 Python openai 库、Node.js openai 包，以及 Cursor、VSCode Codex 插件、Claude Code、Gemini CLI、ChatBox、Cherry Studio 等客户端。",
      },
      {
        q: "如何配置代理直连？",
        a: "在 Clash 等代理工具中，添加规则 DOMAIN-SUFFIX,kit.xin,DIRECT，确保对 OpenToken 域名的请求走直连，避免请求绕路导致延迟。",
      },
    ],
  },
  {
    category: "计费与支付",
    items: [
      {
        q: "计费方式是怎样的？",
        a: "按实际 Token 用量计费，无月费、无套餐锁定。充值后余额永不过期，用多少扣多少，完全透明。",
      },
      {
        q: "汇率是怎么计算的？",
        a: "全站汇率 1 人民币 = 1 美元，无任何汇率损耗。实际模型调用费率在此基础上按模型倍率（0.1x~1.5x）计算。",
      },
      {
        q: "Claude Code 的倍率是多少？",
        a: "Claude Code 专用分组倍率为 1.5x，特价分组最低可到 0.2x。Codex 常规分组倍率为 0.2x，限时特价可到 0.1x。",
      },
      {
        q: "如何申请发票？",
        a: "满血版及以上套餐用户可通过邮件联系我们申请电子发票。企业客户可联系客服了解对公转账与开票流程。",
      },
    ],
  },
  {
    category: "技术问题",
    items: [
      {
        q: "请求返回 401 错误怎么办？",
        a: "请检查：1）API Key 是否正确填写（sk- 开头）；2）Base URL 是否为 https://kit.xin；3）请求 Header 中是否携带 Authorization: Bearer sk-your-key。",
      },
      {
        q: "请求超时或延迟高怎么处理？",
        a: "建议检查代理配置，确保 kit.xin 走直连。同时可以尝试切换网络环境，或联系客服了解当前节点状态。",
      },
      {
        q: "Claude Code 启动后报错怎么办？",
        a: "请检查 ~/.claude/settings.json 中的 ANTHROPIC_AUTH_TOKEN 和 ANTHROPIC_BASE_URL 配置是否正确，保存后重启 Claude Code CLI 重试。",
      },
      {
        q: "Codex 无法识别 OpenToken 供应商？",
        a: "请确认 config.toml 中已正确配置 [model_providers.opentoken] 段落，auth.json 中已填写正确的 OPENAI_API_KEY，且文件编码为 UTF-8 无 BOM。",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E5E7EB" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#111827",
            lineHeight: 1.5,
          }}
        >
          {q}
        </span>
        <span style={{ color: "#0D9488", flexShrink: 0 }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 18, paddingRight: 32 }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#4B5563",
              lineHeight: 1.75,
            }}
          >
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage({
  staticExport = false,
}: SupportPageProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div style={{ background: "#fff" }}>
      {/* Header */}
      <div
        style={{
          padding: "64px 24px 48px",
          background: "linear-gradient(180deg, #F0FDFA 0%, #fff 100%)",
          borderBottom: "1px solid #E5E7EB",
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
            常见问题与支持
          </h1>
          <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
            找不到答案？通过邮件或 QQ 群联系我们，我们通常在 24 小时内回复。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        {/* Contact cards */}
        <div
          id="contact"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 16,
            marginBottom: 64,
          }}
          className="contact-cards"
        >
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
        </div>

        {/* FAQ */}
        <div>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#111827",
              marginBottom: 28,
            }}
          >
            常见问题
          </h2>

          {staticExport ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {faqs.map(({ category, items }) => (
                <div
                  key={category}
                  style={{
                    borderRadius: 16,
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "14px 20px",
                      background: "#F9FAFB",
                      borderBottom: "1px solid #E5E7EB",
                      color: "#0D9488",
                      fontSize: "0.92rem",
                      fontWeight: 800,
                    }}
                  >
                    {category}
                  </div>
                  <div style={{ padding: "0 28px" }}>
                    {items.map(({ q, a }, index) => (
                      <div
                        key={q}
                        style={{
                          padding: "18px 0",
                          borderBottom:
                            index < items.length - 1
                              ? "1px solid #E5E7EB"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "#111827",
                            lineHeight: 1.5,
                            marginBottom: 10,
                          }}
                        >
                          {q}
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.9rem",
                            color: "#4B5563",
                            lineHeight: 1.75,
                          }}
                        >
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 32,
                  flexWrap: "wrap",
                }}
              >
                {faqs.map(({ category }, i) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(i)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: 999,
                      border:
                        activeCategory === i
                          ? "1.5px solid #0D9488"
                          : "1px solid #E5E7EB",
                      background: activeCategory === i ? "#F0FDFA" : "#fff",
                      color: activeCategory === i ? "#0D9488" : "#374151",
                      fontWeight: activeCategory === i ? 700 : 500,
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div
                style={{
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                  padding: "0 28px",
                  background: "#fff",
                }}
              >
                {faqs[activeCategory].items.map(({ q, a }) => (
                  <FaqItem key={q} q={q} a={a} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Still need help */}
        <div
          style={{
            marginTop: 48,
            padding: "36px 40px",
            borderRadius: 20,
            background: "linear-gradient(135deg, #F0FDFA, #CCFBF1)",
            border: "1px solid #CCFBF1",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.8rem", marginBottom: 12 }}>🤝</div>
          <h3
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            还有其他问题？
          </h3>
          <p
            style={{
              fontSize: "0.92rem",
              color: "#4B5563",
              marginBottom: 24,
              maxWidth: "44ch",
              margin: "0 auto 24px",
            }}
          >
            如果你的问题不在上述列表中，欢迎直接通过邮件或 QQ 群联系我们。
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="mailto:opentoken@kit.xin"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                borderRadius: 10,
                background: "#0D9488",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              <Mail size={15} /> 发送邮件
            </a>
            <a
              href={QQ_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 22px",
                borderRadius: 10,
                background: "#fff",
                color: "#0D9488",
                border: "1.5px solid #0D9488",
                fontWeight: 600,
                fontSize: "0.92rem",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} /> 加入 QQ 群
            </a>
          </div>
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
