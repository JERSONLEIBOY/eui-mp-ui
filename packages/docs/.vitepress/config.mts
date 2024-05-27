import { defineConfig } from 'vitepress'
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Eui-mp-ui",
  description: "高仿ElementPlus组件库",
  base: "/eui-mp-ui/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/markdown-examples' }
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [{ text: "快速开始", link: "/get-started" }],
      },
      {
        text: "基础组件",
        collapsed: false,
        items: [
          {
            text: "Button 按钮",
            link: "components/button.md"
          },
          {
            text: "Collapse 折叠面板",
            link: "components/collapse.md"
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JERSONLEIBOY/eui-mp-ui' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  }
})
