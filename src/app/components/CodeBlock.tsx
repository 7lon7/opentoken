import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  lang?: string;
}

function detectLang(text: string): string {
  const v = text.trim();
  if (!v) return "plaintext";
  if (/^\s*function\s+main\b/m.test(v) || /\bconst\s+\w+\s*=/m.test(v)) return "js";
  if (/^\s*\{[\s\S]*\}\s*$/.test(v)) return "json";
  if (/approval_policy\s*=|model_provider\s*=|wire_api\s*=/.test(v)) return "toml";
  if (/^\[.+\]\s*$/m.test(v) && !/^\s*\{/.test(v)) return "toml";
  if (/^[A-Z0-9_]+=.+/m.test(v) && !/[{}]/.test(v)) return "env";
  if (/^(npm|cd|mkdir|claude\b|codex\b|gemini\b|opencode\b|openclaw\b|clawdbot\b|Ctrl)/m.test(v)) return "bash";
  return "plaintext";
}

function colorizeCode(code: string, lang: string): React.ReactNode[] {
  // Simple tokenizer for visual highlighting
  const lines = code.split("\n");
  return lines.map((line, i) => {
    let colored: React.ReactNode = line;

    if (lang === "json") {
      // keys in blue, strings in green, numbers/booleans in orange
      const parts: React.ReactNode[] = [];
      const regex = /("(?:[^"\\]|\\.)*")\s*(:)|("(?:[^"\\]|\\.)*")|(true|false|null)|(-?\d+(?:\.\d+)?)|([{}[\],:])/g;
      let last = 0, m: RegExpExecArray | null;
      while ((m = regex.exec(line)) !== null) {
        if (m.index > last) parts.push(line.slice(last, m.index));
        if (m[2]) {
          // key: value pair
          parts.push(<span key={m.index} style={{ color: "#79c0ff" }}>{m[1]}</span>);
          parts.push(<span key={m.index + "c"} style={{ color: "#c9d1d9" }}>{m[2]}</span>);
        } else if (m[3]) {
          parts.push(<span key={m.index} style={{ color: "#a5d6ff" }}>{m[3]}</span>);
        } else if (m[4]) {
          parts.push(<span key={m.index} style={{ color: "#ff7b72" }}>{m[4]}</span>);
        } else if (m[5]) {
          parts.push(<span key={m.index} style={{ color: "#f0883e" }}>{m[5]}</span>);
        } else {
          parts.push(<span key={m.index} style={{ color: "#c9d1d9" }}>{m[6]}</span>);
        }
        last = m.index + m[0].length;
      }
      if (last < line.length) parts.push(line.slice(last));
      colored = parts.length > 0 ? parts : line;
    } else if (lang === "toml") {
      if (/^\[/.test(line.trim())) {
        colored = <span style={{ color: "#d2a8ff" }}>{line}</span>;
      } else if (/^#/.test(line.trim())) {
        colored = <span style={{ color: "#8b949e" }}>{line}</span>;
      } else if (/=/.test(line)) {
        const eqIdx = line.indexOf("=");
        const key = line.slice(0, eqIdx);
        const val = line.slice(eqIdx + 1);
        colored = (
          <>
            <span style={{ color: "#79c0ff" }}>{key}</span>
            <span style={{ color: "#c9d1d9" }}>=</span>
            <span style={{ color: "#a5d6ff" }}>{val}</span>
          </>
        );
      }
    } else if (lang === "bash") {
      if (/^#/.test(line.trim())) {
        colored = <span style={{ color: "#8b949e" }}>{line}</span>;
      } else if (/^(npm|node|npx|cd|mkdir|claude|codex|gemini|opencode|openclaw|clawdbot)\b/.test(line.trim())) {
        const firstSpace = line.indexOf(" ");
        if (firstSpace > -1) {
          colored = (
            <>
              <span style={{ color: "#7ee787" }}>{line.slice(0, firstSpace)}</span>
              <span style={{ color: "#e6edf3" }}>{line.slice(firstSpace)}</span>
            </>
          );
        } else {
          colored = <span style={{ color: "#7ee787" }}>{line}</span>;
        }
      } else if (/^Ctrl/.test(line.trim())) {
        colored = <span style={{ color: "#f0883e" }}>{line}</span>;
      }
    } else if (lang === "env") {
      if (/=/.test(line)) {
        const eqIdx = line.indexOf("=");
        colored = (
          <>
            <span style={{ color: "#79c0ff" }}>{line.slice(0, eqIdx)}</span>
            <span style={{ color: "#c9d1d9" }}>=</span>
            <span style={{ color: "#a5d6ff" }}>{line.slice(eqIdx + 1)}</span>
          </>
        );
      }
    } else if (lang === "js") {
      if (/^\s*\/\//.test(line)) {
        colored = <span style={{ color: "#8b949e" }}>{line}</span>;
      }
    }

    return (
      <span key={i} style={{ display: "block" }}>
        {colored}
      </span>
    );
  });
}

export function CodeBlock({ code, lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const detectedLang = lang || detectLang(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const langLabels: Record<string, string> = {
    json: "JSON", toml: "TOML", bash: "BASH", env: "ENV",
    js: "JS", plaintext: "TEXT",
  };

  return (
    <div style={{ position: "relative", marginTop: 4 }}>
      <pre
        style={{
          margin: 0,
          padding: "16px 18px",
          overflowX: "auto",
          borderRadius: 16,
          border: "1px solid rgba(48, 54, 61, 0.8)",
          background: "#0d1117",
          color: "#e6edf3",
          font: "0.875rem/1.6 'Consolas', 'SFMono-Regular', 'Courier New', monospace",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: 10,
            padding: "3px 10px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.07)",
            color: "#8b949e",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {langLabels[detectedLang] || detectedLang.toUpperCase()}
        </span>
        <br />
        <code style={{ fontFamily: "inherit", background: "transparent" }}>
          {colorizeCode(code, detectedLang)}
        </code>
      </pre>
      <button
        onClick={handleCopy}
        title="复制代码"
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "5px 10px",
          borderRadius: 8,
          border: "1px solid rgba(48, 54, 61, 0.8)",
          background: copied ? "rgba(46, 160, 67, 0.15)" : "rgba(22, 27, 34, 0.9)",
          color: copied ? "#3fb950" : "#8b949e",
          fontSize: "0.78rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
        {copied ? "已复制" : "复制"}
      </button>
    </div>
  );
}
