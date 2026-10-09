import type { Metadata } from 'next';
import { TutorLogCase } from './TutorLogCase';

export const metadata: Metadata = {
  title: '课时簿 Tutor Log · 家教排课与收入管理 | Violet Xie',
  description: '从真实家教工作流出发，独立交付 iPhone 私人版，连通排课、教学记录与收款管理，并将备课、通勤与费用纳入真实时薪核算。',
};

export default function TutorLogPage() {
  return <TutorLogCase />;
}
