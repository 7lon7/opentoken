import { ArrowRight, Zap, DollarSign, Clock, Users } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import { LOGIN_URL } from "../constants/links";

export interface HomePageProps {
  logoImg?: string;
}

const WHY_ITEMS = [
  {
    icon: <Zap size={22} />, title: "统一接口",
    desc: "一个 API，百种模型。一键更换，轻松使用。无需对接多个平台，统一管理更便捷。",
    color: "#0D9488",
  },
  {
    icon: <DollarSign size={22} />, title: "超低成本",
    desc: "模型价格 = 官方价格 1/70，余额永不过期。按量付费，没有隐藏费用，成本结构清晰透明。",
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
    accent: "#F4A460",
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
function Hero({ logoImg: logoImgProp }: HomePageProps) {
  const resolvedLogoImg = logoImgProp ?? logoImg;

  return (
    <section style={{
      padding: "clamp(20px, 4vw, 34px) clamp(16px, 4vw, 28px) clamp(16px, 3vw, 24px)",
      background: "linear-gradient(160deg, #E6FAF8 0%, #D5F5F0 30%, #E8FBF8 60%, #F0FDFA 100%)",
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
    }}>
      {/* Soft decorative circles */}
      <div style={{ position: "absolute", top: "-12%", right: "-8%", width: "min(56vw, 500px)", height: "min(56vw, 500px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-7%", width: "min(46vw, 400px)", height: "min(46vw, 400px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", width: "min(34vw, 300px)", height: "min(34vw, 300px)", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px,0.9fr) minmax(0,1.1fr)",
            gap: "clamp(24px, 6vw, 70px)",
            alignItems: "center",
            maxWidth: 1120,
            margin: "0 auto",
          }}
          className="hero-main-grid"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "clamp(8px, 2vw, 20px) clamp(6px, 2vw, 18px) clamp(16px, 3vw, 34px)",
            }}
            className="hero-logo-col"
          >
            <div
              style={{
                width: "100%",
                maxWidth: "clamp(250px, 35vw, 390px)",
                borderRadius: "clamp(18px, 3vw, 28px)",
                padding: "clamp(16px, 2.5vw, 24px)",
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
                  maxHeight: "clamp(220px, 30vw, 320px)",
                  objectFit: "contain",
                  transform: "translateY(4px)",
                }}
              />
            </div>
          </div>

          <div style={{ paddingBottom: 8, paddingLeft: "clamp(0px, 0.8vw, 6px)" }} className="hero-text-col">
            <h1 style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)", fontWeight: 800,
              letterSpacing: "-0.04em", lineHeight: 1.1,
              color: "#0A2E2B", marginBottom: "clamp(14px, 2vw, 20px)",
            }}>
              一个 API，<br /><span style={{ color: "#0D9488" }}>♾️ 种可能</span>
            </h1>

            <p style={{ fontSize: "clamp(0.96rem, 1.8vw, 1.05rem)", color: "#4B5563", lineHeight: 1.75, maxWidth: "min(42ch, 100%)", marginBottom: "clamp(20px, 3.2vw, 32px)" }} className="hero-text-desc">
              统一接口、按需付费、全天候支持。接入全球顶尖 AI 模型，成本低至官方价格的 <strong style={{ color: "#0D9488" }}>1/70</strong>。
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "clamp(20px, 3vw, 32px)" }} className="hero-cta-row">
              <a
                href={LOGIN_URL}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "clamp(12px, 2.3vw, 14px) clamp(22px, 4vw, 32px)", borderRadius: 14,
                  background: "#0D9488", color: "#fff",
                  fontWeight: 700, fontSize: "1rem",
                  textDecoration: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(13,148,136,0.35)",
                  transition: "all 0.2s ease",
                }}
                className="hero-cta-link"
                onMouseEnter={e => { e.currentTarget.style.background = "#0F766E"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(13,148,136,0.40)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#0D9488"; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,148,136,0.35)"; }}
              >
                获取API KEY <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "clamp(8px, 1.8vw, 14px)", paddingBottom: 8 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "clamp(14px, 2vw, 20px)",
          }} className="hero-features-grid">
            {WHY_ITEMS.map(({ icon, title, desc, color }) => (
              <div key={title} style={{
                padding: "clamp(18px, 2.5vw, 24px) clamp(16px, 2.3vw, 22px)",
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

        <div style={{ marginTop: "clamp(16px, 3vw, 24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "clamp(14px, 2vw, 20px)" }} className="model-spotlight-grid">
            {MODEL_SPOTLIGHT_ITEMS.map(({ name, accent, summary, details, tags }) => (
              <div key={name} style={{
                padding: "clamp(20px, 2.8vw, 26px) clamp(18px, 2.5vw, 24px)",
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
          .hero-text-col { padding-left: 0 !important; text-align: center; }
          .hero-text-desc { margin-left: auto; margin-right: auto; }
          .hero-cta-row { justify-content: center; }
        }
        @media (max-width: 560px) {
          .hero-logo-col { max-width: 260px; }
          .hero-features-grid { grid-template-columns: 1fr !important; }
          .hero-cta-link { width: 100%; justify-content: center; }
        }
      `}</style>
    </>
  );
}
