import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '锋翎文档',
    template: '%s | 锋翎文档',
  },
  description: 'Phalanx 项目文档中心，为现代后端服务提供统一认证能力',
  icons: {
    icon: '/favicon.png',
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="zh" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={{
            enabled: true, // disable search entirely
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
