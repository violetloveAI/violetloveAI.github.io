import type { Metadata } from 'next';
import { FinalHumanCase } from './FinalHumanCase';

export const metadata: Metadata = {
  title: 'Final Human · AI 幻觉调查游戏 | Violet Xie',
  description: 'AI Ping 特种兵黑客松双奖作品：游戏开发赛道亚军与跨赛道专项奖“极准·一发入魂”。',
};

export default function FinalHumanPage() {
  return <FinalHumanCase />;
}
