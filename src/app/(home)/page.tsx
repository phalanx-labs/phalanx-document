import { ArrowRight, Coffee, FileCode, Shield, Server, Zap } from 'lucide-react';
import Link from 'next/link';
import { AIPromptCard } from './ai-prompt-card';

const SDKS = [
  {
    title: 'Go SDK',
    description: '面向 Gin 框架的轻量 SSO SDK',
    icon: FileCode,
    href: '/docs/beacon-sso/go-sdk/quick-start',
    badge: 'Golang',
  },
  {
    title: 'Java SDK',
    description: '基于 Spring Boot 的 SSO SDK',
    icon: Coffee,
    href: '/docs/beacon-sso/java-sdk/quick-start',
    badge: 'Java',
  },
] as const;

const FEATURES = [
  { label: 'OAuth2 授权', icon: Shield },
  { label: 'gRPC 客户端', icon: Server },
  { label: '缓存', icon: Zap },
] as const;

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">锋翎文档</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          Phalanx 项目文档中心
        </p>
        <p className="text-muted-foreground mb-8">
          为现代后端服务提供统一认证能力
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/docs/beacon-sso/go-sdk/quick-start"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            快速开始
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/docs/guide"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all font-medium"
          >
            查看指南
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* SDK Cards */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">选择你的技术栈</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SDKS.map((sdk) => (
            <Link
              key={sdk.title}
              href={sdk.href}
              className="group flex flex-col gap-3 p-6 border border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <sdk.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {sdk.title}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {sdk.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                开始使用
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Feature Pills */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {FEATURES.map((f) => (
          <div
            key={f.label}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm text-muted-foreground"
          >
            <f.icon className="size-4" />
            {f.label}
          </div>
        ))}
      </div>

      {/* AI Integration */}
      <AIPromptCard />

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            由{' '}
            <a
              href="https://www.x-lf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              筱锋
            </a>{' '}
            维护
          </p>
          <Link
            href="/docs/guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            开始阅读文档
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
