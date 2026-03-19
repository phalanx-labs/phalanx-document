# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**锋翎文档** — Phalanx 项目文档站点，基于 Next.js 16 + Fumadocs 构建。文档内容以 MDX 格式存储，面向多个语言技术栈（Golang/Java）。

## Commands

```bash
pnpm dev          # 启动开发服务器 (localhost:3000)
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
pnpm lint         # ESLint 检查 (eslint-config-next core-web-vitals)
pnpm types:check  # 完整类型检查 (fumadocs-mdx → typegen → tsc --noEmit)
```

`postinstall` 自动执行 `fumadocs-mdx`，生成 `.source/` 下的类型文件（已 gitignore）。

## Architecture

### Content Pipeline

```
content/docs/       ← MDX 文档源文件 + meta.json 导航配置
       ↓ fumadocs-mdx (postinstall)
.source/            ← 自动生成的服务端/客户端类型（勿手动编辑）
       ↓ imported by
src/lib/source.ts   ← loader() 统一内容源入口，导出 source / getPageImage / getLLMText
```

`source.config.ts` 定义文档集合（`dir: 'content/docs'`），每个子目录通过 `meta.json` 配置导航。

### Route Structure

| 路由 | 用途 |
|------|------|
| `app/(home)/` | 首页，技术栈选择入口 |
| `app/docs/[[...slug]]/` | 文档页面，使用 `source.getPage()` 渲染 MDX |
| `app/api/search/` | Orama 搜索 Route Handler |
| `app/llms.txt/` | LLM 索引（纯文本页面列表） |
| `app/llms.mdx/docs/[[...slug]]/` | 单页 LLM 友好 Markdown |
| `app/llms-full.txt/` | 完整文档 LLM 友好文本 |
| `app/og/docs/[...slug]/` | OG 图片生成 |

`next.config.mjs` 中有 rewrite：`/docs/:path*.mdx` → `/llms.mdx/docs/:path*`。

### Key Components

- **DocsLayout** (`src/components/layout/docs/index.tsx`) — 自定义文档布局，集成 Sidebar、Tabs、Search、Theme
- **DocsPage/Page** — 文档页面组件封装 (`src/components/layout/docs/page/`)
- **LLMCopyButton / ViewOptions** (`src/components/ai/page-actions.tsx`) — AI 集成：复制 Markdown、打开到各 AI 平台
- **CodeBlock** (`src/components/codeblock.tsx`) — 代码块组件
- **Mermaid** (`src/components/mdx/mermaid.tsx`) — Mermaid 图表渲染
- **MDX Components** (`src/mdx-components.tsx`) — 全局 MDX 组件注册入口

### UI Stack

- **Tailwind CSS 4** + `@tailwindcss/postcss`
- **shadcn/ui** (new-york style, Radix UI, lucide icons) → `src/components/ui/`
- **Fumadocs UI** — 布局、搜索、主题等核心 UI
- Path alias: `@/*` → `src/*`

### Navigation

`src/lib/navigation.ts` 中的 `getSection()` 从 URL 提取 section 标识（guide/beacon-sso/other），用于 sidebar tabs 颜色等逻辑。
