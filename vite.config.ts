import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function figmaAssetPlaceholderPlugin() {
  const prefix = 'figma:asset/'
  const virtualPrefix = '\0figma-asset:'
  // 1x1 transparent PNG
  const transparentPngBase64 =
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO7WZ8kAAAAASUVORK5CYII='

  return {
    name: 'figma-asset-placeholder',
    resolveId(source: string) {
      if (source.startsWith(prefix)) {
        return virtualPrefix + source.slice(prefix.length)
      }
      return null
    },
    load(id: string) {
      if (id.startsWith(virtualPrefix)) {
        return `export default "data:image/png;base64,${transparentPngBase64}";`
      }
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    figmaAssetPlaceholderPlugin(),
    react(),
    tailwindcss(),
    viteSingleFile({ removeViteModuleLoader: true }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
})
