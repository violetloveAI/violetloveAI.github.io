import type { Metadata } from 'next';
import OtherBuildsCase from './OtherBuildsCase';

export const metadata: Metadata = {
  title: '更多创作 · More Creations | Violet Xie',
  description: '从日常观察到可体验的作品：Final Human 获奖调查游戏、共星纪双人生活 RPG、活答案公共答案共创原型与 Codex 桌面搭档，探索玩法、协作与陪伴的交互设计。',
};

export default function OtherBuildsPage() {
  return <OtherBuildsCase />;
}
