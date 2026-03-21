import { Zap, ArrowRight } from "lucide-react";
import openaiIcon from "@/assets/openai-mark.png";
import { LOGIN_URL } from "../constants/links";

type ModelPlazaPageAssetUrls = {
  openaiIcon?: string;
  useCaseImages?: string[];
};

export interface ModelPlazaPageProps {
  staticExport?: boolean;
  assetUrls?: ModelPlazaPageAssetUrls;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", padding: "4px 10px", borderRadius: 999, background: "#CCFBF1", color: "#0D9488", fontSize: "0.78rem", fontWeight: 700 }}>
      {children}
    </span>
  );
}

interface ModelCard {
  emoji: string;
  name: string;
  provider: string;
  providerColor: string;
  desc: string;
  tags: string[];
  badge?: string;
  badgeColor?: string;
  comingSoon?: boolean;
}

const models: ModelCard[] = [
  {
    emoji: "🤖",
    name: "ChatGPT-5.2-最新",
    provider: "OpenAI",
    providerColor: "#10A37F",
    desc: "OpenAI 旗舰模型，适合代码生成、推理分析、内容创作与通用助手场景。",
    tags: ["代码生成", "推理分析", "内容创作", "多模态"],
    badge: "最新",
    badgeColor: "#059669",
  },
  {
    emoji: "✨",
    name: "更多模型敬请期待",
    provider: "即将上线",
    providerColor: "#9CA3AF",
    desc: "我们正在接入更多前沿模型，包括 Claude、Gemini、Llama 等，持续扩展模型生态。",
    tags: ["Claude", "Gemini", "Llama", "更多..."],
    comingSoon: true,
  },
];

const useCases = [
  {
    icon: "⚙️",
    title: "Vibe Coding",
    subtitle: "最热的氛围编程",
    desc: "用自然语言描述需求，让 AI 帮你写代码、调试和部署，从 0 到 1 搭建自己的平台或工具。",
    image: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzczODMzMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: "🤖",
    title: "调用 Openclaw",
    subtitle: "开源 AI 助手",
    desc: "把智能助手部署在你自己的设备上，通过多平台消息联动与自动化流程打造专属 AI 工作台。",
    image: "https://images.unsplash.com/photo-1768400730810-5c4398d58ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcm9ib3QlMjBjaGFyYWN0ZXIlMjAzZHxlbnwxfHx8fDE3NzM4MzQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: "✍️",
    title: "内容创作",
    subtitle: "灵感不再卡顿",
    desc: "辅助撰写脚本、文章、广告文案和视频分镜，把重复创作劳动交给模型，提高产出效率。",
    image: "https://images.unsplash.com/photo-1769613758100-a5d12762b1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFydCUyMGNyZWF0aXZlJTIwd2FsbCUyMG11cmFsfGVufDF8fHx8MTc3MzgzNDM4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    icon: "🏢",
    title: "企业办公",
    subtitle: "从重复劳动中解放",
    desc: "文档摘要、翻译、会议纪要与知识整理，都可以由 AI 协助完成，让团队专注真正重要的事。",
    image: "https://images.unsplash.com/photo-1622131815452-cc00d8d89f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzM3ODM2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export default function ModelPlazaPage({ assetUrls }: ModelPlazaPageProps) {
  const resolvedOpenaiIcon = assetUrls?.openaiIcon ?? openaiIcon;

  return (
    <div style={{ background: "#fff" }}>
      <div style={{ padding: "64px 24px 48px", background: "linear-gradient(180deg, #F0FDFA 0%, #fff 100%)", borderBottom: "1px solid #E5E7EB", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Tag>模型广场</Tag>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, color: "#111827", marginTop: 18, marginBottom: 14, letterSpacing: "-0.04em" }}>
            一个接口接入全球顶尖 AI 模型
          </h1>
          <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
            统一接口，持续上线最新最强模型。按需调用，按量计费。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827", marginBottom: 24 }}>可用模型</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20 }} className="model-pg-grid">
          {models.map(({ emoji, name, provider, providerColor, desc, tags, badge, badgeColor, comingSoon }) => (
            <div
              key={name}
              style={{
                padding: "28px",
                borderRadius: 18,
                border: comingSoon ? "1px dashed #D1D5DB" : "1px solid #E5E7EB",
                background: comingSoon ? "#FAFAFA" : "#fff",
                transition: "all 0.2s ease",
                cursor: comingSoon ? "default" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!comingSoon) {
                  e.currentTarget.style.borderColor = "#0D9488";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(13,148,136,0.10)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = comingSoon ? "#D1D5DB" : "#E5E7EB";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    flexShrink: 0,
                    overflow: "hidden",
                    background: comingSoon ? "#F3F4F6" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                  }}
                >
                  {comingSoon ? emoji : <img src={resolvedOpenaiIcon} alt="OpenAI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: comingSoon ? "#9CA3AF" : "#111827" }}>{name}</h3>
                    {badge && (
                      <span style={{ padding: "2px 8px", borderRadius: 999, background: `${badgeColor}18`, color: badgeColor, fontSize: "0.72rem", fontWeight: 700 }}>{badge}</span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: providerColor, marginBottom: 10 }}>{provider}</div>
                  <p style={{ fontSize: "0.88rem", color: comingSoon ? "#9CA3AF" : "#6B7280", lineHeight: 1.65, marginBottom: 14 }}>{desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {tags.map((tag) => (
                      <span key={tag} style={{ padding: "3px 9px", borderRadius: 6, background: "#F3F4F6", color: comingSoon ? "#9CA3AF" : "#374151", fontSize: "0.75rem", fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              {!comingSoon && (
                <a
                  href={LOGIN_URL}
                  style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 8,
                    background: "#0D9488",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0F766E")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
                >
                  立即使用 <ArrowRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 72, borderTop: "1px solid #E5E7EB", paddingTop: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
            <div>
              <Tag>使用场景</Tag>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", marginTop: 12, letterSpacing: "-0.02em" }}>探索更多使用场景</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 16 }} className="model-pg-grid">
            {useCases.map(({ icon, title, subtitle, desc, image }, index) => (
              <div
                key={title}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  position: "relative",
                  height: 220,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <img src={assetUrls?.useCaseImages?.[index] ?? image} alt={title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)" }} />
                <div style={{ position: "relative", zIndex: 1, height: "100%", padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                      <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{title}</span>
                    </div>
                    <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, background: "rgba(245,158,11,0.85)", color: "#fff", fontSize: "0.78rem", fontWeight: 700, marginBottom: 8 }}>
                      {subtitle}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, textShadow: "0 1px 3px rgba(0,0,0,0.5)", maxWidth: "32ch" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 28 }}>
            <a
              href={LOGIN_URL}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 10,
                background: "#0D9488",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(13,148,136,0.25)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0F766E";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0D9488";
                e.currentTarget.style.transform = "";
              }}
            >
              <Zap size={16} /> 立即开始使用
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .model-pg-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
