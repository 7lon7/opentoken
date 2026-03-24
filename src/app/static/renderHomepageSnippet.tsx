import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import DeveloperPage from "../pages/DeveloperPage";
import HomePage from "../pages/HomePage";
import PricingPage from "../pages/PricingPage";
import SupportPage from "../pages/SupportPage";

function optimizeSvg(svg: string) {
  const normalizedSvg = svg
    .replace(/<\?xml[^>]*>/g, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/>[\s\n\r\t]+</g, "><")
    .replace(/[\n\r\t]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  return normalizedSvg.replace(/-?(?:\d*\.\d+|\d+)/g, value => {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue) || Number.isInteger(parsedValue)) {
      return value;
    }

    const rounded = Math.round(parsedValue * 10) / 10;
    const normalizedNumber = rounded.toString();

    return normalizedNumber === "-0" ? "0" : normalizedNumber;
  });
}

function svgToDataUrl(svg: string) {
  const optimizedSvg = optimizeSvg(svg);
  const encodedSvg = encodeURIComponent(optimizedSvg)
    .replace(/%20/g, " ")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/");

  return `data:image/svg+xml,${encodedSvg}`;
}

function fileToDataUrl(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".svg") {
    return svgToDataUrl(readFileSync(filePath, "utf8"));
  }

  const mimeType = ext === ".webp"
    ? "image/webp"
    : ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : "image/png";

  return `data:${mimeType};base64,${readFileSync(filePath).toString("base64")}`;
}

function ExportSection({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ scrollMarginTop: 84 }}>
      {children}
    </section>
  );
}

async function renderHomepageApp(projectRoot?: string) {
  const currentFile = fileURLToPath(import.meta.url);
  const rootDir = projectRoot ?? path.resolve(path.dirname(currentFile), "../../..");
  const logoImg = fileToDataUrl(path.join(rootDir, "src", "assets", "opentoken.svg"));

  return renderToStaticMarkup(
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        color: "#111827",
        fontFamily: '"Plus Jakarta Sans","Noto Sans SC",system-ui,-apple-system,"Microsoft YaHei",sans-serif',
      }}
    >
      <main style={{ flex: 1 }}>
        <ExportSection id="home">
          <HomePage
            logoImg={logoImg}
          />
        </ExportSection>
        <ExportSection id="pricing">
          <PricingPage />
        </ExportSection>
        <ExportSection id="developer">
          <DeveloperPage />
        </ExportSection>
        <ExportSection id="support">
          <SupportPage />
        </ExportSection>
      </main>
    </div>,
  );
}

export async function renderHomepageSnippet(projectRoot?: string) {
  const markup = await renderHomepageApp(projectRoot);

  return `\ufeff${markup}\n`;
}

export async function renderHomepageStandalone(projectRoot?: string) {
  const markup = await renderHomepageApp(projectRoot);

  return [
    "<!DOCTYPE html>",
    '<html lang="zh-CN">',
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    "<title>OpenToken</title>",
    "</head>",
    '<body style="margin:0">',
    markup,
    "</body>",
    "</html>",
    "",
  ].join("\n");
}
