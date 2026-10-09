import type { Metadata } from 'next';
import { EnglishBuddyCase } from './EnglishBuddyCase';

export const metadata: Metadata = {
  title: '英语搭子团 · 五角色协作学习体验 | Violet Xie',
  description: '让阅读、词汇、听力、口语与写作搭子共享上下文，围绕同一次练习接力。我负责产品方向、体验串联与演示交付，产品已进入真实使用。',
};

export default function EnglishBuddyPage() {
  return <EnglishBuddyCase />;
}
