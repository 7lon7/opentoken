import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { LOGIN_URL } from "../constants/links";
import DeveloperPage from "../pages/DeveloperPage";
import HomePage, { HOME_PAGE_USE_CASES } from "../pages/HomePage";
import ModelPlazaPage from "../pages/ModelPlazaPage";
import PricingPage from "../pages/PricingPage";
import SupportPage from "../pages/SupportPage";

function inferMimeTypeFromUrl(url: string) {
  const pathname = new URL(url).pathname.toLowerCase();

  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";

  return "image/jpeg";
}

function toDataUrl(content: Buffer, mimeType: string) {
  return `data:${mimeType};base64,${content.toString("base64")}`;
}

function fileToDataUrl(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = ext === ".svg"
    ? "image/svg+xml"
    : ext === ".webp"
      ? "image/webp"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : "image/png";

  return toDataUrl(readFileSync(filePath), mimeType);
}

async function remoteImageToDataUrl(url: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const mimeType = response.headers.get("content-type")?.split(";")[0] ?? inferMimeTypeFromUrl(url);
    const content = Buffer.from(await response.arrayBuffer());

    return toDataUrl(content, mimeType);
  } catch {
    return url;
  }
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
  const useCaseImages = await Promise.all(HOME_PAGE_USE_CASES.map(({ image }) => remoteImageToDataUrl(image)));
  const logoImg = fileToDataUrl(path.join(rootDir, "src", "assets", "opentoken.svg"));
  const openaiIcon = fileToDataUrl(path.join(rootDir, "src", "assets", "openai-mark.png"));
  const navigationTargets = {
    home: "#home",
    models: "#models",
    developer: "#developer",
    pricing: "#pricing",
    support: "#support",
    login: LOGIN_URL,
  };

  return renderToStaticMarkup(
    <StaticRouter location="/">
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        color: "#111827",
        fontFamily: '"Plus Jakarta Sans","Noto Sans SC",system-ui,-apple-system,"Microsoft YaHei",sans-serif',
      }}
      >
        <Navbar
          staticExport
          assetUrls={{ logoImg }}
          linkTargets={navigationTargets}
        />
        <main style={{ flex: 1 }}>
          <ExportSection id="home">
            <HomePage
              staticExport
              includeSectionPreviews={false}
              linkTargets={{
                developer: "#developer",
                models: "#models",
                pricing: "#pricing",
              }}
              assetUrls={{
                logoImg,
                openaiIcon,
                useCaseImages,
              }}
            />
          </ExportSection>
          <ExportSection id="models">
            <ModelPlazaPage
              staticExport
              assetUrls={{
                openaiIcon,
                useCaseImages,
              }}
            />
          </ExportSection>
          <ExportSection id="developer">
            <DeveloperPage staticExport />
          </ExportSection>
          <ExportSection id="pricing">
            <PricingPage />
          </ExportSection>
          <ExportSection id="support">
            <SupportPage staticExport />
          </ExportSection>
        </main>
        <Footer
          staticExport
          assetUrls={{ logoImg }}
          linkTargets={{
            models: "#models",
            pricing: "#pricing",
            login: LOGIN_URL,
            developer: "#developer",
            developerQuickstart: "#quickstart",
            developerExamples: "#examples",
            support: "#support",
            supportContact: "#contact",
          }}
        />
      </div>
    </StaticRouter>,
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
