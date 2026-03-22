import { useNavigate } from "react-router";
import { ArrowRight, Zap, DollarSign, Clock, Users } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import { LOGIN_URL } from "../constants/links";

type HomePageLinks = {
  developer?: string;
};

type HomePageAssetUrls = {
  logoImg?: string;
};

export interface HomePageProps {
  staticExport?: boolean;
  linkTargets?: HomePageLinks;
  assetUrls?: HomePageAssetUrls;
}

const DEFAULT_LINK_TARGETS: Required<HomePageLinks> = {
  developer: "/developer",
};

const WHY_ITEMS = [
  {
    icon: <Zap size={22} />, title: "统一接口",
    desc: "一个 API，百种模型。一键更换，轻松使用。无需对接多个平台，统一管理更便捷。",
    color: "#0D9488",
  },
  {
    icon: <DollarSign size={22} />, title: "超低成本",
    desc: "模型价格 = 官方价格 1/7，余额永不过期。按量付费，没有隐藏费用，成本结构清晰透明。",
    color: "#F59E0B",
  },
  {
    icon: <Clock size={22} />, title: "全天候稳定",
    desc: "99.9% 服务可用率，围绕开发工作流优化接入链路，减少中断、失败与重复重试。",
    color: "#8B5CF6",
  },
  {
    icon: <Users size={22} />, title: "面向团队扩展",
    desc: "从个人开发到小团队协作，可以平滑扩展而不必重建工作流，低迁移成本。",
    color: "#3B82F6",
  },
];

const MODEL_SPOTLIGHT_ITEMS = [
  {
    name: "GPT",
    accent: "#10A37F",
    summary: "全能型通用模型，适合写作、编程、分析与日常问答。",
    details: "在代码生成、复杂推理和多轮对话上表现均衡，适合作为大多数场景的默认选择。",
    tags: ["代码", "推理", "写作"],
  },
  {
    name: "Claude",
    accent: "#8B5CF6",
    summary: "长文本理解能力强，擅长文档处理、总结归纳与严谨表达。",
    details: "在阅读长文档、撰写方案、整理资料和输出自然语言内容时体验稳定流畅。",
    tags: ["长文本", "总结", "文档"],
  },
  {
    name: "Gemini",
    accent: "#2563EB",
    summary: "多模态能力突出，适合图文结合、信息检索与创意探索。",
    details: "在图像理解、跨模态任务和轻量创意场景中表现灵活，适合拓展更多应用形态。",
    tags: ["多模态", "图像", "创意"],
  },
];

/* ─── HERO ─── */
function Hero({ staticExport = false, linkTargets, assetUrls }: HomePageProps) {
  const navigate = useNavigate();
  const resolvedLinks = { ...DEFAULT_LINK_TARGETS, ...linkTargets };
  const resolvedLogoImg = assetUrls?.logoImg ?? logoImg;

  return (
    <section style={{
      padding: "30px 24px 20px",
      background: "linear-gradient(160deg, #E6FAF8 0%, #D5F5F0 30%, #E8FBF8 60%, #F0FDFA 100%)",
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
    }}>
      {/* Soft decorative circles */}
      <div style={{ position: "absolute", top: -120, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(320px,0.9fr) minmax(0,1.1fr)",
            gap: 70,
            alignItems: "center",
            maxWidth: 1100,
            margin: "0 auto",
          }}
          className="hero-main-grid"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "24px 18px 34px",
            }}
            className="hero-logo-col"
          >
            <div
              style={{
                width: "100%",
                maxWidth: 390,
                borderRadius: 28,
                padding: 24,
                background: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(13,148,136,0.22)",
                boxShadow: "0 18px 42px rgba(13,148,136,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <img
                src={resolvedLogoImg}
                alt="OpenToken"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  maxHeight: 320,
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          <div style={{ paddingBottom: 8, paddingLeft: 6 }}>
            <h1 style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.1,
              color: "#0A2E2B", marginBottom: 20,
            }}>
              一个 API，<br /><span style={{ color: "#0D9488" }}>♾️ 种可能</span>
            </h1>

            <p style={{ fontSize: "1.05rem", color: "#4B5563", lineHeight: 1.75, maxWidth: "40ch", marginBottom: 32 }}>
              统一接口、按需付费、全天候支持。接入全球顶尖 AI 模型，成本低至官方价格的 <strong style={{ color: "#0D9488" }}>1/7</strong>。
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a
                href={LOGIN_URL}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 32px", borderRadius: 14,
                  background: "#0D9488", color: "#fff",
                  fontWeight: 700, fontSize: "1rem",
                  textDecoration: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(13,148,136,0.35)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#0F766E"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,148,136,0.40)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0D9488"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,148,136,0.35)"; }}
              >
                免费开始 <ArrowRight size={18} />
              </a>
              {staticExport ? (
                <a
                  href={resolvedLinks.developer}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 32px", borderRadius: 14,
                    background: "rgba(255,255,255,0.85)", color: "#374151",
                    fontWeight: 600, fontSize: "1rem",
                    border: "1px solid rgba(209,213,219,0.8)", cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s ease",
                    textDecoration: "none",
                  }}
                >
                  查看文档
                </a>
              ) : (
                <button
                  onClick={() => navigate(resolvedLinks.developer)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "14px 32px", borderRadius: 14,
                    background: "rgba(255,255,255,0.85)", color: "#374151",
                    fontWeight: 600, fontSize: "1rem",
                    border: "1px solid rgba(209,213,219,0.8)", cursor: "pointer",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#0D9488"; e.currentTarget.style.color = "#0D9488"; e.currentTarget.style.background = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(209,213,219,0.8)"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.background = "rgba(255,255,255,0.85)"; }}
                >
                  查看文档
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12, paddingBottom: 8 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,minmax(0,1fr))",
            gap: 18,
          }} className="hero-features-grid">
            {WHY_ITEMS.map(({ icon, title, desc, color }) => (
              <div key={title} style={{
                padding: "24px 22px",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(15,23,42,0.06)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 34px ${color}16`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.7)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(15,23,42,0.06)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 12, marginBottom: 16,
                  background: `${color}14`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color,
                }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: "0.9rem", color: "#6B7280", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }} className="model-spotlight-grid">
            {MODEL_SPOTLIGHT_ITEMS.map(({ name, accent, summary, details, tags }) => (
              <div key={name} style={{
                padding: "26px 24px",
                borderRadius: 18,
                border: "1px solid #E5E7EB",
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
                boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${accent}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 36px ${accent}14`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(15,23,42,0.05)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>{name}</div>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: accent,
                    boxShadow: `0 0 0 6px ${accent}18`,
                  }} />
                </div>
                <p style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.75, fontWeight: 600, marginBottom: 12 }}>
                  {summary}
                </p>
                <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.7, marginBottom: 18 }}>
                  {details}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {tags.map(tag => (
                    <span key={tag} style={{
                      padding: "5px 10px",
                      borderRadius: 999,
                      background: `${accent}12`,
                      color: accent,
                      fontSize: "0.76rem",
                      fontWeight: 700,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function HomePage(props: HomePageProps) {
  return (
    <>
      <Hero {...props} />

      <style>{`
        @media (max-width: 900px) {
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .hero-logo-col { max-width: 360px; margin: 0 auto; width: 100%; }
          .hero-features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .model-spotlight-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .hero-logo-col { max-width: 260px; }
          .hero-features-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
