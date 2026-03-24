import {
  Terminal,
  Code2,
  Zap,
  BookOpen,
} from "lucide-react";

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

function IC({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        display: "inline-block",
        padding: "1px 6px",
        borderRadius: 5,
        background: "#F3F4F6",
        fontFamily: "Consolas,'SFMono-Regular',monospace",
        fontSize: "0.87em",
        color: "#374151",
        maxWidth: "100%",
        overflowWrap: "anywhere",
        whiteSpace: "normal",
      }}
    >
      {children}
    </code>
  );
}

function CopyableCode({
  code,
  lang = "bash",
}: {
  code: string;
  lang?: string;
}) {
  return (
    <div style={{ position: "relative", marginTop: 12 }}>
      <pre
        style={{
          margin: 0,
          padding: "clamp(14px, 2.4vw, 18px) clamp(14px, 2.7vw, 20px)",
          borderRadius: 12,
          border: "1px solid #1F2937",
          background: "#111827",
          color: "#F9FAFB",
          font: "0.875rem/1.65 Consolas,'SFMono-Regular',monospace",
          overflowX: "auto",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 10,
            padding: "2px 8px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            color: "#9CA3AF",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {lang}
        </span>
        <br />
        <code style={{ color: "#E5E7EB" }}>{code}</code>
      </pre>
    </div>
  );
}

const quickstartSteps = [
  {
    step: "01",
    title: "获取 API 密钥",
    desc: "注册账号后，在控制台生成你的专属 API 密钥（sk- 开头）。",
    code: `# 你的 API Key 格式如下
sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
    lang: "bash",
  },
  {
    step: "02",
    title: "安装 SDK",
    desc: "支持 Python、Node.js 等多种语言，使用 OpenAI 兼容 SDK 快速上手。",
    code: `pip install openai
# 或
npm install openai`,
    lang: "bash",
  },
  {
    step: "03",
    title: "发起第一个请求",
    desc: "将 base_url 替换为 OpenToken 域名，即可无缝迁移。",
    code: `from openai import OpenAI

client = OpenAI(
    api_key="your-opentoken-key",
    base_url="https://kit.xin/v1"
)

response = client.chat.completions.create(
    model="gpt-5.2",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)`,
    lang: "python",
  },
];

const examples = [
  {
    label: "Python",
    icon: "🐍",
    code: `from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://kit.xin/v1"
)

chat = client.chat.completions.create(
    model="gpt-5.2",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "写一首关于AI的诗"}
    ]
)
print(chat.choices[0].message.content)`,
    lang: "python",
  },
  {
    label: "Node.js",
    icon: "🟢",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "sk-your-key",
  baseURL: "https://kit.xin/v1",
});

const response = await client.chat.completions.create({
  model: "gpt-5.2",
  messages: [{ role: "user", content: "写一首关于AI的诗" }],
});
console.log(response.choices[0].message.content);`,
    lang: "javascript",
  },
  {
    label: "cURL",
    icon: "🌐",
    code: `curl https://kit.xin/v1/chat/completions \\
  -H "Authorization: Bearer sk-your-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-5.2",
    "messages": [
      {"role": "user", "content": "你好！"}
    ]
  }'`,
    lang: "bash",
  },
];

export default function DeveloperPage() {

  return (
    <div style={{ background: "#fff" }}>
      {/* Header */}
      <div
        style={{
          padding: "clamp(44px, 7vw, 64px) clamp(16px, 4vw, 28px) clamp(30px, 5vw, 48px)",
          background: "linear-gradient(180deg, #F0FDFA 0%, #fff 100%)",
          borderBottom: "1px solid #E5E7EB",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Tag>
            <Code2 size={13} style={{ marginRight: 4 }} /> 开发者支持
          </Tag>
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
            API 文档与快速入门
          </h1>
          <p style={{ fontSize: "1rem", color: "#4B5563", lineHeight: 1.7 }}>
            兼容 OpenAI API 标准，5 分钟完成接入，支持 Python、Node.js、cURL
            等多种方式。
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(34px, 6vw, 56px) clamp(16px, 4vw, 28px)" }}>
        {/* API Overview */}
        <div id="quickstart" style={{ marginBottom: "clamp(42px, 6vw, 72px)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0D9488",
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                }}
              >
                快速入门
              </h2>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#6B7280" }}>
                三步完成接入，无需修改业务逻辑
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(14px, 2.4vw, 24px)" }}>
            {quickstartSteps.map(({ step, title, desc, code, lang }) => (
              <div
                key={step}
                style={{
                  display: "flex",
                  gap: "clamp(14px, 2.6vw, 24px)",
                  padding: "clamp(18px, 3vw, 28px)",
                  borderRadius: 16,
                  border: "1px solid #E5E7EB",
                  background: "#FAFAFA",
                }}
                className="qs-step"
              >
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "#0D9488",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    {step}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 6,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "#6B7280",
                      marginBottom: 0,
                    }}
                  >
                    {desc}
                  </p>
                  <CopyableCode
                    code={code}
                    lang={lang}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div style={{ marginBottom: "clamp(42px, 6vw, 72px)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0D9488",
              }}
            >
              <BookOpen size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                }}
              >
                API 参考
              </h2>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#6B7280" }}>
                兼容 OpenAI API v1 规范
              </p>
            </div>
          </div>

          <div
            style={{
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "clamp(12px, 2vw, 16px) clamp(14px, 2.8vw, 24px)",
                background: "#F9FAFB",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
              className="api-table-head"
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                端点
              </span>
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "#6B7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginLeft: "auto",
                }}
              >
                说明
              </span>
            </div>
            {[
              {
                method: "POST",
                path: "/v1/chat/completions",
                desc: "对话补全，兼容 ChatGPT 格式",
              },
              {
                method: "POST",
                path: "/v1/completions",
                desc: "文本补全（传统格式）",
              },
              { method: "GET", path: "/v1/models", desc: "列出可用模型" },
              {
                method: "POST",
                path: "/v1/embeddings",
                desc: "生成文本嵌入向量",
              },
              {
                method: "POST",
                path: "/v1/images/generations",
                desc: "图像生成",
              },
              {
                method: "POST",
                path: "/v1/responses",
                desc: "OpenAI Responses API 兼容格式",
              },
            ].map(({ method, path, desc }, i) => (
              <div
                key={path}
                style={{
                  padding: "clamp(12px, 2vw, 16px) clamp(14px, 2.8vw, 24px)",
                  borderBottom: i < 5 ? "1px solid #E5E7EB" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "#fff",
                }}
                className="api-row"
              >
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    background: method === "GET" ? "#ECFDF5" : "#EFF6FF",
                    color: method === "GET" ? "#059669" : "#3B82F6",
                    flexShrink: 0,
                  }}
                >
                  {method}
                </span>
                <IC>{path}</IC>
                <span
                  style={{
                    fontSize: "0.88rem",
                    color: "#6B7280",
                    marginLeft: "auto",
                  }}
                  className="api-row-desc"
                >
                  {desc}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "clamp(12px, 2vw, 14px) clamp(14px, 2.4vw, 18px)",
              borderRadius: 12,
              borderLeft: "4px solid #0D9488",
              background: "#F0FDFA",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.88rem",
                color: "#374151",
                lineHeight: 1.65,
              }}
            >
              <strong>Base URL：</strong>
              <IC>https://kit.xin</IC> &nbsp; 所有请求均需在 Header 中携带{" "}
              <IC>Authorization: Bearer sk-your-key</IC>
            </p>
          </div>
        </div>

        {/* Code Examples */}
        <div id="examples">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#F0FDFA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0D9488",
              }}
            >
              <Terminal size={20} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                }}
              >
                代码示例
              </h2>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#6B7280" }}>
                多语言示例，开箱即用
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px, 3vw, 28px)" }}>
            {examples.map(({ label, icon, code, lang }) => (
              <div key={label}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                    padding: "7px 14px",
                    borderRadius: 999,
                    background: "#F3F4F6",
                    color: "#374151",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                  }}
                >
                  <span>{icon}</span> {label}
                </div>
                <CopyableCode code={code} lang={lang} />
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 820px) {
          .api-table-head { padding: 12px 14px !important; }
          .api-row { padding: 12px 14px !important; align-items: flex-start !important; gap: 10px !important; flex-wrap: wrap; }
          .api-row-desc { margin-left: 0 !important; width: 100%; }
        }
        @media (max-width: 640px) {
          .qs-step { flex-direction: column !important; gap: 14px !important; padding: 18px !important; }
        }
      `}</style>
    </div>
  );
}
