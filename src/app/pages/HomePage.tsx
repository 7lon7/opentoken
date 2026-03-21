import { useNavigate, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap, DollarSign, Clock, Users, ChevronRight, Users2, Lock } from "lucide-react";
import logoImg from "@/assets/opentoken.svg";
import openaiIcon from "@/assets/openai-mark.png";
import { LOGIN_URL } from "../constants/links";

type HomePageLinks = {
  developer?: string;
  models?: string;
  pricing?: string;
};

type HomePageAssetUrls = {
  logoImg?: string;
  openaiIcon?: string;
  useCaseImages?: string[];
};

export interface HomePageProps {
  staticExport?: boolean;
  includeSectionPreviews?: boolean;
  linkTargets?: HomePageLinks;
  assetUrls?: HomePageAssetUrls;
}

const DEFAULT_LINK_TARGETS: Required<HomePageLinks> = {
  developer: "/developer",
  models: "/models",
  pricing: "/pricing",
};

export const HOME_PAGE_USE_CASES = [
  {
    icon: "⌨️", title: "Vibe Coding",
    subtitle: "最🔥的氛围编程",
    desc: "0基础搭建属于你自己的平台、程序等",
    image: "https://images.unsplash.com/photo-1733412505442-36cfa59a4240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRhcmslMjBzY3JlZW58ZW58MXx8fHwxNzczODMzMTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: "⚡", title: "调用 Openclaw",
    subtitle: "最🔥的开源AI助手",
    desc: "部署在你自己的设备上，通过多平台消息互动，自动化工作流程",
    image: "https://images.unsplash.com/photo-1768400730810-5c4398d58ae7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwcm9ib3QlMjBjaGFyYWN0ZXIlMjAzZHxlbnwxfHx8fDE3NzM4MzQzODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: "✍️", title: "内容创作",
    subtitle: "你的灵感用之不竭！",
    desc: "辅助撰写脚本、文章、广告文案、视频分镜等一切",
    image: "https://images.unsplash.com/photo-1769613758100-a5d12762b1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGFydCUyMGNyZWF0aXZlJTIwd2FsbCUyMG11cmFsfGVufDF8fHx8MTc3MzgzNDM4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    icon: "🏢", title: "企业办公",
    subtitle: "从单调枯燥中解放！",
    desc: "文档自动摘要、一键翻译、语音转文字生成会议纪要…",
    image: "https://images.unsplash.com/photo-1622131815452-cc00d8d89f02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzM3ODM2NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

function RouteLink({
  staticExport = false,
  to,
  href,
  style,
  className,
  children,
}: {
  staticExport?: boolean;
  to: string;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  if (staticExport) {
    return (
      <a href={href ?? to} style={style} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} style={style} className={className}>
      {children}
    </Link>
  );
}

/* ─── Animated Counter ─── */
function useCountUp(end: number, duration = 1800, suffix = "", prefix = "", staticExport = false) {
  const finalDisplay = prefix + end.toLocaleString() + suffix;
  const [display, setDisplay] = useState(staticExport ? finalDisplay : prefix + "0" + suffix);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (staticExport) {
      setDisplay(finalDisplay);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          const val = Math.floor(ease * end);
          setDisplay(prefix + val.toLocaleString() + suffix);
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [duration, end, finalDisplay, prefix, staticExport, suffix]);

  return { display, ref };
}

function StatCard({ icon, end, suffix, prefix, label, staticExport = false }: { icon: React.ReactNode; end: number; suffix?: string; prefix?: string; label: string; staticExport?: boolean }) {
  const { display, ref } = useCountUp(end, 1800, suffix || "", prefix || "", staticExport);
  return (
    <div ref={ref} style={{
      padding: "24px 18px", borderRadius: 18, textAlign: "center",
      background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E"), linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)`,
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 1px rgba(0,0,0,0.02)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 32px rgba(13,148,136,0.12), inset 0 1px 1px rgba(255,255,255,1)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(13,148,136,0.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03), inset 0 1px 1px rgba(255,255,255,1), inset 0 -1px 1px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)"; }}
    >
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "1.4rem", marginBottom: 12, textShadow: "0 2px 4px rgba(0,0,0,0.04)", color: "#0D9488", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "#0A2E2B", letterSpacing: "-0.03em", marginBottom: 4 }}>{display}</div>
        <div style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── Helpers ─── */
function Tag({ children, color = "#0D9488" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "4px 10px", borderRadius: 999,
      background: `${color}14`, color,
      fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.04em",
    }}>
      {children}
    </span>
  );
}

/* ─── HERO ─── */
function Hero({ staticExport = false, linkTargets, assetUrls }: HomePageProps) {
  const navigate = useNavigate();
  const resolvedLinks = { ...DEFAULT_LINK_TARGETS, ...linkTargets };
  const resolvedLogoImg = assetUrls?.logoImg ?? logoImg;

  return (
    <section style={{
      padding: "60px 24px 0",
      background: "linear-gradient(160deg, #E6FAF8 0%, #D5F5F0 30%, #E8FBF8 60%, #F0FDFA 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Soft decorative circles */}
      <div style={{ position: "absolute", top: -120, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "40%", left: "50%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        {/* Top bar - logo */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 14, marginBottom: 36, padding: "10px 20px 10px 10px", borderRadius: 999, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(13,148,136,0.15)", backdropFilter: "blur(12px)" }}>
          <img src={resolvedLogoImg} alt="OpenToken" style={{ height: 40, width: 40, objectFit: "contain" }} />
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#0D9488", letterSpacing: "-0.01em" }}>opentoken</span>
          <span style={{ width: 1, height: 18, background: "#D1D5DB", margin: "0 2px" }} />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#059669", background: "#ECFDF5", padding: "3px 10px", borderRadius: 999 }}>🔥 正式上线</span>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
          {/* Left - Text */}
          <div style={{ paddingBottom: 40 }}>
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

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 12 }} className="stats-grid">
              <StatCard icon={<Users2 size={28} />} end={32847} suffix="+" label="已服务用户" staticExport={staticExport} />
              <StatCard icon={<Zap size={28} />} end={48} suffix="亿+" label="已消耗 Token" staticExport={staticExport} />
              <StatCard icon={<Lock size={28} />} end={99} suffix=".9%" label="服务可用率" staticExport={staticExport} />
            </div>
          </div>

          {/* Right - Dashboard mockup */}
          <div style={{ position: "relative", minHeight: 420 }} className="hero-dashboard">
            {/* Main dashboard card */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
              borderRadius: 20, padding: "22px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(255,255,255,0.8)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "#9CA3AF", fontWeight: 600, marginBottom: 4 }}>控制台概览</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#111827" }}>Main Dashboard</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["调用量", "模型", "账单", "设置"].map((t, i) => (
                    <span key={t} style={{
                      padding: "5px 12px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
                      background: i === 0 ? "#0D9488" : "transparent",
                      color: i === 0 ? "#fff" : "#6B7280",
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Inner cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {/* Earning card */}
                <div style={{
                  padding: "14px", borderRadius: 14,
                  background: "linear-gradient(135deg, #F0FDFA 0%, #E6FAF8 100%)",
                  border: "1px solid rgba(13,148,136,0.1)",
                }}>
                  <div style={{ fontSize: "0.72rem", color: "#6B7280", fontWeight: 600, marginBottom: 4 }}>今日调用</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0D9488", letterSpacing: "-0.03em" }}>12,847</div>
                  <div style={{ fontSize: "0.7rem", color: "#059669", fontWeight: 600, marginTop: 4 }}>↑ 23.5% vs 昨日</div>
                  {/* Mini chart bars */}
                  <div style={{ display: "flex", gap: 3, alignItems: "flex-end", marginTop: 10, height: 28 }}>
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i >= 10 ? "#0D9488" : "rgba(13,148,136,0.3)", transition: "height 0.3s" }} />
                    ))}
                  </div>
                </div>

                {/* Demographics / model usage card */}
                <div style={{
                  padding: "14px", borderRadius: 14,
                  background: "linear-gradient(135deg, #FEF9E7 0%, #FFF8E1 100%)",
                  border: "1px solid rgba(245,158,11,0.12)",
                }}>
                  <div style={{ fontSize: "0.72rem", color: "#6B7280", fontWeight: 600, marginBottom: 4 }}>模型分布</div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#D97706", letterSpacing: "-0.03em" }}>6 个</div>
                  <div style={{ fontSize: "0.7rem", color: "#B45309", fontWeight: 600, marginTop: 4 }}>活跃模型接入</div>
                  {/* Donut-like indicator */}
                  <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                    {[
                      { name: "GPT", color: "#10A37F", pct: "42%" },
                      { name: "Claude", color: "#8B5CF6", pct: "28%" },
                      { name: "其他", color: "#F59E0B", pct: "30%" },
                    ].map(m => (
                      <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.68rem", color: "#374151", fontWeight: 600 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: m.color }} />
                        {m.name} {m.pct}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards row - aligned at bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: -10, right: 0,
              display: "flex", gap: 14, alignItems: "flex-end",
            }}>
              {/* Floating promo card */}
              <div style={{
                width: 200, padding: "16px", borderRadius: 16,
                background: "linear-gradient(135deg, #0D9488, #0F766E)",
                boxShadow: "0 12px 32px rgba(13,148,136,0.25)",
                color: "#fff",
              }} className="hero-float-1">
                <div style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: 4 }}>1/7 价格</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.9, marginBottom: 8, lineHeight: 1.5 }}>官方模型价格的七分之一<br/>余额永不过期</div>
                <div style={{ padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.2)", display: "inline-block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.03em" }}>
                  立即体验 →
                </div>
              </div>

              {/* Floating model status card */}
              <div style={{
                flex: 1, padding: "14px 18px", borderRadius: 14,
                background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                border: "1px solid rgba(255,255,255,0.8)",
              }} className="hero-float-2">
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#111827", marginBottom: 8 }}>模型状态</div>
                {[
                  { name: "ChatGPT-5.2", status: "在线", color: "#10A37F" },
                  { name: "Claude Sonnet", status: "即将", color: "#8B5CF6" },
                ].map(m => (
                  <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.color }} />
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#374151", flex: 1 }}>{m.name}</span>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                      background: m.status === "在线" ? "#ECFDF5" : "#F3F4F6",
                      color: m.status === "在线" ? "#059669" : "#9CA3AF",
                    }}>{m.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY ─── */
function Why() {
  const items = [
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

  return (
    <section style={{ padding: "80px 24px", background: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Grid texture background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(13,148,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.03) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -40, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Floating particles */}
      <div className="why-particle why-p1" style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "rgba(13,148,136,0.15)", top: "18%", left: "8%" }} />
      <div className="why-particle why-p2" style={{ position: "absolute", width: 4, height: 4, borderRadius: "50%", background: "rgba(139,92,246,0.12)", top: "35%", right: "12%" }} />
      <div className="why-particle why-p3" style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "rgba(245,158,11,0.10)", bottom: "25%", left: "15%" }} />
      <div className="why-particle why-p4" style={{ position: "absolute", width: 5, height: 5, borderRadius: "50%", background: "rgba(59,130,246,0.12)", top: "60%", right: "6%" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag>为什么选择我们</Tag>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 12, letterSpacing: "-0.03em" }}>
            为什么选择OpenToken
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "44ch", margin: "0 auto" }}>
            我们提供最具性价比的 AI 接入方案，帮助开发者与团队高效构建。
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 20 }} className="why-grid">
          {items.map(({ icon, title, desc, color }) => (
            <div key={title} style={{
              padding: "28px 24px", borderRadius: 16,
              border: "1px solid #E5E7EB", background: "#fff",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${color}50`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${color}12`; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, marginBottom: 18,
                background: `${color}14`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color,
              }}>
                {icon}
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginBottom: 10 }}>{title}</h3>
              <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MODEL PLAZA preview ─── */
function ModelPlazaPreview({ staticExport = false, linkTargets, assetUrls }: HomePageProps) {
  const resolvedLinks = { ...DEFAULT_LINK_TARGETS, ...linkTargets };
  const resolvedOpenaiIcon = assetUrls?.openaiIcon ?? openaiIcon;

  return (
    <section style={{ padding: "80px 24px", background: "#FAFAFA", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Tag>模型广场</Tag>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#111827", marginTop: 14, marginBottom: 8, letterSpacing: "-0.03em" }}>
              一个端口接入全球顶尖 AI 模型
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#6B7280" }}>持续上线更多前沿模型，满足多元场景需求。</p>
          </div>
          <RouteLink
            staticExport={staticExport}
            to="/models"
            href={resolvedLinks.models}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#0D9488", fontWeight: 600, fontSize: "0.92rem", textDecoration: "none" }}
          >
            查看全部 <ChevronRight size={16} />
          </RouteLink>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20 }} className="model-grid">
          {/* Card 1 */}
          <div style={{
            padding: "28px", borderRadius: 16,
            border: "1px solid #E5E7EB", background: "#fff",
            display: "flex", gap: 20, alignItems: "flex-start",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0D9488"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(13,148,136,0.10)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              overflow: "hidden",
            }}>
              <img src={resolvedOpenaiIcon} alt="OpenAI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827" }}>ChatGPT-5.2-最新</h3>
                <span style={{ padding: "2px 8px", borderRadius: 999, background: "#ECFDF5", color: "#059669", fontSize: "0.72rem", fontWeight: 700 }}>最新</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "#6B7280", lineHeight: 1.65, marginBottom: 16 }}>
                OpenAI 旗舰模型，六边形战士。可靠的 Debug 搭档、全能型助理。代码、写作、分析、推理，面面俱到。
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["代码生成", "推理分析", "内容创作", "多模态"].map(t => (
                  <span key={t} style={{ padding: "3px 8px", borderRadius: 6, background: "#F3F4F6", color: "#374151", fontSize: "0.75rem", fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 – coming soon */}
          <div style={{
            padding: "28px", borderRadius: 16,
            border: "1px dashed #D1D5DB", background: "#FAFAFA",
            display: "flex", gap: 20, alignItems: "center",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem",
            }}>
              ✨
            </div>
            <div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#9CA3AF", marginBottom: 8 }}>更多模型敬请期待</h3>
              <p style={{ fontSize: "0.88rem", color: "#9CA3AF", lineHeight: 1.65 }}>
                我们正在接入更多前沿模型，包括 Claude、Gemini、Llama 等，敬请关注。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── USE CASES ─── */
function UseCases({ staticExport = false, linkTargets, assetUrls }: HomePageProps) {
  const resolvedLinks = { ...DEFAULT_LINK_TARGETS, ...linkTargets };
  return (
    <section style={{ padding: "80px 24px", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag>使用场景</Tag>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 12, letterSpacing: "-0.03em" }}>
            探索无限可能
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "44ch", margin: "0 auto" }}>
            无论你是开发者、创作者还是企业用户，OpenToken 社区都能找到适合你的场景。
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20, marginBottom: 32 }} className="cases-grid">
          {HOME_PAGE_USE_CASES.map(({ icon, title, subtitle, desc, image }, index) => (
            <div key={title} style={{
              borderRadius: 18, overflow: "hidden", position: "relative",
              height: 220, cursor: "pointer",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              {/* Background image */}
              <img src={assetUrls?.useCaseImages?.[index] ?? image} alt={title} style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover",
              }} />
              {/* Dark overlay for text readability */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
              }} />
              {/* Content */}
              <div style={{
                position: "relative", zIndex: 1, height: "100%",
                padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "1.1rem" }}>{icon}</span>
                    <span style={{
                      fontSize: "1.15rem", fontWeight: 800, color: "#fff",
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}>{title}</span>
                  </div>
                  <div style={{
                    display: "inline-block", padding: "3px 10px", borderRadius: 6,
                    background: "rgba(245,158,11,0.85)", color: "#fff",
                    fontSize: "0.78rem", fontWeight: 700, marginBottom: 8,
                  }}>
                    {subtitle}
                  </div>
                </div>
                <p style={{
                  fontSize: "0.88rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6,
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                  maxWidth: "32ch",
                }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <RouteLink
            staticExport={staticExport}
            to="/models"
            href={resolvedLinks.models}
            style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 24px", borderRadius: 10,
            border: "1px solid #0D9488", color: "#0D9488",
            fontWeight: 600, fontSize: "0.95rem", textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          >
            更多实用场景 ➡️
          </RouteLink>
        </div>
      </div>
    </section>
  );
}

/* ─── PRICING PREVIEW ─── */
function PricingPreview({ staticExport = false, linkTargets }: HomePageProps) {
  const resolvedLinks = { ...DEFAULT_LINK_TARGETS, ...linkTargets };
  const plans = [
    {
      name: "轻量版", price: "¥19", period: "/月",
      desc: "适合个人开发者与轻量探索",
      features: ["基础模型访问", "按量计费", "邮件支持", "API 文档"],
      highlight: false,
    },
    {
      name: "业版", price: "¥49", period: "/月",
      desc: "适合频繁使用与团队开发",
      features: ["全量模型访问", "更高并发限制", "优先支持", "使用统计"],
      highlight: true,
    },
    {
      name: "满血版", price: "¥99", period: "/月",
      desc: "适合高强度生产环境",
      features: ["最高速率限制", "专属客服通道", "企业账单支持", "全部功能"],
      highlight: false,
    },
  ];

  return (
    <section style={{ padding: "80px 24px", background: "#FAFAFA", borderTop: "1px solid #E5E7EB" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Tag>支付方案</Tag>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#111827", marginTop: 16, marginBottom: 12, letterSpacing: "-0.03em" }}>
            简单透明的定价
          </h2>
          <p style={{ fontSize: "1rem", color: "#6B7280", maxWidth: "40ch", margin: "0 auto" }}>
            无隐藏费用，按需选择，随时升级。
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }} className="pricing-grid">
          {plans.map(({ name, price, period, desc, features, highlight }) => (
            <div key={name} style={{
              padding: "32px 28px", borderRadius: 18,
              border: highlight ? "2px solid #0D9488" : "1px solid #E5E7EB",
              background: highlight ? "linear-gradient(160deg, #F0FDFA, #fff)" : "#fff",
              position: "relative",
              boxShadow: highlight ? "0 8px 40px rgba(13,148,136,0.15)" : "none",
            }}>
              {highlight && (
                <div style={{
                  position: "absolute", top: -1, left: "50%", transform: "translateX(-50%) translateY(-50%)",
                  padding: "4px 14px", borderRadius: 999,
                  background: "#0D9488", color: "#fff",
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                }}>
                  最受欢迎
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, fontSize: "1rem", color: "#111827", marginBottom: 6 }}>{name}</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, marginBottom: 8 }}>
                  <span style={{ fontSize: "2.4rem", fontWeight: 800, color: highlight ? "#0D9488" : "#111827", letterSpacing: "-0.04em" }}>{price}</span>
                  <span style={{ fontSize: "0.9rem", color: "#6B7280", marginBottom: 6 }}>{period}</span>
                </div>
                <p style={{ fontSize: "0.88rem", color: "#6B7280" }}>{desc}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", color: "#374151" }}>
                    <span style={{ color: "#0D9488", fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <a
                href={LOGIN_URL}
                style={{
                  width: "100%", padding: "11px 0", borderRadius: 10,
                  background: highlight ? "#0D9488" : "#fff",
                  color: highlight ? "#fff" : "#0D9488",
                  border: highlight ? "none" : "1px solid #0D9488",
                  fontWeight: 700, fontSize: "0.92rem", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = highlight ? "#0F766E" : "#F0FDFA"; }}
                onMouseLeave={e => { e.currentTarget.style.background = highlight ? "#0D9488" : "#fff"; }}
              >
                获取 API 密钥
              </a>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <RouteLink
            staticExport={staticExport}
            to="/pricing"
            href={resolvedLinks.pricing}
            style={{ fontSize: "0.88rem", color: "#6B7280", textDecoration: "none" }}
          >
            查看完整方案对比 →
          </RouteLink>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function HomePage(props: HomePageProps) {
  const includeSectionPreviews = props.includeSectionPreviews ?? true;

  return (
    <>
      <Hero {...props} />
      <Why />
      {includeSectionPreviews && <ModelPlazaPreview {...props} />}
      {includeSectionPreviews && <UseCases {...props} />}
      {includeSectionPreviews && <PricingPreview {...props} />}

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .hero-float-1 { animation: floatY 5s ease-in-out 0.3s infinite; }
        .hero-float-2 { animation: floatY 4.5s ease-in-out 1s infinite; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-dashboard { display: none !important; }
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .model-grid { grid-template-columns: 1fr !important; }
          .cases-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 560px) {
          .why-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </>
  );
}
