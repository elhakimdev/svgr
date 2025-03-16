import { defineConfig } from "vite";
import vitePluginDts from "vite-plugin-dts";
import vitePluginLegacy from "@vitejs/plugin-legacy";
import vitePluginTsConfigPaths from "vite-tsconfig-paths";
import path from "path";

export interface createViteConfigOpts {
  name?: string;
  outDir?: string;
}

export const createViteConfig = (
  packageDir: string,
  mode: string,
  options?: createViteConfigOpts,
) => {
  let tsConfigFile = "tsconfig.base.json"; // Default TS config

  if (mode === "production") {
    tsConfigFile = "tsconfig.prod.json";
  } else if (mode === "test") {
    tsConfigFile = "tsconfig.test.json";
  } else if (mode === "lib") {
    tsConfigFile = "tsconfig.lib.json";
  }

  return defineConfig({
    root: packageDir,
    build: {
      lib: {
        name: options?.name ?? "svgr",
        entry: path.resolve(packageDir, "src/index.ts"),
        formats: ["es", "cjs", "iife", "system", "umd"],
        fileName: (fmt) => `index.${fmt}.js`,
      },
      outDir: path.resolve(packageDir, options?.outDir ?? "dist"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          extend: true,
        },
      },
    },
    plugins: [
      vitePluginTsConfigPaths(),
      vitePluginDts({ tsconfigPath: path.resolve(packageDir, tsConfigFile) }),
    ],
  });
};
