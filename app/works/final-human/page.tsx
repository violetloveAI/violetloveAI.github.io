import type { Metadata } from 'next';
import { FinalHumanCase } from './FinalHumanCase';

export const metadata: Metadata = {
  title: 'Final Human · AI 幻觉调查游戏 | Violet Xie',
  description: '把 AI 幻觉做成证据驱动的调查游戏。我主导选题、玩法与路演，与队友在 24 小时内完成交付，获游戏赛道亚军及跨赛道“极准·一发入魂”专项奖。',
};

export default function FinalHumanPage() {
  return <FinalHumanCase />;
}
