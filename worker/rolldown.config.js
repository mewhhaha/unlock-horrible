import { defineConfig } from "rolldown";

export default defineConfig({
  input: ["./main.tsx"],
  experimental: {
    resolveNewUrlToAsset: true,
  },
  resolve: {
    conditionNames: ["import"],
  },

  output: {
    dir: "dist",
    format: "esm",
  },

  plugins: [
    {
      renderChunk: (chunk) => {
        return chunk.replaceAll(/import\.meta\.url/g, '"file://"');
      },
    },
  ],

  treeshake: true,
  external: ["cloudflare:workers", "crypto"],
  jsx: {
    jsxImportSource: "@mewhhaha/htmx-router",
  },
});
