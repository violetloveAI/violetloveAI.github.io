import type { Metadata } from 'next';
import { TutorLogCase } from './TutorLogCase';

export const metadata: Metadata = {
  title: 'Tutor Log · 匿名用户产品案例 | Violet Xie',
  description: '从一位匿名独立教师的工作流出发，独立完成需求、产品设计、AI 辅助构建、测试与私人版 iPhone 交付。',
};

export default function TutorLogPage() {
  return <TutorLogCase />;
}
