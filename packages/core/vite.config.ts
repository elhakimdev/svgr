import { defineConfig } from "vite";

import { createViteConfig } from "../../vite.config.base";
import path from "path";

export default defineConfig(({ mode }) => {
  return {
    ...createViteConfig(path.resolve(__dirname), mode , {
      name: "@svgr/core"
    }),
  };
});