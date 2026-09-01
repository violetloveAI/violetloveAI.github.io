import type { Metadata } from 'next';
import { FinalHumanCase } from './FinalHumanCase';

export const metadata: Metadata = {
  title: 'Final Human · AI 幻觉调查游戏 | Violet Xie',
  description: '深圳特种兵黑客松两人团队作品：游戏赛道亚军与跨赛道“极准·一发入魂奖”。',
};

export default function FinalHumanPage() {
  return <FinalHumanCase />;
}
