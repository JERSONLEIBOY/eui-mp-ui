import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

import dts from "vite-plugin-dts";

const COMP_NAMES = [
  "Alert",
  "Button",
  "Collapse",
  "Dropdown",
  "Form",
  "Icon",
  "Input",
  "Loading",
  "Message",
  "MessageBox",
  "Notification",
  "Overlay",
  "Popconfirm",
  "Select",
  "Switch",
  "Tooltip",
  "Upload",
] as const;

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types"
    })
  ],
  build: {
    // 指定输出路径
    outDir: "dist/es",
    // 构建为库
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "EuiMpUi",
      // fileName 是输出的包文件名
      fileName: "eui-mp-ui",
      formats: ["es"]
    },
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      // 该选项用于匹配需要排除在 bundle 外部的模块
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === "style.css") {
            return "index.css";
          }
          return chunkInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks")) {
            return "hooks";
          }
          if (id.includes("/packages/utils")) {
            return "utils";
          }
          for (const item of COMP_NAMES) {
            if (id.includes(`/packages/components/${item}`)) {
              return item;
            }
          }
        }
      }
    }
  }
})