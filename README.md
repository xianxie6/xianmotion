# XianMotion

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![pnpm](https://img.shields.io/badge/pnpm-10.x-brightgreen)

文字动效生成与导出工具（Next.js 16 + Tailwind + Framer Motion）。

## 功能
- 文本动效预设：淡入、上滑、放大、随风飘动（风力/风向/阵风/随机扰动）
- 画布：比例 9:16 / 16:9 / 1:1、宽度可调、渐变/透明背景
- 文本：横排/竖排切换、字号小/中/大、多行输入、竖排左对齐
- 导出：浏览器端导出 GIF（支持透明）

## 开发
```bash
pnpm install
pnpm dev
```
打开 http://localhost:3000

## 构建与运行
```bash
pnpm build
pnpm start
```

## 部署（Vercel）
将仓库推送至 GitHub 后，在 Vercel 上 Import 即可：
- Framework: Next.js
- Package Manager: pnpm
- Install: pnpm install
- Build: next build
- Output: .next

## 关键目录
- `src/app/page.tsx` 页面与 UI 逻辑
- `src/app/store/useStore.ts` 全局状态（Zustand）
- `src/app/components/*` 复用组件
- `src/app/components/ExportPanel.tsx` GIF 导出

## 许可
MIT © XianMotion contributors
