import type { Metadata } from 'next';
import {
  Barlow_Condensed,
  Bowlby_One_SC,
  Bungee_Outline,
  Geist,
  Geist_Mono,
  Rock_Salt,
  Unbounded,
} from 'next/font/google';
import './globals.css';
import './v2.css';
import './work-interactions.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const bowlbyOne = Bowlby_One_SC({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
});

const bungeeOutline = Bungee_Outline({
  variable: '--font-outline',
  weight: '400',
  subsets: ['latin'],
});

const unbounded = Unbounded({
  variable: '--font-editorial',
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
});

const barlowCondensed = Barlow_Condensed({
  variable: '--font-narrow',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const rockSalt = Rock_Salt({
  variable: '--font-handwrite',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://violetloveai.github.io'),
  title: '谢子涵 Violet Xie · FDE 作品集',
  description: '从企业软件交付现场出发，把模糊业务问题推进为可验证 AI 方案的 FDE 作品集。',
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: '谢子涵 Violet Xie · FDE 作品集',
    description: '把模糊业务问题推进为可验证的 AI 方案。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '谢子涵 Violet Xie · AI Solutions / FDE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '谢子涵 Violet Xie · FDE 作品集',
    description: '把模糊业务问题推进为可验证的 AI 方案。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bowlbyOne.variable} ${bungeeOutline.variable} ${unbounded.variable} ${barlowCondensed.variable} ${rockSalt.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
