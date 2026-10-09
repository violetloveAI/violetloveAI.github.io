import type { Metadata } from 'next';
import { JialihuaCase } from './JialihuaCase';

export const metadata: Metadata = {
  title: '家里话 · BAYTECH 2026 黑客松赛道冠军 | Violet Xie',
  description: '独立完成适老 AI 应用，获 BAYTECH 2026 AI 应用与工程赛道第一名。以大字解释、河南话朗读和图文视频分享，让长辈更容易看清、听懂家人的消息。',
};

export default function JialihuaPage() {
  return <JialihuaCase />;
}
