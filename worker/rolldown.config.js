import { defineConfig } from "rolldown";
import { Scanner } from "@tailwindcss/oxide";
import { compile } from "@tailwindcss/node";
import FastGlob from "fast-glob";
import path from "node:path";

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
    {
      transform: async (code, id) => {
        const base = import.meta.dirname;

        if (id.endsWith(".css") && code.includes('@import "tailwindcss"')) {
          const compiler = await compile(code, {
            base,
            onDependency: () => {},
          });

          const sources = (await FastGlob("app/**/*.tsx", { cwd: base })).map(
            (v) => ({ base: import.meta.dirname, pattern: v }),
          );

          const scanner = new Scanner({ sources });

          const candidates = scanner.scan();

          return compiler.build(candidates);
        }
        return;
      },
    },
  ],

  treeshake: true,
  external: ["cloudflare:workers", "crypto"],
  jsx: {
    jsxImportSource: "@mewhhaha/htmx-router",
  },
});
